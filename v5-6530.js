/* Japanese Miner v6.5.3 — full-screen guardian trials and boot color collection. */
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
 shoes:[
  ['boots','Teal Miner Boots',0],
  ['boots-black','Black Miner Boots',8000],
  ['boots-brown','Brown Miner Boots',9000],
  ['boots-navy','Navy Blue Miner Boots',11000],
  ['boots-forest','Forest Green Boots',12000],
  ['boots-crimson','Crimson Red Boots',14000],
  ['boots-purple','Purple Miner Boots',15000],
  ['boots-white','White Miner Boots',16000],
  ['boots-gold','Golden Yellow Boots',18000],
  ['boots-magenta','Magenta Pink Boots',19000],
  ['boots-cyan','Cyan Miner Boots',20000],
  ['boots-steel','Steel Gray Boots',22000],
  ['sneakers','Bright Sneakers',12000],
  ['geta','Festival Geta',16000]
 ]
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
function decorateCharacters(){ensureV5();document.querySelectorAll('.miner-avatar').forEach(a=>{if(a.closest('.choice-avatar-preview,.fashion-avatar-preview'))return;a.dataset.jacket=state.v5.fashion.jacket;a.dataset.gloves=state.v5.fashion.gloves;a.dataset.shoes=state.v5.fashion.shoes;});let pet=document.getElementById('v5CompanionFloat');const companion=COMPANIONS.find(x=>x.id===state.v5.companion);if(companion&&companion.id!=='none'){if(!pet){pet=document.createElement('button');pet.id='v5CompanionFloat';pet.className='v5-companion-float';pet.onclick=()=>openShop('companions');document.body.appendChild(pet);}pet.textContent=companion.icon;pet.title=companion.name;}else pet?.remove();document.querySelectorAll('.character-preview-card,.menu-avatar-pane').forEach(card=>{let display=card.querySelector('.character-companion-display');if(!companion||companion.id==='none'){display?.remove();card.classList.remove('has-equipped-companion');return;}card.classList.add('has-equipped-companion');if(!display){display=document.createElement('button');display.type='button';display.className='character-companion-display';display.onclick=()=>{if(typeof closeGameMenu==='function')closeGameMenu();openShop('companions');};card.appendChild(display);}display.innerHTML=`<span>${companion.icon}</span><strong>${companion.name.replace(/ the .*/, '')}</strong><small>Companion</small>`;display.title=`${companion.name}: ${companion.bonus}`;display.setAttribute('aria-label',`Equipped companion: ${companion.name}. Open companions shop.`);});}
window.refreshJapaneseMinerCompanionDisplays=decorateCharacters;

const UTILITY_SECTIONS=[['health','❤️','Practice Health'],['path','🧭','Learning Path'],['exchange','🪙','Nugget Exchange'],['inventory','🎒','Inventory'],['mastery','🔤','Kana Mastery'],['course','📚','JLPT Course'],['gems','💎','Gem Collection']];
function utilityShell(){
 if(document.getElementById('utilityOverlay'))return;
 document.body.insertAdjacentHTML('beforeend',`<div id="utilityOverlay" class="utility-overlay" aria-hidden="true"><section class="utility-panel"><header class="utility-head"><div><span>Game Menu</span><h2>Player Dashboard</h2></div><button id="utilityClose" aria-label="Close">×</button></header><nav class="utility-tabs">${UTILITY_SECTIONS.map(([id,icon,name])=>`<button data-utility-tab="${id}">${icon} ${name}</button>`).join('')}</nav><main id="utilityContent"></main></section></div>`);
 document.getElementById('utilityClose').onclick=closeUtility;document.getElementById('utilityOverlay').onclick=e=>{if(e.target.id==='utilityOverlay')closeUtility();};document.querySelectorAll('[data-utility-tab]').forEach(b=>b.onclick=()=>showUtility(b.dataset.utilityTab));
 const targets={health:document.getElementById('healthSection'),path:document.getElementById('path')?.closest('section'),exchange:document.getElementById('buyHintBtn')?.closest('section'),inventory:document.getElementById('invHints')?.closest('section'),mastery:document.getElementById('masterySection'),course:document.getElementById('n5AcademySection'),gems:document.getElementById('gemCollection')?.closest('section')};
 const store=document.createElement('div');store.id='utilityStore';store.hidden=true;document.body.appendChild(store);Object.entries(targets).forEach(([id,node])=>{if(node){node.dataset.utilitySection=id;node.classList.add('utility-moved-section');store.appendChild(node);}});
 document.querySelector('.grid')?.classList.add('mine-only-layout');
}
function openUtility(tab='health'){utilityShell();closeGameMenu();document.getElementById('utilityOverlay').classList.add('open');document.getElementById('utilityOverlay').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';showUtility(tab);}
function closeUtility(){const overlay=document.getElementById('utilityOverlay');if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';const active=document.querySelector('#utilityContent [data-utility-section]');if(active)document.getElementById('utilityStore').appendChild(active);}
function inventoryItem(icon,name,status='Owned'){return `<article class="owned-inventory-item"><span>${icon}</span><div><strong>${esc(name)}</strong><small>${esc(status)}</small></div></article>`;}
function inventoryCategory(icon,title,items){return `<section class="owned-inventory-category"><button type="button" class="owned-inventory-heading" aria-expanded="true"><span>${icon} ${esc(title)}</span><b>${items.length}</b></button><div class="owned-inventory-grid">${items.join('')||'<p class="owned-inventory-empty">No items purchased yet.</p>'}</div></section>`;}
function renderPurchasedInventory(){ensureV5();const section=document.querySelector('[data-utility-section="inventory"]');if(!section)return;let box=section.querySelector('#purchasedInventory');if(!box){box=document.createElement('div');box.id='purchasedInventory';box.className='purchased-inventory';section.appendChild(box);}const cosmeticNames={hairStyle:{short:'Short Hair',spiky:'Spiky Hair',bob:'Bob Hair',long:'Long Hair',bun:'Bun Hair',buzz:'Buzz Cut',ponytail:'Ponytail',wavy:'Wavy Hair',undercut:'Undercut',twintails:'Twin Tails',regalsweep:'Regal Sweep',sidesweep:'Side Sweep',flamespikes:'Flame Spikes',texturedcrop:'Textured Crop'},hairColor:{black:'Black Hair',brown:'Brown Hair',blonde:'Blonde Hair',red:'Red Hair',blue:'Blue Hair',pink:'Pink Hair',silver:'Silver Hair',purple:'Purple Hair',teal:'Teal Hair',green:'Emerald Hair'},shirt:{miner:'Miner Coat',academy:'Academy Top',hoodie:'Hoodie',festival:'Festival Top',armor:'Crystal Armor',casual:'Casual Top'},pants:{denim:'Denim Bottoms',black:'Black Bottoms',khaki:'Khaki Bottoms',white:'White Bottoms',purple:'Purple Bottoms',red:'Red Bottoms'},accessory:{none:'No Accessory',glasses:'Glasses',headband:'Headband',helmet:'Miner Helmet',earrings:'Earrings',scarf:'Scarf'}};const cosmeticIcons={hairStyle:'💇',hairColor:'🎨',shirt:'👕',pants:'👖',accessory:'✨'};const cosmetics=(state.ownedCosmetics||[]).map(token=>{const [key,id]=token.split(':');return inventoryItem(cosmeticIcons[key]||'✨',cosmeticNames[key]?.[id]||id,state.character?.[key]===id?'Equipped':'Owned');});const fashionNames=Object.fromEntries(Object.entries(FASHION).flatMap(([key,items])=>items.map(([id,name])=>[`${key}:${id}`,name])));const apparel=(state.v5.ownedFashion||[]).map(token=>{const [key,id]=token.split(':');return inventoryItem(key==='jacket'?'🥼':key==='gloves'?'🧤':'🥾',fashionNames[token]||id,state.v5.fashion?.[key]===id?'Equipped':'Owned');});const companions=(state.v5.ownedCompanions||[]).filter(id=>id!=='none').map(id=>{const c=COMPANIONS.find(x=>x.id===id);return c?inventoryItem(c.icon,c.name,state.v5.companion===id?'Equipped companion':'Adopted'):'';}).filter(Boolean);const pickaxes=(state.ownedPickaxeSkins||[]).map(id=>{const x=PICKAXE_SKINS.find(p=>p.id===id);return x?inventoryItem(x.icon,x.name,state.equippedPickaxeSkin===id?'Equipped':'Owned'):'';}).filter(Boolean);const wallpapers=(state.ownedWallpapers||[]).map(id=>{const x=WALLPAPERS.find(w=>w.id===id);return x?inventoryItem('🖼️',x.name,state.equippedWallpaper===id?'In use':'Owned'):'';}).filter(Boolean);const settlement=BUILDINGS.filter(b=>Number(state.v5.buildings?.[b.id]||0)>0).map(b=>inventoryItem(b.icon,b.name,`Level ${state.v5.buildings[b.id]} of 5`));const supplies=[inventoryItem('💡','Hints',`${Number(state.hints||0)} available`),inventoryItem('🛡️','Shields',`${Number(state.shields||0)} available`)];box.innerHTML=`<div class="owned-inventory-title"><span>Purchased collection</span><h3>Everything you own</h3><p>Items are grouped by category. Equipped items are clearly marked.</p></div>${inventoryCategory('🎒','Supplies',supplies)}${inventoryCategory('⛏️','Pickaxe skins',pickaxes)}${inventoryCategory('🖼️','Wallpapers',wallpapers)}${inventoryCategory('🧍','Character cosmetics',cosmetics)}${inventoryCategory('👘','Apparel layers',apparel)}${inventoryCategory('🐾','Companions',companions)}${inventoryCategory('🏘️','Settlement upgrades',settlement)}`;box.querySelectorAll('.owned-inventory-heading').forEach(button=>button.onclick=()=>{const category=button.closest('.owned-inventory-category'),collapsed=category.classList.toggle('collapsed');button.setAttribute('aria-expanded',String(!collapsed));});}
function showUtility(tab){const content=document.getElementById('utilityContent'),store=document.getElementById('utilityStore');if(!content||!store)return;const previous=content.querySelector('[data-utility-section]');if(previous)store.appendChild(previous);const section=store.querySelector(`[data-utility-section="${tab}"]`);if(section)content.appendChild(section);document.querySelectorAll('[data-utility-tab]').forEach(b=>b.classList.toggle('active',b.dataset.utilityTab===tab));if(tab==='inventory')renderPurchasedInventory();content.scrollTop=0;}
function addDashboardMenu(){const grid=document.querySelector('.game-menu-grid');if(!grid||grid.querySelector('[data-dashboard-open]'))return;const b=document.createElement('button');b.type='button';b.dataset.dashboardOpen='1';b.innerHTML='<span>🧰</span><strong>Player Dashboard</strong><small>Health, path, inventory, mastery, course, and gems</small>';b.onclick=()=>openUtility('health');grid.prepend(b);}
function calendarShell(){if(document.getElementById('studyCalendarOverlay'))return;document.body.insertAdjacentHTML('beforeend',`<div id="studyCalendarOverlay" class="study-calendar-overlay" aria-hidden="true"><section class="study-calendar-panel"><header class="study-calendar-head"><div><span class="preview-kicker">Study history</span><h2>📅 Practice Calendar</h2><p>Select any date to view its activity.</p></div><button id="closeStudyCalendarBtn" aria-label="Close">×</button></header><div class="study-calendar-stats"><div><span>Current streak</span><strong><b id="calendarCurrentStreak">0</b> days</strong></div><div><span>Total study days</span><strong id="calendarTotalDays">0</strong></div><div><span>This month</span><strong id="calendarMonthDays">0</strong></div></div><div class="calendar-nav"><button id="calendarPrevMonth" aria-label="Previous month">‹</button><h3 id="calendarMonthLabel"></h3><button id="calendarNextMonth" aria-label="Next month">›</button></div><button id="calendarTodayBtn" class="calendar-today-btn">Today</button><div class="calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div><div id="studyCalendarGrid" class="study-calendar-grid"></div><div class="calendar-legend"><span><i class="studied-dot"></i>Studied</span><span><i class="today-dot"></i>Today</span></div><div id="calendarDayDetail" class="calendar-day-detail"><strong>Select a date</strong><br>Your practice information will appear here.</div></section></div>`);const overlay=document.getElementById('studyCalendarOverlay');document.getElementById('closeStudyCalendarBtn').onclick=closeStudyCalendar;overlay.onclick=e=>{if(e.target===overlay)closeStudyCalendar();};document.getElementById('calendarPrevMonth').onclick=()=>{studyCalendarMonth=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()-1,1);renderStudyCalendar();document.getElementById('calendarNextMonth').disabled=false;};document.getElementById('calendarNextMonth').onclick=()=>{studyCalendarMonth=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()+1,1);renderStudyCalendar();document.getElementById('calendarNextMonth').disabled=false;};document.getElementById('calendarTodayBtn').onclick=()=>{studyCalendarMonth=new Date(new Date().getFullYear(),new Date().getMonth(),1);renderStudyCalendar();document.querySelector('.calendar-day.today')?.click();document.getElementById('calendarNextMonth').disabled=false;};}
function addCalendarMenu(){const grid=document.querySelector('.game-menu-grid');if(!grid||grid.querySelector('[data-calendar-open]'))return;const b=document.createElement('button');b.type='button';b.dataset.calendarOpen='1';b.innerHTML='<span>📅</span><strong>Calendar</strong><small>Browse months and inspect daily study history</small>';b.onclick=()=>{closeGameMenu();openStudyCalendar();document.getElementById('calendarNextMonth').disabled=false;};grid.appendChild(b);}
function upgradeGameMenu(){const panel=document.querySelector('.game-menu-panel'),wheel=panel?.querySelector('.menu-wheel');if(!panel||!wheel)return;let layout=panel.querySelector('.miner-interface-menu');if(!layout){layout=document.createElement('div');layout.className='miner-interface-menu';panel.querySelector('.game-menu-head').after(layout);layout.innerHTML='<aside class="menu-avatar-pane"><span>ACTIVE MINER</span><div id="menuAvatarStage"></div><strong id="menuPlayerName">Miner</strong><small>Choose a category</small></aside><nav class="menu-category-rail"><button data-menu-category="adventure" class="active"><span>⛏️</span><b>Explore</b></button><button data-menu-category="gear"><span>🎒</span><b>Gear</b></button><button data-menu-category="player"><span>📊</span><b>Player</b></button></nav>';layout.appendChild(wheel);layout.querySelectorAll('[data-menu-category]').forEach(b=>b.onclick=()=>{layout.querySelectorAll('[data-menu-category]').forEach(x=>x.classList.toggle('active',x===b));layout.dataset.category=b.dataset.menuCategory;filterGameMenu(layout);});layout.dataset.category='adventure';}const avatar=document.querySelector('.miner-avatar.large')||document.querySelector('.miner-avatar');const stage=layout.querySelector('#menuAvatarStage');if(stage&&avatar){stage.innerHTML='';const clone=avatar.cloneNode(true);clone.classList.remove('mini');clone.classList.add('large');stage.appendChild(clone);}const name=layout.querySelector('#menuPlayerName');if(name)name.textContent=document.getElementById('activePlayerName')?.textContent||'Miner';wheel.querySelectorAll(':scope>button').forEach(b=>{if(b.dataset.menuCategoryName)return;const action=b.dataset.menuAction,feature=b.dataset.featureOpen;b.dataset.menuCategoryName=(action==='shop'||action==='inventory'||feature==='profile')?'gear':(action==='mine'||action==='course'||action==='path'||b.dataset.v5Open)?'adventure':'player';});filterGameMenu(layout);}
function filterGameMenu(layout){const category=layout.dataset.category||'adventure';layout.querySelectorAll('.menu-wheel>button').forEach(b=>b.hidden=b.dataset.menuCategoryName!==category);}
function heartHudShell(){if(document.getElementById('heartRecoveryHud'))return;document.body.insertAdjacentHTML('beforeend','<button id="heartRecoveryHud" class="heart-recovery-hud" type="button"><span>❤️‍🩹 3 hearts regenerating</span><strong id="heartRecoveryHudTime">30:00</strong><small>Tap for health details</small></button>');document.getElementById('heartRecoveryHud').onclick=()=>openUtility('health');}

let pendingCosmetic=null;
function previewShell(){if(document.getElementById('cosmeticPreviewOverlay'))return;document.body.insertAdjacentHTML('beforeend',`<div id="cosmeticPreviewOverlay" class="cosmetic-preview-overlay" aria-hidden="true"><section class="cosmetic-preview-panel"><button id="cosmeticPreviewClose" class="cosmetic-preview-close" aria-label="Close">×</button><span class="preview-kicker">Try before you buy</span><h2 id="cosmeticPreviewName">Character style</h2><div id="cosmeticPreviewStage"></div><div class="preview-price"><span>Your balance</span><strong id="cosmeticPreviewBalance">0 Nuggets</strong></div><p id="cosmeticPreviewCost"></p><div class="preview-actions"><button id="cosmeticPreviewCancel">Cancel</button><button id="cosmeticPreviewBuy" class="primary">Buy &amp; Equip</button></div></section></div>`);document.getElementById('cosmeticPreviewClose').onclick=closeCosmeticPreview;document.getElementById('cosmeticPreviewCancel').onclick=closeCosmeticPreview;document.getElementById('cosmeticPreviewOverlay').onclick=e=>{if(e.target.id==='cosmeticPreviewOverlay')closeCosmeticPreview();};document.getElementById('cosmeticPreviewBuy').onclick=buyPreviewedCosmetic;}
function avatarForPreview(item){const source=document.querySelector('.miner-avatar.large')||document.querySelector('.miner-avatar'),markup=window.japaneseMinerCharacterMarkup?.('large',{[item.key]:item.value});let avatar=null;if(markup){const shell=document.createElement('div');shell.innerHTML=markup;avatar=shell.firstElementChild;}else if(source)avatar=source.cloneNode(true);if(!avatar)return null;for(const key of ['jacket','gloves','shoes'])if(source?.dataset[key])avatar.dataset[key]=source.dataset[key];avatar.classList.remove('mini');avatar.classList.add('large','preview-avatar');avatar.removeAttribute('id');avatar.dataset[item.key]=item.value;avatar.dataset.previewKey=item.key;window.syncJapaneseMinerRenderedLayers?.(avatar);return avatar;}
function openCosmeticPreview(item){ensureV5();previewShell();pendingCosmetic=item;const overlay=document.getElementById('cosmeticPreviewOverlay'),stage=document.getElementById('cosmeticPreviewStage'),avatar=avatarForPreview(item);stage.innerHTML='';if(avatar)stage.appendChild(avatar);document.getElementById('cosmeticPreviewName').textContent=item.name;document.getElementById('cosmeticPreviewBalance').textContent=`${totalStoneValue().toLocaleString()} Nuggets`;document.getElementById('cosmeticPreviewCost').innerHTML=`Unlock price: <strong>${Number(item.price).toLocaleString()} Nuggets</strong>`;const buy=document.getElementById('cosmeticPreviewBuy');buy.disabled=totalStoneValue()<Number(item.price);buy.textContent=buy.disabled?'Not enough Nuggets':'Buy & Equip';overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');}
function closeCosmeticPreview(){document.getElementById('cosmeticPreviewOverlay')?.classList.remove('open');document.getElementById('cosmeticPreviewOverlay')?.setAttribute('aria-hidden','true');pendingCosmetic=null;}
function buyPreviewedCosmetic(){const item=pendingCosmetic;if(!item)return;const price=Number(item.price)||0;if(!spendStoneValue(price)){setMessage(`You need ${price.toLocaleString()} Nuggets.`,'wrong');return;}if(item.type==='character'){const token=`${item.key}:${item.value}`;if(!state.ownedCosmetics.includes(token))state.ownedCosmetics.push(token);state.character[item.key]=item.value;}else{const token=`${item.key}:${item.value}`;if(!state.v5.ownedFashion.includes(token))state.v5.ownedFashion.push(token);state.v5.fashion[item.key]=item.value;}const source=item.source;pendingCosmetic=null;document.getElementById('cosmeticPreviewOverlay')?.classList.remove('open');save();render();setMessage(`${item.name} purchased and equipped!`,'correct');if(item.type==='character'&&source?.isConnected)source.click();else if(document.getElementById('v5Overlay')?.classList.contains('open'))renderV5('fashion');}

function shell(){
 if(document.getElementById('v5Overlay'))return;
 document.body.insertAdjacentHTML('beforeend',`<div id="v5Overlay" class="v5-overlay" aria-hidden="true"><section class="v5-panel"><header class="v5-head"><div><span>Japanese Miner v5.0</span><h2>Expedition Hub</h2></div><button id="v5Close" aria-label="Close">×</button></header><nav class="v5-tabs"><button data-v5tab="map">🗺️ Expedition</button><button data-v5tab="boss">👹 Bosses</button><button data-v5tab="review">🧠 Review</button><button data-v5tab="book">📖 Word Book</button><button data-v5tab="companions">🐾 Companions</button><button data-v5tab="settlement">🏘️ Settlement</button><button data-v5tab="missions">🎯 Missions</button><button data-v5tab="events">🎊 Events</button><button data-v5tab="fashion">👘 Fashion</button></nav><main id="v5Content"></main></section></div>`);
 document.getElementById('v5Close').onclick=closeV5;document.getElementById('v5Overlay').onclick=e=>{if(e.target.id==='v5Overlay')closeV5();};document.querySelectorAll('[data-v5tab]').forEach(b=>b.onclick=()=>renderV5(b.dataset.v5tab));
}
let currentTab='map';
function openV5(tab='map'){ensureV5();shell();document.getElementById('v5Overlay').classList.add('open');document.getElementById('v5Overlay').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderV5(tab);}
function closeV5(){document.getElementById('v5Overlay')?.classList.remove('open');document.getElementById('v5Overlay')?.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function mapView(){const scenery=['🌱','🎋','🌸','⛰️','❄️','🔥','🌌'];return `<div class="v5-hero world-hero"><div><span>Japanese Miner Map</span><h3>${stages[selectedStageIndex()].name}</h3><p>Explore the winding mine road. Every numbered location is a practice stop; complete the route to reach its guardian castle.</p></div><b>🗺️</b></div><div class="world-legend"><span>🟢 Available</span><span>⭐ Current</span><span>🔒 Locked</span><span>🏯 Guardian</span></div><div class="world-map-scroll"><div class="world-map-canvas"><div class="map-cloud c1">☁️</div><div class="map-cloud c2">☁️</div>${stages.map((s,i)=>{const reached=checkpointCount(i),unlocked=isStageUnlocked(i);return `<section class="world-region region-${i} ${i===selectedStageIndex()?'current-region':''} ${unlocked?'':'locked-region'}"><div class="region-scenery">${scenery[i]} <small>Mine ${i+1}</small></div><div class="region-label"><strong>${esc(s.name)}</strong><span>${reached}/5 locations</span></div><div class="world-road">${[1,2,3,4,5].map(point=>{const open=unlocked&&point<=reached,current=i===selectedStageIndex()&&point===Math.min(5,reached);return `${point>1?'<i class="road-piece"></i>':''}<button data-world-stage="${i}" data-world-point="${point}" class="world-node ${open?'open':'locked'} ${current?'current':''}" ${open?'':'disabled'}><span>${point===5?'🏯':point}</span><small>${point===5?'Boss':`Stop ${point}`}</small></button>`;}).join('')}</div></section>`;}).join('')}<div class="world-finish">🏆 Master Mine</div></div></div>`;}
function bossView(){const battle=state.v5.boss;return battle?`<div class="boss-arena"><div class="boss-sprite">${battle.stage===6?'🐉':'👹'}</div><h3>${esc(BOSSES[battle.stage])}</h3><div class="boss-health"><i style="width:${battle.hp/battle.maxHp*100}%"></i></div><p>${battle.hp}/${battle.maxHp} guardian health · answer mine questions correctly to attack.</p><button data-v5-action="fight">Continue battle</button><button data-v5-action="flee">Leave battle</button></div>`:`<div class="v5-grid">${stages.map((s,i)=>{const defeated=state.v5.bossDefeated.includes(i),unlocked=bossUnlocked(i);return `<article class="v5-card"><span class="v5-icon">${i===6?'🐉':'👹'}</span><h3>${esc(BOSSES[i])}</h3><p>Guardian of the ${esc(s.name)}.</p><button data-start-boss="${i}" ${!unlocked||defeated?'disabled':''}>${defeated?'Defeated':unlocked?'Challenge boss':'Reach checkpoint 5'}</button></article>`;}).join('')}</div>`;}
function reviewView(){const due=questions.filter(q=>Number(state.v5.srs[q.id]?.dueAt||0)<=Date.now()&&state.v5.srs[q.id]);return `<div class="v5-hero"><div><span>Spaced repetition</span><h3>${due.length} reviews due</h3><p>Correct answers schedule longer gaps. Missed material returns sooner.</p></div><b>🧠</b></div><button class="v5-wide" data-v5-action="review" ${due.length?'':'disabled'}>Start due review</button><div class="review-queue">${due.slice(0,20).map(q=>`<div><strong>${esc(stripMarkup(q.displayChallenge||q.q))}</strong><span>${esc(q.prompt)}</span></div>`).join('')||'<p>Nothing is due. Keep mining to build your review schedule.</p>'}</div><section class="pronunciation"><h3>🎙️ Pronunciation practice</h3><p>Choose a collected Japanese word, listen, then try speaking it. Browser support varies.</p><select id="pronounceWord">${Object.values(state.v5.wordBook).slice(-80).map(w=>`<option>${esc(w.jp)}</option>`).join('')}</select><button data-v5-action="listen-word">🔊 Listen</button><button data-v5-action="speak-word">🎙️ Practice speaking</button><div id="pronounceResult"></div></section>`;}
function bookView(){const words=Object.values(state.v5.wordBook).sort((a,b)=>b.updated-a.updated);return `<div class="v5-hero"><div><span>Vocabulary collection</span><h3>${words.length} collected cards</h3><p>Correct Japanese questions automatically enter your permanent collection.</p></div><b>📖</b></div><div class="word-book">${words.map(w=>`<article><button data-speak-card="${esc(w.jp)}">🔊</button><strong>${esc(w.jp)}</strong><span>${esc(w.meaning)}</span><div><i style="width:${w.mastery}%"></i></div><small>${w.mastery}% mastery · seen ${w.seen}×</small></article>`).join('')||'<p>Answer a Japanese question correctly to collect your first card.</p>'}</div>`;}
function companionView(){return `<div class="v5-grid">${COMPANIONS.map(c=>{const owned=state.v5.ownedCompanions.includes(c.id),equipped=state.v5.companion===c.id;return `<article class="v5-card companion-card ${equipped?'equipped':''}"><span class="v5-icon">${c.icon}</span><h3>${c.name}</h3><p>${c.bonus}</p><button data-companion="${c.id}" ${equipped?'disabled':''}>${equipped?'Adventuring with you':owned?'Choose companion':`Adopt — ${c.cost.toLocaleString()} Nuggets`}</button></article>`;}).join('')}</div>`;}
function settlementView(){return `<div class="settlement-scene">🏔️ <span>🏡</span><span>🌸</span><span>🏛️</span><span>🔥</span></div><div class="v5-grid">${BUILDINGS.map(b=>{const lv=buildingLevel(b.id),cost=b.base*(lv+1);return `<article class="v5-card"><span class="v5-icon">${b.icon}</span><h3>${b.name} <small>Lv. ${lv}/5</small></h3><p>${b.desc}</p><button data-building="${b.id}" ${lv>=5?'disabled':''}>${lv>=5?'Fully upgraded':`Upgrade — ${cost.toLocaleString()} Nuggets`}</button></article>`;}).join('')}</div>`;}
function missionsView(){const m=state.v5.missions,garden=1+buildingLevel('garden')*.1;const list=[['answer','Cave Shift','Answer 15 questions',m.answered,15,Math.round(6000*garden)],['correct','Precise Miner','Get 10 correct answers',m.correct,10,Math.round(9000*garden)],['reviews','Memory Training','Complete 5 scheduled reviews',m.reviews,5,Math.round(12000*garden)]];return `<h3>Daily expedition missions</h3>${list.map(([id,n,d,v,g,r])=>`<article class="mission-row"><div><strong>${n}</strong><span>${d}</span><div><i style="width:${Math.min(100,v/g*100)}%"></i></div></div><button data-mission="${id}" ${v<g||m.claimed[id]?'disabled':''}>${m.claimed[id]?'Claimed':`${v}/${g} · ${r.toLocaleString()} Nuggets`}</button></article>`).join('')}<h3>Expanded achievements</h3>${V5_ACHIEVEMENTS.map(([id,n,d,test,r])=>{const done=state.v5.achievements[id];return `<article class="mission-row"><div><strong>${done?'🏆':'🔒'} ${n}</strong><span>${d}</span></div><button data-achievement="${id}" ${!test()||done?'disabled':''}>${done?'Unlocked':test()?`Claim ${r.toLocaleString()}`:'In progress'}</button></article>`;}).join('')}`;}
function eventView(){const s=season(),claimed=state.v5.seasonClaim===`${s.key}:${today()}`;return `<div class="season-event" style="--season:${s.color}"><span>${s.icon}</span><h3>${s.name}</h3><p>${s.desc}</p><div class="season-progress"><i style="width:${Math.min(100,state.v5.missions.correct/5*100)}%"></i></div><button data-v5-action="season" ${state.v5.missions.correct<5||claimed?'disabled':''}>${claimed?'Today’s treasure claimed':'Claim seasonal treasure'}</button></div>`;}
function fashionThumbnail(key,id){const markup=window.japaneseMinerCharacterMarkup?.('mini')||'';return markup.replace('class="miner-avatar',`data-${key}="${id}" class="miner-avatar`);}
function fashionView(){return `<div class="v5-hero"><div><span>Expanded wardrobe</span><h3>Layer your miner’s outfit</h3><p>Every item includes a character preview before purchase.</p></div><b>👘</b></div>${Object.entries(FASHION).map(([key,items])=>`<section class="fashion-group"><h3>${key[0].toUpperCase()+key.slice(1)}</h3><div>${items.map(([id,name,cost])=>{const owned=state.v5.ownedFashion.includes(`${key}:${id}`),on=state.v5.fashion[key]===id;return `<button data-fashion-key="${key}" data-fashion-id="${id}" data-fashion-cost="${cost}" class="fashion-preview-choice ${on?'selected':''}"><div class="fashion-avatar-preview">${fashionThumbnail(key,id)}</div><strong>${name}</strong><small>${on?'Equipped':owned?'Owned':`${cost.toLocaleString()} Nuggets`}</small></button>`;}).join('')}</div></section>`).join('')}`;}
function renderV5(tab=currentTab){ensureV5();currentTab=tab;document.querySelectorAll('[data-v5tab]').forEach(b=>b.classList.toggle('active',b.dataset.v5tab===tab));const c=document.getElementById('v5Content');if(!c)return;c.innerHTML=tab==='map'?mapView():tab==='boss'?bossView():tab==='review'?reviewView():tab==='book'?bookView():tab==='companions'?companionView():tab==='settlement'?settlementView():tab==='missions'?missionsView():tab==='events'?eventView():fashionView();bindV5(c);}
function startBoss(stage){if(!bossUnlocked(stage))return;state.v5.boss={stage,hp:5+stage,maxHp:5+stage,started:Date.now()};state.selectedStage=stage;save();render();renderV5('boss');}
function bindV5(c){
 c.querySelectorAll('[data-world-stage]').forEach(b=>b.onclick=()=>{const stage=Number(b.dataset.worldStage),point=Number(b.dataset.worldPoint),category=b.dataset.worldCategory||'';selectStage(stage,stage===2);if(point===5&&bossUnlocked(stage)){window.JM_EXPEDITION_CATEGORY='';renderV5('boss');}else{window.JM_EXPEDITION_CATEGORY=category;closeV5();mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth',block:'center'});}});
 c.querySelectorAll('[data-select-route]').forEach(b=>b.onclick=()=>{selectStage(Number(b.dataset.selectRoute),Number(b.dataset.selectRoute)===2);renderV5('map');});
 c.querySelectorAll('[data-start-boss]').forEach(b=>b.onclick=()=>startBoss(Number(b.dataset.startBoss)));
 c.querySelectorAll('[data-companion]').forEach(b=>b.onclick=()=>{const x=COMPANIONS.find(c=>c.id===b.dataset.companion);if(!state.v5.ownedCompanions.includes(x.id)&&!b.closest('#shopContent')){closeV5();openShop('companions');return;}if(!state.v5.ownedCompanions.includes(x.id)){if(!spendStoneValue(x.cost)){setMessage(`You need ${x.cost.toLocaleString()} Nuggets.`,'wrong');return;}state.v5.ownedCompanions.push(x.id);}state.v5.companion=x.id;save();render();b.closest('#shopContent')?renderShop():renderV5('companions');});
 c.querySelectorAll('[data-building]').forEach(b=>b.onclick=()=>{if(!b.closest('#shopContent')){closeV5();openShop('settlement');return;}const x=BUILDINGS.find(v=>v.id===b.dataset.building),lv=buildingLevel(x.id),cost=x.base*(lv+1);if(!spendStoneValue(cost)){setMessage(`You need ${cost.toLocaleString()} Nuggets.`,'wrong');return;}state.v5.buildings[x.id]=lv+1;save();render();renderShop();showChest(Math.round(cost*.15));});
 c.querySelectorAll('[data-mission]').forEach(b=>b.onclick=()=>{const garden=1+buildingLevel('garden')*.1,rewards={answer:Math.round(6000*garden),correct:Math.round(9000*garden),reviews:Math.round(12000*garden)};if(state.v5.missions.claimed[b.dataset.mission])return;state.v5.missions.claimed[b.dataset.mission]=true;rewardNuggets(rewards[b.dataset.mission]);save();render();renderV5('missions');});
 c.querySelectorAll('[data-achievement]').forEach(b=>b.onclick=()=>{const a=V5_ACHIEVEMENTS.find(x=>x[0]===b.dataset.achievement);if(!a||state.v5.achievements[a[0]]||!a[3]())return;state.v5.achievements[a[0]]=Date.now();rewardNuggets(a[4]);save();render();renderV5('missions');});
 c.querySelectorAll('[data-speak-card]').forEach(b=>b.onclick=()=>speakJapanese(b.dataset.speakCard));
 c.querySelectorAll('[data-fashion-key]').forEach(b=>b.onclick=()=>{const key=b.dataset.fashionKey,id=b.dataset.fashionId,cost=Number(b.dataset.fashionCost),token=`${key}:${id}`;if(!state.v5.ownedFashion.includes(token)&&!b.closest('#shopContent')){closeV5();openShop('fashion');return;}if(!state.v5.ownedFashion.includes(token)){openCosmeticPreview({type:'fashion',key,value:id,price:cost,name:b.querySelector('strong')?.textContent||'Apparel',source:b});return;}state.v5.fashion[key]=id;save();render();b.closest('#shopContent')?renderShop():renderV5('fashion');});
 c.querySelectorAll('[data-v5-action]').forEach(b=>b.onclick=()=>action(b.dataset.v5Action));
}
function action(a){if(a==='fight'){closeV5();mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}if(a==='flee'){state.v5.boss=null;save();renderV5('boss');}if(a==='review'){const due=questions.filter(q=>state.v5.srs[q.id]&&state.v5.srs[q.id].dueAt<=Date.now());if(due.length){state.selectedStage=due[0].stage;state.active=due[Math.floor(Math.random()*due.length)];state.answered=false;showQuestion(state.active);closeV5();render();}}if(a==='listen-word'){const w=document.getElementById('pronounceWord')?.value;if(w)speakJapanese(w);}if(a==='speak-word')pronounce();if(a==='season'){const s=season();state.v5.seasonClaim=`${s.key}:${today()}`;rewardNuggets(25000+buildingLevel('garden')*5000);state.hints+=2;save();render();renderV5('events');showChest(25000+buildingLevel('garden')*5000);}}
function pronounce(){const target=document.getElementById('pronounceWord')?.value,out=document.getElementById('pronounceResult');if(!target||!out)return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){out.textContent='Speech recognition is not supported in this browser. Listening practice still works.';return;}const r=new SR();r.lang='ja-JP';r.interimResults=false;r.onresult=e=>{const heard=e.results[0][0].transcript;const good=heard.replace(/\s/g,'')===target.replace(/\s/g,'');out.textContent=good?`Great pronunciation: ${heard}`:`Heard “${heard}”. Listen and try once more.`;out.className=good?'correct':'wrong';};r.onerror=()=>out.textContent='The microphone could not hear a result. Please try again.';out.textContent='Listening…';r.start();}
function addMenu(){const grid=document.querySelector('.game-menu-grid');if(!grid||grid.querySelector('[data-v5-open]'))return;const b=document.createElement('button');b.type='button';b.dataset.v5Open='1';b.innerHTML='<span>🗺️</span><strong>Expedition Hub</strong><small>Maps, bosses, reviews, pets, and your settlement</small>';b.onclick=()=>{closeGameMenu();openV5('map');};grid.prepend(b);}

document.querySelector('.menu-wheel')?.classList.add('game-menu-grid');ensureV5();addV5Content();shell();utilityShell();calendarShell();heartHudShell();previewShell();addMenu();addDashboardMenu();addCalendarMenu();upgradeGameMenu();
const launchButton=document.getElementById('v5LaunchBtn'),loadStatus=document.getElementById('v5LoadStatus');if(launchButton)launchButton.disabled=false;if(loadStatus)loadStatus.textContent='✅ v5 expansion loaded';document.querySelector('.v5-launch-card')?.classList.add('loaded');
const oldChoose=chooseQuestion;chooseQuestion=function(pool){ensureV5();const due=pool.filter(q=>state.v5.srs[q.id]&&state.v5.srs[q.id].dueAt<=Date.now());return due.length&&Math.random()<.62?due[Math.floor(Math.random()*due.length)]:oldChoose(pool);};
const oldQuestionDisplay=questionDisplay;questionDisplay=function(q){return q?.kind==='listening-only'?'<span class="listening-mystery">🎧 Listen carefully</span>':oldQuestionDisplay(q);};
const oldAnswer=answer;answer=function(opt,button){ensureV5();const q=state.active,wasAnswered=state.answered,correct=!!q&&opt===q.a;oldAnswer(opt,button);if(!q||wasAnswered)return;state.v5.missions.answered++;if(correct){state.v5.missions.correct++;state.v5.totalCorrect++;collectWord(q);react('happy');if(state.v5.totalCorrect%10===0)chestReward();}else react('sad');if(state.v5.srs[q.id]?.dueAt<=Date.now())state.v5.missions.reviews++;updateSrs(q,correct);if(state.v5.boss&&correct){state.v5.boss.hp--;react('attack');if(state.v5.boss.hp<=0){const stage=state.v5.boss.stage,bounty=Math.round((25000+stage*20000)*(state.v5.companion==='dragon'?1.25:1));if(!state.v5.bossDefeated.includes(stage))state.v5.bossDefeated.push(stage);state.v5.bossWins++;state.v5.boss=null;rewardNuggets(bounty);setMessage(`${BOSSES[stage]} defeated! +${bounty.toLocaleString()} Nuggets.`,'correct');showChest(bounty);}}save();};
const decorateCharactersBase=decorateCharacters;decorateCharacters=function(){decorateCharactersBase();document.querySelectorAll('.miner-avatar').forEach(a=>window.syncJapaneseMinerRenderedLayers?.(a));};
const oldRender=render;render=function(){ensureV5();oldRender();addMenu();addDashboardMenu();addCalendarMenu();upgradeGameMenu();decorateCharacters();};
const oldLoad=loadProfile;loadProfile=function(profile){oldLoad(profile);ensureV5();save();decorateCharacters();};
decorateCharacters();if(activeProfileId)render();
window.openJapaneseMinerV5=openV5;
window.renderJapaneseMinerV5Shop=function(tab,box){ensureV5();box.innerHTML=`<div class="shop-section-heading"><span>Organized Shop</span><h3>${tab==='fashion'?'Fashion & apparel':tab==='companions'?'Companions':'Settlement upgrades'}</h3><p>All Nugget purchases are managed here.</p></div>${tab==='fashion'?fashionView():tab==='companions'?companionView():settlementView()}`;bindV5(box);};
window.openJapaneseMinerDashboard=openUtility;
window.previewJapaneseMinerCosmetic=openCosmeticPreview;
document.addEventListener('click',e=>{const action=e.target.closest?.('[data-menu-action]')?.dataset.menuAction;if(action==='inventory'||action==='path'){e.preventDefault();e.stopImmediatePropagation();openUtility(action==='inventory'?'inventory':'path');}if(e.target.closest?.('#jumpHealthBtn')){e.preventDefault();e.stopImmediatePropagation();openUtility('health');}if(e.target.closest?.('#jumpMasteryBtn')){e.preventDefault();e.stopImmediatePropagation();openUtility('mastery');}},true);
})();


// v6.5.0 — category-based expedition levels, strict guardian gates, and reliable speaking practice.
(function(){
'use strict';
const BASE_STAGE_UNLOCK=isStageUnlocked;
const CATEGORY_ORDER=['vocabulary','kanji','grammar','reading'];
const CATEGORY_NAMES={vocabulary:'Vocabulary',kanji:'Kanji',grammar:'Grammar',reading:'Reading'};
const CATEGORY_ICONS={vocabulary:'📚',kanji:'漢',grammar:'🧩',reading:'📖'};
const CATEGORY_TARGET=20;

function questionCategory(q){
 const k=String(q?.kind||'').toLowerCase();
 const id=String(q?.id||'').toLowerCase();
 const prompt=String(q?.prompt||'').toLowerCase();
 const text=`${k} ${id} ${prompt}`;
 if(text.includes('kanji'))return'kanji';
 if(text.includes('grammar')||text.includes('particle')||text.includes('sentence')||text.includes('dialogue')||text.includes('verb')||text.includes('adjective')||text.includes('pattern'))return'grammar';
 if(text.includes('reading')||k==='read')return'reading';
 if(text.includes('vocab')||text.includes('meaning')||text.includes('conversation'))return'vocabulary';
 return'reading';
}

function categoryQuestions(stage,category){
 const stagePool=questions.filter(q=>Number(q.stage)===stage);
 const exact=stagePool.filter(q=>questionCategory(q)===category);
 // Early mines contain mostly kana-recognition questions. Treat those as
 // reading practice so every answer still contributes to a visible stop.
 if(exact.length)return exact;
 if(category==='reading')return stagePool;
 return[];
}

function categoryProgress(stage,category){
 const pool=categoryQuestions(stage,category);
 let attempts=0,correct=0,masteryTotal=0;
 pool.forEach(q=>{
   const st=state.questionStats?.[q.id]||{};
   attempts+=Number(st.attempts||0);
   correct+=Number(st.correct||0);
   if(typeof questionMasteryScore==='function')masteryTotal+=Number(questionMasteryScore(st)||0);
 });
 const mastery=pool.length?Math.round(masteryTotal/pool.length):0;
 const answerProgress=Math.min(100,Math.round(correct/CATEGORY_TARGET*100));
 return {available:pool.length,attempts,correct,mastery,percent:Math.max(answerProgress,mastery)};
}

function expeditionStats(stage){
 return Object.fromEntries(CATEGORY_ORDER.map(k=>[k,categoryProgress(stage,k)]));
}

checkpointCount=function(stage){
 const stats=expeditionStats(stage);
 let completed=0;
 for(const category of CATEGORY_ORDER){
   if(stats[category].percent>=100)completed++;
   else break;
 }
 return Math.max(1,Math.min(5,completed+1));
};

bossUnlocked=function(stage){
 const stats=expeditionStats(stage);
 return CATEGORY_ORDER.every(k=>stats[k].percent>=100);
};

function expeditionStageUnlocked(stage){
 if(stage===0)return true;
 if(!BASE_STAGE_UNLOCK(stage))return false;
 return state.v5.bossDefeated.includes(stage-1);
}

function bossRemainingMs(){return Math.max(0,Number(state.v5.boss?.deadline||0)-Date.now());}
function formatBossTime(ms){return `${Math.floor(ms/60000)}:${String(Math.ceil(ms%60000/1000)).padStart(2,'0')}`;}

mapView=function(){
 const scenery=['🌱','🎋','🌸','⛰️','❄️','🔥','🌌'];
 return `<div class="v5-hero world-hero"><div><span>Four-Skill Expedition</span><h3>${stages[selectedStageIndex()].name}</h3><p>Every mine has four tracked stops: Vocabulary, Kanji, Grammar, and Reading. Practice in each stop raises that stop's percentage. Complete all four to challenge the guardian.</p></div><b>🗺️</b></div>
 <div class="world-legend"><span>🟢 Available</span><span>⭐ Current</span><span>🔒 Locked</span><span>🏯 Guardian</span></div>
 <div class="world-map-scroll"><div class="world-map-canvas"><div class="map-cloud c1">☁️</div><div class="map-cloud c2">☁️</div>
 ${stages.map((s,i)=>{
   const reached=checkpointCount(i),unlocked=expeditionStageUnlocked(i),stats=expeditionStats(i);
   return `<section class="world-region region-${i} ${i===selectedStageIndex()?'current-region':''} ${unlocked?'':'locked-region'}">
    <div class="region-scenery">${scenery[i]} <small>Mine ${i+1}</small></div>
    <div class="region-label"><strong>${esc(s.name)}</strong><span>${state.v5.bossDefeated.includes(i)?'Guardian cleared':`${CATEGORY_ORDER.filter(k=>stats[k].percent>=100).length}/4 skills complete`}</span></div>
    <div class="expedition-skill-grid">${CATEGORY_ORDER.map((k,index)=>`<div class="expedition-skill-chip"><span>${CATEGORY_ICONS[k]} ${CATEGORY_NAMES[k]}</span><b>${stats[k].percent}%</b><i><em style="width:${stats[k].percent}%"></em></i></div>`).join('')}</div>
    <div class="world-road">${CATEGORY_ORDER.map((k,index)=>{
      const point=index+1;
      const priorComplete=index===0||CATEGORY_ORDER.slice(0,index).every(previous=>stats[previous].percent>=100);
      const open=unlocked&&priorComplete;
      const current=open&&stats[k].percent<100;
      return `${point>1?'<i class="road-piece"></i>':''}<button data-world-stage="${i}" data-world-point="${point}" data-world-category="${k}" class="world-node ${open?'open':'locked'} ${current?'current':''}" ${open?'':'disabled'}><span>${point}</span><small>${CATEGORY_NAMES[k]}</small><b class="world-node-progress">${stats[k].percent}%</b></button>`;
    }).join('')}<i class="road-piece"></i><button data-world-stage="${i}" data-world-point="5" class="world-node ${unlocked&&bossUnlocked(i)?'open':'locked'}" ${unlocked&&bossUnlocked(i)?'':'disabled'}><span>🏯</span><small>Boss</small></button></div>
    ${!unlocked&&i>0?`<p class="boss-gate-note">🔒 Defeat ${esc(BOSSES[i-1])} to enter this mine.</p>`:''}
   </section>`;
 }).join('')}<div class="world-finish">🏆 Master Mine</div></div></div>`;
};

bossView=function(){
 const battle=state.v5.boss;
 if(battle){
   const answered=Number(battle.answered||0),remaining=bossRemainingMs();
   return `<div class="boss-arena"><div class="boss-sprite">${battle.stage===6?'🐉':'👹'}</div><h3>${esc(BOSSES[battle.stage])}</h3><div class="boss-trial-metrics"><strong>${answered}/25 correct</strong><strong class="boss-timer">⏱️ ${formatBossTime(remaining)}</strong></div><div class="boss-health"><i style="width:${answered/25*100}%"></i></div><p>Answer all 25 questions correctly within one minute. One wrong answer or an expired timer ends the attempt.</p><button data-v5-action="fight" ${remaining<=0?'disabled':''}>Continue trial</button><button data-v5-action="flee">Leave trial</button></div>`;
 }
 return `<div class="v5-grid">${stages.map((s,i)=>{
   const defeated=state.v5.bossDefeated.includes(i),unlocked=expeditionStageUnlocked(i)&&bossUnlocked(i);
   return `<article class="v5-card"><span class="v5-icon">${i===6?'🐉':'👹'}</span><h3>${esc(BOSSES[i])}</h3><p>Guardian of the ${esc(s.name)}. Complete Vocabulary, Kanji, Grammar, and Reading before attempting the perfect 25-question trial.</p><button data-start-boss="${i}" ${!unlocked||defeated?'disabled':''}>${defeated?'Defeated':unlocked?'Start timed trial':'Complete all four skill stops'}</button></article>`;
 }).join('')}</div>`;
};
const BOSS_ICONS=['🗿','👻','👹','🐍','🥷','👺','🐉'];
let bossClock=null;
function ensureBossPage(){
 if(document.getElementById('bossTrialPage'))return;
 document.body.insertAdjacentHTML('beforeend',`<section id="bossTrialPage" class="boss-trial-page" aria-hidden="true">
  <div class="boss-trial-backdrop"></div>
  <div id="bossGiant" class="boss-giant" aria-hidden="true">👹</div>
  <header class="boss-trial-header">
   <button id="bossExitBtn" type="button">← Leave trial</button>
   <div><span>GUARDIAN TRIAL</span><h2 id="bossTrialName">Boss</h2></div>
   <div class="boss-timer-box"><small>TIME</small><strong id="bossTrialTimer">1:00</strong></div>
  </header>
  <main class="boss-trial-content">
   <div class="boss-trial-progress-row"><strong id="bossQuestionCount">Question 1 of 25</strong><span id="bossCorrectCount">0 correct</span></div>
   <div class="boss-trial-progress"><i id="bossTrialBar"></i></div>
   <div id="bossQuestionMount" class="boss-question-mount"></div>
  </main>
  <section id="bossResultCard" class="boss-result-card" hidden aria-live="assertive"></section>
 </section>`);
 document.getElementById('bossExitBtn').onclick=()=>finishBossTrial(false,'You left the guardian trial before completing it.');
}
function updateBossHud(){
 const t=state.v5?.boss;if(!t)return;
 const remaining=Math.max(0,t.deadline-Date.now());
 const seconds=Math.ceil(remaining/1000);
 const timer=document.getElementById('bossTrialTimer');
 if(timer){timer.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;timer.classList.toggle('danger',seconds<=10);}
 const answered=Number(t.answered||0),correct=Number(t.correct||0);
 const q=document.getElementById('bossQuestionCount');if(q)q.textContent=`Question ${Math.min(25,answered+1)} of 25`;
 const c=document.getElementById('bossCorrectCount');if(c)c.textContent=`${correct} correct`;
 const bar=document.getElementById('bossTrialBar');if(bar)bar.style.width=`${correct/25*100}%`;
}
function openBossPage(stage){
 ensureBossPage();
 const page=document.getElementById('bossTrialPage');
 page.classList.add('open');page.setAttribute('aria-hidden','false');
 document.body.classList.add('boss-trial-open');
 document.getElementById('bossGiant').textContent=BOSS_ICONS[stage]||'👹';
 document.getElementById('bossTrialName').textContent=BOSSES[stage];
 document.getElementById('bossResultCard').hidden=true;
 document.getElementById('bossQuestionMount').innerHTML='<div class="boss-loading">Preparing the first question…</div>';
 updateBossHud();
 clearInterval(bossClock);bossClock=setInterval(()=>{
  if(!state.v5?.boss)return clearInterval(bossClock);
  updateBossHud();
  if(Date.now()>=state.v5.boss.deadline)finishBossTrial(false,'Time expired before all 25 questions were completed.');
 },200);
}
function closeBossPage(){
 clearInterval(bossClock);bossClock=null;
 const page=document.getElementById('bossTrialPage');if(page){page.classList.remove('open');page.setAttribute('aria-hidden','true');}
 document.body.classList.remove('boss-trial-open');
}
function finishBossTrial(passed,reason){
 const trial=state.v5?.boss;
 if(!trial){closeBossPage();return;}
 const stage=trial.stage,correct=Number(trial.correct||0),answered=Number(trial.answered||0);
 const elapsed=Math.min(60000,Date.now()-Number(trial.started||Date.now()));
 let bounty=0;
 if(passed){
  if(!state.v5.bossDefeated.includes(stage))state.v5.bossDefeated.push(stage);
  state.v5.bossWins=Math.max(Number(state.v5.bossWins||0),state.v5.bossDefeated.length);
  bounty=Math.round((50000+stage*25000)*(state.v5.companion==='dragon'?1.25:1));
  rewardNuggets(bounty);
 }
 state.v5.boss=null;state.active=null;state.answered=false;save();render();
 clearInterval(bossClock);bossClock=null;
 const card=document.getElementById('bossResultCard');
 if(!card)return;
 card.hidden=false;card.className=`boss-result-card ${passed?'passed':'failed'}`;
 card.innerHTML=`<div class="boss-result-icon">${passed?'🏆':'💥'}</div><span>${passed?'TRIAL PASSED':'TRIAL FAILED'}</span><h2>${passed?`${esc(BOSSES[stage])} Defeated`:'The Guardian Stands'}</h2><div class="boss-result-stats"><div><small>Correct</small><strong>${correct}/25</strong></div><div><small>Answered</small><strong>${answered}/25</strong></div><div><small>Time</small><strong>${(elapsed/1000).toFixed(1)}s</strong></div></div><p>${esc(reason)}</p>${passed?`<p class="boss-reward">+${bounty.toLocaleString()} Nuggets · Next mine unlocked</p>`:''}<div class="boss-result-actions"><button id="bossResultReturn" type="button">Return to Expedition</button>${passed?'':`<button id="bossResultRetry" class="primary" type="button">Retry Trial</button>`}</div>`;
 document.getElementById('bossQuestionMount').innerHTML='';
 document.getElementById('bossResultReturn').onclick=()=>{closeBossPage();openV5('boss');};
 document.getElementById('bossResultRetry')?.addEventListener('click',()=>{closeBossPage();startBoss(stage);});
}
startBoss=function(stage){
 if(!expeditionStageUnlocked(stage)||!bossUnlocked(stage))return;
 closeV5();
 state.v5.boss={stage,answered:0,correct:0,started:Date.now(),deadline:Date.now()+60000};
 state.selectedStage=stage;state.active=null;state.answered=false;save();
 openBossPage(stage);
 setTimeout(()=>mine(),120);
};
const priorAnswerV652=answer;
answer=function(opt,button){
 const trial=state.v5?.boss;
 if(!trial)return priorAnswerV652(opt,button);
 if(Date.now()>=trial.deadline)return finishBossTrial(false,'Time expired before all 25 questions were completed.');
 const q=state.active;if(!q||state.answered)return;
 const correct=opt===q.a;
 priorAnswerV652(opt,button);
 trial.answered=Number(trial.answered||0)+1;
 if(correct)trial.correct=Number(trial.correct||0)+1;
 updateBossHud();save();
 if(!correct)return setTimeout(()=>finishBossTrial(false,`The trial ended on question ${trial.answered}. Guardian trials require a perfect 25/25 score.`),650);
 if(trial.correct>=25)return setTimeout(()=>finishBossTrial(true,'Perfect score achieved before the timer expired.'),650);
 setTimeout(()=>{if(state.v5?.boss)mine();},520);
};


pronounce=async function(){const target=document.getElementById('pronounceWord')?.value,out=document.getElementById('pronounceResult'),button=document.querySelector('[data-v5-action="speak-word"]');if(!target||!out)return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!window.isSecureContext){out.textContent='Microphone practice requires HTTPS (or localhost). Open the published secure game link, then try again.';out.className='wrong';return;}if(!SR){out.textContent='This browser does not provide speech recognition. Chrome or Edge on HTTPS is recommended.';out.className='wrong';return;}try{if(navigator.permissions?.query){const permission=await navigator.permissions.query({name:'microphone'}).catch(()=>null);if(permission?.state==='denied'){out.textContent='Microphone access is blocked. Allow microphone permission in the browser site settings, reload, and try again.';out.className='wrong';return;}}}catch{}const clean=t=>String(t||'').normalize('NFKC').replace(/[\s。、！？,.!?]/g,'');const r=new SR();r.lang='ja-JP';r.interimResults=false;r.continuous=false;r.maxAlternatives=5;let finished=false;const reset=()=>{if(button){button.disabled=false;button.textContent='🎙️ Practice speaking';}};r.onstart=()=>{out.textContent='Listening… Speak clearly now.';out.className='listening';if(button){button.disabled=true;button.textContent='🎙️ Listening…';}};r.onresult=e=>{finished=true;const alternatives=[...e.results[0]].map(x=>x.transcript),heard=alternatives[0]||'',good=alternatives.some(x=>clean(x)===clean(target)||clean(x).includes(clean(target))||clean(target).includes(clean(x)));out.textContent=good?`Great pronunciation: ${heard}`:`Heard “${heard}”. Tap Listen, then try again.`;out.className=good?'correct':'wrong';reset();};r.onnomatch=()=>{finished=true;out.textContent='I could not match the speech. Move closer to the microphone and try again.';out.className='wrong';reset();};r.onerror=e=>{finished=true;const messages={not_allowed:'Microphone permission was denied. Allow it in site settings.',audio_capture:'No working microphone was found.',network:'Speech recognition needs an internet connection.',no_speech:'No speech was detected. Hold the device closer and try again.',aborted:'Recording was stopped.'};out.textContent=messages[e.error]||`Microphone error: ${e.error}. Please try again.`;out.className='wrong';reset();};r.onend=()=>{if(!finished){out.textContent='Recording ended before speech was detected. Tap the button and speak immediately.';out.className='wrong';}reset();};try{r.start();}catch(err){out.textContent='The microphone is already busy. Wait a moment and try again.';out.className='wrong';reset();}};
})();
