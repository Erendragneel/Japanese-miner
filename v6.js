// Japanese Miner v6.0 — The Polish Update
(()=>{
'use strict';
const VERSION='6.4.60-supporter-locks-clean-accessories', SNAPSHOT_PREFIX='jm_v6_snapshots_', FEEDBACK_INBOX_KEY='jm_v6_admin_feedback_inbox', FEEDBACK_INBOX_LIMIT=200;
let deferredInstallPrompt=null,installEventsBound=false;
const TOUR=[
 {section:'Getting started',icon:'⛏️',title:'Welcome to Japanese Miner',text:'Answer Japanese questions, build mastery, collect scientific gemstones, and progress from Hiragana through JLPT N1.',tips:['Create or sign in to a local player profile so every feature uses the same save.','Tap New Question or the mine rock to begin the selected course route.','Use the round menu button at the bottom-right whenever you need another game area.']},
 {section:'Getting started',icon:'🧭',title:'One-time placement test',text:'A new save may take one randomized placement assessment. Its result can recommend and unlock the correct starting mine.',tips:['The placement assessment may be completed only once per save.','Question order and answer order are randomized for that one attempt.','Earlier mines remain available for review after accepting the recommended starting point.']},
 {section:'Getting started',icon:'🧙',title:'Ask Kōji for today’s plan',text:'Kōji the Mine Gnome permanently waits beside the mine and turns your saved progress into a short, clickable study plan.',tips:['Tap Kōji whenever you want to see your previous-session refresher, due Smart Reviews, the active lesson, missions, hearts, or a ready guardian.','Each reminder opens the correct game area directly.','Kōji stays in the cave and updates as your progress changes.']},
 {section:'Navigation',icon:'☰',title:'Explore, Gear, and Player menus',text:'The Game Menu separates progression, owned equipment, and account tools into three clear categories.',tips:['Explore contains the Expedition Hub, Course, Learning Path, Mine, Quests, and Missions.','Gear contains Shop, Inventory, Character, and the Notebook.','Player contains statistics, achievements, calendar, settings, guide, feedback, and account tools. Use ← Menu to return from any full-screen menu.']},
 {section:'Course progression',icon:'🗺️',title:'Use the Expedition Hub',text:'The Expedition Hub is the world map for choosing a mine route, checking checkpoints, and entering guardian encounters.',tips:['Green or highlighted nodes are available; lock icons show what still needs progression.','Select a node to make that family, section, or level the active mining route.','The Learning Path and Course screens show the same saved mastery from different views.']},
 {section:'Course progression',icon:'あ',title:'Hiragana and Katakana families',text:'The two alphabet mines contain only their own kana and advance one character family at a time.',tips:['Start with Vowels, then unlock K, S, T, N, H, M, Y, R, W/N, voiced families, and P.','Reach 20% mastery in the current family to unlock the next family.','Choose families from their nodes in the Expedition Hub; the large family panel stays off the home mining screen.']},
 {section:'Course progression',icon:'語',title:'JLPT section lessons',text:'Each JLPT mine is divided into Vocabulary, Kanji, Grammar, and Reading lessons before its guardian.',tips:['N5 contains 40 Vocabulary lessons with 25 words per session, 6 Kanji lessons, 9 Grammar lessons, and 3 Reading lessons.','The Course and Expedition Hub show the same lesson items, unlocks, mastery, and review checkpoints.','Reach 75% mastery in each lesson. After every two lessons, pass a 25-question randomized review quiz at 75% within two minutes; each answer advances automatically.']},
 {section:'Questions',icon:'📖',title:'Question help and kanji support',text:'Read the prompt, choose an answer, and use the explanation to understand why it was correct or incorrect.',tips:['The “I don’t know this kanji” button appears only when the visible question or instruction actually contains kanji.','It stays hidden on English-, Hiragana-, and Katakana-only prompts.','Question audio and answer explanations can be adjusted in Accessibility settings.']},
 {section:'Guardian tests',icon:'👹',title:'Pass the silent Boss Gate',text:'Every guardian blocks the next mine until its Perfect Gate Challenge is passed.',tips:['Each attempt draws 25 different randomized questions from the guardian’s full course.','The test is silent and lasts up to 5 minutes; every answer advances automatically and wrong answers are recorded.','Results appear after question 25 or when time expires. Only 25/25 unlocks the next mine.']},
 {section:'Goals and rewards',icon:'📜',title:'Complete personal Quests',text:'Quests reward consistent practice through a separate set of daily and weekly goals.',tips:['Open Quests directly from Explore.','Daily goals reset each calendar day; weekly goals reset every Monday.','Rewards include Nuggets plus Hints or Shields. Progress and claimed rewards remain in the current player save.']},
 {section:'Goals and rewards',icon:'🎯',title:'Run Expedition Missions',text:'Missions are daily mine-focused objectives for answering, accuracy, scheduled review, and treasure-chest progress.',tips:['Open Missions directly from Explore or from the Expedition Hub.','The day’s Nugget values are locked to the active mine when the mission board resets.','Each Sakura Garden level adds 10% to mission Nuggets; supply rewards are listed separately and are not multiplied.']},
 {section:'Mining economy',icon:'💎',title:'Scientific gems and checkpoints',text:'Scientific gemstones support heart upgrades, rewards, and the Nugget economy.',tips:['Each save receives one starter specimen of every gem shown as unlocked by its available mines.','Each starter specimen is granted once; fixed XP checkpoints can still award additional gems.','Heart upgrades consume Agate through Topaz in order, and every purchase now saves immediately.']},
 {section:'Mining economy',icon:'🎁',title:'Treasure chests and Nuggets',text:'A treasure chest appears every 25 correct answers and awards a mine-scaled Nugget amount.',tips:['Deeper mines produce larger chest rewards suited to their higher shop prices.','The Gem Forge modestly improves chest rewards.','Quests, Missions, bosses, achievements, events, and scientific drops provide additional controlled income.']},
 {section:'Shop and collection',icon:'🛍️',title:'Buy permanent equipment',text:'Shop purchases are permanent for the active profile and remain compatible with account backups.',tips:['Pickaxes, wallpapers, fashion, character styles, companions, supplies, and settlement upgrades have visible prices.','Locked permanent items use preview and confirmation before charging Nuggets.','Already-owned items can be equipped again without paying a second time.']},
 {section:'Companions',icon:'🐾',title:'Choose one balanced companion',text:'Only the equipped companion is active. Later companions cost more, require deeper mines, and provide modest specialized bonuses.',tips:['Companions can help with XP, review selection, supplies, chest rewards, boss rewards, or discounts.','Lion, Tiger, Panda, Squirrel, Mole, and Golem are part of the expanded roster.','Open Companions from the Expedition Hub or the organized Shop to compare exact abilities.']},
 {section:'Settlement',icon:'🏘️',title:'Build long-term upgrades with Player Levels',text:'Settlement buildings are escalating investments that give account-wide Player XP and Player Levels a permanent progression purpose.',tips:['Building Levels 1–5 require Player Levels 50, 75, 100, 125, and 150.','The Sakura Garden raises daily Mission Nuggets, while the Gem Forge improves question-streak treasure chests.','Purchased building levels are permanent and grandfathered; only the next upgrade must meet its Player Level and Nugget requirements.']},
 {section:'Study tools',icon:'🧠',title:'Daily Refresher, Smart Review, and Word Book',text:'Daily Refresher revisits up to 10 tap-answer items from the player’s previous study session. Smart Review remains an optional spaced-repetition tool.',tips:['Daily Refresher has no microphone, speaking requirement, timer, heart loss, or lesson penalty.','Optional Smart Reviews return missed or difficult material sooner while mastered material waits longer.','Correct Japanese items enter the Word Book, where listening remains an optional study aid.']},
 {section:'Study tools',icon:'📓',title:'Notebook and Sticky Notes',text:'Incorrect answers enter the Notebook as difficult items without deleting the original question history.',tips:['Open Notebook from Gear or the Player Center.','Attach an 800-character Sticky Note directly to a difficult word, phrase, or question.','Create independent notes, edit or remove them, and mark difficult items reviewed without deleting their attached study context.']},
 {section:'Practice support',icon:'❤️',title:'Hearts, Shields, and silent tests',text:'Time away never costs hearts. Normal wrong answers can cost hearts, shields protect one mistake, and recovery continues while the game is closed.',tips:['Missing practice days resets the practice streak but leaves hearts unchanged.','When the recovery timer expires, returning to the game restores three hearts.','Boss testing is always silent and does not consume hearts or shields.']},
 {section:'Progress records',icon:'📅',title:'Study time, Calendar, and Statistics',text:'Visible practice time, study dates, accuracy, streaks, and course distribution are stored with the active profile.',tips:['The Practice Calendar shows studied days, monthly activity, and total study time.','Timing pauses when the page is hidden and resumes when active again.','Statistics identify the least-practiced category and show mastery throughout the learning path.']},
 {section:'Private curriculum',icon:'🔐',title:'Tutor and Admin material',text:'Tutor-provided curriculum is protected like Admin tools and remains visible only to the PIN-authenticated owner account.',tips:['Standard players cannot select, receive, review, or import protected Tutor questions.','Signing in to the authorized owner profile restores the private curriculum.','Boss decks, Word Book entries, Notebook items, and backups respect the same access rule.']},
 {section:'Settings and safety',icon:'⚙️',title:'Accessibility, installation, saves, and recovery',text:'Use Accessibility for text, motion, contrast, audio, app installation, explanations, and local safety snapshots.',tips:['Install App or Add to Home Screen is available inside Accessibility & Settings when supported by the device.','Safety snapshots provide local recovery points; restoring one replaces the current saved state.','Use the visible Back buttons to return to the parent menu, and avoid clearing browser storage before exporting a backup.']}
];
function ensureV6(){
 state.v6=Object.assign({tourComplete:false,onboardingGuideOffered:false,textSize:'normal',reducedMotion:false,highContrast:false,colorAssist:false,sfxVolume:70,musicVolume:35,explanations:true,feedback:[],storySeen:[],lastSnapshot:0,supporterTier:0},state.v6||{});
 if(!Array.isArray(state.v6.feedback))state.v6.feedback=[];
 state.v6.supporterTier=Math.max(0,Math.min(3,Number(state.v6.supporterTier)||0));
 if(!Array.isArray(state.v6.storySeen))state.v6.storySeen=[];
}
function supporterTier(){ensureV6();return Number(state.v6.supporterTier)||0;}
function supporterGateMarkup(tier,feature){const label=['','Supporter','Companion Keeper','Settlement Founder'][tier]||'Supporter';return `<section class="supporter-gate" data-supporter-tier="${tier}"><span>🔒 PATREON TIER ${tier}</span><h3>${esc6(feature)} is for ${label}s</h3><p>Connect your Patreon account when membership linking launches to unlock this section.</p><strong>Required tier: ${label}</strong></section>`;}
window.japaneseMinerSupporterTier=supporterTier;
window.japaneseMinerSupporterGate=supporterGateMarkup;
function esc6(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function shell(){
 if(document.getElementById('v6TourOverlay'))return;
 document.body.insertAdjacentHTML('beforeend',`
 <div id="v6TourOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog v6-tour-dialog"><button class="menu-back-button v6-menu-back" type="button" data-v6-back="tour">← Menu</button><button class="v6-close" data-v6-close="tour">×</button><div id="v6TourContent"></div></section></div>
 <div id="v6SettingsOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog"><header><button class="menu-back-button" type="button" data-v6-back="settings">← Menu</button><div class="menu-header-copy"><span>Player comfort</span><h2>⚙️ Accessibility & Settings</h2></div><button class="v6-close" data-v6-close="settings">×</button></header><div id="v6SettingsContent"></div></section></div>
 <div id="v6FeedbackOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog"><header><button class="menu-back-button" type="button" data-v6-back="feedback">← Menu</button><div class="menu-header-copy"><span>Help improve the mine</span><h2>💬 Player Feedback</h2></div><button class="v6-close" data-v6-close="feedback">×</button></header><div id="v6FeedbackContent"></div></section></div>
 <div id="v6StoryToast" class="v6-story-toast" aria-live="polite"></div>`);
 document.querySelectorAll('[data-v6-close]').forEach(b=>b.onclick=()=>closeOverlay(b.dataset.v6Close));
 document.querySelectorAll('[data-v6-back]').forEach(b=>b.onclick=()=>returnToGameMenu(()=>closeOverlay(b.dataset.v6Back)));
 document.querySelectorAll('.v6-overlay').forEach(o=>o.onclick=e=>{if(e.target===o)closeOverlay(o.id.includes('Tour')?'tour':o.id.includes('Settings')?'settings':'feedback');});
}
function overlay(name){return document.getElementById(name==='tour'?'v6TourOverlay':name==='settings'?'v6SettingsOverlay':'v6FeedbackOverlay');}
function openOverlay(name){shell();const o=overlay(name);o.classList.add('open');o.setAttribute('aria-hidden','false');window.syncJapaneseMinerPageScroll?.();}
function closeOverlay(name){const o=overlay(name);o?.classList.remove('open');o?.setAttribute('aria-hidden','true');window.syncJapaneseMinerPageScroll?.();}
let tourIndex=0;
function openTour(start=0){ensureV6();tourIndex=start;openOverlay('tour');renderTour();}
function renderTour(){const s=TOUR[tourIndex],box=document.getElementById('v6TourContent');box.innerHTML=`<div class="v6-tour-progress"><i style="width:${(tourIndex+1)/TOUR.length*100}%"></i></div><div class="v6-tour-icon">${s.icon}</div><span>${esc6(s.section)} · Guide ${tourIndex+1} of ${TOUR.length}</span><h2>${esc6(s.title)}</h2><p>${esc6(s.text)}</p><ul class="v6-guide-tips">${(s.tips||[]).map(tip=>`<li>${esc6(tip)}</li>`).join('')}</ul><div class="v6-tour-actions"><button id="v6TourBack" ${tourIndex===0?'disabled':''}>Back</button><button id="v6TourNext" class="primary">${tourIndex===TOUR.length-1?'Finish guide':'Next'}</button></div><button id="v6TourSkip" class="v6-link">Close guide</button>`;document.getElementById('v6TourBack').onclick=()=>{tourIndex--;renderTour();};document.getElementById('v6TourNext').onclick=()=>{if(tourIndex<TOUR.length-1){tourIndex++;renderTour();}else completeTour();};document.getElementById('v6TourSkip').onclick=completeTour;}
function completeTour(){state.v6.tourComplete=true;save();closeOverlay('tour');setMessage('Guide complete. Your Study Coach will recommend what to do next.','correct');}
function recommendation(){
 ensureV6();
 if(state.hearts<=0)return{icon:'❤️‍🩹',title:'Hearts are recovering',text:'Use review tools or explore your collection while the recovery timer counts down.',action:'dashboard',label:'View health'};
 const due=state.v5?.srs?Object.values(state.v5.srs).filter(x=>x?.dueAt<=Date.now()).length:0;
 if(due)return{icon:'🧠',title:`${due} review${due===1?'':'s'} ready`,text:'A short Smart Review session is the best next step for long-term memory.',action:'review',label:'Start review'};
 if(!state.active)return{icon:'⛏️',title:`Continue ${stages[selectedStageIndex()]?.label||'your mine'}`,text:'Use the permanent New Question button below when you are ready to continue mining.',action:'mine',label:'New question'};
 if(state.active&&!state.answered)return{icon:'🎌',title:'Finish your current challenge',text:'Your question is already waiting below. Read carefully, listen if available, and choose the best answer.',action:'question',label:'Return to question'};
 return{icon:'🗺️',title:'Explore your next checkpoint',text:'Open the expedition map to see your current mine and upcoming guardian.',action:'map',label:'Open map'};
}
let coachHideTimer=0;
function coachShell(){let c=document.getElementById('v6CoachCard');if(!c){c=document.createElement('section');c.id='v6CoachCard';c.className='v6-coach-card';c.setAttribute('aria-live','polite');c.setAttribute('aria-hidden','true');document.querySelector('.v5-launch-card')?.after(c);}}
function coachMessage(kind){if(kind==='correct')return{icon:'✨',title:'Great strike!',text:'That answer was correct. Your Japanese knowledge and mining progress both grew.',action:'',label:''};if(kind==='wrong')return{icon:'📘',title:'Let’s learn from that',text:Number(state.hearts||0)>0?'Compare your choice with the correct answer, then keep going. Every mistake strengthens your review path.':'Your hearts are recovering. Review the explanation while your mine energy returns.',action:state.hearts>0?'':'dashboard',label:'View health'};return recommendation();}
function renderCoach(kind='question'){coachShell();const c=document.getElementById('v6CoachCard');if(!c)return;const r=coachMessage(kind),duplicate=['mine','question'].includes(r.action);c.classList.toggle('informational',duplicate||!r.action);c.innerHTML=`<div class="v6-gnome" aria-hidden="true"><i class="gnome-hat"></i><i class="gnome-face"></i><i class="gnome-nose"></i><i class="gnome-beard"></i><i class="gnome-body"></i></div><div class="v6-coach-speech"><span>KŌJI · MINE GNOME</span><h2>${r.icon} ${r.title}</h2><p>${r.text}</p></div>${!r.action?'':`<button class="primary" data-v6-coach="${r.action}">${r.label}</button>`}`;const action=c.querySelector('[data-v6-coach]');if(action)action.onclick=()=>coachAction(r.action);clearTimeout(coachHideTimer);c.classList.add('visible');c.setAttribute('aria-hidden','false');coachHideTimer=setTimeout(()=>{c.classList.remove('visible');c.setAttribute('aria-hidden','true');},7000);}
function coachAction(a){if(a==='mine'){mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}else if(a==='question')document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});else if(a==='map')window.openJapaneseMinerV5?.('map');else if(a==='review')window.openJapaneseMinerV5?.('review');else if(a==='dashboard')window.openJapaneseMinerDashboard?.('health');}

// v6.4.27 - Restored website scrolling with a single overlay-aware page scroll guard.
// v6.4.28 - Matched Kōji's launcher dimensions to the round menu button.
// v6.4.29 - Removed the separate N5 learning-track selector and its UI wiring.
// v6.4.30 - Tutor curriculum controls are created only for the authenticated owner account.
// v6.4.35 - Versioned pickaxe icon URLs prevent launchers from reusing the original hammer artwork.
// v6.4.36 - Boss auto-advance survives state normalization, test timers are extended, and the header uses a dedicated player portrait.
// v6.4.37 - Kōji's phone reminder stays inside safe-area edges with a compact, internally scrolling layout.
// v6.4.34 - Install App moved from the header into Accessibility & Settings.
// v6.4.33 - Advanced forged pickaxe artwork replaces the original launcher icon.
// v6.4.32 - Menu access remains available when optional quick-stat controls are absent.
// v6.4.31 - Review now refreshes the previous study session without microphone or speaking tests.
// v6.4.26 - Boss Gate and lesson-review questions advance automatically after answers.
// v6.4.25 - Player feedback creates unread notifications in the device-local administrator inbox.
// v6.4.24 - Reset Save moved from the mining controls into Accessibility > Save management.
// v6.4.23 - Every save receives one starter specimen of each unlocked gem so heart upgrades work correctly.
// v6.4.22 - Removed the large Expedition Hub launch card from the home screen; menu and Kōji access remain.
// v6.4.21 - Settlement upgrade tiers now require Player Levels 50, 75, 100, 125, and 150.
// v6.4.20 - N5 vocabulary now uses 40 focused lessons of 25 words each.
// v6.4.19 - Phone-first responsive layouts, safe areas, installation, and offline app support.
// v6.4.18 - Kōji is fixed directly above the round menu button on every screen size.
// v6.4.17 - Every two JLPT lessons now lead to a required 25-question, two-minute review quiz.
// v6.4.16 - Every later JLPT lesson now requires 75% mastery in the lesson before it.
// v6.4.15 - Kōji is now a permanent, clickable guide inside the mine.
let coachLastFeedback=null;
function coachDueReviewCount(){
 const srs=state.v5?.srs||{},now=Date.now();
 return questions.filter(question=>questionAllowedForSession(question)&&srs[question.id]&&Number(srs[question.id].dueAt||0)<=now).length;
}
function coachDailyRefresherReady(){const sessions=Array.isArray(state.v5?.studySessions)?state.v5.studySessions:[],last=sessions.at(-1),result=state.v5?.dailyRefresher;return !!last?.questionIds?.length&&!(result?.status==='complete'&&result.day===dateKey());}
function coachMissionSummary(){
 const missions=state.v5?.missions,specs=typeof MISSION_SPECS==='undefined'?[]:MISSION_SPECS;
 if(!missions||!specs.length)return{claimable:0,claimed:0,total:0,remaining:0};
 const claimable=specs.filter(spec=>!missions.claimed?.[spec.id]&&Number(missions[spec.metric]||0)>=Number(spec.goal||0)).length;
 const claimed=specs.filter(spec=>missions.claimed?.[spec.id]).length;
 return{claimable,claimed,total:specs.length,remaining:Math.max(0,specs.length-claimed)};
}
function coachLessonReminder(){
 const stage=selectedStageIndex();
 if(stage<2){
  const family=currentKanaFamily(stage),mastery=kanaFamilyMastery(family);
  return{icon:stage===0?'あ':'ア',title:`Continue ${family.name}`,text:`This kana family is at ${mastery}% mastery. Reach ${KANA_FAMILY_UNLOCK_MASTERY}% to open the next family.`,action:'map',label:'Open family map'};
 }
 const section=currentJlptSection(stage),spec=jlptSectionSpec(section),levels=jlptSectionLevels(stage,section);
 const checkpoint=Array.from({length:Math.floor(levels.length/2)},(_,index)=>(index+1)*2).find(evenLesson=>jlptReviewCheckpointAvailable(stage,section,evenLesson)&&!jlptReviewCheckpointPassed(stage,section,evenLesson));
 if(checkpoint)return{icon:'🧠',title:`${spec.name} Lessons ${checkpoint-1}–${checkpoint} review is ready`,text:'Answer 25 randomized questions in two minutes and score at least 75% to unlock the next lesson.',action:'checkpoint',label:'Start review quiz',stage,section,evenLesson:checkpoint};
 let level=currentJlptSectionLevel(stage,section),mastery=jlptSectionLevelMastery(stage,section,level);
 if(mastery>=JLPT_VOCABULARY_UNLOCK_MASTERY&&levels[level+1]&&jlptSectionLevelUnlocked(stage,section,level+1)){level+=1;mastery=jlptSectionLevelMastery(stage,section,level);}
 const items=levels[level]||[],config=jlptSectionLessonConfig(section);
 return{icon:spec.icon,title:`${spec.name} Lesson ${level+1} is next`,text:`${mastery}% mastery · ${items.length} ${config.plural}. Review every item before practice.`,action:'lesson',label:`Open Lesson ${level+1}`,stage,section,level};
}
function coachReminderTasks(){
 ensureV6();const tasks=[],due=coachDueReviewCount(),dailyRefresherReady=coachDailyRefresherReady(),missions=coachMissionSummary(),stage=selectedStageIndex(),today=dateKey();
 if(Number(state.hearts||0)<=0)tasks.push({icon:'❤️‍🩹',title:'Hearts are recovering',text:'Your hearts are safe while you are away. Check the recovery timer or use this time to review your course plan.',action:'dashboard',label:'View health'});
 if(dailyRefresherReady)tasks.push({icon:'🔄',title:'Your Daily Refresher is ready',text:'Revisit up to 10 tap-answer items from your previous study session with no timer, microphone, heart loss, or lesson penalty.',action:'review',label:'Open refresher'});
 if(due>0)tasks.push({icon:'🧠',title:`${due} optional Smart Review${due===1?'':'s'} ready`,text:'Spaced repetition is available after your previous-session refresher.',action:'review',label:'Open review'});
 if(state.active&&!state.answered)tasks.push({icon:'🎌',title:'Finish your current challenge',text:'A question is waiting. Return to it before starting another activity.',action:'question',label:'Return to question'});
 tasks.push(coachLessonReminder());
 if(missions.claimable>0)tasks.push({icon:'🎁',title:`${missions.claimable} mission reward${missions.claimable===1?'':'s'} ready`,text:'You completed mission goals that are waiting to be claimed.',action:'missions',label:'Claim rewards'});
 else if(missions.remaining>0)tasks.push({icon:'🎯',title:'Daily missions in progress',text:`${missions.claimed}/${missions.total} mission rewards claimed today. Check the board for your next objective.`,action:'missions',label:'View missions'});
 if(state.lastPracticeDate!==today)tasks.push({icon:'🔥',title:Number(state.practiceStreak||0)>0?`Protect your ${state.practiceStreak}-day streak`:'Start today’s study',text:'One focused lesson or review session keeps your learning routine moving.',action:'mine',label:'Practice now'});
 if(typeof bossUnlocked==='function'&&bossUnlocked(stage)&&!state.v5?.bossDefeated?.includes(stage))tasks.push({icon:'👹',title:`${stages[stage].label} guardian is ready`,text:'Your course checkpoint has reached the guardian gate. Review first, then attempt the silent test.',action:'boss',label:'View guardian'});
 if(tasks.length<3)tasks.push({icon:'🗺️',title:'Check your next checkpoint',text:'The Expedition Hub shows your active route, mastery, lessons, and guardian progress.',action:'map',label:'Open map'});
 const seen=new Set();return tasks.filter(task=>{const key=`${task.action}:${task.title}`;if(seen.has(key))return false;seen.add(key);return true;}).slice(0,4);
}
function closeCoach(){const dock=document.getElementById('v6CoachDock'),button=document.getElementById('v6CoachButton'),card=document.getElementById('v6CoachCard');dock?.classList.remove('open');button?.setAttribute('aria-expanded','false');card?.setAttribute('aria-hidden','true');}
function openCoach(){renderCoach('refresh');const dock=document.getElementById('v6CoachDock'),button=document.getElementById('v6CoachButton'),card=document.getElementById('v6CoachCard');dock?.classList.add('open');button?.setAttribute('aria-expanded','true');card?.setAttribute('aria-hidden','false');}
coachShell=function(){
 let dock=document.getElementById('v6CoachDock');if(!document.body)return;
 if(!dock){
  dock=document.createElement('div');dock.id='v6CoachDock';dock.className='v6-coach-dock';dock.innerHTML=`<button id="v6CoachButton" class="v6-coach-character" type="button" aria-label="Open Kōji’s study reminders" aria-expanded="false" aria-controls="v6CoachCard" title="Kōji the Mine Gnome — open today’s study plan"><span id="v6CoachBadge" class="v6-coach-badge" hidden></span><span class="v6-gnome" aria-hidden="true"><i class="gnome-hat"></i><i class="gnome-face"></i><i class="gnome-nose"></i><i class="gnome-beard"></i><i class="gnome-body"></i></span><strong>Kōji</strong><small>Study guide</small></button><section id="v6CoachCard" class="v6-coach-popover" aria-hidden="true" aria-label="Kōji’s study reminders"><header><div><span>KŌJI · MINE GNOME</span><h2>Today’s plan</h2></div><button id="v6CoachClose" type="button" aria-label="Close Kōji’s reminders">×</button></header><div id="v6CoachContent"></div></section>`;
   document.body.appendChild(dock);
  dock.querySelector('#v6CoachButton').onclick=()=>dock.classList.contains('open')?closeCoach():openCoach();
  dock.querySelector('#v6CoachClose').onclick=closeCoach;
  }
  if(dock.parentElement!==document.body)document.body.appendChild(dock);
 if(!document.body.dataset.kojiOutsideBound){document.body.dataset.kojiOutsideBound='1';document.addEventListener('click',event=>{const current=document.getElementById('v6CoachDock');if(current?.classList.contains('open')&&!event.target.closest('#v6CoachDock'))closeCoach();});}
};
recommendation=function(){return coachReminderTasks()[0]||{icon:'🗺️',title:'Stay on track',text:'Open the Expedition Hub to choose your next lesson.',action:'map',label:'Open map'};};
renderCoach=function(kind='refresh'){
 coachShell();const dock=document.getElementById('v6CoachDock'),card=document.getElementById('v6CoachCard'),content=document.getElementById('v6CoachContent'),button=document.getElementById('v6CoachButton'),badge=document.getElementById('v6CoachBadge');if(!dock||!card||!content||!button)return;
 if(kind==='correct'||kind==='wrong'){coachLastFeedback={...coachMessage(kind),kind,at:Date.now()};button.classList.remove('react-correct','react-wrong');void button.offsetWidth;button.classList.add(kind==='correct'?'react-correct':'react-wrong');setTimeout(()=>button.classList.remove('react-correct','react-wrong'),900);}
 const tasks=coachReminderTasks(),feedback=coachLastFeedback&&Date.now()-coachLastFeedback.at<15000?coachLastFeedback:null,due=coachDueReviewCount(),missions=coachMissionSummary(),attention=due+missions.claimable;
 badge.hidden=attention<=0;badge.textContent=attention>9?'9+':String(attention);button.setAttribute('aria-label',`Kōji study guide. ${tasks[0]?.title||'Open today’s plan'}.`);
 content.innerHTML=`${feedback?`<div class="v6-coach-feedback ${feedback.kind}"><strong>${feedback.icon} ${esc6(feedback.title)}</strong><span>${esc6(feedback.text)}</span></div>`:''}<div class="v6-coach-reminder-list">${tasks.map((task,index)=>`<button type="button" data-v6-coach-task="${index}"><span>${task.icon}</span><span><strong>${esc6(task.title)}</strong><small>${esc6(task.text)}</small></span><b>${esc6(task.label)} →</b></button>`).join('')}</div>`;
 content.querySelectorAll('[data-v6-coach-task]').forEach(taskButton=>taskButton.onclick=()=>{const task=tasks[Number(taskButton.dataset.v6CoachTask)];if(task)coachAction(task.action,task);});
};
coachAction=function(action,task={}){
 closeCoach();
 if(action==='mine'){mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}
 else if(action==='question')document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});
 else if(action==='map')window.openJapaneseMinerV5?.('map');
 else if(action==='review')window.openJapaneseMinerV5?.('review');
 else if(action==='dashboard')window.openJapaneseMinerDashboard?.('health');
 else if(action==='missions')window.openJapaneseMinerV5?.('missions');
 else if(action==='boss')window.openJapaneseMinerV5?.('boss');
 else if(action==='lesson'){const stage=Number(task.stage),section=String(task.section||'vocabulary'),level=Number(task.level)||0;selectStage(stage,false);openJlptSectionLessonReview(stage,section,level);}
 else if(action==='checkpoint'){openJlptReviewCheckpoint(Number(task.stage),String(task.section||'vocabulary'),Number(task.evenLesson));}
};
function explanation(q,chosen,correct){
 if(!state.v6.explanations||!q)return;
 let box=document.getElementById('v6AnswerExplanation');if(!box){box=document.createElement('section');box.id='v6AnswerExplanation';box.className='v6-answer-explanation';document.getElementById('message')?.after(box);}
 const answer=q.a||'',reading=q.reading||q.kana||'',meaning=q.meaning||q.en||'';
 box.innerHTML=`<span>${correct?'✅ WHY IT WORKS':'📘 LEARN FROM THIS'}</span><h3>Correct answer: ${esc6(answer)}</h3>${reading&&reading!==answer?`<p><strong>Reading:</strong> ${esc6(reading)}</p>`:''}${meaning?`<p><strong>Meaning:</strong> ${esc6(meaning)}</p>`:''}<p>${correct?'You matched the prompt correctly.':'Your choice was '+esc6(chosen)+'. Compare it with the correct answer, then use Smart Review to see this item again.'}</p><div><button data-v6-explain="listen">🔊 Hear answer</button><button data-v6-explain="review">🧠 Review later</button></div>`;
 box.querySelector('[data-v6-explain="listen"]').onclick=()=>speakJapanese(answer);box.querySelector('[data-v6-explain="review"]').onclick=()=>{if(state.v5?.srs&&q.id){state.v5.srs[q.id]={ease:1.8,interval:1,dueAt:Date.now()};save();setMessage('Added to Smart Review.','correct');}};
}
function applySettings(){ensureV6();document.documentElement.dataset.textSize=state.v6.textSize;document.body.dataset.reducedMotion=String(!!state.v6.reducedMotion);document.body.dataset.highContrast=String(!!state.v6.highContrast);document.body.dataset.colorAssist=String(!!state.v6.colorAssist);}
function openSettings(){
 ensureV6();
 openOverlay('settings');
 const box=document.getElementById('v6SettingsContent');
 box.innerHTML=`<div class="v6-settings-grid"><label>Text size<select id="v6TextSize"><option value="normal">Normal</option><option value="large">Large</option><option value="xlarge">Extra large</option></select></label><label class="v6-switch"><input id="v6ReducedMotion" type="checkbox"><span>Reduce animations</span></label><label class="v6-switch"><input id="v6HighContrast" type="checkbox"><span>High contrast</span></label><label class="v6-switch"><input id="v6ColorAssist" type="checkbox"><span>Color-blind indicators</span></label><label class="v6-switch"><input id="v6Explanations" type="checkbox"><span>Answer explanations</span></label><label>Sound effects <output id="v6SfxOut"></output><input id="v6Sfx" type="range" min="0" max="100"></label><label>Music <output id="v6MusicOut"></output><input id="v6Music" type="range" min="0" max="100"></label></div><section class="v6-install-app"><div><span>DEVICE APP</span><h3>📲 Install Japanese Miner</h3><p id="v6InstallStatus">Checking whether installation is available on this device…</p><small>If your home screen still shows the old hammer, remove that J-Miner shortcut once, reopen Japanese Miner in your browser, then install it again from this menu.</small></div><button id="installAppBtn" class="install-app-btn" type="button" disabled>Install App</button></section><section class="v6-save-recovery"><h3>🛟 Save recovery</h3><p>Japanese Miner keeps rolling safety snapshots on this device.</p><div id="v6SnapshotList"></div><button id="v6SnapshotNow">Create safety snapshot</button></section><section class="v6-save-management"><h3>🗑️ Save management</h3><p>Reset only the currently signed-in player’s progress. You will be asked to confirm before anything is erased.</p><button id="v6ResetSave" class="danger" type="button">Reset Save</button></section>`;
 const bind=(id,key,type='checked')=>{const el=document.getElementById(id);el[type]=state.v6[key];el.onchange=()=>{state.v6[key]=el[type];applySettings();save();};};
 document.getElementById('v6TextSize').value=state.v6.textSize;
 document.getElementById('v6TextSize').onchange=e=>{state.v6.textSize=e.target.value;applySettings();save();};
 bind('v6ReducedMotion','reducedMotion');
 bind('v6HighContrast','highContrast');
 bind('v6ColorAssist','colorAssist');
 bind('v6Explanations','explanations');
 [['v6Sfx','sfxVolume','v6SfxOut'],['v6Music','musicVolume','v6MusicOut']].forEach(([id,key,out])=>{const e=document.getElementById(id),o=document.getElementById(out);e.value=state.v6[key];o.textContent=e.value+'%';e.oninput=()=>{state.v6[key]=Number(e.value);o.textContent=e.value+'%';save();};});
 document.getElementById('v6SnapshotNow').onclick=()=>{createSnapshot(true);renderSnapshots();};
 document.getElementById('v6ResetSave').onclick=()=>{if(window.resetJapaneseMinerSave?.())closeOverlay('settings');};
 initInstallApp();
 renderSnapshots();
}
function snapshotKey(){return SNAPSHOT_PREFIX+(activeProfileId||'guest');}
function getSnapshots(){try{return JSON.parse(localStorage.getItem(snapshotKey())||'[]');}catch{return[];}}
function createSnapshot(force=false){ensureV6();if(!activeProfileId)return;if(!force&&Date.now()-state.v6.lastSnapshot<120000)return;const rows=getSnapshots();rows.unshift({at:Date.now(),state:JSON.parse(JSON.stringify(state))});localStorage.setItem(snapshotKey(),JSON.stringify(rows.slice(0,3)));state.v6.lastSnapshot=Date.now();}
function renderSnapshots(){const box=document.getElementById('v6SnapshotList');if(!box)return;const rows=getSnapshots();box.innerHTML=rows.map((r,i)=>`<button data-v6-restore="${i}"><strong>${new Date(r.at).toLocaleString()}</strong><small>Restore this snapshot</small></button>`).join('')||'<p>No snapshots yet.</p>';box.querySelectorAll('[data-v6-restore]').forEach(b=>b.onclick=()=>{const r=rows[Number(b.dataset.v6Restore)];if(r&&confirm('Restore this safety snapshot? Your current state will be replaced.')){state=normalizeState(r.state);repairTutorAccessState();ensureV6();save();render();closeOverlay('settings');setMessage('Safety snapshot restored.','correct');}});}
function readAdminFeedbackInbox(){
 try{const rows=JSON.parse(localStorage.getItem(FEEDBACK_INBOX_KEY)||'[]');return Array.isArray(rows)?rows.filter(row=>row&&typeof row==='object').slice(0,FEEDBACK_INBOX_LIMIT):[];}catch{return[];}
}
function writeAdminFeedbackInbox(rows){
 try{localStorage.setItem(FEEDBACK_INBOX_KEY,JSON.stringify(rows.slice(0,FEEDBACK_INBOX_LIMIT)));}catch{}
}
function activeFeedbackPlayerName(){return document.getElementById('activePlayerName')?.textContent?.trim()||'Player';}
function submitPlayerFeedback(category,text){
 const at=Date.now(),record={id:`${at}-${Math.random().toString(36).slice(2,10)}`,at,profileId:activeProfileId||'',playerName:activeFeedbackPlayerName(),category:String(category),text:String(text),read:false};
 state.v6.feedback.push({at,category:record.category,text:record.text,sentToAdmin:!isDeveloperSession});
 if(!isDeveloperSession){const inbox=readAdminFeedbackInbox();inbox.unshift(record);writeAdminFeedbackInbox(inbox);}
 save();
 return record;
}
function unreadAdminFeedbackCount(){return isDeveloperSession?readAdminFeedbackInbox().filter(row=>!row.read).length:0;}
function updateAdminFeedbackNotification(){
 const button=document.querySelector('[data-v6-menu="feedback"]');
 if(!button)return;
 button.querySelector('.v6-menu-notification')?.remove();
 const unread=unreadAdminFeedbackCount();
 button.classList.toggle('has-notification',unread>0);
 if(unread){const badge=document.createElement('b');badge.className='v6-menu-notification';badge.textContent=unread>99?'99+':String(unread);badge.setAttribute('aria-label',`${unread} unread player feedback notification${unread===1?'':'s'}`);button.appendChild(badge);}
}
function renderAdminFeedbackInbox(box){
 const inbox=readAdminFeedbackInbox(),unread=inbox.filter(row=>!row.read).length;
 box.innerHTML=`<section class="v6-admin-feedback-summary"><div><span>ADMIN INBOX · THIS DEVICE</span><h3>Player feedback</h3><p>Submissions from player profiles using this browser appear here. Feedback from another phone needs a shared online inbox, which is not connected in this GitHub-only build.</p></div><strong>${unread} unread</strong></section><div class="v6-feedback-actions"><button id="v6MarkAllFeedbackRead" type="button" ${unread?'':'disabled'}>Mark all read</button><button id="v6ClearAdminFeedback" class="danger" type="button" ${inbox.length?'':'disabled'}>Clear inbox</button></div><div class="v6-admin-feedback-inbox">${inbox.map(row=>`<article class="${row.read?'read':'unread'}"><header><span><strong>${esc6(row.playerName||'Player')}</strong><small>${esc6(row.category||'Feedback')}</small></span><time>${new Date(row.at).toLocaleString()}</time></header><p>${esc6(row.text||'')}</p>${row.read?'<span class="v6-feedback-read-state">✓ Read</span>':`<button data-v6-feedback-read="${esc6(row.id)}" type="button">Mark read</button>`}</article>`).join('')||'<div class="v6-feedback-empty"><strong>No feedback on this device yet</strong><p>Player profiles in this browser create unread notifications here.</p></div>'}</div>`;
 box.querySelectorAll('[data-v6-feedback-read]').forEach(button=>button.onclick=()=>{const rows=readAdminFeedbackInbox(),item=rows.find(row=>String(row.id)===button.dataset.v6FeedbackRead);if(item)item.read=true;writeAdminFeedbackInbox(rows);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);});
 document.getElementById('v6MarkAllFeedbackRead').onclick=()=>{const rows=readAdminFeedbackInbox();rows.forEach(row=>row.read=true);writeAdminFeedbackInbox(rows);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);};
 document.getElementById('v6ClearAdminFeedback').onclick=()=>{if(confirm('Clear every message from the administrator feedback inbox?')){writeAdminFeedbackInbox([]);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);}};
 updateAdminFeedbackNotification();
}
function renderPlayerFeedback(box,notice=''){
 box.innerHTML=`${notice?`<div class="v6-feedback-sent" role="status">✓ ${esc6(notice)}</div>`:''}<p>Save feedback for the administrator profile on this device. A copy stays in this player profile and is included in account backups.</p><div class="v6-feedback-device-warning"><strong>Different phone?</strong> This GitHub-only version cannot transfer feedback between devices until a shared online inbox is connected.</div><label>Category<select id="v6FeedbackCategory"><option>Something is confusing</option><option>Learning content</option><option>Balance or rewards</option><option>Visual or mobile issue</option><option>Feature idea</option></select></label><label>Message<textarea id="v6FeedbackText" rows="5" maxlength="800" placeholder="Tell the administrator what happened or what would improve the game..."></textarea></label><div class="v6-feedback-actions"><button id="v6SendFeedback" class="primary" type="button">Save Feedback</button><button id="v6ClearFeedback" type="button">Clear my history</button></div><h3>Your saved feedback (${state.v6.feedback.length})</h3><div class="v6-feedback-history">${state.v6.feedback.slice().reverse().map(x=>`<article><strong>${esc6(x.category)}</strong><p>${esc6(x.text)}</p><small>${new Date(x.at).toLocaleString()} · ${x.sentToAdmin===true?'Saved in this device’s admin inbox':x.sentToAdmin===false?'Saved note':'Saved before admin inbox'}</small></article>`).join('')||'<p>No feedback saved yet.</p>'}</div>`;
 document.getElementById('v6SendFeedback').onclick=()=>{const text=document.getElementById('v6FeedbackText').value.trim();if(!text)return;submitPlayerFeedback(document.getElementById('v6FeedbackCategory').value,text);renderPlayerFeedback(box,'Feedback saved to the administrator inbox on this device.');};
 document.getElementById('v6ClearFeedback').onclick=()=>{if(confirm('Clear this profile’s feedback history? Messages already sent to the administrator will remain in the admin inbox.')){state.v6.feedback=[];save();renderPlayerFeedback(box);}};
}
function openFeedback(){ensureV6();openOverlay('feedback');const box=document.getElementById('v6FeedbackContent');if(isDeveloperSession)renderAdminFeedbackInbox(box);else renderPlayerFeedback(box);}
function openPatreon(){ensureV6();openOverlay('feedback');const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent');dialog?.querySelector('.menu-header-copy span')&&(dialog.querySelector('.menu-header-copy span').textContent='Japanese Miner Support');dialog?.querySelector('.menu-header-copy h2')&&(dialog.querySelector('.menu-header-copy h2').textContent='⭐ Patreon Tiers');if(box)box.innerHTML=`<section class="supporter-tier-list"><article class="supporter-tier tier-one"><span>🟩 TIER 1 · SUPPORTER</span><h3>Cosmetics and community</h3><p>Clothing, hats, accessories, pickaxe skins, character titles, wallpapers, Discord role, behind-the-scenes posts, development updates, poll voting, and optional Supporter credits.</p></article><article class="supporter-tier tier-two"><span>🟦 TIER 2 · COMPANION KEEPER</span><h3>Everything in Tier 1, plus companions</h3><p>Companion system, companion cosmetics, companion names, companion idle animations, and the exclusive companion collection.</p></article><article class="supporter-tier tier-three"><span>🟨 TIER 3 · SETTLEMENT FOUNDER</span><h3>Everything above, plus settlements</h3><p>Settlement system, decorations, exclusive buildings, seasonal decorations, and settlement customization.</p></article><p class="supporter-link-note">Membership linking is coming later. Until then, locked sections show the required tier.</p></section>`;}
function addMenuItems(){const grid=document.querySelector('.menu-wheel');if(!grid||grid.querySelector('[data-v6-menu]'))return;[['guide','❔','Game Guide','Complete how-to for courses, bosses, goals, economy, and study tools','player'],['settings','⚙️','Accessibility','Text, motion, audio, recovery, and save management','player'],['patreon','⭐','Patreon','View supporter tiers and their unlocks','player']].forEach(([id,icon,name,desc,cat])=>{const b=document.createElement('button');b.type='button';b.dataset.v6Menu=id;b.dataset.menuCategoryName=cat;b.innerHTML=`<span>${icon}</span><strong>${name}</strong><small>${desc}</small>`;b.onclick=()=>{closeGameMenu();id==='guide'?openTour():id==='settings'?openSettings():openPatreon();};grid.appendChild(b);});}
function storyCheck(){ensureV6();const stage=selectedStageIndex(),id='stage-'+stage;if(state.v6.storySeen.includes(id)||!activeProfileId)return;state.v6.storySeen.push(id);save();const toast=document.getElementById('v6StoryToast');if(!toast)return;const lines=['Your first lantern is lit. The Hiragana tunnels await.','Katakana markings glow on the cavern wall.','The N5 quarry opens into the wider world of Japanese.','Your journey reaches the N4 tunnel. Sentences grow richer here.','The N3 depths demand sharper reading and listening.','N2 crystals respond only to disciplined learners.','The N1 master mine stands before you.'][stage];toast.innerHTML=`<span>📖 JOURNEY UPDATE</span><strong>${stages[stage]?.name||'New mine'}</strong><p>${lines}</p>`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),5000);}
function advertiseGuideAfterOnboarding(){
 ensureV6();
 if(state.v6.onboardingGuideOffered||state.v6.tourComplete)return;
 state.v6.onboardingGuideOffered=true;
 save();
 setTimeout(()=>openTour(0),300);
}
function isStandaloneApp(){return window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;}
function isAppleMobileDevice(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;}
function syncInstallAppControl(){
 const button=document.getElementById('installAppBtn'),status=document.getElementById('v6InstallStatus');
 if(!button)return;
 const installed=isStandaloneApp(),appleMobile=isAppleMobileDevice(),ready=!!deferredInstallPrompt;
 button.hidden=installed;
 button.disabled=!installed&&!appleMobile&&!ready;
 button.title=installed?'Japanese Miner is already installed':appleMobile?'Add Japanese Miner to the iPhone or iPad Home Screen':ready?'Install Japanese Miner on this device':'Installation is not currently available in this browser';
 if(status)status.textContent=installed?'Japanese Miner is installed. Remove the old J-Miner home-screen app once and reinstall it to refresh its launcher icon.':appleMobile?'Tap Install App for iPhone or iPad Add to Home Screen instructions.':ready?'Japanese Miner is ready to install with the advanced pickaxe icon.':'Your browser will enable this button when Japanese Miner is ready to install.';
}
async function requestInstallApp(){
 if(deferredInstallPrompt){const prompt=deferredInstallPrompt;deferredInstallPrompt=null;await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==='accepted')setMessage('Japanese Miner is installed and ready to play.','correct');syncInstallAppControl();return;}
 if(isAppleMobileDevice())alert('To install Japanese Miner: tap the Share button in Safari, then choose Add to Home Screen.');
}
function initInstallApp(){
 if(!installEventsBound){
  installEventsBound=true;
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;syncInstallAppControl();});
  window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;syncInstallAppControl();setMessage('Japanese Miner is installed and ready to play.','correct');});
 }
 const button=document.getElementById('installAppBtn');
 if(button&&!button.dataset.installBound){button.dataset.installBound='1';button.addEventListener('click',requestInstallApp);}
 syncInstallAppControl();
}
function init(){ensureV6();shell();applySettings();renderCoach('refresh');addMenuItems();storyCheck();createSnapshot();initInstallApp();}
function openPatreon(){ensureV6();openOverlay('feedback');const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent');if(dialog){const kicker=dialog.querySelector('.menu-header-copy span'),title=dialog.querySelector('.menu-header-copy h2');if(kicker)kicker.textContent='Japanese Miner Support';if(title)title.textContent='⭐ Patreon Tiers';}if(box)box.innerHTML=`<section class="supporter-tier-list"><article class="supporter-tier tier-one"><img src="patreon-tier-1-supporter.png" alt="Supporter tier cover: $1 per month"><span>🟩 TIER 1 · SUPPORTER · $1 / MONTH</span><h3>Cosmetics and community</h3><p>Clothing, hats, accessories, pickaxe skins, character titles, wallpapers, Discord role, behind-the-scenes posts, development updates, poll voting, and optional Supporter credits.</p></article><article class="supporter-tier tier-two"><img src="patreon-tier-2-companion-keeper.png" alt="Companion Keeper tier cover: $3 per month"><span>🟦 TIER 2 · COMPANION KEEPER · $3 / MONTH</span><h3>Everything in Tier 1, plus companions</h3><p>Companion system, companion cosmetics, companion names, companion idle animations, and the exclusive companion collection.</p></article><article class="supporter-tier tier-three"><img src="patreon-tier-3-settlement-founder.png" alt="Settlement Founder tier cover: $5 per month"><span>🟨 TIER 3 · SETTLEMENT FOUNDER · $5 / MONTH</span><h3>Everything above, plus settlements</h3><p>Settlement system, decorations, exclusive buildings, seasonal decorations, and settlement customization.</p></article><p class="supporter-link-note">Membership linking is coming later. Until then, locked sections show the required tier.</p></section>`;}
const oldShowQuestion=showQuestion;showQuestion=function(q){oldShowQuestion(q);renderCoach('question');};
const oldAnswer=answer;answer=function(opt,button){const q=state.active,was=state.answered,correct=!!q&&opt===q.a;if(q&&!was&&/[\u3040-\u30ff\u3400-\u9fff]/.test(stripMarkup(opt)))speakJapanese(opt);oldAnswer(opt,button);if(q&&!was){explanation(q,opt,correct);renderCoach(correct?'correct':'wrong');}createSnapshot();};
const oldRender=render;render=function(){ensureV6();oldRender();applySettings();renderCoach('refresh');addMenuItems();storyCheck();};
const oldSave=save;save=function(){oldSave();if(state?.v6)createSnapshot();};
const oldLoad=loadProfile;loadProfile=function(profile){oldLoad(profile);ensureV6();applySettings();setTimeout(init,0);};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCoach();document.querySelectorAll('.v6-overlay.open').forEach(o=>closeOverlay(o.id.includes('Tour')?'tour':o.id.includes('Settings')?'settings':'feedback'));}});
document.addEventListener('click',e=>{if(e.target.closest?.('#beginJourneyBtn,#acceptPlacementBtn'))advertiseGuideAfterOnboarding();});
document.addEventListener('click',e=>{const toggle=e.target.closest?.('.character-option-toggle');if(!toggle)return;const section=toggle.closest('.character-option'),collapsed=section.classList.toggle('collapsed');toggle.setAttribute('aria-expanded',String(!collapsed));const key=section.dataset.characterSection;if(key)try{localStorage.setItem('jmCharacterSection:'+key,collapsed?'collapsed':'open');}catch{}});
document.addEventListener('jm-character-sections-ready',()=>document.querySelectorAll('.character-option[data-character-section]').forEach(section=>{try{if(localStorage.getItem('jmCharacterSection:'+section.dataset.characterSection)==='collapsed'){section.classList.add('collapsed');section.querySelector('.character-option-toggle')?.setAttribute('aria-expanded','false');}}catch{}}));
const characterSectionObserver=new MutationObserver(rows=>{if(rows.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.character-option')||n.querySelector?.('.character-option')))))document.dispatchEvent(new Event('jm-character-sections-ready'));});characterSectionObserver.observe(document.body,{childList:true,subtree:true});
window.openJapaneseMinerGuide=openTour;window.openJapaneseMinerSettings=openSettings;window.openJapaneseMinerFeedback=openFeedback;
init();
})();

