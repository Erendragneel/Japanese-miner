#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

function argValue(name, fallback = null) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
}

const mode = args.includes('--quick') ? 'quick' : 'tests';
const requested = argValue('--test', 'all');
const failFast = args.includes('--fail-fast') || !args.includes('--continue');
const logPath = argValue('--log');
const quiet = args.includes('--quiet');

const logLines = [];
function log(message = '') {
  const line = String(message);
  logLines.push(line);
  if (!quiet) console.log(line);
}
function flushLog() {
  if (!logPath) return;
  fs.mkdirSync(path.dirname(path.resolve(logPath)), { recursive: true });
  fs.writeFileSync(logPath, `${logLines.join('\n')}\n`, 'utf8');
}
function fail(message) { throw new Error(message); }
function assert(condition, message) { if (!condition) fail(message); }
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }

function quickCompile() {
  const result = spawnSync(process.execPath, ['--check', path.join(ROOT, 'game.js')], {
    encoding: 'utf8', timeout: 30000
  });
  if (result.error) fail(`Unable to start Node syntax checker: ${result.error.message}`);
  if (result.status !== 0) fail((result.stderr || result.stdout || 'Unknown syntax error').trim());
}

let cachedModel;
function gameModel() {
  if (cachedModel) return cachedModel;
  const js = read('game.js');
  const cut = js.indexOf('const DEFAULT_STATE');
  assert(cut > 0, 'Could not locate DEFAULT_STATE while building the content test model.');
  const source = `
    function shuffle(a){ return a; }
    function makeKanaOpts(set, correct){
      const pool=[...new Set(set.map(x=>x[1]).filter(x=>x!==correct))];
      return [correct,...pool.slice(0,3)];
    }
    ${js.slice(0, cut)}
    globalThis.__MODEL__={stages,STAGE_XP_REQUIREMENTS,STAGE_MASTERY_REQUIREMENTS,STAGE_CLEAR_REWARDS,gemTiers,hira,kata,questions,n5Vocab};
  `;
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context, { timeout: 5000, filename: 'game-content-model.js' });
  cachedModel = context.__MODEL__;
  return cachedModel;
}

function extractLiteral(name) {
  const js = read('game.js');
  const startMatch = new RegExp(`const\\s+${name}\\s*=\\s*`).exec(js);
  assert(startMatch, `Could not find constant ${name}.`);
  const start = startMatch.index + startMatch[0].length;
  const open = js[start];
  const close = open === '[' ? ']' : open === '{' ? '}' : null;
  assert(close, `${name} is not an array or object literal.`);
  let depth = 0, quote = null, escape = false;
  for (let i = start; i < js.length; i++) {
    const ch = js[i];
    if (quote) {
      if (escape) escape = false;
      else if (ch === '\\') escape = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === open) depth++;
    if (ch === close) {
      depth--;
      if (depth === 0) return vm.runInNewContext(`(${js.slice(start, i + 1)})`);
    }
  }
  fail(`Could not parse literal ${name}.`);
}

const tests = [
  {
    id: 'quick-compile',
    intent: 'Verify game.js parses successfully before any slower project tests run.',
    run: quickCompile
  },
  {
    id: 'required-files',
    intent: 'Verify every file required for the browser build exists and is not empty.',
    run() {
      for (const rel of ['index.html', 'game.js', 'styles.css', 'netlify.toml', 'README.md', 'test-runner.mjs', 'test-game.sh', 'test-game.cmd']) {
        const full = path.join(ROOT, rel);
        assert(fs.existsSync(full), `Missing required file: ${rel}`);
        assert(fs.statSync(full).size > 0, `Required file is empty: ${rel}`);
      }
    }
  },
  {
    id: 'html-assets',
    intent: 'Verify local script, stylesheet, and icon references in index.html point to real files.',
    run() {
      const html = read('index.html');
      const refs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
        .map(m => m[1].split('?')[0])
        .filter(ref => ref && !/^(?:https?:|data:|#|mailto:|tel:)/i.test(ref));
      assert(refs.length > 0, 'No local assets were found in index.html.');
      for (const ref of refs) assert(fs.existsSync(path.join(ROOT, ref)), `index.html references missing asset: ${ref}`);
    }
  },
  {
    id: 'unique-html-ids',
    intent: 'Prevent duplicate HTML element IDs that can make controls update the wrong element.',
    run() {
      const ids = [...read('index.html').matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
      const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
      assert(duplicates.length === 0, `Duplicate HTML IDs: ${duplicates.join(', ')}`);
    }
  },
  {
    id: 'kana-only-mines',
    intent: 'Guarantee Hiragana and Katakana mines contain kana recognition only and no vocabulary questions.',
    run() {
      const { questions } = gameModel();
      const invalid = questions.filter(q => q.stage < 2 && !q.kana);
      assert(invalid.length === 0, `${invalid.length} non-kana questions were found before N5.`);
      assert(questions.some(q => q.stage === 0 && q.kanaType === 'hiragana'), 'Hiragana recognition questions are missing.');
      assert(questions.some(q => q.stage === 1 && q.kanaType === 'katakana'), 'Katakana recognition questions are missing.');
    }
  },
  {
    id: 'n5-vocabulary-start',
    intent: 'Guarantee vocabulary begins at JLPT N5 rather than before the player completes kana.',
    run() {
      const { questions, n5Vocab } = gameModel();
      assert(n5Vocab.length >= 40, `N5 vocabulary bank is unexpectedly small: ${n5Vocab.length}.`);
      assert(questions.some(q => q.stage === 2 && /vocabulary/.test(q.kind || '')), 'No N5 vocabulary questions were generated.');
      assert(!questions.some(q => q.stage < 2 && /vocabulary/.test(q.kind || '')), 'Vocabulary exists before N5.');
    }
  },
  {
    id: 'question-integrity',
    intent: 'Verify every generated question has one valid answer, four unique choices, a valid stage, and a unique ID.',
    run() {
      const { questions, stages } = gameModel();
      const ids = new Set();
      questions.forEach((q, i) => {
        assert(Number.isInteger(q.stage) && q.stage >= 0 && q.stage < stages.length, `Question ${i} has invalid stage ${q.stage}.`);
        assert(typeof q.q === 'string' && q.q.trim(), `Question ${i} has no question text.`);
        assert(typeof q.prompt === 'string' && q.prompt.trim(), `Question ${i} has no prompt.`);
        assert(typeof q.a === 'string' && q.a.trim(), `Question ${i} has no answer.`);
        assert(Array.isArray(q.opts) && q.opts.length === 4, `Question ${q.id || i} must have exactly four options.`);
        assert(new Set(q.opts).size === 4, `Question ${q.id || i} has duplicate options: ${q.opts.join(' | ')}`);
        assert(q.opts.filter(option => option === q.a).length === 1, `Question ${q.id || i} must contain its correct answer exactly once.`);
        assert(q.id && !ids.has(q.id), `Duplicate or missing question ID: ${q.id || '(missing)'}`);
        ids.add(q.id);
      });
    }
  },
  {
    id: 'content-volume',
    intent: 'Ensure every learning stage has enough questions to reduce excessive repetition.',
    run() {
      const { questions, stages } = gameModel();
      const minimums = [100, 100, 250, 20, 20, 20, 20];
      stages.forEach((stage, i) => {
        const count = questions.filter(q => q.stage === i).length;
        assert(count >= minimums[i], `${stage.name} has only ${count} questions; expected at least ${minimums[i]}.`);
      });
    }
  },
  {
    id: 'stage-progression',
    intent: 'Verify stage order, XP requirements, mastery thresholds, and clear rewards form a complete seven-stage path.',
    run() {
      const { stages, STAGE_XP_REQUIREMENTS, STAGE_MASTERY_REQUIREMENTS, STAGE_CLEAR_REWARDS } = gameModel();
      const expected = ['Hiragana Mine', 'Katakana Cavern', 'JLPT N5 Quarry', 'JLPT N4 Tunnel', 'JLPT N3 Depths', 'JLPT N2 Crystal Core', 'JLPT N1 Master Mine'];
      assert(stages.length === expected.length, `Expected ${expected.length} stages, found ${stages.length}.`);
      expected.forEach((name, i) => assert(stages[i].name === name, `Stage ${i + 1} should be ${name}, found ${stages[i].name}.`));
      for (const [name, values] of Object.entries({ STAGE_XP_REQUIREMENTS, STAGE_MASTERY_REQUIREMENTS, STAGE_CLEAR_REWARDS })) {
        assert(values.length === stages.length, `${name} must contain one value per stage.`);
        values.forEach((value, i) => assert(Number.isFinite(value) && value > 0, `${name}[${i}] is invalid.`));
      }
      for (let i = 1; i < STAGE_CLEAR_REWARDS.length; i++) assert(STAGE_CLEAR_REWARDS[i] > STAGE_CLEAR_REWARDS[i - 1], 'Stage clear rewards must increase by stage.');
    }
  },
  {
    id: 'unlock-contract',
    intent: 'Verify later stages unlock only after the previous stage meets both XP and mastery requirements.',
    run() {
      const js = read('game.js');
      assert(/function\s+stageComplete\(i\)\s*{\s*return\s+stageXpComplete\(i\)\s*&&\s*stageMasteryComplete\(i\)/.test(js), 'stageComplete must require both XP and mastery.');
      assert(/function\s+isStageUnlocked\(i\)[\s\S]*return\s+stageComplete\(i-1\)/.test(js), 'Sequential stage unlocking is missing.');
      assert(/if\(i===0\)\s*return\s+true/.test(js), 'Hiragana must remain unlocked by default.');
    }
  },
  {
    id: 'gem-economy',
    intent: 'Verify gem values rise consistently, rarity declines, and advanced gems cannot appear in early mines.',
    run() {
      const { gemTiers, stages } = gameModel();
      assert(gemTiers.length >= 12, `Expected at least 12 gem tiers, found ${gemTiers.length}.`);
      gemTiers.forEach((gem, i) => {
        assert(gem.value > 0 && gem.weight > 0, `${gem.name} has an invalid value or weight.`);
        assert(Number.isInteger(gem.minStage) && gem.minStage >= 0 && gem.minStage < stages.length, `${gem.name} has invalid minStage.`);
        if (i > 0) {
          assert(gem.value > gemTiers[i - 1].value, `${gem.name} must be worth more than ${gemTiers[i - 1].name}.`);
          assert(gem.weight <= gemTiers[i - 1].weight, `${gem.name} must not be more common than ${gemTiers[i - 1].name}.`);
          assert(gem.minStage >= gemTiers[i - 1].minStage, `${gem.name} unlocks earlier than the preceding gem tier.`);
        }
      });
      assert(gemTiers.at(-1).name === 'Red Diamond', 'Red Diamond must remain the final gem tier.');
    }
  },
  {
    id: 'shop-economy',
    intent: 'Verify consumable and pickaxe prices are positive, increase predictably, and contain no duplicate item IDs.',
    run() {
      const prices = extractLiteral('SHOP_PRICE_BY_STAGE');
      const skins = extractLiteral('PICKAXE_SKINS');
      assert(prices.length === gameModel().stages.length, 'Shop prices must contain one row per stage.');
      for (let i = 0; i < prices.length; i++) {
        for (const key of ['hint', 'shield', 'heart']) assert(Number.isFinite(prices[i][key]) && prices[i][key] > 0, `Invalid ${key} price at stage ${i}.`);
        assert(prices[i].hint < prices[i].shield && prices[i].shield < prices[i].heart, `Stage ${i} prices must progress hint < shield < heart.`);
        if (i > 0) for (const key of ['hint', 'shield', 'heart']) assert(prices[i][key] > prices[i - 1][key], `${key} price must rise by stage.`);
      }
      const ids = skins.map(s => s.id);
      assert(new Set(ids).size === ids.length, 'Pickaxe IDs must be unique.');
      assert(skins[0].id === 'standard' && skins[0].cost === 0, 'Standard pickaxe must remain the free default.');
      for (let i = 1; i < skins.length; i++) assert(skins[i].cost > skins[i - 1].cost, 'Pickaxe prices must strictly increase.');
    }
  },
  {
    id: 'save-profile-contract',
    intent: 'Verify profiles use separate storage keys and saves are normalized before gameplay resumes.',
    run() {
      const js = read('game.js');
      assert(/const\s+PROFILE_INDEX_KEY=["']jm_profiles["']/.test(js), 'Profile index storage key is missing.');
      assert(/function\s+profileStorageKey\(id\)\s*{\s*return\s+`jm_profile_\$\{id\}`/.test(js), 'Per-profile storage keys are missing.');
      assert(/state=normalizeState\(raw\)/.test(js), 'Loaded profile data is not normalized.');
      assert(/localStorage\.setItem\(profileStorageKey\(activeProfileId\),JSON\.stringify\(state\)\)/.test(js), 'Save data is not written to the active profile key.');
      assert(/if\(!activeProfileId\)\s*return/.test(js), 'Save must refuse to write without an active profile.');
    }
  },
  {
    id: 'state-safety',
    intent: 'Verify corrupted or old saves are bounded to valid hearts, stages, arrays, settings, and inventories.',
    run() {
      const js = read('game.js');
      const required = [
        /next\.maxHearts=Math\.min\(14/,
        /next\.hearts=Math\.min\(next\.maxHearts/,
        /next\.stageXp=Array\.isArray/,
        /while\(next\.stageXp\.length<stages\.length\)/,
        /next\.selectedStage=Math\.max\(0,Math\.min\(stages\.length-1/,
        /next\.questionStats=next\.questionStats&&typeof next\.questionStats===["']object["']/,
        /next\.ownedPickaxeSkins=Array\.isArray/,
        /next\.ownedWallpapers=Array\.isArray/
      ];
      required.forEach((pattern, i) => assert(pattern.test(js), `State normalization safeguard ${i + 1} is missing.`));
    }
  },
  {
    id: 'test-runner-contract',
    intent: 'Verify the test runner supports quick compile, single/all tests, fail-fast, continue mode, per-test intent, and a release gate.',
    run() {
      const runner = read('test-runner.mjs');
      for (const token of ['--quick', '--test', '--fail-fast', '--continue', '[RUN]', '[INTENT]', 'RELEASE GATE PASSED', 'RELEASE GATE FAILED']) {
        assert(runner.includes(token), `Test runner contract is missing ${token}.`);
      }
    }
  },
  {
    id: 'voice-learning-system',
    intent: 'Verify Japanese speech, autoplay controls, slow playback, and persistent voice settings are present.',
    run() {
      const html = read('index.html'); const js = read('game.js');
      for (const id of ['voiceToggle','autoSpeakToggle','voiceRate','testVoiceBtn','speakQuestionBtn']) assert(html.includes(id) || js.includes(id), `Missing voice feature: ${id}`);
      for (const token of ['SpeechSynthesisUtterance','ja-JP','speakActiveQuestion','voiceEnabled','autoSpeak']) assert(js.includes(token), `Missing Japanese voice implementation token: ${token}`);
    }
  },
  {
    id: 'smart-review-session',
    intent: 'Verify weak-question weighting and session progress tracking are included.',
    run() {
      const html=read('index.html'),js=read('game.js');
      for(const token of ['smartReviewToggle','sessionAnswered','sessionAccuracy','sessionProgressBar'])assert(html.includes(token),`Missing session UI: ${token}`);
      for(const token of ['questionPriority','chooseQuestion','smartReview','sessionCorrect'])assert(js.includes(token),`Missing smart-review implementation: ${token}`);
    }
  },
  {
    id: 'pwa-assets',
    intent: 'Verify installable offline-app files exist and are referenced.',
    run() {
      const html=read('index.html');
      for(const rel of ['manifest.webmanifest','service-worker.js'])assert(fs.existsSync(path.join(ROOT,rel)),`Missing PWA asset: ${rel}`);
      assert(html.includes('manifest.webmanifest'),'Manifest is not linked in index.html.');
      assert(html.includes('serviceWorker.register'),'Service worker is not registered.');
    }
  },
  {
    id: 'player-progression-center',
    intent: 'Verify quests, achievements, mistake tracking, statistics, and portable backup systems are included.',
    run() {
      const js=read('game.js');
      for(const token of ['DAILY_QUESTS','WEEKLY_QUESTS','ACHIEVEMENTS','state.mistakes','renderQuests','renderAchievements','renderMistakes','renderStatistics','downloadBackup','importBackup']) assert(js.includes(token),`Missing player progression feature: ${token}`);
      for(const tab of ['quests','achievements','mistakes','statistics','account']) assert(js.includes(`data-feature-tab="${tab}"`) || js.includes(`['${tab}'`) || js.includes(`'${tab}'`),`Missing Player Center tab: ${tab}`);
    }
  },
  {
    id: 'character-customization',
    intent: 'Verify the customizable character profile includes saved skin, hair, clothing, and accessory options.',
    run() {
      const js = read('game.js');
      const previewJs = read('v5.js');
      const css = read('styles.css');
      for (const token of ['state.character','hairStyle','hairColor','shirt','pants','accessory','renderProfile','randomizeCharacter']) assert(js.includes(token), `Missing character system token: ${token}`);
      for (const token of ['.miner-avatar','.character-customizer','.character-choice-grid']) assert(css.includes(token), `Missing character styling token: ${token}`);
      for (const style of ['short','bob','long','bun','buzz','ponytail','wavy','undercut','twintails']) {
        assert(fs.existsSync(path.join(ROOT,`assets/avatar/hairstyles/${style}.png`)), `Missing rendered hairstyle: ${style}`);
        assert(fs.existsSync(path.join(ROOT,`assets/avatar/hairstyles/masks/${style}/skin.png`)), `Missing skin mask for hairstyle: ${style}`);
      }
      assert(fs.existsSync(path.join(ROOT,'assets/avatar/hairstyles/masks/spiky/skin.png')), 'Missing skin mask for hairstyle: spiky');
      assert(previewJs.includes("japaneseMinerCharacterMarkup?.('large',{[item.key]:item.value})"), 'Locked cosmetic previews must freshly render the selected hairstyle and its matching masks.');
      assert(previewJs.includes('avatar.dataset.previewKey=item.key'), 'Try-on previews must identify the selected cosmetic layer.');
      const previewCss=read('v6.css');
      assert(previewCss.includes('.preview-avatar[data-preview-key="hairStyle"] .rendered-avatar-layers{display:none!important}'), 'Hairstyle previews must render one clean character without stacked color masks.');
      for(const key of ['hairColor','shirt','jacket','pants','gloves','shoes']) assert(previewCss.includes(`data-preview-key="${key}"`), `Missing focused true-color preview rule for ${key}.`);
      assert(previewCss.includes('mix-blend-mode:hue!important;opacity:.94!important'), 'Rendered cosmetics must preserve the original artwork luminance and texture.');
      for(const value of ['black','blonde','silver']) assert(previewCss.includes(`data-hair-color="${value}"`), `Missing textured special-case hair treatment for ${value}.`);
      assert(js.includes('renderedColorVars')&&js.includes('syncJapaneseMinerRenderedLayers'), 'Rendered WebP color layers must stay synchronized with equipped cosmetics.');
      assert(previewCss.includes('background-image:var(--recolor-hair)!important')&&previewCss.includes('mix-blend-mode:normal!important'), 'Cosmetic colors must use rendered image layers instead of browser blend effects.');
      const recolorBundle=read('recolors-loader.js');
      const recolorData=JSON.parse(gunzipSync(fs.readFileSync(path.join(ROOT,'recolors.json.gz'))));
      assert(recolorBundle.includes('getJapaneseMinerRecolor'), 'Missing bundled rendered cosmetic artwork loader.');
      for(const style of ['short','spiky','bob','long','bun','buzz','ponytail','wavy','undercut','twintails']) for(const file of ['hair/red','shirt/casual','pants/black','shoes/boots']) assert(recolorData[`${style}/${file}`],`Missing bundled cosmetic layer: ${style}/${file}`);
      const countFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).reduce((sum,row)=>sum+(row.isDirectory()?countFiles(path.join(dir,row.name)):1),0);
      const totalFileBytes=dir=>fs.readdirSync(dir,{withFileTypes:true}).reduce((sum,row)=>sum+(row.isDirectory()?totalFileBytes(path.join(dir,row.name)):fs.statSync(path.join(dir,row.name)).size),0);
      assert(countFiles(ROOT)<100,'GitHub web uploads must contain fewer than 100 files.');
      assert(fs.statSync(path.join(ROOT,'recolors.json.gz')).size<20_000_000,'Compressed cosmetics exceed the safe GitHub upload size.');
      assert(totalFileBytes(ROOT)<23_000_000,'GitHub browser upload must remain below the safe combined size.');
    }
  },
  {
    id: 'version-consistency',
    intent: 'Ensure the visible build badge and browser cache-busting versions agree with the README release.',
    run() {
      const html = read('index.html');
      const release = read('README.md').match(/^#\s+Japanese Miner\s+v([\d.]+)/m)?.[1];
      assert(release, 'README release version could not be determined.');
      for (const required of [`v${release}`, `styles.css?v=${release}`, `game.js?v=${release}`]) assert(html.includes(required), `index.html is missing matching version reference: ${required}`);
    }
  }
];

function printAvailable() {
  log('Available tests:');
  for (const test of tests) log(`  ${test.id} — ${test.intent}`);
}

async function main() {
  const started = Date.now();
  log('=== Japanese Miner Test Runner ===');
  log(`Mode: ${mode}`);
  log(`Failure policy: ${failFast ? 'STOP IMMEDIATELY' : 'CONTINUE AND REPORT ALL FAILURES'}`);
  log(`Project: ${ROOT}`);

  if (args.includes('--list')) { printAvailable(); flushLog(); return 0; }

  if (mode === 'quick') {
    log('\n[RUN] quick-compile');
    log('[INTENT] Verify game.js parses successfully before any slower project tests run.');
    try {
      quickCompile();
      log('[PASS] quick-compile');
      log('\nQUICK COMPILE PASSED — safe to proceed to unit tests.');
      flushLog();
      return 0;
    } catch (error) {
      log(`[FAIL] quick-compile — ${error.message}`);
      log('\nSTOP: Fix the compile error immediately before changing or testing anything else.');
      flushLog();
      return 1;
    }
  }

  const selected = requested === 'all' ? tests : tests.filter(test => test.id === requested);
  if (!selected.length) { log(`Unknown test: ${requested}`); printAvailable(); flushLog(); return 2; }

  let passed = 0;
  const failures = [];
  for (const test of selected) {
    log(`\n[RUN] ${test.id}`);
    log(`[INTENT] ${test.intent}`);
    try {
      await test.run();
      passed++;
      log(`[PASS] ${test.id}`);
    } catch (error) {
      failures.push({ id: test.id, message: error.message });
      log(`[FAIL] ${test.id} — ${error.message}`);
      if (failFast) { log('\nSTOP: A test failed. Fix this issue immediately before continuing code changes.'); break; }
    }
  }

  log('\n=== FINAL TEST SUMMARY ===');
  log(`Passed: ${passed}`);
  log(`Failed: ${failures.length}`);
  log(`Duration: ${Date.now() - started} ms`);
  if (failures.length) {
    failures.forEach(failure => log(`  - ${failure.id}: ${failure.message}`));
    log('\nRELEASE GATE FAILED: Continue updating the code until every unit test passes.');
    flushLog();
    return 1;
  }
  log('\nRELEASE GATE PASSED: The game compiles and every selected unit test passes.');
  flushLog();
  return 0;
}

process.exitCode = await main();
