/* Japanese Miner v5.0 expansion — save-compatible systems layered over v4.x. */
(function(){
'use strict';
const DAY=86400000;
const COMPANIONS=[
 {id:'none',name:'No companion',icon:'—',cost:0,bonus:'No active bonus.'},
 {id:'kitsune',name:'Kiko the Kitsune',icon:'🦊',cost:85000,bonus:'10% chance to find bonus Nuggets.'},
 {id:'cat',name:'Mochi the Mine Cat',icon:'🐱',cost:50000,bonus:'Adds one extra review reward each day.'},
 {id:'tanuki',name:'Taro the Tanuki',icon:'🦝',cost:125000,bonus:'Shop supply purchases are 5% luckier.'},
 {id:'dragon',name:'Hoshi the Dragon',icon:'🐉',cost:750000,bonus:'Boss victories award 25% more Nuggets.'},
 {id:'crystal',name:'Piko the Crystal',icon:'💠',cost:300000,bonus:'Highlights due smart-review questions.'}
];
const BUILDINGS=[
 {id:'forge',name:'Gem Forge',icon:'🔥',base:40000,desc:'Raises treasure-chest Nugget rewards.'},
 {id:'library',name:'Japanese Library',icon:'📚',base:30000,desc:'Adds a smart-review XP bonus.'},
 {id:'garden',name:'Sakura Garden',icon:'🌸',base:25000,desc:'Improves daily mission rewards.'},
 {id:'museum',name:'Gem Museum',icon:'🏛️',base:60000,desc:'Displays collection milestones.'},
 {id:'home',name:'Miner Lodge',icon:'🏡',base:35000,desc:'Unlocks extra fashion storage.'}
];
const FASHION={
 jacket:[['none','No jacket',0],['haori','Festival Haori',18000],['academy','Academy Blazer',22000],['explorer','Cave Explorer',30000]],
 gloves:[['none','No gloves',0],['miner','Mining Gloves',9000],['crystal','Crystal Gloves',24000]],
 shoes:[['boots','Miner Boots',0],['sneakers','Bright Sneakers',12000],['geta','Festival Geta',16000]]
};
const BOSSES=['Kana Golem','Katakana Wisp','N5 Stone Oni','N4 Echo Serpent','N3 Crystal Shogun','N2 Flame Tengu','N1 Void Dragon'];
const V5_ACHIEVEMENTS=[
 ['boss1','First Guardian','Defeat one cave boss.',()=>state.v5.bossWins>=1,15000],
 ['boss7','Guardian Legend','Defeat seven cave bosses.',()=>state.v5.bossWins>=7,125000],
 ['words25','Word Collector','Collect 25 vocabulary cards.',()=>Object.keys(state.v5.wordBook).length>=25,20000],
 ['settlement5','Growing Town','Buy five settlement upgrades.',()=>Object.values(state.v5.buildings).reduce((a,b)=>a+b,0)>=5,50000],
 ['companion','New Friend','Equip a companion.',()=>state.v5.companion!=='none',10000],
 ['review20','Memory Miner','Complete 20 scheduled reviews.',()=>state.v5.reviewed>=20,30000]
];
const DIALOGUE_QUESTIONS=[
 {stage:2,id:'v5-dialogue-1',q:'店員：いらっしゃいませ。何をお探しですか。',prompt:'Choose the most natural reply.',a:'水を探しています。',opts:['水を探しています。','昨日は雨でした。','駅は青いです。','本を食べます。'],kind:'dialogue'},
 {stage:2,id:'v5-dialogue-2',q:'友達：週末、いっしょに映画を見ませんか。',prompt:'Choose the most natural reply.',a:'いいですね。行きましょう。',opts:['いいですね。行きましょう。','映画は三時ですか。','水をください。','駅で読みます。'],kind:'dialogue'},
 {stage:3,id:'v5-listen-1',q:'明日は九時に駅で会いましょう。',prompt:'Listen and choose the meaning.',a:'Let’s meet at the station at nine tomorrow.',opts:['Let’s meet at the station at nine tomorrow.','The train left at nine yesterday.','Let’s study at home tonight.','The station closes tomorrow.'],kind:'listening-only'},
 {stage:4,id:'v5-listen-2',q:'雨が降っても、試合は行われる予定です。',prompt:'Listen and choose the meaning.',a:'The match is scheduled even if it rains.',opts:['The match is scheduled even if it rains.','The match was canceled because of rain.','Rain is unlikely during the match.','The schedule has not been decided.'],kind:'listening-only'}
];

function today(){return new Date().toISOString().slice(0,10);}
function ensureV5(){
 state.v5=state.v5&&typeof state.v5==='object'?state.v5:{};
 const v=state.v5;
 v.version=5;v.srs=v.srs||{};v.wordBook=v.wordBook||{};v.checkpoints=v.checkpoints||{};
 v.bossWins=Number(v.bossWins||0);v.bossDefeated=Array.isArray(v.bossDefeated)?v.bossDefeated:[];v.boss=v.boss&&typeof v.boss==='object'?v.boss:null;
 v.ownedCompanions=Array.isArray(v.ownedCompanions)?v.ownedCompanions:['none'];if(!v.ownedCompanions.includes('none'))v.ownedCompanions.unshift('none');
 v.companion=COMPANIONS.some(c=>c.id===v.companion)&&v.ownedCompanions.includes(v.companion)?v.companion:'none';
 v.buildings=v.buildings||{};BUILDINGS.forEach(b=>v.buildings[b.id]=Math.max(0,Math.min(5,Number(v.buildings[b.id]||0))));
 v.fashion=Object.assign({jacket:'none',gloves:'none',shoes:'boots'},v.fashion||{});v.ownedFashion=Array.isArray(v.ownedFashion)?v.ownedFashion:['jacket:none','gloves:none','shoes:boots'];
 v.reviewed=Number(v.reviewed||0);v.totalCorrect=Number(v.totalCorrect||0);v.chests=Number(v.chests||0);v.lastChestAt=Number(v.lastChestAt||0);
 v.missions=v.missions||{day:'',answered:0,correct:0,reviews:0,claimed:{}};if(v.missions.day!==today())v.missions={day:today(),answered:0,correct:0,reviews:0,claimed:{}};
 v.achievements=v.achievements||{};v.seasonClaim=String(v.seasonClaim||'');
}
function addV5Content(){DIALOGUE_QUESTIONS.forEach(q=>{if(!questions.some(x=>x.id===q.id))questions.push(q);});}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function rewardNuggets(amount){addStoneChange(Math.max(1,Math.round(amount)),Math.min(gemTiers.length-1,selectedStageIndex()+5));}
function buildingLevel(id){return Number(state.v5.buildings[id]||0);}
function dueCount(){const now=Date.now();return Object.values(state.v5.srs).filter(x=>Number(x.dueAt||0)<=now).length;}
function checkpointCount(stage){const ratio=Math.min(1,Number(state.stageXp[stage]||0)/STAGE_XP_REQUIREMENTS[stage]);return Math.max(1,Math.min(5,Math.floor(ratio*5)+1));}
function bossUnlocked(stage){return checkpointCount(stage)>=5||Number(state.stageXp[stage]||0)>=Math.min(250,STAGE_XP_REQUIREMENTS[stage]);}
function season(){const m=new Date().getMonth()+1;if(m===12||m<=2)return{key:'winter',name:'Snow Lantern Festival',icon:'❄️',desc:'Complete five correct answers for a winter treasure.',color:'#8edcff'};if(m>=3&&m<=5)return{key:'sakura',name:'Sakura Festival',icon:'🌸',desc:'Practice beneath the blossoms for a seasonal treasure.',color:'#ff9fca'};if(m>=6&&m<=8)return{key:'matsuri',name:'Summer Matsuri',icon:'🎆',desc:'Celebrate summer study with festival rewards.',color:'#ffd166'};return{key:'yokai',name:'Yokai Night',icon:'👻',desc:'Brave the autumn mine for a mysterious treasure.',color:'#c89cff'};}
function updateSrs(q,correct){
 if(!q?.id)return;const old=state.v5.srs[q.id]||{interval:0,ease:2.3,reps:0};
 if(correct){old.reps++;old.interval=old.reps===1?1:old.reps===2?3:Math.min(60,Math.max(1,Math.round(old.interval*old.ease)));old.ease=Math.min(3,old.ease+.05);}else{old.reps=0;old.interval=.08;old.ease=Math.max(1.3,old.ease-.2);}
 old.dueAt=Date.now()+old.interval*DAY;old.last=Date.now();old.correct=!!correct;state.v5.srs[q.id]=old;
}
function collectWord(q){
 if(!q)return;const jp=stripMarkup(q.displayChallenge||q.q||'');if(!/[ぁ-んァ-ヶ一-龯]/.test(jp))return;
 const id=q.id||jp;const card=state.v5.wordBook[id]||{jp,reading:'',meaning:'',seen:0,mastery:0};card.seen++;card.mastery=Math.min(100,card.mastery+8);card.meaning=/[ぁ-んァ-ヶ一-龯]/.test(String(q.a))?(q.help?stripMarkup(q.help):q.prompt):String(q.a);card.updated=Date.now();state.v5.wordBook[id]=card;
}
function chestReward(){const base=5000+selectedStageIndex()*2500+buildingLevel('forge')*1800;const companion=state.v5.companion==='kitsune'?1.1:1;const amount=Math.round(base*companion);rewardNuggets(amount);state.v5.chests++;state.v5.lastChestAt=Date.now();showChest(amount);}
function showChest(amount){let el=document.getElementById('v5Treasure');if(!el){el=document.createElement('div');el.id='v5Treasure';el.className='v5-treasure';document.body.appendChild(el);}el.innerHTML=`<div class="v5-chest">🎁</div><strong>Treasure found!</strong><span>+${amount.toLocaleString()} Nuggets</span>`;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200);}
function react(kind){document.querySelectorAll('.miner-avatar').forEach(a=>{a.dataset.reaction=kind;setTimeout(()=>{if(a.dataset.reaction===kind)delete a.dataset.reaction;},1100);});}
function decorateCharacters(){ensureV5();document.querySelectorAll('.miner-avatar').forEach(a=>{a.dataset.jacket=state.v5.fashion.jacket;a.dataset.gloves=state.v5.fashion.gloves;a.dataset.shoes=state.v5.fashion.shoes;});let pet=document.getElementById('v5CompanionFloat');if(state.v5.companion!=='none'){if(!pet){pet=document.createElement('button');pet.id='v5CompanionFloat';pet.className='v5-companion-float';pet.onclick=()=>openV5('companions');document.body.appendChild(pet);}const c=COMPANIONS.find(x=>x.id===state.v5.companion);pet.textContent=c.icon;pet.title=c.name;}else pet?.remove();}

function shell(){
 if(document.getElementById('v5Overlay'))return;
 document.body.insertAdjacentHTML('beforeend',`<div id="v5Overlay" class="v5-overlay" aria-hidden="true"><section class="v5-panel"><header class="v5-head"><div><span>Japanese Miner v5.0</span><h2>Expedition Hub</h2></div><button id="v5Close" aria-label="Close">×</button></header><nav class="v5-tabs"><button data-v5tab="map">🗺️ Expedition</button><button data-v5tab="boss">👹 Bosses</button><button data-v5tab="review">🧠 Review</button><button data-v5tab="book">📖 Word Book</button><button data-v5tab="companions">🐾 Companions</button><button data-v5tab="settlement">🏘️ Settlement</button><button data-v5tab="missions">🎯 Missions</button><button data-v5tab="events">🎊 Events</button><button data-v5tab="fashion">👘 Fashion</button></nav><main id="v5Content"></main></section></div>`);
 document.getElementById('v5Close').onclick=closeV5;document.getElementById('v5Overlay').onclick=e=>{if(e.target.id==='v5Overlay')closeV5();};document.querySelectorAll('[data-v5tab]').forEach(b=>b.onclick=()=>renderV5(b.dataset.v5tab));
}
let currentTab='map';
function openV5(tab='map'){ensureV5();shell();document.getElementById('v5Overlay').classList.add('open');document.getElementById('v5Overlay').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderV5(tab);}
function closeV5(){document.getElementById('v5Overlay')?.classList.remove('open');document.getElementById('v5Overlay')?.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function mapView(){return `<div class="v5-hero"><div><span>Cave expedition</span><h3>${stages[selectedStageIndex()].name}</h3><p>Answer questions to travel through five checkpoints and reveal the guardian.</p></div><b>${checkpointCount(selectedStageIndex())}/5</b></div><div class="cave-map">${stages.map((s,i)=>{const n=checkpointCount(i);return `<article class="cave-route ${i===selectedStageIndex()?'active':''}"><div class="route-title"><strong>${esc(s.name)}</strong><span>${n}/5 checkpoints</span></div><div class="route-nodes">${[1,2,3,4,5].map(x=>`<i class="${x<=n?'reached':''}">${x===5?'👹':x}</i>`).join('<em></em>')}</div><button data-select-route="${i}" ${isStageUnlocked(i)?'':'disabled'}>${i===selectedStageIndex()?'Current mine':'Travel here'}</button></article>`;}).join('')}</div>`;}
function bossView(){const battle=state.v5.boss;return battle?`<div class="boss-arena"><div class="boss-sprite">${battle.stage===6?'🐉':'👹'}</div><h3>${esc(BOSSES[battle.stage])}</h3><div class="boss-health"><i style="width:${battle.hp/battle.maxHp*100}%"></i></div><p>${battle.hp}/${battle.maxHp} guardian health · answer mine questions correctly to attack.</p><button data-v5-action="fight">Continue battle</button><button data-v5-action="flee">Leave battle</button></div>`:`<div class="v5-grid">${stages.map((s,i)=>{const defeated=state.v5.bossDefeated.includes(i),unlocked=bossUnlocked(i);return `<article class="v5-card"><span class="v5-icon">${i===6?'🐉':'👹'}</span><h3>${esc(BOSSES[i])}</h3><p>Guardian of the ${esc(s.name)}.</p><button data-start-boss="${i}" ${!unlocked||defeated?'disabled':''}>${defeated?'Defeated':unlocked?'Challenge boss':'Reach checkpoint 5'}</button></article>`;}).join('')}</div>`;}
function reviewView(){const due=questions.filter(q=>Number(state.v5.srs[q.id]?.dueAt||0)<=Date.now()&&state.v5.srs[q.id]);return `<div class="v5-hero"><div><span>Spaced repetition</span><h3>${due.length} reviews due</h3><p>Correct answers schedule longer gaps. Missed material returns sooner.</p></div><b>🧠</b></div><button class="v5-wide" data-v5-action="review" ${due.length?'':'disabled'}>Start due review</button><div class="review-queue">${due.slice(0,20).map(q=>`<div><strong>${esc(stripMarkup(q.displayChallenge||q.q))}</strong><span>${esc(q.prompt)}</span></div>`).join('')||'<p>Nothing is due. Keep mining to build your review schedule.</p>'}</div><section class="pronunciation"><h3>🎙️ Pronunciation practice</h3><p>Choose a collected Japanese word, listen, then try speaking it. Browser support varies.</p><select id="pronounceWord">${Object.values(state.v5.wordBook).slice(-80).map(w=>`<option>${esc(w.jp)}</option>`).join('')}</select><button data-v5-action="listen-word">🔊 Listen</button><button data-v5-action="speak-word">🎙️ Practice speaking</button><div id="pronounceResult"></div></section>`;}
function bookView(){const words=Object.values(state.v5.wordBook).sort((a,b)=>b.updated-a.updated);return `<div class="v5-hero"><div><span>Vocabulary collection</span><h3>${words.length} collected cards</h3><p>Correct Japanese questions automatically enter your permanent collection.</p></div><b>📖</b></div><div class="word-book">${words.map(w=>`<article><button data-speak-card="${esc(w.jp)}">🔊</button><strong>${esc(w.jp)}</strong><span>${esc(w.meaning)}</span><div><i style="width:${w.mastery}%"></i></div><small>${w.mastery}% mastery · seen ${w.seen}×</small></article>`).join('')||'<p>Answer a Japanese question correctly to collect your first card.</p>'}</div>`;}
function companionView(){return `<div class="v5-grid">${COMPANIONS.map(c=>{const owned=state.v5.ownedCompanions.includes(c.id),equipped=state.v5.companion===c.id;return `<article class="v5-card companion-card ${equipped?'equipped':''}"><span class="v5-icon">${c.icon}</span><h3>${c.name}</h3><p>${c.bonus}</p><button data-companion="${c.id}" ${equipped?'disabled':''}>${equipped?'Adventuring with you':owned?'Choose companion':`Adopt — ${c.cost.toLocaleString()} Nuggets`}</button></article>`;}).join('')}</div>`;}
function settlementView(){return `<div class="settlement-scene">🏔️ <span>🏡</span><span>🌸</span><span>🏛️</span><span>🔥</span></div><div class="v5-grid">${BUILDINGS.map(b=>{const lv=buildingLevel(b.id),cost=b.base*(lv+1);return `<article class="v5-card"><span class="v5-icon">${b.icon}</span><h3>${b.name} <small>Lv. ${lv}/5</small></h3><p>${b.desc}</p><button data-building="${b.id}" ${lv>=5?'disabled':''}>${lv>=5?'Fully upgraded':`Upgrade — ${cost.toLocaleString()} Nuggets`}</button></article>`;}).join('')}</div>`;}
function missionsView(){const m=state.v5.missions,garden=1+buildingLevel('garden')*.1;const list=[['answer','Cave Shift','Answer 15 questions',m.answered,15,Math.round(6000*garden)],['correct','Precise Miner','Get 10 correct answers',m.correct,10,Math.round(9000*garden)],['reviews','Memory Training','Complete 5 scheduled reviews',m.reviews,5,Math.round(12000*garden)]];return `<h3>Daily expedition missions</h3>${list.map(([id,n,d,v,g,r])=>`<article class="mission-row"><div><strong>${n}</strong><span>${d}</span><div><i style="width:${Math.min(100,v/g*100)}%"></i></div></div><button data-mission="${id}" ${v<g||m.claimed[id]?'disabled':''}>${m.claimed[id]?'Claimed':`${v}/${g} · ${r.toLocaleString()} Nuggets`}</button></article>`).join('')}<h3>Expanded achievements</h3>${V5_ACHIEVEMENTS.map(([id,n,d,test,r])=>{const done=state.v5.achievements[id];return `<article class="mission-row"><div><strong>${done?'🏆':'🔒'} ${n}</strong><span>${d}</span></div><button data-achievement="${id}" ${!test()||done?'disabled':''}>${done?'Unlocked':test()?`Claim ${r.toLocaleString()}`:'In progress'}</button></article>`;}).join('')}`;}
function eventView(){const s=season(),claimed=state.v5.seasonClaim===`${s.key}:${today()}`;return `<div class="season-event" style="--season:${s.color}"><span>${s.icon}</span><h3>${s.name}</h3><p>${s.desc}</p><div class="season-progress"><i style="width:${Math.min(100,state.v5.missions.correct/5*100)}%"></i></div><button data-v5-action="season" ${state.v5.missions.correct<5||claimed?'disabled':''}>${claimed?'Today’s treasure claimed':'Claim seasonal treasure'}</button></div>`;}
function fashionView(){return `<div class="v5-hero"><div><span>Expanded wardrobe</span><h3>Layer your miner’s outfit</h3><p>Jackets, gloves, and shoes work with your existing hair and clothing.</p></div><b>👘</b></div>${Object.entries(FASHION).map(([key,items])=>`<section class="fashion-group"><h3>${key[0].toUpperCase()+key.slice(1)}</h3><div>${items.map(([id,name,cost])=>{const owned=state.v5.ownedFashion.includes(`${key}:${id}`),on=state.v5.fashion[key]===id;return `<button data-fashion-key="${key}" data-fashion-id="${id}" data-fashion-cost="${cost}" class="${on?'selected':''}"><strong>${name}</strong><small>${on?'Equipped':owned?'Owned':`${cost.toLocaleString()} Nuggets`}</small></button>`;}).join('')}</div></section>`).join('')}`;}
function renderV5(tab=currentTab){ensureV5();currentTab=tab;document.querySelectorAll('[data-v5tab]').forEach(b=>b.classList.toggle('active',b.dataset.v5tab===tab));const c=document.getElementById('v5Content');if(!c)return;c.innerHTML=tab==='map'?mapView():tab==='boss'?bossView():tab==='review'?reviewView():tab==='book'?bookView():tab==='companions'?companionView():tab==='settlement'?settlementView():tab==='missions'?missionsView():tab==='events'?eventView():fashionView();bindV5(c);}
function startBoss(stage){if(!bossUnlocked(stage))return;state.v5.boss={stage,hp:5+stage,maxHp:5+stage,started:Date.now()};state.selectedStage=stage;save();render();renderV5('boss');}
function bindV5(c){
 c.querySelectorAll('[data-select-route]').forEach(b=>b.onclick=()=>{selectStage(Number(b.dataset.selectRoute),Number(b.dataset.selectRoute)===2);renderV5('map');});
 c.querySelectorAll('[data-start-boss]').forEach(b=>b.onclick=()=>startBoss(Number(b.dataset.startBoss)));
 c.querySelectorAll('[data-companion]').forEach(b=>b.onclick=()=>{const x=COMPANIONS.find(c=>c.id===b.dataset.companion);if(!state.v5.ownedCompanions.includes(x.id)){if(!spendStoneValue(x.cost)){setMessage(`You need ${x.cost.toLocaleString()} Nuggets.`,'wrong');return;}state.v5.ownedCompanions.push(x.id);}state.v5.companion=x.id;save();render();renderV5('companions');});
 c.querySelectorAll('[data-building]').forEach(b=>b.onclick=()=>{const x=BUILDINGS.find(v=>v.id===b.dataset.building),lv=buildingLevel(x.id),cost=x.base*(lv+1);if(!spendStoneValue(cost)){setMessage(`You need ${cost.toLocaleString()} Nuggets.`,'wrong');return;}state.v5.buildings[x.id]=lv+1;save();render();renderV5('settlement');showChest(Math.round(cost*.15));});
 c.querySelectorAll('[data-mission]').forEach(b=>b.onclick=()=>{const garden=1+buildingLevel('garden')*.1,rewards={answer:Math.round(6000*garden),correct:Math.round(9000*garden),reviews:Math.round(12000*garden)};if(state.v5.missions.claimed[b.dataset.mission])return;state.v5.missions.claimed[b.dataset.mission]=true;rewardNuggets(rewards[b.dataset.mission]);save();render();renderV5('missions');});
 c.querySelectorAll('[data-achievement]').forEach(b=>b.onclick=()=>{const a=V5_ACHIEVEMENTS.find(x=>x[0]===b.dataset.achievement);if(!a||state.v5.achievements[a[0]]||!a[3]())return;state.v5.achievements[a[0]]=Date.now();rewardNuggets(a[4]);save();render();renderV5('missions');});
 c.querySelectorAll('[data-speak-card]').forEach(b=>b.onclick=()=>speakJapanese(b.dataset.speakCard));
 c.querySelectorAll('[data-fashion-key]').forEach(b=>b.onclick=()=>{const key=b.dataset.fashionKey,id=b.dataset.fashionId,cost=Number(b.dataset.fashionCost),token=`${key}:${id}`;if(!state.v5.ownedFashion.includes(token)){if(!spendStoneValue(cost)){setMessage(`You need ${cost.toLocaleString()} Nuggets.`,'wrong');return;}state.v5.ownedFashion.push(token);}state.v5.fashion[key]=id;save();render();renderV5('fashion');});
 c.querySelectorAll('[data-v5-action]').forEach(b=>b.onclick=()=>action(b.dataset.v5Action));
}
function action(a){if(a==='fight'){closeV5();mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}if(a==='flee'){state.v5.boss=null;save();renderV5('boss');}if(a==='review'){const due=questions.filter(q=>state.v5.srs[q.id]&&state.v5.srs[q.id].dueAt<=Date.now());if(due.length){state.selectedStage=due[0].stage;state.active=due[Math.floor(Math.random()*due.length)];state.answered=false;showQuestion(state.active);closeV5();render();}}if(a==='listen-word'){const w=document.getElementById('pronounceWord')?.value;if(w)speakJapanese(w);}if(a==='speak-word')pronounce();if(a==='season'){const s=season();state.v5.seasonClaim=`${s.key}:${today()}`;rewardNuggets(25000+buildingLevel('garden')*5000);state.hints+=2;save();render();renderV5('events');showChest(25000+buildingLevel('garden')*5000);}}
function pronounce(){const target=document.getElementById('pronounceWord')?.value,out=document.getElementById('pronounceResult');if(!target||!out)return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){out.textContent='Speech recognition is not supported in this browser. Listening practice still works.';return;}const r=new SR();r.lang='ja-JP';r.interimResults=false;r.onresult=e=>{const heard=e.results[0][0].transcript;const good=heard.replace(/\s/g,'')===target.replace(/\s/g,'');out.textContent=good?`Great pronunciation: ${heard}`:`Heard “${heard}”. Listen and try once more.`;out.className=good?'correct':'wrong';};r.onerror=()=>out.textContent='The microphone could not hear a result. Please try again.';out.textContent='Listening…';r.start();}
function addMenu(){const grid=document.querySelector('.game-menu-grid');if(!grid||grid.querySelector('[data-v5-open]'))return;const b=document.createElement('button');b.type='button';b.dataset.v5Open='1';b.innerHTML='<span>🗺️</span><strong>Expedition Hub</strong><small>Maps, bosses, reviews, pets, and your settlement</small>';b.onclick=()=>{closeGameMenu();openV5('map');};grid.prepend(b);}

ensureV5();addV5Content();shell();addMenu();
const launchButton=document.getElementById('v5LaunchBtn'),loadStatus=document.getElementById('v5LoadStatus');if(launchButton)launchButton.disabled=false;if(loadStatus)loadStatus.textContent='✅ v5 expansion loaded';document.querySelector('.v5-launch-card')?.classList.add('loaded');
const oldChoose=chooseQuestion;chooseQuestion=function(pool){ensureV5();const due=pool.filter(q=>state.v5.srs[q.id]&&state.v5.srs[q.id].dueAt<=Date.now());return due.length&&Math.random()<.62?due[Math.floor(Math.random()*due.length)]:oldChoose(pool);};
const oldQuestionDisplay=questionDisplay;questionDisplay=function(q){return q?.kind==='listening-only'?'<span class="listening-mystery">🎧 Listen carefully</span>':oldQuestionDisplay(q);};
const oldAnswer=answer;answer=function(opt,button){ensureV5();const q=state.active,wasAnswered=state.answered,correct=!!q&&opt===q.a;oldAnswer(opt,button);if(!q||wasAnswered)return;state.v5.missions.answered++;if(correct){state.v5.missions.correct++;state.v5.totalCorrect++;collectWord(q);react('happy');if(state.v5.totalCorrect%10===0)chestReward();}else react('sad');if(state.v5.srs[q.id]?.dueAt<=Date.now())state.v5.missions.reviews++;updateSrs(q,correct);if(state.v5.boss&&correct){state.v5.boss.hp--;react('attack');if(state.v5.boss.hp<=0){const stage=state.v5.boss.stage,bounty=Math.round((25000+stage*20000)*(state.v5.companion==='dragon'?1.25:1));if(!state.v5.bossDefeated.includes(stage))state.v5.bossDefeated.push(stage);state.v5.bossWins++;state.v5.boss=null;rewardNuggets(bounty);setMessage(`${BOSSES[stage]} defeated! +${bounty.toLocaleString()} Nuggets.`,'correct');showChest(bounty);}}save();};
const oldRender=render;render=function(){ensureV5();oldRender();decorateCharacters();addMenu();};
const oldLoad=loadProfile;loadProfile=function(profile){oldLoad(profile);ensureV5();save();decorateCharacters();};
decorateCharacters();if(activeProfileId)render();
window.openJapaneseMinerV5=openV5;
})();
