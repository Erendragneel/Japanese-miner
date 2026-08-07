// Functional multilingual entry-flow preview layered onto the real Language Miner v6.4.91 game.
(()=>{
  'use strict';
  const LANGUAGES={
    en:{name:'English',native:'English',flag:'🇺🇸',path:'Foundations to CEFR C2',mine:'English Foundations Mine',voice:'en-US'},
    es:{name:'Spanish',native:'Español',flag:'🇪🇸',path:'Sound Foundations to CEFR C2',mine:'Spanish Foundations Mine',voice:'es-ES'},
    ru:{name:'Russian',native:'Русский',flag:'🇷🇺',path:'Cyrillic Foundations to CEFR C2',mine:'Cyrillic Foundations Mine',voice:'ru-RU'},
    ja:{name:'Japanese',native:'日本語',flag:'🇯🇵',path:'Hiragana to JLPT N1',mine:'Hiragana Mine',voice:'ja-JP'},
    ko:{name:'Korean',native:'한국어',flag:'🇰🇷',path:'Hangul Foundations to TOPIK 6',mine:'Hangul Foundations Mine',voice:'ko-KR'},
    zh:{name:'Chinese (Mandarin)',native:'中文（普通话）',flag:'🇨🇳',path:'Pinyin Foundations to HSK 9',mine:'Pinyin & Tone Foundations Mine',voice:'zh-CN'},
    it:{name:'Italian',native:'Italiano',flag:'🇮🇹',path:'Sound Foundations to CEFR C2',mine:'Italian Foundations Mine',voice:'it-IT'},
    fr:{name:'French',native:'Français',flag:'🇫🇷',path:'Sound Foundations to DALF C2',mine:'French Foundations Mine',voice:'fr-FR'},
    de:{name:'German',native:'Deutsch',flag:'🇩🇪',path:'Sound Foundations to CEFR C2',mine:'German Foundations Mine',voice:'de-DE'}
  };
  const EXPEDITION_COURSES={
    en:[
      ['English Foundations Mine','Sounds and essential phrases','🔤'],
      ['Everyday English Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['English Grammar Quarry','Sentence patterns and core grammar','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate English Range','Independent reading and expression','⛰️'],
      ['Advanced English Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete English mastery','🏆']
    ],
    es:[
      ['Spanish Sound Foundations Mine','Pronunciation and essential phrases','🎵'],
      ['Everyday Spanish Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Spanish Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Spanish Range','Independent reading and expression','⛰️'],
      ['Advanced Spanish Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete Spanish mastery','🏆']
    ],
    ru:[
      ['Cyrillic Foundations Mine','Letters, sounds, and essential phrases','🔤'],
      ['Everyday Russian Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Russian Cases Quarry','Cases, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Russian Range','Independent reading and expression','⛰️'],
      ['Advanced Russian Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete Russian mastery','🏆']
    ],
    ja:[
      ['Hiragana Mine','Hiragana character families','あ'],
      ['Katakana Cavern','Katakana character families','カ'],
      ['JLPT N5 Quarry','Beginning Japanese','語'],
      ['JLPT N4 Tunnel','Elementary Japanese','文'],
      ['JLPT N3 Ridge','Intermediate Japanese','読'],
      ['JLPT N2 Depths','Advanced Japanese','聴'],
      ['JLPT N1 Summit','Japanese mastery','🏆']
    ],
    ko:[
      ['Hangul Foundations Mine','Letters, sounds, and essential phrases','한'],
      ['Everyday Korean Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Korean Grammar Quarry','Particles, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['TOPIK I Range','Beginning Korean proficiency','⛰️'],
      ['TOPIK II Depths','Intermediate and advanced Korean','📚'],
      ['TOPIK 6 Summit','Complete Korean mastery','🏆']
    ],
    zh:[
      ['Pinyin & Tone Foundations Mine','Pinyin, tones, and essential phrases','声'],
      ['Character & Word Cavern','Core characters and daily vocabulary','字'],
      ['Mandarin Grammar Quarry','Word order and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['HSK 1–3 Range','Beginning Mandarin proficiency','⛰️'],
      ['HSK 4–6 Depths','Intermediate Mandarin proficiency','📚'],
      ['HSK 7–9 Summit','Advanced Mandarin mastery','🏆']
    ],
    it:[
      ['Italian Sound Foundations Mine','Pronunciation and essential phrases','🎵'],
      ['Everyday Italian Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Italian Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Italian Range','Independent reading and expression','⛰️'],
      ['Advanced Italian Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete Italian mastery','🏆']
    ],
    fr:[
      ['French Sound Foundations Mine','Pronunciation and essential phrases','🎵'],
      ['Everyday French Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['French Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate French Range','Independent reading and expression','⛰️'],
      ['Advanced French Depths','Nuance, fluency, and advanced texts','📚'],
      ['DALF C2 Summit','Complete French mastery','🏆']
    ],
    de:[
      ['German Sound Foundations Mine','Pronunciation and essential phrases','🎵'],
      ['Everyday German Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['German Grammar Quarry','Cases, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate German Range','Independent reading and expression','⛰️'],
      ['Advanced German Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete German mastery','🏆']
    ]
  };
  const FOUNDATION_CONCEPTS=[
    {id:'hello',forms:{en:'Hello',es:'Hola',ru:'Привет',ja:'こんにちは',ko:'안녕하세요',zh:'你好',it:'Ciao',fr:'Bonjour',de:'Hallo'}},
    {id:'thank-you',forms:{en:'Thank you',es:'Gracias',ru:'Спасибо',ja:'ありがとう',ko:'감사합니다',zh:'谢谢',it:'Grazie',fr:'Merci',de:'Danke'}},
    {id:'water',forms:{en:'Water',es:'Agua',ru:'Вода',ja:'水',ko:'물',zh:'水',it:'Acqua',fr:'Eau',de:'Wasser'}},
    {id:'food',forms:{en:'Food',es:'Comida',ru:'Еда',ja:'食べ物',ko:'음식',zh:'食物',it:'Cibo',fr:'Nourriture',de:'Essen'}},
    {id:'cat',forms:{en:'Cat',es:'Gato',ru:'Кошка',ja:'猫',ko:'고양이',zh:'猫',it:'Gatto',fr:'Chat',de:'Katze'}},
    {id:'dog',forms:{en:'Dog',es:'Perro',ru:'Собака',ja:'犬',ko:'개',zh:'狗',it:'Cane',fr:'Chien',de:'Hund'}},
    {id:'one',forms:{en:'One',es:'Uno',ru:'Один',ja:'一',ko:'하나',zh:'一',it:'Uno',fr:'Un',de:'Eins'}},
    {id:'two',forms:{en:'Two',es:'Dos',ru:'Два',ja:'二',ko:'둘',zh:'二',it:'Due',fr:'Deux',de:'Zwei'}},
    {id:'good-morning',forms:{en:'Good morning',es:'Buenos días',ru:'Доброе утро',ja:'おはようございます',ko:'좋은 아침이에요',zh:'早上好',it:'Buongiorno',fr:'Bonjour',de:'Guten Morgen'}},
    {id:'goodbye',forms:{en:'Goodbye',es:'Adiós',ru:'До свидания',ja:'さようなら',ko:'안녕히 가세요',zh:'再见',it:'Arrivederci',fr:'Au revoir',de:'Auf Wiedersehen'}}
  ];
  const QUESTION_PROMPTS={
    en:(meaning,target)=>`Which ${target} expression means “${meaning}”?`,
    es:(meaning,target)=>`¿Qué expresión en ${target} significa “${meaning}”?`,
    ru:(meaning,target)=>`Какое выражение на языке ${target} означает «${meaning}»?`,
    ja:(meaning,target)=>`「${meaning}」と同じ意味の${target}はどれ？`,
    ko:(meaning,target)=>`${target}에서 “${meaning}”와 같은 뜻은 어느 것입니까?`,
    zh:(meaning,target)=>`哪个${target}表达的意思是“${meaning}”？`,
    it:(meaning,target)=>`Quale espressione in ${target} significa “${meaning}”?`,
    fr:(meaning,target)=>`Quelle expression en ${target} signifie « ${meaning} » ?`,
    de:(meaning,target)=>`Welcher Ausdruck auf ${target} bedeutet „${meaning}“?`
  };
  const STORAGE_PREFIX='lm_multilingual_functional_preview_v1:';
  let known='en',learning='ja',step='languages',openedAutomatically=false,activePreviewQuestion=null;
  let overlay,content,title,copy,icon,indicator,changeButton,toast;

  function accountKey(){
    const cloudId=window.languageMinerCloudAuth?.getSession?.()?.user?.id;
    if(cloudId)return `cloud:${cloudId}`;
    const player=document.getElementById('activePlayerName')?.textContent?.trim();
    return `local:${player&&player!=='Not signed in'?player:'preview-player'}`;
  }
  function readSettings(){
    try{return JSON.parse(localStorage.getItem(STORAGE_PREFIX+accountKey())||'null')||{known:'en',learning:'ja',placements:{}};}catch{return {known:'en',learning:'ja',placements:{}};}
  }
  function saveSettings(next){try{localStorage.setItem(STORAGE_PREFIX+accountKey(),JSON.stringify(next));}catch{}}
  function currentSettings(){const saved=readSettings();saved.placements=saved.placements&&typeof saved.placements==='object'?saved.placements:{};saved.progress=saved.progress&&typeof saved.progress==='object'?saved.progress:{};return saved;}
  function signedIn(){
    const auth=document.getElementById('authOverlay'),player=document.getElementById('activePlayerName')?.textContent?.trim();
    const authHidden=!auth||auth.hidden||auth.classList.contains('hidden')||auth.classList.contains('auth-dismissed')||getComputedStyle(auth).display==='none';
    return authHidden&&player&&player!=='Not signed in';
  }
  function languageOption(group,id,selected,disabledId=''){
    const language=LANGUAGES[id],disabled=id===disabledId;
    return `<label class="lm-language-option"><input type="radio" name="lm-${group}" value="${id}" ${selected===id?'checked':''} ${disabled?'disabled':''}><span><em>${language.flag}</em><span><b>${language.native}</b><small>${language.name}${disabled?' · already known':''}</small></span></span></label>`;
  }
  function progress(index){document.querySelectorAll('.lm-flow-progress i').forEach((bar,i)=>bar.classList.toggle('active',i<=index));}
  function setHead(nextIcon,nextTitle,nextCopy){icon.textContent=nextIcon;title.textContent=nextTitle;copy.textContent=nextCopy;}
  function renderLanguages(){
    step='languages';progress(0);setHead('🌐','Choose your Language Miner course','Select one language you know and one language you want to learn.');
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-choice-block"><h3>1. Which language do you already know?</h3><p>Game Guide instructions and answer meanings use this language.</p><div id="lmKnownChoices" class="lm-language-grid" role="radiogroup" aria-label="Known language — choose one">${Object.keys(LANGUAGES).map(id=>languageOption('known',id,known)).join('')}</div></div><div class="lm-choice-block"><h3>2. Which language do you want to learn?</h3><p>This chooses the course, pronunciation voice, Notebook, quizzes, and placement record.</p><div id="lmLearningChoices" class="lm-language-grid" role="radiogroup" aria-label="Learning language — choose one">${Object.keys(LANGUAGES).map(id=>languageOption('learning',id,learning,known)).join('')}</div></div><div class="lm-flow-note">Exactly one known language and one learning language can be selected.</div><div class="lm-flow-actions"><button id="lmContinueGuide" class="lm-flow-primary" type="button" ${known&&learning&&known!==learning?'':'disabled'}>Continue to Game Guide</button></div></section>`;
    content.querySelectorAll('input[name="lm-known"]').forEach(input=>input.addEventListener('change',()=>{known=input.value;if(learning===known)learning='';renderLanguages();}));
    content.querySelectorAll('input[name="lm-learning"]').forEach(input=>input.addEventListener('change',()=>{learning=input.value;renderLanguages();}));
    document.getElementById('lmContinueGuide')?.addEventListener('click',renderGuide);
  }
  function renderGuide(){
    step='guide';progress(1);const source=LANGUAGES[known],target=LANGUAGES[learning];setHead('📘','Game Guide',`The ${target.name} course uses the Language Miner game you already know.`);
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-guide-pair">Known language: <strong>${source.flag} ${source.name}</strong><br>Learning language: <strong>${target.flag} ${target.name}</strong><br>Course path: <strong>${target.path}</strong></div><div class="lm-guide-grid"><div class="lm-guide-item"><span>⛏️</span><div><strong>The original mine stays</strong><small>The cavern, questions, gems, rewards, and progress screens remain in their current layout.</small></div></div><div class="lm-guide-item"><span>🧍</span><div><strong>Your customized miner stays</strong><small>The clickable character, clothing, cosmetics, and saved profile are preserved.</small></div></div><div class="lm-guide-item"><span>📊</span><div><strong>Player tools stay clickable</strong><small>Stats, Calendar, the full game menu, Notebook, quests, shops, and courses keep their behavior.</small></div></div><div class="lm-guide-item"><span>🧙</span><div><strong>Kōji the Mine Gnome stays</strong><small>The gnome, pet settings, reminders, treasure timing, and existing game systems remain.</small></div></div></div><div class="lm-flow-actions"><button id="lmGuideBack" class="lm-flow-secondary" type="button">Back</button><button id="lmContinuePlacement" class="lm-flow-primary" type="button">Continue to Proficiency Choice</button></div></section>`;
    document.getElementById('lmGuideBack').addEventListener('click',renderLanguages);document.getElementById('lmContinuePlacement').addEventListener('click',renderPlacement);
  }
  function originalJapanesePlacementComplete(){return learning==='ja'&&window.placementTestAlreadyCompleted?.()===true;}
  function renderPlacement(){
    step='placement';progress(2);const target=LANGUAGES[learning],settings=currentSettings(),placement=settings.placements[learning],tested=placement==='tested'||originalJapanesePlacementComplete();setHead('📝','Choose your starting point',`This decision is stored separately for ${target.name} on this Language Miner account.`);
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-placement-status">${tested?'PLACEMENT ALREADY COMPLETED':placement==='beginner'?'BEGINNER START SAVED':'ONE TEST AVAILABLE FOR THIS LANGUAGE'}</div><div class="lm-placement-options"><article class="lm-placement-option"><span class="lm-big-icon">🌱</span><h3>I’m new to ${target.name}</h3><p>Skip placement for now and begin with the very first beginner lesson. The one-time test can still be opened later if it has not been completed.</p><button id="lmSkipPlacement" class="lm-flow-secondary lm-flow-skip" type="button" ${tested?'disabled':''}>I’m New — Skip Test</button></article><article class="lm-placement-option"><span class="lm-big-icon">🧭</span><h3>I already know some ${target.name}</h3><p>Take the account’s one-time placement test for this learning language and start at the recommended level.</p><button id="lmStartPlacement" class="lm-flow-primary" type="button" ${tested?'disabled':''}>${tested?'Placement Complete':'Start One-Time Test'}</button></article></div>${learning==='ja'?'':'<div class="lm-preview-warning"><strong>Multilingual interface preview:</strong> the full non-Japanese question banks and proficiency exams will be added during the implementation stage. The original Japanese game remains fully functional in this preview.</div>'}<div class="lm-flow-actions"><button id="lmPlacementBack" class="lm-flow-secondary" type="button">Back to Guide</button>${tested?'<button id="lmEnterCurrentCourse" class="lm-flow-primary" type="button">Enter Mine</button>':''}</div></section>`;
    document.getElementById('lmPlacementBack').addEventListener('click',renderGuide);document.getElementById('lmSkipPlacement')?.addEventListener('click',skipPlacement);document.getElementById('lmStartPlacement')?.addEventListener('click',startPlacement);document.getElementById('lmEnterCurrentCourse')?.addEventListener('click',()=>finishFlow('Course ready.'));
  }
  function persistPair(placementValue){const settings=currentSettings();settings.known=known;settings.learning=learning;if(placementValue)settings.placements[learning]=placementValue;saveSettings(settings);applyCourse(settings);}
  function skipPlacement(){persistPair('beginner');closeFlow();if(learning==='ja'&&window.openPlacementOnboarding?.(true)){window.chooseBrandNew?.();}else showToast(`${LANGUAGES[learning].name} selected · beginning at the first lesson`);}
  function startPlacement(){
    persistPair();closeFlow();
    if(learning==='ja'&&window.openPlacementOnboarding?.(true)){window.startPlacementTest?.();return;}
    const settings=currentSettings();settings.placements[learning]='tested';saveSettings(settings);showToast(`${LANGUAGES[learning].name} placement flow preview complete · the full exam comes with course implementation`);
  }
  function finishFlow(message){persistPair();closeFlow();showToast(message);}
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
  function shuffled(values){const copy=[...values];for(let index=copy.length-1;index>0;index--){const swap=Math.floor(Math.random()*(index+1));[copy[index],copy[swap]]=[copy[swap],copy[index]];}return copy;}
  function languageProgress(){const settings=currentSettings();return settings.progress[learning]||{answered:0,correct:0,xp:0};}
  function saveLanguageProgress(progress){const settings=currentSettings();settings.progress[learning]=progress;saveSettings(settings);}
  function updateFoundationProgress(){
    if(learning==='ja')return;
    const progress=languageProgress(),xpNeed=100,xp=Math.min(xpNeed,Number(progress.xp)||0);
    const xpText=document.getElementById('xp'),needText=document.getElementById('xpNeed'),bar=document.getElementById('xpBar');
    if(xpText)xpText.textContent=String(xp);if(needText)needText.textContent=String(xpNeed);if(bar)bar.style.width=`${xp}%`;
    const stage=document.getElementById('stageName'),quickStage=document.getElementById('quickStage');if(stage)stage.textContent=LANGUAGES[learning].mine;if(quickStage)quickStage.textContent=LANGUAGES[learning].mine.replace(' Mine','');
  }
  function speakTarget(text){
    if(!('speechSynthesis'in window)||!text)return;
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=LANGUAGES[learning].voice;utterance.rate=.82;speechSynthesis.speak(utterance);
  }
  function makeFoundationQuestion(){
    const concept=shuffled(FOUNDATION_CONCEPTS.filter(item=>item.id!==activePreviewQuestion?.concept?.id))[0]||FOUNDATION_CONCEPTS[0];
    const answer=concept.forms[learning],meaning=concept.forms[known],options=[answer];
    for(const item of shuffled(FOUNDATION_CONCEPTS)){const value=item.forms[learning];if(!options.includes(value))options.push(value);if(options.length===4)break;}
    return {concept,answer,meaning,options:shuffled(options)};
  }
  function renderFoundationQuestion(){
    if(learning==='ja')return;
    activePreviewQuestion=makeFoundationQuestion();const target=LANGUAGES[learning],prompt=(QUESTION_PROMPTS[known]||QUESTION_PROMPTS.en)(activePreviewQuestion.meaning,target.name),area=document.getElementById('challengeArea'),message=document.getElementById('message');
    if(!area)return;
    area.innerHTML=`<section class="lm-course-question" aria-label="${escapeHtml(target.name)} foundation question"><div class="lm-question-kicker">${target.flag} ${escapeHtml(target.name)} · Foundation vocabulary</div><h3>${escapeHtml(prompt)}</h3><div class="lm-question-actions"><button id="lmSpeakQuestion" class="lm-speak-button" type="button">🔊 Hear ${escapeHtml(target.name)}</button></div><div class="lm-answer-grid">${activePreviewQuestion.options.map(option=>`<button type="button" data-lm-course-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmCourseFeedback" class="lm-course-feedback" aria-live="polite"></div><button id="lmNextCourseQuestion" class="lm-next-course-question" type="button" hidden>Next ${escapeHtml(target.name)} Question</button></section>`;
    if(message)message.textContent='';document.getElementById('lmSpeakQuestion')?.addEventListener('click',()=>speakTarget(activePreviewQuestion.answer));document.querySelectorAll('[data-lm-course-answer]').forEach(button=>button.addEventListener('click',()=>answerFoundationQuestion(button)));document.getElementById('lmNextCourseQuestion')?.addEventListener('click',renderFoundationQuestion);
    const quickLabel=document.getElementById('quickMineLabel');if(quickLabel)quickLabel.textContent='Return to Question';area.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>speakTarget(activePreviewQuestion.answer),180);
  }
  function answerFoundationQuestion(button){
    const selected=button.dataset.lmCourseAnswer,correct=selected===activePreviewQuestion.answer,buttons=[...document.querySelectorAll('[data-lm-course-answer]')];
    buttons.forEach(item=>{item.disabled=true;if(item.dataset.lmCourseAnswer===activePreviewQuestion.answer)item.classList.add('correct');else if(item===button)item.classList.add('wrong');});
    const progress=languageProgress();progress.answered=Number(progress.answered||0)+1;progress.correct=Number(progress.correct||0)+(correct?1:0);progress.xp=Math.min(100,Number(progress.xp||0)+(correct?10:3));saveLanguageProgress(progress);updateFoundationProgress();
    const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ Correct — <strong>${escapeHtml(activePreviewQuestion.answer)}</strong>`:`Not quite. The correct answer is <strong>${escapeHtml(activePreviewQuestion.answer)}</strong>.`;}
    document.getElementById('lmNextCourseQuestion').hidden=false;speakTarget(activePreviewQuestion.answer);
  }
  function updateCourseChrome(){
    const target=LANGUAGES[learning],subtitle=document.querySelector('.app>header .subtitle'),mineTitle=document.querySelector('.mine-title');
    if(subtitle)subtitle.textContent=`Learn ${target.name}. Mine gems. Rise from ${target.path}.`;if(mineTitle)mineTitle.textContent=`Tap the rock to reveal a ${target.name} challenge`;
    const voiceLabel=document.querySelector('label[for="voiceToggle"] .form-check-label'),voiceTest=document.getElementById('testVoiceBtn');if(voiceLabel)voiceLabel.textContent=`${target.name} voice`;if(voiceTest)voiceTest.textContent=`🔊 Test ${target.name} Voice`;
    if(learning!=='ja')updateFoundationProgress();
    syncExpeditionHub();
  }
  function expeditionLessonRoad(stageIndex,unlocked,progress){
    const thresholds=[0,25,50,75],current=Math.min(3,Math.floor(progress/25));
    return `<div class="world-road lm-expedition-road">${thresholds.map((threshold,index)=>{const open=unlocked&&progress>=threshold;return `${index?'<i class="road-piece"></i>':''}<button type="button" data-lm-expedition-lesson="${stageIndex}" class="world-node ${open?'open':'locked'} ${open&&index===current?'current':''}" ${open?'':'disabled'}><span>${open?index+1:'🔒'}</span><small>Lesson ${index+1}</small></button>`;}).join('')}<i class="road-piece"></i><button type="button" data-lm-expedition-lesson="${stageIndex}" class="world-node ${unlocked&&progress>=100?'open':'locked'}" ${unlocked&&progress>=100?'':'disabled'}><span>🏯</span><small>Foundation Check</small></button></div>`;
  }
  function multilingualExpeditionMap(){
    const target=LANGUAGES[learning],course=EXPEDITION_COURSES[learning]||EXPEDITION_COURSES.en,stored=languageProgress(),answered=Number(stored.answered||0),foundationProgress=Math.min(100,Number(stored.xp)||0);
    return `<div class="lm-course-world-map"><div class="v5-hero world-hero lm-expedition-hero"><div><span>${escapeHtml(target.name)} Language Miner Map</span><h3>${escapeHtml(target.mine)}</h3><p>The Expedition Hub now follows the selected ${escapeHtml(target.name)} course. Its mine names, lesson route, and saved foundation progress change with that language.</p></div><b>${target.flag}</b></div><div class="world-legend"><span>🟢 Available</span><span>⭐ Current</span><span>🔒 Locked</span><span>🏯 Guardian</span></div><div class="world-map-scroll"><div class="world-map-canvas"><div class="map-cloud c1">☁️</div><div class="map-cloud c2">☁️</div>${course.map((stage,index)=>{const unlocked=index===0,progress=unlocked?foundationProgress:0,progressLabel=unlocked?`${progress}% foundation mastery · ${answered} answered`:'Complete the previous course region';return `<section class="world-region region-${index} ${index===0?'current-region':''} ${unlocked?'':'locked-region'}"><div class="region-scenery">${stage[2]} <small>${escapeHtml(target.name)} Mine ${index+1}</small></div><div class="region-label"><strong>${escapeHtml(stage[0])}</strong><span>${escapeHtml(stage[1])} · ${progressLabel}</span></div>${expeditionLessonRoad(index,unlocked,progress)}</section>`;}).join('')}<div class="world-finish">🏆 ${escapeHtml(target.name)} Master</div></div></div></div>`;
  }
  function updateExpeditionHeader(hub){
    const target=LANGUAGES[learning],copyBlock=hub.querySelector('.menu-header-copy'),tab=hub.querySelector('[data-v5tab="map"]');
    if(copyBlock){const eyebrow=copyBlock.querySelector('span'),heading=copyBlock.querySelector('h2');if(eyebrow)eyebrow.textContent=learning==='ja'?'Language Miner v5.0':`${target.name} Language Miner Map`;if(heading)heading.textContent=learning==='ja'?'Expedition Hub':`${target.name} Expedition Hub`;}
    if(tab)tab.textContent=learning==='ja'?'🗺️ Expedition':`${target.flag} Expedition`;
  }
  function syncExpeditionHub(){
    const hub=document.getElementById('v5Overlay'),content=document.getElementById('v5Content'),mapTab=hub?.querySelector('[data-v5tab="map"]');
    if(!hub||!content||!mapTab)return;
    updateExpeditionHeader(hub);
    if(!mapTab.classList.contains('active'))return;
    if(learning==='ja'){
      if(content.dataset.lmExpeditionPreview==='true'){
        delete content.dataset.lmExpeditionPreview;delete content.dataset.lmLearning;
        mapTab.click();
      }
      return;
    }
    if(content.dataset.lmLearning===learning&&content.querySelector('.lm-course-world-map'))return;
    content.dataset.lmExpeditionPreview='true';content.dataset.lmLearning=learning;content.innerHTML=multilingualExpeditionMap();
  }
  let lastAppliedLearning='';
  function applyCourse(settings=currentSettings()){
    const previous=learning;known=settings.known&&LANGUAGES[settings.known]?settings.known:'en';learning=settings.learning&&LANGUAGES[settings.learning]?settings.learning:'ja';
    if(previous!==learning||lastAppliedLearning!==learning)activePreviewQuestion=null;
    if(indicator)indicator.innerHTML=`${LANGUAGES[known].flag} ${LANGUAGES[known].name} <b>→</b> ${LANGUAGES[learning].flag} ${LANGUAGES[learning].name}`;
    if(learning==='ja'&&lastAppliedLearning&&lastAppliedLearning!=='ja')window.render?.();
    updateCourseChrome();lastAppliedLearning=learning;
  }
  function handleCourseControls(event){
    if(learning==='ja'||overlay?.classList.contains('open'))return;
    const expeditionLesson=event.target.closest?.('[data-lm-expedition-lesson]'),rock=event.target.closest?.('#rock'),quick=event.target.closest?.('#quickMineBtn'),voiceTest=event.target.closest?.('#testVoiceBtn');
    if(expeditionLesson){event.preventDefault();event.stopImmediatePropagation();document.getElementById('v5Close')?.click();renderFoundationQuestion();showToast(`${LANGUAGES[learning].name} foundation lesson opened`);return;}
    if(rock){event.preventDefault();event.stopImmediatePropagation();renderFoundationQuestion();return;}
    if(quick){event.preventDefault();event.stopImmediatePropagation();if(activePreviewQuestion)document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth',block:'center'});else renderFoundationQuestion();return;}
    if(voiceTest){event.preventDefault();event.stopImmediatePropagation();speakTarget(FOUNDATION_CONCEPTS[0].forms[learning]);}
  }
  function openFlow(){
    const settings=currentSettings();known=settings.known||'en';learning=settings.learning||'ja';
    document.getElementById('placementOverlay')?.classList.remove('open');
    overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');renderLanguages();
  }
  function closeFlow(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
  function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500);}
  function build(){
    overlay=document.createElement('div');overlay.id='lmMultilingualOverlay';overlay.className='lm-multilingual-overlay';overlay.setAttribute('aria-hidden','true');overlay.innerHTML=`<section class="lm-multilingual-card" role="dialog" aria-modal="true" aria-labelledby="lmFlowTitle"><header class="lm-flow-head"><div id="lmFlowIcon" class="lm-flow-icon">🌐</div><div class="lm-flow-copy"><h2 id="lmFlowTitle">Choose your Language Miner course</h2><p id="lmFlowCopy"></p></div><button id="lmFlowClose" class="lm-flow-close" type="button" aria-label="Close language setup">×</button></header><div class="lm-flow-progress" aria-label="Language setup progress"><i class="active"></i><i></i><i></i></div><div id="lmFlowContent"></div></section>`;document.body.appendChild(overlay);
    toast=document.createElement('div');toast.className='lm-preview-toast';toast.setAttribute('role','status');document.body.appendChild(toast);
    content=document.getElementById('lmFlowContent');title=document.getElementById('lmFlowTitle');copy=document.getElementById('lmFlowCopy');icon=document.getElementById('lmFlowIcon');indicator=document.getElementById('lmCourseIndicator');changeButton=document.getElementById('lmChangeLanguageBtn');
    document.getElementById('lmFlowClose').addEventListener('click',closeFlow);changeButton?.addEventListener('click',openFlow);document.addEventListener('click',handleCourseControls,true);applyCourse();
    const timer=setInterval(()=>{if(!signedIn())return;applyCourse();if(!openedAutomatically&&!localStorage.getItem(STORAGE_PREFIX+accountKey())){openedAutomatically=true;openFlow();}else if(!openedAutomatically){openedAutomatically=true;}clearInterval(timer);},350);
    setInterval(()=>{if(signedIn()&&!overlay.classList.contains('open'))applyCourse();},800);
    window.addEventListener('lm-cloud-session-changed',()=>{openedAutomatically=false;});
  }
  window.addEventListener('DOMContentLoaded',build);
})();
