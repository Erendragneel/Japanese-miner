const stages = [
  {name:"Hiragana Mine", label:"Hiragana", unlock:1},
  {name:"Katakana Cavern", label:"Katakana", unlock:3, requiredHiraganaXp:18240},
  {name:"JLPT N5 Quarry", label:"N5", unlock:5},
  {name:"JLPT N4 Tunnel", label:"N4", unlock:8},
  {name:"JLPT N3 Depths", label:"N3", unlock:12},
  {name:"JLPT N2 Crystal Core", label:"N2", unlock:17},
  {name:"JLPT N1 Master Mine", label:"N1", unlock:23}
];

const STAGE_XP_REQUIREMENTS=[18240,18240,25000,35000,50000,75000,100000];
const STAGE_MASTERY_REQUIREMENTS=[90,90,85,85,85,85,85];
const STAGE_CLEAR_REWARDS=[2500,5000,10000,20000,40000,80000,160000];

const gemTiers = [
 {name:"Agate", icon:"🟤", value:1, minStage:0, weight:55, desc:"Hiragana gemstone • required for the 4th heart."},
 {name:"Amethyst", icon:"🟪", value:5, minStage:0, weight:42, desc:"Hiragana gemstone • required for the 5th heart."},
 {name:"Aquamarine", icon:"🔹", value:25, minStage:0, weight:34, desc:"Hiragana gemstone • required for the 6th heart."},
 {name:"Citrine", icon:"🟨", value:125, minStage:0, weight:28, desc:"Hiragana gemstone • required for the 7th heart."},
 {name:"Emerald", icon:"💚", value:625, minStage:1, weight:22, desc:"Katakana gemstone • required for the 8th heart."},
 {name:"Garnet", icon:"🔴", value:3125, minStage:1, weight:18, desc:"Katakana gemstone • required for the 9th heart."},
 {name:"Opal", icon:"🌈", value:15625, minStage:1, weight:13, desc:"Katakana gemstone • required for the 10th heart."},
 {name:"Peridot", icon:"🟢", value:78125, minStage:1, weight:11, desc:"Katakana gemstone • required for the 11th heart."},
 {name:"Ruby", icon:"❤️", value:390625, minStage:2, weight:8, desc:"JLPT N5 gemstone • required for the 12th heart."},
 {name:"Sapphire", icon:"💙", value:1953125, minStage:2, weight:7, desc:"JLPT N5 gemstone • required for the 13th heart."},
 {name:"Topaz", icon:"🔶", value:9765625, minStage:2, weight:5, desc:"JLPT N5 gemstone • required for the final 14th heart."},
 {name:"Alexandrite", icon:"🟣", value:48828125, minStage:3, weight:3, desc:"Rare higher-level gemstone with future endgame uses."},
 {name:"Paraíba Tourmaline", icon:"🩵", value:244140625, minStage:4, weight:2, desc:"A scarce higher-level gemstone."},
 {name:"Jadeite", icon:"🍏", value:1220703125, minStage:5, weight:1.4, desc:"A prestigious advanced-learning gemstone."},
 {name:"Red Diamond", icon:"♦️", value:6103515625, minStage:6, weight:.35, desc:"The rarest gemstone in the current collection."}
];

const hira = [
["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],["や","ya"],["ゆ","yu"],["よ","yo"],
["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["を","wo"],["ん","n"],
["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
];
const kata = [
["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],["ワ","wa"],["ヲ","wo"],["ン","n"],
["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],
["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
];

const questions = [
  {stage:0,q:"あ",prompt:"Choose the correct reading.",a:"a",opts:["a","i","u","e"]},
  {stage:0,q:"き",prompt:"Choose the correct reading.",a:"ki",opts:["sa","ki","chi","ke"]},
  {stage:0,q:"ぬ",prompt:"Choose the correct reading.",a:"nu",opts:["me","ne","nu","no"]},
  {stage:0,q:"ほ",prompt:"Choose the correct reading.",a:"ho",opts:["ha","he","ho","ma"]},
  {stage:0,q:"り",prompt:"Choose the correct reading.",a:"ri",opts:["ru","ri","re","ro"]},
  {stage:0,q:"Which hiragana is “ka”?",prompt:"Choose the character.",a:"か",opts:["き","か","く","け"]},
  {stage:0,q:"Which hiragana is “yo”?",prompt:"Choose the character.",a:"よ",opts:["ゆ","よ","や","を"]},
  {stage:1,q:"ア",prompt:"Choose the correct reading.",a:"a",opts:["a","i","u","o"]},
  {stage:1,q:"シ",prompt:"Choose the correct reading.",a:"shi",opts:["tsu","shi","so","n"]},
  {stage:1,q:"Which katakana is “ko”?",prompt:"Choose the character.",a:"コ",opts:["ロ","ユ","コ","ヨ"]},
  {stage:2,q:"水",prompt:"What does this kanji mean?",a:"water",opts:["fire","water","tree","gold"]},
  {stage:2,q:"私は学生です。",prompt:"Choose the best meaning.",a:"I am a student.",opts:["I am a student.","I drink water.","I like school.","I am a teacher."]},
  {stage:3,q:"昨日、映画を見ました。",prompt:"Choose the best meaning.",a:"I watched a movie yesterday.",opts:["I will watch a movie.","I watched a movie yesterday.","I bought a movie.","I watched TV today."]},
  {stage:4,q:"この問題は思ったより難しい。",prompt:"Choose the best meaning.",a:"This problem is harder than I thought.",opts:["This problem is easy.","I forgot the problem.","This problem is harder than I thought.","The answer is difficult to read."]},
  {stage:5,q:"彼は会議に出席する予定です。",prompt:"Choose the best meaning.",a:"He plans to attend the meeting.",opts:["He canceled the meeting.","He plans to attend the meeting.","He already left the meeting.","He is organizing a party."]},
  {stage:6,q:"努力を重ねた結果、目標を達成した。",prompt:"Choose the best meaning.",a:"After sustained effort, the goal was achieved.",opts:["The goal was abandoned.","The effort caused a problem.","After sustained effort, the goal was achieved.","The result was unexpected."]},
  {stage:2,q:"毎朝七時に起きます。",prompt:"Choose the best meaning.",a:"I wake up at seven every morning.",opts:["I sleep at seven every night.","I wake up at seven every morning.","I leave at eight every morning.","I eat breakfast at seven."]},
  {stage:2,q:"駅はどこですか。",prompt:"Choose the best meaning.",a:"Where is the station?",opts:["When does the train leave?","Where is the station?","How much is the ticket?","Is this the station?"]},
  {stage:3,q:"雨が降っているので、傘を持っていきます。",prompt:"Choose the best meaning.",a:"Because it is raining, I will take an umbrella.",opts:["Because it is raining, I will take an umbrella.","I forgot my umbrella in the rain.","It may rain tomorrow.","I bought an umbrella yesterday."]},
  {stage:3,q:"宿題を終えてから、テレビを見ました。",prompt:"Choose the best meaning.",a:"After finishing my homework, I watched television.",opts:["I watched television before homework.","After finishing my homework, I watched television.","I did homework while watching television.","I did not finish my homework."]},
  {stage:4,q:"電車が遅れたため、会議に間に合わなかった。",prompt:"Choose the best meaning.",a:"Because the train was delayed, I did not make it to the meeting on time.",opts:["The meeting was delayed by a train.","Because the train was delayed, I did not make it to the meeting on time.","I left the meeting early to catch a train.","The meeting was held on the train."]},
  {stage:4,q:"彼女は日本に来て以来、毎日漢字を勉強している。",prompt:"Choose the best meaning.",a:"She has studied kanji every day since coming to Japan.",opts:["She studied kanji before coming to Japan.","She has studied kanji every day since coming to Japan.","She will study kanji when she leaves Japan.","She teaches kanji in Japan."]},
  {stage:5,q:"この計画を実現するには、十分な資金を確保する必要がある。",prompt:"Choose the best meaning.",a:"To realize this plan, it is necessary to secure sufficient funding.",opts:["The plan was canceled because funding was excessive.","To realize this plan, it is necessary to secure sufficient funding.","The funding plan has already been completed.","No funding is required for the plan."]},
  {stage:5,q:"予想に反して、売上は前年度を上回った。",prompt:"Choose the best meaning.",a:"Contrary to expectations, sales exceeded the previous year.",opts:["Sales were exactly as expected.","Contrary to expectations, sales exceeded the previous year.","Sales fell below the previous year.","The forecast was made last year."]},
  {stage:6,q:"彼の主張は一見もっともらしいが、根拠に乏しい。",prompt:"Choose the best meaning.",a:"His argument seems plausible at first glance, but lacks evidence.",opts:["His argument is supported by extensive evidence.","His argument seems plausible at first glance, but lacks evidence.","His claim was immediately rejected as impossible.","His evidence is difficult to understand."]},
  {stage:6,q:"制度の見直しをめぐって、関係者の意見は真っ向から対立した。",prompt:"Choose the best meaning.",a:"The parties' opinions were directly opposed over reviewing the system.",opts:["Everyone agreed to keep the system unchanged.","The parties' opinions were directly opposed over reviewing the system.","Only one person reviewed the system.","The system was revised without discussion."]}
];
hira.forEach(([ch,rom])=>questions.push({stage:0,q:ch,prompt:"Choose the correct reading.",a:rom,opts:makeKanaOpts(hira,rom),kana:ch,kanaType:"hiragana"}));
kata.forEach(([ch,rom])=>questions.push({stage:1,q:ch,prompt:"Choose the correct reading.",a:rom,opts:makeKanaOpts(kata,rom),kana:ch,kanaType:"katakana"}));

// Ensure every kana-based question contributes to mastery, including the original starter questions.
questions.forEach(q=>{
  if(q.kana) return;
  if(q.stage===0){
    if(hira.some(([ch])=>ch===q.q)) { q.kana=q.q; q.kanaType="hiragana"; }
    else if(hira.some(([ch])=>ch===q.a)) { q.kana=q.a; q.kanaType="hiragana"; }
  }
  if(q.stage===1){
    if(kata.some(([ch])=>ch===q.q)) { q.kana=q.q; q.kanaType="katakana"; }
    else if(kata.some(([ch])=>ch===q.a)) { q.kana=q.a; q.kanaType="katakana"; }
  }
});


// v1.8 expanded learning content. Static templates create variety without network access.
function addQuestion(question){
  question.id=question.id||`q-${questions.length}-${question.stage}`;
  questions.push(question);
}

// Add reverse-recognition kana questions and beginner vocabulary so kana mines are not one-note.
function makeKanaCharOpts(set,correct){const pool=set.map(x=>x[0]).filter(x=>x!==correct);return shuffle([correct,...shuffle(pool).slice(0,3)]);}
hira.forEach(([ch,rom])=>addQuestion({stage:0,q:`Which hiragana represents “${rom}”?`,prompt:"Choose the character.",a:ch,opts:makeKanaCharOpts(hira,ch),kana:ch,kanaType:"hiragana",kind:"recognition"}));
kata.forEach(([ch,rom])=>addQuestion({stage:1,q:`Which katakana represents “${rom}”?`,prompt:"Choose the character.",a:ch,opts:makeKanaCharOpts(kata,ch),kana:ch,kanaType:"katakana",kind:"recognition"}));

// Hiragana and Katakana mines intentionally contain kana-only drills.
// Vocabulary, kanji, grammar, and sentence learning begin in the JLPT N5 Quarry.
function wordOptions(list,answer,index){
  const pool=[...new Set(list.map(x=>x[index]).filter(x=>x!==answer))];
  return shuffle([answer,...shuffle(pool).slice(0,3)]);
}

const n5Vocab=[
 ["人","ひと","person"],["日","ひ","day/sun"],["月","つき","moon/month"],["火","ひ","fire"],["水","みず","water"],["木","き","tree"],["金","かね","money/gold"],["土","つち","earth/soil"],
 ["山","やま","mountain"],["川","かわ","river"],["田","た","rice field"],["口","くち","mouth"],["目","め","eye"],["耳","みみ","ear"],["手","て","hand"],["足","あし","foot/leg"],
 ["上","うえ","above"],["下","した","below"],["中","なか","inside"],["外","そと","outside"],["前","まえ","front/before"],["後","あと","after/behind"],["左","ひだり","left"],["右","みぎ","right"],
 ["大きい","おおきい","big"],["小さい","ちいさい","small"],["新しい","あたらしい","new"],["古い","ふるい","old"],["高い","たかい","expensive/high"],["安い","やすい","cheap"],
 ["行く","いく","to go"],["来る","くる","to come"],["見る","みる","to see"],["聞く","きく","to listen/ask"],["話す","はなす","to speak"],["読む","よむ","to read"],
 ["食べる","たべる","to eat"],["飲む","のむ","to drink"],["買う","かう","to buy"],["帰る","かえる","to return home"]
];
const n5Grammar=[
 ["わたし___がくせいです。","は","I am a student.","Topic marker は"],
 ["みず___のみます。","を","I drink water.","Object marker を"],
 ["がっこう___いきます。","に","I go to school.","Destination marker に"],
 ["ともだち___はなします。","と","I talk with a friend.","Partner marker と"],
 ["でんしゃ___いきます。","で","I go by train.","Means marker で"],
 ["これはだれ___ほんですか。","の","Whose book is this?","Possession marker の"],
 ["ねこ___います。","が","There is a cat.","Subject marker が"],
 ["つくえのうえ___ほんがあります。","に","There is a book on the desk.","Location marker に"],
 ["きょう___あした、いきます。","か","I will go today or tomorrow.","Choice particle か"],
 ["コーヒー___おちゃをのみます。","か","I drink coffee or tea.","Choice particle か"]
];
const n5Sentences=[
 ["私は学生です。","わたしは がくせいです。","I am a student."],
 ["毎朝七時に起きます。","まいあさ しちじに おきます。","I wake up at seven every morning."],
 ["駅はどこですか。","えきは どこですか。","Where is the station?"],
 ["今日は雨です。","きょうは あめです。","It is rainy today."],
 ["母は料理が上手です。","ははは りょうりが じょうずです。","My mother is good at cooking."],
 ["日曜日に友達と映画を見ます。","にちようびに ともだちと えいがを みます。","I watch a movie with a friend on Sunday."],
 ["この本はとても面白いです。","この ほんは とても おもしろいです。","This book is very interesting."],
 ["日本語を少し話します。","にほんごを すこし はなします。","I speak a little Japanese."],
 ["スーパーで野菜を買いました。","スーパーで やさいを かいました。","I bought vegetables at the supermarket."],
 ["明日は学校へ行きません。","あしたは がっこうへ いきません。","I will not go to school tomorrow."]
];
function rubyWord(kanji,reading){return `<ruby>${kanji}<rt>${reading}</rt></ruby>`;}
n5Vocab.forEach(([kanji,reading,meaning])=>{
  addQuestion({stage:2,tier:"beginner",support:"guided",q:reading,displayGuided:reading,displayStandard:rubyWord(kanji,reading),displayChallenge:kanji,prompt:"Choose the meaning.",a:meaning,opts:wordOptions(n5Vocab,meaning,2),help:`${kanji} is read ${reading} and means “${meaning}.”`,kind:"vocabulary"});
  addQuestion({stage:2,tier:"beginner",support:"guided",q:`Which word means “${meaning}”?`,prompt:"Choose the reading.",a:reading,opts:wordOptions(n5Vocab,reading,1),help:`${kanji} is read ${reading}.`,kind:"vocabulary"});
  addQuestion({stage:2,tier:"intermediate",support:"standard",q:kanji,concealedPrompt:kanji,displayChallenge:kanji,prompt:"Choose the correct reading.",a:reading,opts:wordOptions(n5Vocab,reading,1),help:`Meaning: ${meaning}. Reading: ${reading}.`,kind:"reading"});
});
n5Grammar.forEach(([sentence,particle,meaning,note])=>{
  addQuestion({stage:2,tier:"intermediate",support:"guided",q:sentence,prompt:"Choose the missing particle.",a:particle,opts:shuffle([particle,...["は","が","を","に","で","と","の","へ","か"].filter(x=>x!==particle).slice(0,3)]),help:`${note}. Full meaning: ${meaning}`,kind:"grammar"});
});
n5Sentences.forEach(([sentence,reading,meaning])=>{
  addQuestion({stage:2,tier:"advanced",support:"standard",q:sentence,displayGuided:reading,displayStandard:`<div>${sentence}</div><small class="furigana-line">${reading}</small>`,displayChallenge:sentence,prompt:"Choose the best meaning.",a:meaning,opts:wordOptions(n5Sentences,meaning,2),help:`Reading: ${reading}<br>Meaning: ${meaning}`,kind:"sentence"});
});



// Personalized Tutor Curriculum (lessons 1010–1028)
// These questions are kept inside N5 while maintaining separate tutor tags and filters.
const tutorVocabulary = [
  ["eat","たべる","taberu"],["drink","のむ","nomu"],["go","いく","iku"],["come","くる","kuru"],["do","する","suru"],
  ["study","べんきょうする","benkyou suru"],["buy","かう","kau"],["listen","きく","kiku"],["watch / see","みる","miru"],["sleep","ねる","neru"],
  ["make","つくる","tsukuru"],["wash","あらう","arau"],["clean","そうじする","souji suru"],["throw away","すてる","suteru"],["collect","あつめる","atsumeru"],
  ["teach","おしえる","oshieru"],["speak","はなす","hanasu"],["read","よむ","yomu"],["write","かく","kaku"],["pay","はらう","harau"],
  ["wait","まつ","matsu"],["understand","わかる","wakaru"],["forget","わすれる","wasureru"],["help","てつだう","tetsudau"],
  ["apple","りんご","ringo"],["water","みず","mizu"],["book","ほん","hon"],["house","いえ","ie"],["cafe","カフェ","kafe"],
  ["Japan","にほん","Nihon"],["Japanese language","にほんご","Nihongo"],["friend","ともだち","tomodachi"],["wife","つま","tsuma"],["teacher","せんせい","sensei"],
  ["gym","ジム","jimu"],["workout","きんトレ","kintore"],["car","くるま","kuruma"],["ticket","チケット","chiketto"],["station","えき","eki"],
  ["picture","しゃしん","shashin"],["reservation","よやく","yoyaku"],["movie","えいが","eiga"],["TV show","テレビばんぐみ","terebi bangumi"],["food","たべもの","tabemono"],
  ["clothes","ふく","fuku"],["weather","てんき","tenki"],["morning","あさ","asa"],["night","よる","yoru"],["weekend","しゅうまつ","shuumatsu"],
  ["question","しつもん","shitsumon"],["cat","ねこ","neko"],["dog","いぬ","inu"],["today","きょう","kyou"],["yesterday","きのう","kinou"],
  ["tomorrow","あした","ashita"],["now","いま","ima"],["what","なに","nani"],["where","どこ","doko"],["when","いつ","itsu"],
  ["who","だれ","dare"],["how","どうやって","douyatte"],["expensive / tall","たかい","takai"],["cheap","やすい","yasui"],["delicious","おいしい","oishii"],
  ["good","いい","ii"],["cute","かわいい","kawaii"],["beautiful / clean","きれい","kirei"],["hot","あつい","atsui"],["cold","さむい","samui"],
  ["sleepy","ねむい","nemui"],["healthy / energetic","げんき","genki"],["so-so","まあまあ","maamaa"]
];
function tutorOpts(index,value){
  const vals=[...new Set(tutorVocabulary.map(row=>row[index]).filter(v=>v!==value))];
  return shuffle([value,...shuffle(vals).slice(0,3)]);
}
tutorVocabulary.forEach(([english,japanese,romaji])=>{
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"vocabulary",tier:"beginner",q:english,prompt:"Choose the Japanese word from your tutor vocabulary.",a:japanese,opts:tutorOpts(1,japanese),help:`${english} = ${japanese} (${romaji})`,kind:"tutor-vocabulary"});
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"vocabulary",tier:"beginner",q:japanese,prompt:"Choose the English meaning.",a:english,opts:tutorOpts(0,english),help:`${japanese} is ${romaji} and means “${english}.”`,kind:"tutor-vocabulary"});
});

const tutorVerbForms = [
  ["たべる","Ru","たべます","たべました","たべない","たべた","たべて"],
  ["みる","Ru","みます","みました","みない","みた","みて"],
  ["のむ","U","のみます","のみました","のまない","のんだ","のんで"],
  ["かく","U","かきます","かきました","かかない","かいた","かいて"],
  ["かう","U","かいます","かいました","かわない","かった","かって"],
  ["はなす","U","はなします","はなしました","はなさない","はなした","はなして"],
  ["いく","U special","いきます","いきました","いかない","いった","いって"],
  ["する","irregular","します","しました","しない","した","して"],
  ["くる","irregular","きます","きました","こない","きた","きて"]
];
const formLabels=[[2,"polite present"],[3,"polite past"],[4,"negative plain"],[5,"casual past"],[6,"te-form"]];
tutorVerbForms.forEach(row=>{
  const [dict,group]=row;
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"verbs",tier:"intermediate",q:dict,prompt:"Which verb group is this?",a:group,opts:shuffle([group,...["Ru","U","U special","irregular"].filter(x=>x!==group).slice(0,3)]),help:`${dict} is a ${group} verb.`,kind:"tutor-verb"});
  formLabels.forEach(([idx,label])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"verbs",tier:"intermediate",q:dict,prompt:`Choose the ${label} form.`,a:row[idx],opts:shuffle([row[idx],...shuffle(tutorVerbForms.map(r=>r[idx]).filter(x=>x!==row[idx])).slice(0,3)]),help:`${dict} → ${row[idx]} (${label})`,kind:"tutor-verb"}));
});

const tutorParticles = [
  ["わたし___りんごをたべます。","は","As for me, I eat an apple."],
  ["いえ___すしをたべます。","で","I eat sushi at home."],
  ["ごぜんしちじ___おきます。","に","I wake up at 7 a.m."],
  ["つま___ひろしまにいきました。","と","I went to Hiroshima with my wife."],
  ["このほんはわたし___ほんです。","の","This book is my book."],
  ["ねこ___りんごをたべた。","が","The cat ate an apple."],
  ["とうきょう___おおさかまでどのくらいかかりますか。","から","How long does it take from Tokyo to Osaka?"],
  ["カード___はらいます。","で","I pay by card."],
  ["りんご___すきです。","が","I like apples."],
  ["えき___いきます。","に","I go to the station."]
];
tutorParticles.forEach(([sentence,answer,meaning])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"particles",tier:"intermediate",q:sentence,prompt:"Choose the missing particle.",a:answer,opts:shuffle([answer,...shuffle(["は","が","を","に","で","と","の","から","まで"]).filter(x=>x!==answer).slice(0,3)]),help:`${sentence.replace('___',answer)}<br>${meaning}`,kind:"tutor-particle"}));

const tutorPatterns = [
  ["I want an apple.","～がほしい","りんごがほしいです。"],
  ["I want to eat.","～たい","たべたいです。"],
  ["Please eat.","～てください","たべてください。"],
  ["I want you to eat.","～てほしい","たべてほしいです。"],
  ["I can eat.","potential / ことができる","たべられます。"],
  ["I plan to go.","～つもり","いくつもりです。"],
  ["I have been to Japan.","～たことがある","にほんにいったことがあります。"],
  ["May I watch this movie?","～てもいい","このえいがをみてもいいですか。"]
];
tutorPatterns.forEach(([english,pattern,japanese])=>{
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"patterns",tier:"intermediate",q:english,prompt:"Choose the best grammar pattern.",a:pattern,opts:shuffle([pattern,...shuffle(tutorPatterns.map(x=>x[1]).filter(x=>x!==pattern)).slice(0,3)]),help:`${japanese}`,kind:"tutor-pattern"});
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"patterns",tier:"advanced",q:english,prompt:"Choose the best Japanese sentence.",a:japanese,opts:shuffle([japanese,...shuffle(tutorPatterns.map(x=>x[2]).filter(x=>x!==japanese)).slice(0,3)]),help:`Pattern: ${pattern}`,kind:"tutor-pattern"});
});

const tutorAdjectives = [
  ["おいしい","not delicious","おいしくない"],["おいしい","was delicious","おいしかった"],["いい","was good","よかった"],
  ["あつい","was not hot","あつくなかった"],["きれい","not clean / pretty","きれいじゃない"],["しずか","was quiet","しずかでした"]
];
tutorAdjectives.forEach(([base,request,answer])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"adjectives",tier:"intermediate",q:base,prompt:`Choose the form meaning “${request}.”`,a:answer,opts:shuffle([answer,...shuffle(tutorAdjectives.map(x=>x[2]).filter(x=>x!==answer)).slice(0,3)]),help:`${base} → ${answer}`,kind:"tutor-adjective"}));

const tutorConversation = [
  ["きょうなにをしましたか。","What did you do today?"],["あしたなにをしたいですか。","What do you want to do tomorrow?"],
  ["なんでにほんごをべんきょうしていますか。","Why are you studying Japanese?"],["しゅうまつなにをするつもりですか。","What do you plan to do this weekend?"],
  ["いまなんじですか。","What time is it now?"],["どうやってジムにいきますか。","How do you go to the gym?"],
  ["まいにちどのくらいにほんごをべんきょうしますか。","How long do you study Japanese every day?"],["これはいくらですか。","How much is this?"]
];
tutorConversation.forEach(([jp,en])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"conversation",tier:"advanced",q:jp,prompt:"Choose the best meaning for this tutor conversation question.",a:en,opts:shuffle([en,...shuffle(tutorConversation.map(x=>x[1]).filter(x=>x!==en)).slice(0,3)]),help:`${jp}<br>${en}`,kind:"tutor-conversation"}));

const advancedBanks={
  3:[ ["必要","ひつよう","necessary"],["経験","けいけん","experience"],["予定","よてい","plan/schedule"],["準備","じゅんび","preparation"],["説明","せつめい","explanation"],["連絡","れんらく","contact"],["約束","やくそく","promise"],["最近","さいきん","recently"],["特別","とくべつ","special"],["残念","ざんねん","regrettable"] ],
  4:[ ["影響","えいきょう","influence"],["状況","じょうきょう","situation"],["結果","けっか","result"],["原因","げんいん","cause"],["判断","はんだん","judgment"],["解決","かいけつ","solution"],["増加","ぞうか","increase"],["減少","げんしょう","decrease"],["確認","かくにん","confirmation"],["提案","ていあん","proposal"] ],
  5:[ ["確保","かくほ","securing"],["実現","じつげん","realization"],["傾向","けいこう","trend"],["方針","ほうしん","policy"],["対象","たいしょう","target"],["課題","かだい","issue/task"],["評価","ひょうか","evaluation"],["維持","いじ","maintenance"],["適切","てきせつ","appropriate"],["相当","そうとう","considerable" ] ],
  6:[ ["根拠","こんきょ","basis/evidence"],["乏しい","とぼしい","scarce/lacking"],["見直し","みなおし","review/reconsideration"],["対立","たいりつ","conflict/opposition"],["妥当","だとう","valid/reasonable"],["著しい","いちじるしい","remarkable"],["促進","そくしん","promotion/acceleration"],["概念","がいねん","concept"],["遂行","すいこう","execution"],["把握","はあく","grasp/understanding"] ]
};
Object.entries(advancedBanks).forEach(([stage,list])=>{
  stage=Number(stage);
  list.forEach(([word,reading,meaning])=>{
    addQuestion({stage,q:word,concealedPrompt:word,displayChallenge:word,hideReadingInPrompt:true,prompt:"Choose the meaning.",a:meaning,opts:wordOptions(list,meaning,2),help:`${word} is read ${reading} and means “${meaning}.”`,kind:"vocabulary"});
    addQuestion({stage,q:word,concealedPrompt:word,displayChallenge:word,prompt:"Choose the reading.",a:reading,opts:wordOptions(list,reading,1),help:`Meaning: ${meaning}.`,kind:"reading"});
  });
});
questions.forEach((q,i)=>{if(!q.id) q.id=`base-${q.stage}-${i}`;});

const DEFAULT_STATE = {
  supportMode:"guided", n5Tier:"beginner", n5Curriculum:"mixed", tutorTrack:"all",
  n5AcademyMastery:{}, academyTestBest:0, academyReviewDate:"", recentQuestionIds:[], onboardingComplete:false, placementResult:null,
  gems:0, hearts:3, maxHearts:3, level:1, xp:0, streak:0, bestStreak:0, practiceStreak:0,
  hints:2, shields:1, active:null, answered:false, shieldArmed:false, lastPracticeDate:null,
  kanaStats:{}, gemInventory:{}, kanaTab:"hiragana", lastKana:null, lastGem:null, hiraganaXp:0,
  heartRecoveryEnd:null, ownedPickaxeSkins:["standard"], equippedPickaxeSkin:"standard", ownedWallpapers:["midnight"], equippedWallpaper:"midnight", placementUnlockedThrough:0, developerInfiniteHearts:false,
  selectedStage:0, soundEnabled:true, voiceEnabled:true, autoSpeak:true, voiceRate:.85, smartReview:true, sessionGoal:20, sessionAnswered:0, sessionCorrect:0, stageXp:[0,0,0,0,0,0,0], clearedStages:[], questionStats:{}
};
const PROFILE_INDEX_KEY="jm_profiles";
const ACTIVE_PROFILE_KEY="jm_active_profile";
let activeProfileId=null;
let state=structuredClone(DEFAULT_STATE);
let appStarted=false;
let isDeveloperSession=false;
const DEVELOPER_NAME="Erendragneel";
const DEVELOPER_PIN_HASH=pinHash("217838",DEVELOPER_NAME);

function profileStorageKey(id){ return `jm_profile_${id}`; }
function readProfiles(){
  try{return JSON.parse(localStorage.getItem(PROFILE_INDEX_KEY))||[];}catch{return [];}
}
function writeProfiles(profiles){localStorage.setItem(PROFILE_INDEX_KEY,JSON.stringify(profiles));}
function normalizeName(name){return name.trim().replace(/\s+/g," ");}
function profileIdFromName(name){return normalizeName(name).toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||`player-${Date.now()}`;}
function pinHash(pin,name){
  let h=2166136261;
  const text=`${normalizeName(name).toLowerCase()}|${pin}|japanese-miner`;
  for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0).toString(16).padStart(8,"0");
}
function normalizeState(raw){
  const next={...structuredClone(DEFAULT_STATE),...(raw||{})};
  next.maxHearts=Math.min(14,next.maxHearts||3);
  next.hearts=Math.min(next.maxHearts,next.hearts??3);
  next.practiceStreak=next.practiceStreak||0;
  next.kanaStats=next.kanaStats||{};
  next.gemInventory=next.gemInventory||{};
  next.kanaTab=next.kanaTab||"hiragana";
  next.lastKana=next.lastKana||null;
  next.lastGem=next.lastGem||null;
  next.heartRecoveryEnd=Number(next.heartRecoveryEnd)||null;
  next.ownedPickaxeSkins=Array.isArray(next.ownedPickaxeSkins)?next.ownedPickaxeSkins:["standard"];
  if(!next.ownedPickaxeSkins.includes("standard")) next.ownedPickaxeSkins.unshift("standard");
  const validPickaxeIds=["standard","copper","sakura","silver","frost","gold","neon","amethyst","inferno","galaxy","emerald","aurora","shadow","red-diamond"];
  next.equippedPickaxeSkin=validPickaxeIds.includes(next.equippedPickaxeSkin)?next.equippedPickaxeSkin:"standard";
  if(!next.ownedPickaxeSkins.includes(next.equippedPickaxeSkin)) next.equippedPickaxeSkin="standard";
  next.ownedWallpapers=Array.isArray(next.ownedWallpapers)?next.ownedWallpapers:["midnight"];
  if(!next.ownedWallpapers.includes("midnight"))next.ownedWallpapers.unshift("midnight");
  const validWallpaperIds=["midnight","sakura","bamboo","sunrise","crystal","paper","galaxy","emoji","inferno","aurora","ocean","confetti"];
  next.equippedWallpaper=validWallpaperIds.includes(next.equippedWallpaper)?next.equippedWallpaper:"midnight";
  if(!next.ownedWallpapers.includes(next.equippedWallpaper))next.equippedWallpaper="midnight";
  next.placementUnlockedThrough=Math.max(0,Math.min(stages.length-1,Number(next.placementUnlockedThrough)||0));
  if(next.stats && Object.keys(next.kanaStats).length===0){
    Object.entries(next.stats).forEach(([ch,v])=>{next.kanaStats[ch]={attempts:Number(v.attempts??v.a??0),correct:Number(v.correct??v.c??0)};});
  }
  Object.keys(next.kanaStats).forEach(ch=>{const v=next.kanaStats[ch]||{};next.kanaStats[ch]={attempts:Number(v.attempts??v.a??0),correct:Number(v.correct??v.c??0)};});
  if(next.hiraganaXp==null) next.hiraganaXp=hira.reduce((sum,[ch])=>sum+Number((next.kanaStats[ch]||{}).correct||0)*12,0);
  next.hiraganaXp=Math.max(0,Number(next.hiraganaXp)||0);
  next.stageXp=Array.isArray(next.stageXp)?next.stageXp.slice(0,stages.length).map(v=>Math.max(0,Number(v)||0)):Array(stages.length).fill(0);
  while(next.stageXp.length<stages.length) next.stageXp.push(0);
  next.stageXp[0]=Math.max(next.stageXp[0],next.hiraganaXp);
  next.hiraganaXp=next.stageXp[0];
  next.clearedStages=Array.isArray(next.clearedStages)?next.clearedStages.map(Number).filter(i=>i>=0&&i<stages.length):[];
  next.questionStats=next.questionStats&&typeof next.questionStats==="object"?next.questionStats:{};
  Object.keys(next.questionStats).forEach(id=>{const v=next.questionStats[id]||{};next.questionStats[id]={attempts:Math.max(0,Number(v.attempts)||0),correct:Math.max(0,Number(v.correct)||0)};});
  next.xp=Number(next.xp)||0;
  next.gems=Number(next.gems)||0;
  if(!next.stoneCurrencyMigrated){
    if(next.gems>0) next.gemInventory.Agate=Number(next.gemInventory.Agate||0)+Math.floor(next.gems);
    next.gems=0;next.stoneCurrencyMigrated=true;
  }
  next.streak=Number(next.streak)||0;
  next.developerInfiniteHearts=!!next.developerInfiniteHearts;
  next.selectedStage=Math.max(0,Math.min(stages.length-1,Number(next.selectedStage)||0));
  next.soundEnabled=next.soundEnabled!==false;
  next.voiceEnabled=next.voiceEnabled!==false;
  next.autoSpeak=next.autoSpeak!==false;
  next.voiceRate=Math.max(.55,Math.min(1.15,Number(next.voiceRate)||.85));
  next.smartReview=next.smartReview!==false;
  next.sessionGoal=Math.max(5,Math.min(100,Number(next.sessionGoal)||20));
  next.sessionAnswered=Math.max(0,Number(next.sessionAnswered)||0);
  next.sessionCorrect=Math.max(0,Math.min(next.sessionAnswered,Number(next.sessionCorrect)||0));
  next.supportMode=["guided","standard","challenge"].includes(next.supportMode)?next.supportMode:"guided";
  next.n5Tier=["beginner","intermediate","advanced"].includes(next.n5Tier)?next.n5Tier:"beginner";
  next.n5Curriculum=["standard","tutor","mixed"].includes(next.n5Curriculum)?next.n5Curriculum:"mixed";
  next.tutorTrack=["all","vocabulary","verbs","particles","patterns","adjectives","conversation"].includes(next.tutorTrack)?next.tutorTrack:"all";
  next.recentQuestionIds=Array.isArray(next.recentQuestionIds)?next.recentQuestionIds.slice(-20):[];
  next.n5AcademyMastery=next.n5AcademyMastery&&typeof next.n5AcademyMastery==="object"?next.n5AcademyMastery:{};
  next.academyTestBest=Math.max(0,Number(next.academyTestBest)||0);
  next.academyReviewDate=String(next.academyReviewDate||"");
  next.onboardingComplete=Boolean(next.onboardingComplete);
  next.placementResult=next.placementResult&&typeof next.placementResult==="object"?next.placementResult:null;
  return next;
}
function loadProfile(profile){
  activeProfileId=profile.id;
  isDeveloperSession=profile.name.toLowerCase()===DEVELOPER_NAME.toLowerCase() && profile.pinHash===DEVELOPER_PIN_HASH;
  localStorage.setItem(ACTIVE_PROFILE_KEY,profile.id);
  let raw=null;
  try{raw=JSON.parse(localStorage.getItem(profileStorageKey(profile.id)));}catch{}
  state=normalizeState(raw);
  applyDailyDecay();
  document.getElementById("activePlayerName").textContent=profile.name;
  const developerBtn=document.getElementById("developerBtn");
  if(developerBtn) developerBtn.hidden=!isDeveloperSession;
  const developerName=document.getElementById("developerProfileName");
  if(developerName) developerName.textContent=profile.name;
  document.getElementById("authOverlay").classList.add("hidden");
  if(!appStarted){appStarted=true;render();startRecoveryClock();}
  else render();
}
function logout(){
  save();activeProfileId=null;isDeveloperSession=false;
  closeDeveloperPanel();localStorage.removeItem(ACTIVE_PROFILE_KEY);
  document.getElementById("activePlayerName").textContent="Not signed in";
  document.getElementById("authOverlay").classList.remove("hidden");
  showAuthMode("login");renderProfileList();
}
function save(){
  if(!activeProfileId) return;
  try{ localStorage.setItem(profileStorageKey(activeProfileId),JSON.stringify(state)); }
  catch(err){ console.error("Japanese Miner save failed",err); }
}
const KATAKANA_XP_REQUIREMENT=STAGE_XP_REQUIREMENTS[0];
function kanaSetMastery(set){
  if(!set.length) return 0;
  return Math.round(set.reduce((sum,[ch])=>sum+masteryScore(ch),0)/set.length);
}
function questionMasteryScore(stat){
  if(!stat || !stat.attempts || !stat.correct) return 0;
  const accuracy=Math.min(1,stat.correct/stat.attempts);
  const repetition=Math.min(1,stat.correct/3);
  return Math.round(accuracy*repetition*100);
}
function stageMastery(i){
  if(i===0) return kanaSetMastery(hira);
  if(i===1) return kanaSetMastery(kata);
  const pool=questions.filter(q=>q.stage===i);
  if(!pool.length) return 0;
  return Math.round(pool.reduce((sum,q)=>sum+questionMasteryScore(state.questionStats?.[q.id]),0)/pool.length);
}
function tutorCurriculumMastery(){
  const pool=questions.filter(q=>q.stage===2 && q.curriculum==="tutor");
  if(!pool.length) return 0;
  return Math.round(pool.reduce((sum,q)=>sum+questionMasteryScore(state.questionStats?.[q.id]),0)/pool.length);
}
function stageXpComplete(i){
  return Number(state.stageXp?.[i]||0)>=STAGE_XP_REQUIREMENTS[i];
}
function stageMasteryComplete(i){
  return stageMastery(i)>=STAGE_MASTERY_REQUIREMENTS[i];
}
function stageComplete(i){
  return stageXpComplete(i) && stageMasteryComplete(i);
}
function hiraganaMastered(){ return stageMasteryComplete(0); }
function katakanaUnlocked(){ return stageComplete(0); }
function isStageUnlocked(i){
  if(i===0) return true;
  if(Number(state.placementUnlockedThrough||0)>=i) return true;
  return stageComplete(i-1);
}
function stageIndex(){
  let idx=0;
  stages.forEach((_,i)=>{ if(isStageUnlocked(i)) idx=i; });
  return idx;
}
function selectedStageIndex(){
  const highest=stageIndex();
  const selected=Math.max(0,Math.min(highest,Number(state.selectedStage)||0));
  if(selected!==state.selectedStage) state.selectedStage=selected;
  return selected;
}
function syncSelectedStageUI(){
  const idx=selectedStageIndex();
  const stage=stages[idx];
  const quickStage=document.getElementById("quickStage");
  const stageName=document.getElementById("stageName");
  const quickMineLabel=document.getElementById("quickMineLabel");
  const soundToggle=document.getElementById("soundToggle");
  if(quickStage) quickStage.textContent=stage.label;
  if(stageName) stageName.textContent=stage.name;
  if(quickMineLabel) quickMineLabel.textContent=state.active&&!state.answered?"Return to Question":"New Question";
  if(soundToggle) soundToggle.checked=state.soundEnabled!==false;
  const supportMode=document.getElementById("supportMode");
  const n5Tier=document.getElementById("n5Tier");
  const n5TierWrap=document.getElementById("n5TierWrap");
  const n5Curriculum=document.getElementById("n5Curriculum");
  const n5CurriculumWrap=document.getElementById("n5CurriculumWrap");
  const tutorTrack=document.getElementById("tutorTrack");
  const tutorTrackWrap=document.getElementById("tutorTrackWrap");
  const tutorMasteryLabel=document.getElementById("tutorMasteryLabel");
  if(supportMode) supportMode.value=state.supportMode||"guided";
  if(n5Tier) n5Tier.value=state.n5Tier||"beginner";
  if(n5Curriculum) n5Curriculum.value=state.n5Curriculum||"mixed";
  if(tutorTrack) tutorTrack.value=state.tutorTrack||"all";
  if(n5TierWrap) n5TierWrap.hidden=idx!==2;
  if(n5CurriculumWrap) n5CurriculumWrap.hidden=idx!==2;
  if(tutorTrackWrap) tutorTrackWrap.hidden=idx!==2 || state.n5Curriculum==="standard";
  if(tutorMasteryLabel) tutorMasteryLabel.textContent=`Tutor curriculum mastery: ${tutorCurriculumMastery()}%`;
}

function selectStage(index,openCourse=false){
  index=Math.max(0,Math.min(stages.length-1,Number(index)||0));
  if(!isStageUnlocked(index)){
    setMessage(`${stages[index].label} is still locked.`,"wrong");
    return;
  }
  state.selectedStage=index;
  state.active=null;
  state.answered=false;
  state.shieldArmed=false;
  document.getElementById("challengeArea").innerHTML='<div class="empty">Tap the rock to begin this learning stage.</div>';
  setMessage(`${stages[index].name} selected. New challenges will come only from ${stages[index].label}.`,"correct");
  syncSelectedStageUI();
  render();
  if(index===2 && openCourse) openAcademy();
}
function xpNeed(){ return 80 + state.level*20; }

function totalStoneValue(){
  return gemTiers.reduce((sum,g)=>sum+Number(state.gemInventory[g.name]||0)*g.value,0);
}
function addStoneChange(value,maxIndex){
  let remaining=Math.max(0,Math.floor(value));
  for(let i=Math.min(maxIndex,gemTiers.length-1);i>=0;i--){
    const g=gemTiers[i];
    const count=Math.floor(remaining/g.value);
    if(count>0){
      state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)+count;
      remaining-=count*g.value;
    }
  }
}
function spendStoneValue(cost){
  cost=Math.max(0,Math.floor(cost));
  if(totalStoneValue()<cost) return false;
  let remaining=cost;
  // Spend low denominations first.
  for(let i=0;i<gemTiers.length && remaining>0;i++){
    const g=gemTiers[i];
    const owned=Number(state.gemInventory[g.name]||0);
    const use=Math.min(owned,Math.floor(remaining/g.value));
    if(use>0){
      state.gemInventory[g.name]=owned-use;
      remaining-=use*g.value;
    }
  }
  // Break one larger stone when exact payment is not possible and return change.
  if(remaining>0){
    const idx=gemTiers.findIndex(g=>g.value>=remaining && Number(state.gemInventory[g.name]||0)>0);
    if(idx<0) return false;
    const g=gemTiers[idx];
    state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)-1;
    addStoneChange(g.value-remaining,idx-1);
    remaining=0;
  }
  return true;
}
const PICKAXE_SKINS = [
  {id:"standard", name:"Standard Pickaxe", icon:"⛏️", cost:0, desc:"The dependable starter tool."},
  {id:"copper", name:"Copper Pickaxe", icon:"⛏️", cost:25000, desc:"A warm copper finish for early miners."},
  {id:"sakura", name:"Sakura Pickaxe", icon:"⛏️", cost:60000, desc:"A soft pink pickaxe inspired by cherry blossoms."},
  {id:"silver", name:"Silver Pickaxe", icon:"⛏️", cost:125000, desc:"A polished silver tool with a cool shine."},
  {id:"frost", name:"Frost Pickaxe", icon:"⛏️", cost:300000, desc:"An icy blue tool sparkling with frozen light."},
  {id:"gold", name:"Golden Pickaxe", icon:"⛏️", cost:625000, desc:"A prestigious golden mining skin."},
  {id:"neon", name:"Neon Pickaxe", icon:"⛏️", cost:1500000, desc:"An electric cyan tool from the city mines."},
  {id:"amethyst", name:"Amethyst Pickaxe", icon:"⛏️", cost:3125000, desc:"A purple crystal-infused pickaxe."},
  {id:"inferno", name:"Inferno Pickaxe", icon:"⛏️", cost:7500000, desc:"A blazing tool forged in the flame mine."},
  {id:"galaxy", name:"Galaxy Pickaxe", icon:"⛏️", cost:12000000, desc:"A deep-space finish surrounded by starlight."},
  {id:"emerald", name:"Emerald Pickaxe", icon:"⛏️", cost:15625000, desc:"A vivid green endgame-style tool."},
  {id:"aurora", name:"Aurora Pickaxe", icon:"⛏️", cost:30000000, desc:"Shifting northern-light colors for master miners."},
  {id:"shadow", name:"Shadow Pickaxe", icon:"⛏️", cost:50000000, desc:"A mysterious dark-metal pickaxe with a violet glow."},
  {id:"red-diamond", name:"Red Diamond Pickaxe", icon:"⛏️", cost:78125000, desc:"The rarest and most luxurious current skin."}
];

const SHOP_PRICE_BY_STAGE = [
  {hint:2500, shield:10000, heart:50000},
  {hint:12500, shield:50000, heart:250000},
  {hint:62500, shield:250000, heart:1250000},
  {hint:312500, shield:1250000, heart:6250000},
  {hint:1562500, shield:6250000, heart:31250000},
  {hint:7812500, shield:31250000, heart:156250000},
  {hint:39062500, shield:156250000, heart:781250000}
];
function currentShopPrices(){
  return SHOP_PRICE_BY_STAGE[Math.min(stageIndex(),SHOP_PRICE_BY_STAGE.length-1)];
}
function heartRestoreCost(){ return currentShopPrices().heart; }
const HEART_RECOVERY_MS=30*60*1000;
let heartRecoveryInterval=null;
function ensureHeartRecovery(){
  const now=Date.now();
  if(state.heartRecoveryEnd && now>=state.heartRecoveryEnd){
    state.hearts=Math.min(state.maxHearts,Math.max(0,Number(state.hearts)||0)+3);
    state.heartRecoveryEnd=null;
    save();
    setMessage("Recovery complete! You gained 3 hearts.","correct");
  }
  if(state.hearts<=0 && !state.heartRecoveryEnd){
    state.heartRecoveryEnd=now+HEART_RECOVERY_MS;
    save();
  }
  if(state.hearts>0){
    if(state.heartRecoveryEnd){ state.heartRecoveryEnd=null; save(); }
  }
}
function renderRecovery(){
  ensureHeartRecovery();
  const box=document.getElementById("recoveryBox");
  const time=document.getElementById("recoveryTime");
  const active=state.hearts<=0 && state.heartRecoveryEnd;
  const hud=document.getElementById('heartRecoveryHud'),hudTime=document.getElementById('heartRecoveryHudTime');
  if(hud)hud.classList.toggle('active',!!active);
  if(active){
    const remaining=Math.max(0,state.heartRecoveryEnd-Date.now());
    const total=Math.ceil(remaining/1000);
    const min=String(Math.floor(total/60)).padStart(2,"0");
    const sec=String(total%60).padStart(2,"0");
    if(time)time.textContent=`${min}:${sec}`;
    if(hudTime)hudTime.textContent=`${min}:${sec}`;
  }
  if(!box||!time) return;
  box.classList.toggle("active",!!active);
}
function startRecoveryClock(){
  if(heartRecoveryInterval) clearInterval(heartRecoveryInterval);
  heartRecoveryInterval=setInterval(()=>{
    const before=state.hearts;
    renderRecovery();
    if(state.hearts!==before) render();
  },1000);
}

function render(){
  ensureHeartRecovery();
  // Each display group is rendered independently so one visual error cannot
  // prevent XP, kana mastery, or the gem collection from refreshing.
  try{
    document.getElementById("stoneWealth").textContent=totalStoneValue().toLocaleString();
    document.getElementById("hearts").textContent=state.hearts;
    document.getElementById("maxHeartsTop").textContent=state.maxHearts;
    document.getElementById("practiceStreak").textContent=state.practiceStreak;
    document.getElementById("healthText").textContent=`${state.hearts}/${state.maxHearts}`;
    document.getElementById("healthFill").style.width=(state.hearts/state.maxHearts*100)+"%";
    const nextHeartStone=maxHeartCost();
    document.getElementById("maxHeartCost").textContent=nextHeartStone?`1 ${nextHeartStone}`:"MAX";
    const maxHeartBtn=document.getElementById("maxHeartBtn");
    if(maxHeartBtn){
      maxHeartBtn.disabled=!nextHeartStone;
      maxHeartBtn.title=nextHeartStone?`Consumes 1 ${nextHeartStone} from your collection`:"Maximum health reached";
    }
    document.getElementById("level").textContent=state.level;
    document.getElementById("streak").textContent=state.streak;
    document.getElementById("hints").textContent=state.hints;
    document.getElementById("shields").textContent=state.shields;
    document.getElementById("invHints").textContent=state.hints;
    document.getElementById("invShields").textContent=state.shields;
    document.getElementById("bestStreak").textContent=state.bestStreak;
    const activeMine=selectedStageIndex();
    const shownXp=Number(state.stageXp[activeMine]||0);
    const shownNeed=STAGE_XP_REQUIREMENTS[activeMine];
    document.getElementById("xp").textContent=Math.min(shownXp,shownNeed).toLocaleString();
    document.getElementById("xpNeed").textContent=shownNeed.toLocaleString();
    document.getElementById("xpBar").style.width=Math.min(100,shownXp/shownNeed*100)+"%";
    document.body.dataset.mine=String(activeMine);
    syncSelectedStageUI();
    document.getElementById("hintBtn").disabled=!state.active || state.answered || state.hints<1;
    document.getElementById("shieldBtn").disabled=!state.active || state.answered || state.shields<1 || state.shieldArmed;
    document.getElementById("nextBtn").disabled=!state.answered;
    document.getElementById("shieldBtn").textContent=state.shieldArmed ? "🛡️ Shield Armed" : `🛡️ Use Shield (${state.shields})`;
    const shopPrices=currentShopPrices();
    document.getElementById("hintShopPrice").textContent=`${shopPrices.hint.toLocaleString()} Nuggets`;
    document.getElementById("shieldShopPrice").textContent=`${shopPrices.shield.toLocaleString()} Nuggets`;
    document.getElementById("heartShopPrice").textContent=`${shopPrices.heart.toLocaleString()} Nuggets`;
    updateSessionDashboard();
    const vt=document.getElementById('voiceToggle'),at=document.getElementById('autoSpeakToggle'),sr=document.getElementById('smartReviewToggle'),vr=document.getElementById('voiceRate');
    if(vt)vt.checked=state.voiceEnabled;if(at)at.checked=state.autoSpeak;if(sr)sr.checked=state.smartReview;if(vr)vr.value=state.voiceRate;
    const vrl=document.getElementById('voiceRateLabel');if(vrl)vrl.textContent=`${Number(state.voiceRate).toFixed(2)}×`;
  }catch(err){ console.error("Core display refresh failed",err); }
  try{ renderPath(); }catch(err){ console.error("Path refresh failed",err); }
  try{ renderKanaChart(); }catch(err){ console.error("Kana chart refresh failed",err); }
  try{ renderGemCollection(); }catch(err){ console.error("Gem collection refresh failed",err); }
  try{ renderPickaxeShop(); }catch(err){ console.error("Pickaxe workshop refresh failed",err); }
  try{ renderRecovery(); }catch(err){ console.error("Heart recovery refresh failed",err); }
  save();
}

function renderPath(){
  const p=document.getElementById("path"); p.innerHTML="";
  const current=selectedStageIndex();
  stages.forEach((s,i)=>{
    const unlocked=isStageUnlocked(i);
    const complete=stageComplete(i);
    const progress=Math.min(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
    const mastery=stageMastery(i);
    const masteryNeed=STAGE_MASTERY_REQUIREMENTS[i];
    const d=document.createElement("div");
    d.className="stage "+(i===current?"active ":"")+(!unlocked?"locked ":"")+(complete?"complete":"");
    if(unlocked){
      d.setAttribute("role","button"); d.tabIndex=0; d.setAttribute("aria-label",`Select ${s.name}`);
      d.addEventListener("click",()=>selectStage(i,i===2));
      d.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectStage(i,i===2);}});
    }
    let badge,detail;
    if(!unlocked){
      const previous=i-1;
      const xpRemaining=Math.max(0,STAGE_XP_REQUIREMENTS[previous]-Number(state.stageXp[previous]||0));
      const masteryRemaining=Math.max(0,STAGE_MASTERY_REQUIREMENTS[previous]-stageMastery(previous));
      badge="Locked";
      detail=`Finish ${stages[previous].label}: ${xpRemaining.toLocaleString()} XP and ${masteryRemaining}% mastery remaining`;
    }else if(complete){
      badge=i===current?"Current • Cleared":"Cleared";
      detail=`${STAGE_XP_REQUIREMENTS[i].toLocaleString()} XP • ${mastery}% mastery`;
    }else{
      badge=i===current?"Current":`${Math.floor(progress/STAGE_XP_REQUIREMENTS[i]*100)}% XP`;
      detail=`${progress.toLocaleString()}/${STAGE_XP_REQUIREMENTS[i].toLocaleString()} XP • ${mastery}/${masteryNeed}% mastery`;
    }
    d.innerHTML=`<div><strong>${s.label}</strong><div class="small">${detail}</div></div><span class="badge">${badge}</span>`;
    p.appendChild(d);
  });
}


function makeKanaOpts(set, correct){
  const pool=[...new Set(set.map(x=>x[1]).filter(x=>x!==correct))];
  shuffle(pool);
  return shuffle([correct,...pool.slice(0,3)]);
}
function dateKey(d=new Date()){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function dayDifference(a,b){
  const x=new Date(a+"T12:00:00"), y=new Date(b+"T12:00:00");
  return Math.round((y-x)/86400000);
}
function applyDailyDecay(){
  if(state.developerInfiniteHearts){state.hearts=state.maxHearts;return;}
  if(!state.lastPracticeDate) return;
  const missed=Math.max(0,dayDifference(state.lastPracticeDate,dateKey())-1);
  if(missed>0){
    state.hearts=Math.max(0,state.hearts-missed);
    state.practiceStreak=0;
  }
}
function markPracticeToday(){
  const today=dateKey();
  if(state.lastPracticeDate===today) return;
  if(!state.lastPracticeDate) state.practiceStreak=1;
  else {
    const diff=dayDifference(state.lastPracticeDate,today);
    state.practiceStreak=diff===1 ? state.practiceStreak+1 : 1;
  }
  state.lastPracticeDate=today;
}
const HEART_UPGRADE_STONES=["Agate","Amethyst","Aquamarine","Citrine","Emerald","Garnet","Opal","Peridot","Ruby","Sapphire","Topaz"];
function maxHeartCost(){
  if(state.maxHearts>=14) return null;
  return HEART_UPGRADE_STONES[state.maxHearts-3];
}
function buyMaxHeart(){
  if(state.maxHearts>=14){ setMessage("Maximum health is already 14 hearts.",""); return; }
  const stone=maxHeartCost();
  const owned=Number(state.gemInventory[stone]||0);
  if(owned<1){ setMessage(`You need 1 ${stone} from the Scientific Gem Collection to unlock heart ${state.maxHearts+1}.`,"wrong"); return; }
  state.gemInventory[stone]=owned-1;
  state.maxHearts++;
  state.hearts++;
  setMessage(`${stone} consumed. Maximum health increased to ${state.maxHearts}.`,"correct");
  render();
}
function rollGem(currentStage){
  // Hiragana can produce only the first four stones. Each later learning tier
  // expands the scientific collection without exposing advanced stones early.
  const available=gemTiers.filter(g=>g.minStage<=currentStage);
  const total=available.reduce((sum,g)=>sum+g.weight,0);
  let roll=Math.random()*total;
  for(const g of available){ roll-=g.weight; if(roll<=0) return g; }
  return available[0];
}
function kanaFromQuestion(q){
  if(!q) return null;
  if(q.kana) return q.kana;
  if(hira.some(([ch])=>ch===q.q) || kata.some(([ch])=>ch===q.q)) return q.q;
  if(hira.some(([ch])=>ch===q.a) || kata.some(([ch])=>ch===q.a)) return q.a;
  return null;
}
function recordKana(correct){
  const ch=kanaFromQuestion(state.active);
  if(!ch) return null;
  const previous=state.kanaStats[ch] || {attempts:0,correct:0};
  const stat={attempts:Number(previous.attempts||0)+1,correct:Number(previous.correct||0)+(correct?1:0)};
  state.kanaStats[ch]=stat;
  state.lastKana={char:ch,correct,score:masteryScoreFromStat(stat),attempts:stat.attempts,correctCount:stat.correct};
  return state.lastKana;
}
function masteryScoreFromStat(stat){
  if(!stat || !stat.attempts || !stat.correct) return 0;
  const accuracy=stat.correct/stat.attempts;
  const correctProgress=Math.min(1,stat.correct/25);
  return Math.round(correctProgress*accuracy*100);
}
function masteryScore(ch){
  const stat=state.kanaStats[ch]||{attempts:0,correct:0};
  return masteryScoreFromStat(stat);
}
function setKanaTab(tab){
  if(tab==="katakana" && !katakanaUnlocked()){
    state.kanaTab="hiragana";
    setMessage(`Katakana unlocks after ${KATAKANA_XP_REQUIREMENT.toLocaleString()} Hiragana XP and ${STAGE_MASTERY_REQUIREMENTS[0]}% Hiragana mastery. Current: ${state.hiraganaXp.toLocaleString()} XP and ${stageMastery(0)}% mastery.`,"");
    render();
    return;
  }
  state.kanaTab=tab; render();
}
function renderKanaChart(){
  const set=state.kanaTab==="hiragana"?hira:kata;
  document.getElementById("hiraTab").className=state.kanaTab==="hiragana"?"primary":"";
  const kataButton=document.getElementById("kataTab");
  kataButton.className=state.kanaTab==="katakana"?"primary":"";
  kataButton.disabled=!katakanaUnlocked();
  kataButton.textContent=katakanaUnlocked()?"Katakana":"Katakana 🔒";
  const grid=document.getElementById("kanaGrid"); grid.innerHTML="";
  let attempts=0, correct=0, scoreTotal=0;
  set.forEach(([ch,rom])=>{
    const ks=state.kanaStats[ch]||{attempts:0,correct:0};
    const score=masteryScore(ch);
    attempts+=ks.attempts; correct+=ks.correct; scoreTotal+=score;
    const d=document.createElement("div"); d.className="kana-cell"+(state.lastKana&&state.lastKana.char===ch?" recent":"");
    d.title=`${ks.correct}/${ks.attempts} correct • ${score}% mastery`;
    d.innerHTML=`<div class="kana-char">${ch}</div><div class="small">${rom}</div><div class="mastery-bar"><div class="mastery-fill" style="width:${score}%"></div></div><div class="small"><strong>${score}%</strong></div><div class="kana-detail">${ks.correct}/${ks.attempts} correct</div>`;
    grid.appendChild(d);
  });
  document.getElementById("kanaAttempts").textContent=attempts;
  document.getElementById("kanaCorrect").textContent=correct;
  document.getElementById("kanaAverage").textContent=Math.round(scoreTotal/set.length);
  const latest=document.getElementById("latestKanaProgress");
  if(state.lastKana && set.some(([ch])=>ch===state.lastKana.char)){
    latest.style.display="block";
    latest.innerHTML=`Latest: <strong>${state.lastKana.char}</strong> — ${state.lastKana.correct?"correct":"incorrect"}. Mastery is now <strong>${masteryScore(state.lastKana.char)}%</strong> (${state.lastKana.correctCount}/${state.lastKana.attempts} correct).`;
  }else latest.style.display="none";
}
function renderGemCollection(){
  const box=document.getElementById("gemCollection"); box.innerHTML="";
  let total=0, unique=0;
  gemTiers.forEach((g,i)=>{
    const count=state.gemInventory[g.name]||0; total+=count; if(count>0) unique++;
    const d=document.createElement("div"); d.className="gem-row"+(state.lastGem&&state.lastGem.name===g.name?" recent":"");
    const unlocked=isStageUnlocked(g.minStage);
    const source=g.minStage===0?"Hiragana":g.minStage===1?"Katakana":g.minStage===2?"JLPT N5":stages[g.minStage]?.label||"Advanced";
    d.classList.toggle("locked",!unlocked);
    d.innerHTML=`<div style="display:flex;align-items:center;gap:9px"><span class="gem-dot">${count?g.icon:(unlocked?"❔":"🔒")}</span><div><strong>${g.name}</strong><div class="small">${unlocked?g.desc:`Unlocks in ${source}`}</div></div></div><div style="text-align:right"><strong>x${count}</strong><div class="gem-value">${g.value.toLocaleString()} Nuggets each</div><div class="small">${source}</div></div>`;
    box.appendChild(d);
  });
  document.getElementById("totalGemstones").textContent=total;
  document.getElementById("collectionWealth").textContent=totalStoneValue().toLocaleString();
  document.getElementById("uniqueGemstones").textContent=unique;
  document.getElementById("gemSpeciesTotal").textContent=gemTiers.length;
  const latest=document.getElementById("latestGemProgress");
  if(state.lastGem){ latest.style.display="block"; latest.innerHTML=`Latest find: ${state.lastGem.icon} <strong>${state.lastGem.name}</strong> — collection count is now <strong>x${state.gemInventory[state.lastGem.name]||0}</strong> and each is worth <strong>${gemTiers.find(g=>g.name===state.lastGem.name)?.value.toLocaleString()||0} Nuggets</strong>.`; }
  else latest.style.display="none";
}

function activePickaxeSkin(){
  return PICKAXE_SKINS.find(x=>x.id===state.equippedPickaxeSkin) || PICKAXE_SKINS[0];
}
function renderPickaxeShop(){
  const rock=document.getElementById("rock");
  const icon=document.getElementById("pickaxeIcon");
  const current=activePickaxeSkin();
  if(rock){
    rock.dataset.pickaxe=current.id;
    rock.title=`Mine with ${current.name}`;
  }
  if(icon) icon.textContent=current.icon;

  const shop=document.getElementById("pickaxeShop");
  if(!shop) return;
  shop.innerHTML="";
  PICKAXE_SKINS.forEach(skin=>{
    const owned=state.ownedPickaxeSkins.includes(skin.id);
    const equipped=state.equippedPickaxeSkin===skin.id;
    const card=document.createElement("div");
    card.className="pickaxe-card"+(equipped?" equipped":"");
    const buttonText=equipped?"Equipped":owned?"Equip":`Buy — ${skin.cost.toLocaleString()} Nuggets`;
    card.innerHTML=`<div class="pickaxe-preview"><span class="pickaxe-icon" style="${skin.id==='standard'?'':pickaxePreviewStyle(skin.id)}">${skin.icon}</span></div><div><strong>${skin.name}</strong><div class="small">${skin.desc}</div></div><button type="button" ${equipped?'disabled':''}>${buttonText}</button>`;
    const btn=card.querySelector("button");
    btn.addEventListener("click",()=>owned?equipPickaxe(skin.id):buyPickaxe(skin.id));
    shop.appendChild(card);
  });
}
function pickaxePreviewStyle(id){
  const styles={
    copper:"filter:sepia(1) saturate(2.2) hue-rotate(335deg) brightness(1.05)",
    sakura:"filter:sepia(.4) saturate(3) hue-rotate(285deg) brightness(1.25) drop-shadow(0 0 7px #ff9dcc)",
    silver:"filter:grayscale(1) brightness(1.65) drop-shadow(0 0 5px #dce8ff)",
    frost:"filter:hue-rotate(155deg) saturate(2.4) brightness(1.35) drop-shadow(0 0 9px #8de9ff)",
    gold:"filter:sepia(1) saturate(4) brightness(1.25) drop-shadow(0 0 7px #ffd166)",
    neon:"filter:hue-rotate(135deg) saturate(4) brightness(1.2) drop-shadow(0 0 10px #36fff2)",
    amethyst:"filter:hue-rotate(225deg) saturate(2.2) drop-shadow(0 0 8px #b989ff)",
    inferno:"filter:sepia(1) saturate(6) hue-rotate(330deg) brightness(1.15) drop-shadow(0 0 11px #ff542f)",
    galaxy:"filter:hue-rotate(205deg) saturate(3.5) brightness(.9) drop-shadow(0 0 12px #745cff)",
    emerald:"filter:hue-rotate(80deg) saturate(2.3) drop-shadow(0 0 8px #56d69b)",
    aurora:"filter:hue-rotate(115deg) saturate(3) brightness(1.25) drop-shadow(0 0 12px #70ffbf)",
    shadow:"filter:grayscale(.7) hue-rotate(235deg) saturate(3) brightness(.55) drop-shadow(0 0 11px #9b68ff)",
    "red-diamond":"filter:hue-rotate(315deg) saturate(3) brightness(1.25) drop-shadow(0 0 10px #ff496c)"
  };
  return styles[id]||"";
}
function buyPickaxe(id){
  const skin=PICKAXE_SKINS.find(x=>x.id===id);
  if(!skin || state.ownedPickaxeSkins.includes(id)) return;
  if(!spendStoneValue(skin.cost)){
    setMessage(`You need ${skin.cost.toLocaleString()} Nuggets for the ${skin.name}. Current wealth: ${totalStoneValue().toLocaleString()} Nuggets.`,"wrong");
    return;
  }
  state.ownedPickaxeSkins.push(id);
  state.equippedPickaxeSkin=id;
  setMessage(`${skin.name} purchased and equipped for ${skin.cost.toLocaleString()} Nuggets!`,"correct");
  render();
}
function equipPickaxe(id){
  if(!state.ownedPickaxeSkins.includes(id)) return;
  state.equippedPickaxeSkin=id;
  const skin=activePickaxeSkin();
  setMessage(`${skin.name} equipped.`,"correct");
  render();
}

let feedbackAudioContext=null;
function playFeedbackSound(correct){
  if(state.soundEnabled===false) return;
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass) return;
    if(!feedbackAudioContext) feedbackAudioContext=new AudioContextClass();
    if(feedbackAudioContext.state==="suspended") feedbackAudioContext.resume();
    const now=feedbackAudioContext.currentTime;
    const notes=correct?[523.25,659.25,783.99]:[330,246.94];
    notes.forEach((frequency,i)=>{
      const osc=feedbackAudioContext.createOscillator();
      const gain=feedbackAudioContext.createGain();
      osc.type=correct?"sine":"triangle";
      osc.frequency.setValueAtTime(frequency,now+i*.11);
      gain.gain.setValueAtTime(.0001,now+i*.11);
      gain.gain.exponentialRampToValueAtTime(correct?.16:.12,now+i*.11+.015);
      gain.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.14);
      osc.connect(gain);gain.connect(feedbackAudioContext.destination);
      osc.start(now+i*.11);osc.stop(now+i*.11+.16);
    });
  }catch(err){console.warn("Answer sound unavailable",err);}
}

let japaneseVoices=[];
function refreshJapaneseVoices(){
  if(!('speechSynthesis' in window)) return;
  japaneseVoices=speechSynthesis.getVoices().filter(v=>/^ja(?:-|_)/i.test(v.lang));
}
if('speechSynthesis' in window){refreshJapaneseVoices();speechSynthesis.addEventListener?.('voiceschanged',refreshJapaneseVoices);}
function stripMarkup(text){const d=document.createElement('div');d.innerHTML=String(text||'');return d.textContent||d.innerText||'';}
function japaneseSpeechText(q=state.active){
  if(!q)return '日本語を勉強しましょう。';
  if(q.kana)return q.kana;
  if(q.kind==='reading' && q.q)return stripMarkup(q.q);
  if(q.displayChallenge)return stripMarkup(q.displayChallenge);
  if(q.q && /[ぁ-んァ-ヶ一-龯]/.test(stripMarkup(q.q)))return stripMarkup(q.q).replace(/___/g,'');
  // Never use q.a here: for English prompts the Japanese answer must remain a surprise.
  return '';
}
function speakJapanese(text,rate=state.voiceRate){
  if(!state.voiceEnabled)return;
  if(!('speechSynthesis'in window)){setMessage('Japanese speech is not supported in this browser.','wrong');return;}
  const clean=stripMarkup(text).trim();if(!clean)return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(clean);u.lang='ja-JP';u.rate=Math.max(.55,Math.min(1.15,Number(rate)||.85));u.pitch=1;
  refreshJapaneseVoices();if(japaneseVoices.length)u.voice=japaneseVoices.find(v=>/Google|Kyoko|O-ren|Hattori/i.test(v.name))||japaneseVoices[0];
  speechSynthesis.speak(u);
}
function speakActiveQuestion(rate=state.voiceRate){const text=japaneseSpeechText();if(text)speakJapanese(text,rate);else setMessage('This question does not contain spoken Japanese.','');}
function updateSessionDashboard(){
  const answered=Number(state.sessionAnswered||0),correct=Number(state.sessionCorrect||0),goal=Number(state.sessionGoal||20);
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  set('sessionAnswered',answered);set('sessionGoal',goal);set('sessionAccuracy',answered?`${Math.round(correct/answered*100)}%`:'—');
  const bar=document.getElementById('sessionProgressBar');if(bar)bar.style.width=`${Math.min(100,answered/goal*100)}%`;
}
function questionPriority(q){
  const stat=state.questionStats?.[q.id]||{attempts:0,correct:0};
  const attempts=Number(stat.attempts)||0,correct=Number(stat.correct)||0;
  if(!attempts)return 100;
  return Math.max(2,70-(correct/attempts*55)+Math.max(0,4-attempts)*8);
}
function chooseQuestion(pool){
  if(!state.smartReview)return pool[Math.floor(Math.random()*pool.length)];
  const weighted=pool.map(q=>({q,w:questionPriority(q)}));
  const total=weighted.reduce((s,x)=>s+x.w,0);let roll=Math.random()*total;
  for(const item of weighted){roll-=item.w;if(roll<=0)return item.q;}
  return pool[0];
}

function quickMineAction(){
  if(state.active&&!state.answered){
    const target=document.getElementById("challengeArea");
    if(target) target.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  mine();
  const target=document.getElementById("challengeArea");
  if(target) setTimeout(()=>target.scrollIntoView({behavior:"smooth",block:"center"}),60);
}

function mine(){
  ensureHeartRecovery();
  if(state.hearts<=0){
    if(totalStoneValue()<heartRestoreCost()){
      renderRecovery();
      setMessage("You are out of hearts. Wait 30 minutes to gain 3 hearts.","wrong");
    }else{
      setMessage(`You are out of hearts. Use ${heartRestoreCost().toLocaleString()} Nuggets for a Heart Restore to continue.`,"wrong");
    }
    return;
  }
  const idx=selectedStageIndex();
  let pool=questions.filter(x=>x.stage===idx);
  if(idx===2){
    const tierOrder={beginner:0,intermediate:1,advanced:2};
    const selectedTier=tierOrder[state.n5Tier||"beginner"];
    pool=pool.filter(q=>q.tier==null || tierOrder[q.tier]<=selectedTier);
    const curriculum=state.n5Curriculum||"mixed";
    if(curriculum==="standard") pool=pool.filter(q=>q.curriculum!=="tutor");
    if(curriculum==="tutor") pool=pool.filter(q=>q.curriculum==="tutor");
    if(curriculum!=="standard" && (state.tutorTrack||"all")!=="all"){
      const track=state.tutorTrack;
      pool=pool.filter(q=>q.curriculum!=="tutor" || q.tutorTrack===track);
    }
  }
  const recent=new Set(state.recentQuestionIds||[]);
  let candidates=pool.filter(q=>!recent.has(q.id));
  if(!candidates.length) candidates=pool;
  const q=chooseQuestion(candidates);
  state.recentQuestionIds=[...(state.recentQuestionIds||[]),q.id].slice(-Math.min(20,Math.max(5,pool.length-1)));
  state.active=q;
  state.answered=false;
  state.shieldArmed=false;
  showQuestion(q);
  setMessage("","");
  if(state.voiceEnabled&&state.autoSpeak)setTimeout(()=>speakActiveQuestion(),180);
  render();
}

function questionDisplay(q){
  // Reading and meaning questions must never reveal their own answer.
  if(q.concealedPrompt) return q.concealedPrompt;
  if(q.kind==="reading" && q.displayChallenge) return q.displayChallenge;
  if(q.hideReadingInPrompt && q.displayChallenge) return q.displayChallenge;
  const mode=state.supportMode||"guided";
  if(mode==="guided" && q.displayGuided) return q.displayGuided;
  if(mode==="challenge" && q.displayChallenge) return q.displayChallenge;
  return q.displayStandard||q.q;
}
function showQuestion(q){
  const area=document.getElementById("challengeArea");
  const helpButton=q.help?'<button id="kanjiHelpBtn" class="kanji-help-btn" type="button">📖 I don’t know this kanji</button>':'';
  const spoken=japaneseSpeechText(q);
  const voiceTools=spoken?`<div class="voice-tools"><button id="speakQuestionBtn" type="button">🔊 Hear question</button><button id="slowSpeakQuestionBtn" type="button">🐢 Slow</button><span>Question audio only</span></div>`:'';
  area.innerHTML=`<div class="question-card"><div class="question">${questionDisplay(q)}</div><div class="prompt">${q.prompt}</div>${voiceTools}${helpButton}<div id="kanjiHelpBox" class="kanji-help-box" hidden></div><div class="answers" id="answers"></div></div>`;
  document.getElementById('speakQuestionBtn')?.addEventListener('click',()=>speakActiveQuestion());
  document.getElementById('slowSpeakQuestionBtn')?.addEventListener('click',()=>speakActiveQuestion(.58));
  if(q.help){
    document.getElementById("kanjiHelpBtn").addEventListener("click",()=>{
      const box=document.getElementById("kanjiHelpBox");
      box.innerHTML=q.help;
      box.hidden=false;
      document.getElementById("kanjiHelpBtn").disabled=true;
    });
  }
  const a=document.getElementById("answers");
  shuffle([...q.opts]).forEach(opt=>{
    const b=document.createElement("button");
    b.textContent=opt;
    b.onclick=()=>answer(opt,b);
    a.appendChild(b);
  });
}

function recordQuestionAttempt(q,correct){
  if(!q?.id) return;
  const previous=state.questionStats[q.id]||{attempts:0,correct:0};
  state.questionStats[q.id]={attempts:Number(previous.attempts||0)+1,correct:Number(previous.correct||0)+(correct?1:0)};
}

function answer(opt,button){
  if(state.answered || !state.active) return;
  const correct=opt===state.active.a;
  state.sessionAnswered=Number(state.sessionAnswered||0)+1;
  if(correct)state.sessionCorrect=Number(state.sessionCorrect||0)+1;
  updateSessionDashboard();
  const all=[...document.querySelectorAll("#answers button")];

  if(correct){
    playFeedbackSound(true);
    state.answered=true;
    state.streak=Number(state.streak||0)+1;
    state.bestStreak=Math.max(Number(state.bestStreak||0),state.streak);

    const quality=Math.min(6,Math.floor(state.streak/3)+selectedStageIndex());
    const xpGain=12+selectedStageIndex()*3;
    const found=rollGem(Number(state.active.stage));

    state.gemInventory[found.name]=Number(state.gemInventory[found.name]||0)+1;
    state.lastGem={name:found.name,icon:found.icon};
    state.xp=Number(state.xp||0)+xpGain;
    const answeredStage=Number(state.active.stage);
    state.stageXp[answeredStage]=Number(state.stageXp[answeredStage]||0)+xpGain;
    if(answeredStage===0) state.hiraganaXp=state.stageXp[0];
    recordQuestionAttempt(state.active,true);
    const justCleared=stageComplete(answeredStage) && !state.clearedStages.includes(answeredStage);
    if(justCleared){
      state.clearedStages.push(answeredStage);
      addStoneChange(STAGE_CLEAR_REWARDS[answeredStage],Math.min(gemTiers.length-1,answeredStage*2+3));
    }

    const kanaProgress=recordKana(true);
    markPracticeToday();
    while(state.xp>=xpNeed()){
      state.xp-=xpNeed();
      state.level++;
    }

    // Save and refresh the mastery chart immediately from the same state object.
    save();
    try{ renderKanaChart(); }catch(err){ console.error("Immediate kana refresh failed",err); }
    try{ renderGemCollection(); }catch(err){ console.error("Immediate gem refresh failed",err); }

    button.style.background="#225f49";
    all.forEach(x=>x.disabled=true);
    render();
    const quickMineBtn=document.getElementById("quickMineBtn");
    if(quickMineBtn){quickMineBtn.classList.remove("attention");void quickMineBtn.offsetWidth;quickMineBtn.classList.add("attention");}

    const masteryText=kanaProgress ? ` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).` : "";
    const currentMastery=stageMastery(answeredStage);
    const clearText=justCleared?` 🎉 ${stages[answeredStage].name} cleared with ${currentMastery}% mastery! ${answeredStage<stages.length-1?stages[answeredStage+1].name+" unlocked. ":"Master Mine completed. "}+${STAGE_CLEAR_REWARDS[answeredStage].toLocaleString()} bonus Nuggets.`:"";
    setMessage(`Correct! Found ${found.icon} ${found.name} worth ${found.value.toLocaleString()} Nuggets, and +${xpGain} Mine XP. Mine mastery: ${currentMastery}/${STAGE_MASTERY_REQUIREMENTS[answeredStage]}%.${masteryText}${clearText}`,"correct");
    try{ floatText(`${found.icon} +1`); }catch(err){ console.error("Reward animation failed",err); }
  }else{
    playFeedbackSound(false);
    button.disabled=true;
    button.style.background="#6d2933";
    state.streak=0;
    const kanaProgress=recordKana(false);
    recordQuestionAttempt(state.active,false);
    markPracticeToday();

    if(state.shieldArmed){
      state.shields=Math.max(0,Number(state.shields||0)-1);
      state.shieldArmed=false;
      setMessage(`Wrong, but your shield protected your heart.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} Try again.`,"wrong");
    }else if(state.developerInfiniteHearts){
      state.hearts=state.maxHearts;
      setMessage(`Wrong, but Developer Infinite Hearts prevented heart loss.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} Try again.`,"wrong");
    }else{
      state.hearts=Math.max(0,Number(state.hearts||0)-1);
      setMessage(`Wrong. You lost one heart.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} ${state.hearts>0?"Try again.":(totalStoneValue()<heartRestoreCost()?"A 30-minute recovery timer has started.":"Restore hearts in the shop.")}`,"wrong");
    }

    save();
    try{ renderKanaChart(); }catch(err){ console.error("Immediate kana refresh failed",err); }
    render();
  }
}
function useHint(){
  if(!state.active || state.answered || state.hints<1) return;
  const wrong=[...document.querySelectorAll("#answers button")].filter(b=>!b.disabled && b.textContent!==state.active.a);
  if(wrong.length){
    wrong[Math.floor(Math.random()*wrong.length)].disabled=true;
    state.hints--;
    setMessage("Hint used: one incorrect answer was removed.","");
    render();
  }
}
function armShield(){
  if(!state.active || state.answered || state.shields<1 || state.shieldArmed) return;
  state.shieldArmed=true; render();
  setMessage("Shield armed. Your next wrong answer will not cost a heart.","");
}
function buy(type){
  const prices=currentShopPrices();
  const cost=prices[type];
  if(!cost) return;
  if(type==="heart" && state.hearts===state.maxHearts){ setMessage("Your hearts are already full.",""); return; }
  if(!spendStoneValue(cost)){ setMessage(`You need ${cost.toLocaleString()} Nuggets. Current wealth: ${totalStoneValue().toLocaleString()} Nuggets.`,"wrong"); return; }
  if(type==="hint") state.hints++;
  if(type==="shield") state.shields++;
  if(type==="heart"){ state.hearts=state.maxHearts; state.heartRecoveryEnd=null; }
  setMessage(`Purchase complete. Spent ${cost.toLocaleString()} Nuggets.`,"correct");
  render();
}
function resetSave(){
  if(!activeProfileId) return;
  if(confirm("Reset all progress for this player profile?")){
    state=normalizeState(structuredClone(DEFAULT_STATE));
    save();
    setMessage("This player profile has been reset.","");
    render();
  }
}
function nextMine(){
  state.active=null; state.answered=false; state.shieldArmed=false;
  document.getElementById("challengeArea").innerHTML='<div class="small">Tap the rock to mine another challenge.</div>';
  setMessage("","");
  render();
}
function setMessage(t,c){ const m=document.getElementById("message");m.textContent=t;m.className="message "+c; }
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
function floatText(t){
  const d=document.createElement("div");d.className="float";d.textContent=t;
  d.style.left=(window.innerWidth/2-30)+"px";d.style.top=(window.innerHeight/2)+"px";
  document.body.appendChild(d);setTimeout(()=>d.remove(),900);
}

function setStatsDrawer(open){
  if(open) syncSelectedStageUI();
  const drawer=document.getElementById("statsDrawer");
  const overlay=document.getElementById("statsOverlay");
  const quick=document.getElementById("quickStatsBtn");
  drawer.classList.toggle("open",open);
  overlay.classList.toggle("open",open);
  document.body.classList.toggle("stats-open",open);
  drawer.setAttribute("aria-hidden",String(!open));
  quick.setAttribute("aria-expanded",String(open));
}
function jumpToSection(id){
  setStatsDrawer(false);
  const target=document.getElementById(id);
  if(target) setTimeout(()=>target.scrollIntoView({behavior:"smooth",block:"start"}),120);
}
document.getElementById("quickMineBtn").onclick=quickMineAction;
document.getElementById("soundToggle").addEventListener("change",e=>{state.soundEnabled=e.target.checked;save();if(state.soundEnabled)playFeedbackSound(true);});
document.getElementById("supportMode").addEventListener("change",e=>{state.supportMode=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`Support mode changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
document.getElementById("n5Tier").addEventListener("change",e=>{state.n5Tier=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`N5 track changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
document.getElementById("n5Curriculum").addEventListener("change",e=>{state.n5Curriculum=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`N5 curriculum changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
document.getElementById("tutorTrack").addEventListener("change",e=>{state.tutorTrack=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`Tutor lesson track changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
document.getElementById("quickStatsBtn").onclick=()=>setStatsDrawer(true);
document.getElementById("headerStatsBtn").onclick=()=>setStatsDrawer(true);
document.getElementById("closeStatsBtn").onclick=()=>setStatsDrawer(false);
document.getElementById("statsOverlay").onclick=()=>setStatsDrawer(false);
document.getElementById("jumpHealthBtn").onclick=()=>jumpToSection("healthSection");
document.getElementById("jumpMasteryBtn").onclick=()=>jumpToSection("masterySection");
document.addEventListener("keydown",e=>{if(e.key==="Escape"){setStatsDrawer(false);closeDeveloperPanel();}});

document.getElementById("rock").onclick=mine;
document.getElementById("hintBtn").onclick=useHint;
document.getElementById("shieldBtn").onclick=armShield;
document.getElementById("nextBtn").onclick=nextMine;
document.getElementById("resetBtn").onclick=resetSave;
document.getElementById("logoutBtn").onclick=logout;

function openDeveloperPanel(){
  if(!isDeveloperSession) return;
  const overlay=document.getElementById("developerOverlay");
  overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");
  document.getElementById("adminInfiniteHearts").checked=!!state.developerInfiniteHearts;
  document.body.style.overflow="hidden";
}
function closeDeveloperPanel(){
  const overlay=document.getElementById("developerOverlay");
  if(!overlay) return;
  overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function developerMessage(text,error=false){
  const el=document.getElementById("developerMessage");if(!el)return;
  el.textContent=text;el.style.color=error?"var(--red)":"var(--green)";
}
function setTotalNuggets(amount){
  amount=Math.max(0,Math.floor(Number(amount)||0));
  gemTiers.forEach(g=>state.gemInventory[g.name]=0);
  addStoneChange(amount,gemTiers.length-1);
}
function masterAllKana(){
  [...hira,...kata].forEach(([ch])=>state.kanaStats[ch]={attempts:25,correct:25});
  state.hiraganaXp=KATAKANA_XP_REQUIREMENT;
}
function masterAllQuestions(){
  questions.forEach(q=>state.questionStats[q.id]={attempts:3,correct:3});
}
function applyAdminStage(index){
  index=Math.max(0,Math.min(stages.length-1,Number(index)||0));
  if(index>=1){masterAllKana();}
  for(let i=0;i<index;i++){
    state.stageXp[i]=Math.max(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
    if(i>=2) questions.filter(q=>q.stage===i).forEach(q=>state.questionStats[q.id]={attempts:3,correct:3});
    if(!state.clearedStages.includes(i)) state.clearedStages.push(i);
  }
  state.level=Math.max(state.level,index>=2?stages[index].unlock:1);
  state.selectedStage=index;
  state.active=null;
  state.answered=false;
  state.xp=0;
}
function runAdminAction(action){
  if(!isDeveloperSession){developerMessage("Administrator access required.",true);return;}
  if(action==="set-nuggets") setTotalNuggets(document.getElementById("adminNuggetAmount").value);
  if(action==="add-million") addStoneChange(1000000,gemTiers.length-1);
  if(action==="add-gems") gemTiers.forEach(g=>state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)+100);
  if(action==="restore-hearts"){state.hearts=state.maxHearts;state.heartRecoveryEnd=null;}
  if(action==="max-hearts"){state.maxHearts=14;state.hearts=14;}
  if(action==="set-stage") applyAdminStage(document.getElementById("adminStageSelect").value);
  if(action==="master-kana") masterAllKana();
  if(action==="unlock-all"){
    masterAllKana();masterAllQuestions();state.level=100;state.xp=0;state.stageXp=STAGE_XP_REQUIREMENTS.map(x=>x);state.hiraganaXp=state.stageXp[0];state.clearedStages=[0,1,2,3,4,5,6];state.selectedStage=6;state.maxHearts=14;state.hearts=14;
    state.ownedPickaxeSkins=PICKAXE_SKINS.map(x=>x.id);state.hints=999;state.shields=999;
    gemTiers.forEach(g=>state.gemInventory[g.name]=Math.max(100,Number(state.gemInventory[g.name]||0)));
  }
  if(action==="unlock-pickaxes") state.ownedPickaxeSkins=PICKAXE_SKINS.map(x=>x.id);
  if(action==="add-items"){state.hints=Number(state.hints||0)+99;state.shields=Number(state.shields||0)+99;}
  if(action==="copy-save"){
    document.getElementById("adminSaveJson").value=JSON.stringify(state,null,2);
    developerMessage("Save JSON displayed below.");return;
  }
  if(action==="export-save"){
    const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");
    a.href=url;a.download=`japanese-miner-${activeProfileId}-save.json`;a.click();URL.revokeObjectURL(url);
    developerMessage("Save file exported.");return;
  }
  if(action==="import-save"){
    try{state=normalizeState(JSON.parse(document.getElementById("adminSaveJson").value));}
    catch{developerMessage("The pasted save JSON is invalid.",true);return;}
  }
  if(action==="reset-profile"){
    if(!confirm("Reset all progress for the administrator profile?")) return;
    state=normalizeState(structuredClone(DEFAULT_STATE));
  }
  save();render();
  document.getElementById("adminInfiniteHearts").checked=!!state.developerInfiniteHearts;
  developerMessage("Developer action applied successfully.");
}

document.getElementById("developerBtn").onclick=openDeveloperPanel;
document.getElementById("closeDeveloperBtn").onclick=closeDeveloperPanel;
document.getElementById("developerOverlay").addEventListener("click",e=>{if(e.target.id==="developerOverlay")closeDeveloperPanel();});
document.querySelectorAll("[data-admin]").forEach(btn=>btn.addEventListener("click",()=>runAdminAction(btn.dataset.admin)));
document.getElementById("adminInfiniteHearts").addEventListener("change",e=>{
  if(!isDeveloperSession)return;
  state.developerInfiniteHearts=e.target.checked;
  if(state.developerInfiniteHearts) state.hearts=state.maxHearts;
  save();render();developerMessage(state.developerInfiniteHearts?"Infinite hearts enabled.":"Infinite hearts disabled.");
});


let authMode="login";
function setAuthMessage(text,good=false){const el=document.getElementById("authMessage");el.textContent=text;el.style.color=good?"var(--green)":"var(--red)";}
function showAuthMode(mode){
  authMode=mode;
  const create=mode==="create";
  document.getElementById("loginTabBtn").className=create?"":"primary";
  document.getElementById("createTabBtn").className=create?"primary":"";
  document.getElementById("confirmPinWrap").style.display=create?"grid":"none";
  document.getElementById("migrateWrap").style.display=create&&localStorage.getItem("jm_save")?"flex":"none";
  document.getElementById("authSubmitBtn").textContent=create?"Create profile":"Sign in";
  document.getElementById("authPin").setAttribute("autocomplete",create?"new-password":"current-password");
  setAuthMessage("");
}
function renderProfileList(){
  const box=document.getElementById("profileList");const profiles=readProfiles();box.innerHTML="";
  if(!profiles.length){box.innerHTML='<div class="small">No player profiles exist on this device yet.</div>';return;}
  profiles.forEach(profile=>{
    const row=document.createElement("div");row.className="profile-row";
    row.innerHTML=`<div><strong>👤 ${profile.name}</strong><br><small>Last played ${profile.lastPlayed?new Date(profile.lastPlayed).toLocaleDateString():"Never"}</small></div><button type="button">Use</button>`;
    row.querySelector("button").addEventListener("click",()=>{document.getElementById("authUsername").value=profile.name;document.getElementById("authPin").focus();});
    box.appendChild(row);
  });
}
function submitAuth(){
  const name=normalizeName(document.getElementById("authUsername").value);
  const pin=document.getElementById("authPin").value.trim();
  if(name.length<2){setAuthMessage("Player name must contain at least 2 characters.");return;}
  if(!/^\d{4,8}$/.test(pin)){setAuthMessage("PIN must contain 4–8 digits.");return;}
  const profiles=readProfiles();
  if(authMode==="create"){
    const confirmPin=document.getElementById("authPinConfirm").value.trim();
    if(pin!==confirmPin){setAuthMessage("The PIN entries do not match.");return;}
    if(profiles.some(p=>p.name.toLowerCase()===name.toLowerCase())){setAuthMessage("A profile with that player name already exists.");return;}
    let id=profileIdFromName(name),suffix=2;while(profiles.some(p=>p.id===id))id=`${profileIdFromName(name)}-${suffix++}`;
    const profile={id,name,pinHash:pinHash(pin,name),createdAt:Date.now(),lastPlayed:Date.now()};
    profiles.push(profile);writeProfiles(profiles);
    let initial=structuredClone(DEFAULT_STATE);
    if(document.getElementById("migrateOldSave").checked&&localStorage.getItem("jm_save")){
      try{initial=JSON.parse(localStorage.getItem("jm_save"))||initial;}catch{}
      localStorage.removeItem("jm_save");
    }
    localStorage.setItem(profileStorageKey(id),JSON.stringify(normalizeState(initial)));
    loadProfile(profile);
    setTimeout(()=>openPlacementOnboarding(true),120);
    return;
  }
  let profile=profiles.find(p=>p.name.toLowerCase()===name.toLowerCase());
  const developerCredentials=name.toLowerCase()===DEVELOPER_NAME.toLowerCase() && pinHash(pin,DEVELOPER_NAME)===DEVELOPER_PIN_HASH;
  if(developerCredentials){
    if(!profile){
      let id=profileIdFromName(DEVELOPER_NAME),suffix=2;while(profiles.some(p=>p.id===id))id=`${profileIdFromName(DEVELOPER_NAME)}-${suffix++}`;
      profile={id,name:DEVELOPER_NAME,pinHash:DEVELOPER_PIN_HASH,createdAt:Date.now(),lastPlayed:Date.now()};
      profiles.push(profile);
      localStorage.setItem(profileStorageKey(id),JSON.stringify(normalizeState(structuredClone(DEFAULT_STATE))));
    }else{
      profile.name=DEVELOPER_NAME;
      profile.pinHash=DEVELOPER_PIN_HASH;
      profile.lastPlayed=Date.now();
    }
    writeProfiles(profiles);loadProfile(profile);return;
  }
  if(!profile||profile.pinHash!==pinHash(pin,profile.name)){setAuthMessage("Player name or PIN is incorrect.");return;}
  profile.lastPlayed=Date.now();writeProfiles(profiles);loadProfile(profile);
}
document.getElementById("loginTabBtn").onclick=()=>showAuthMode("login");
document.getElementById("createTabBtn").onclick=()=>showAuthMode("create");
document.getElementById("authSubmitBtn").onclick=submitAuth;
["authUsername","authPin","authPinConfirm"].forEach(id=>document.getElementById(id).addEventListener("keydown",e=>{if(e.key==="Enter")submitAuth();}));
showAuthMode("login");renderProfileList();
const remembered=localStorage.getItem(ACTIVE_PROFILE_KEY);
const rememberedProfile=readProfiles().find(p=>p.id===remembered);
if(rememberedProfile){
  document.getElementById("authUsername").value=rememberedProfile.name;
  // This is a local profile on the same browser. Keep it signed in across refreshes;
  // the explicit Log out button still clears the remembered session.
  loadProfile(rememberedProfile);
}


// Integrated JLPT N5 Mine course v2.1
const N5_KANJI_LIST=`一 二 三 四 五 六 七 八 九 十 百 千 万 円 人 男 女 子 父 母 友 学 校 先 生 年 月 日 時 分 半 今 午 前 後 毎 何 行 来 帰 見 聞 話 読 書 食 飲 買 売 入 出 休 会 社 員 名 山 川 田 水 火 木 金 土 天 気 雨 雪 風 電 車 駅 道 国 外 東 西 南 北 左 右 上 下 中 大 小 高 安 新 古 長 短 白 黒 赤 青 犬 猫 魚 肉 茶 米 花 店 家 室 本 文 字 語 言 力`.split(/\s+/);
const N5_KANJI_INFO={
一:['いち／ひと','one'],二:['に／ふた','two'],三:['さん／み','three'],四:['し・よん／よ','four'],五:['ご／いつ','five'],六:['ろく／む','six'],七:['しち・なな／なな','seven'],八:['はち／や','eight'],九:['きゅう・く／ここの','nine'],十:['じゅう／とお','ten'],百:['ひゃく','hundred'],千:['せん／ち','thousand'],万:['まん','ten thousand'],円:['えん／まる','yen; circle'],人:['じん・にん／ひと','person'],男:['だん／おとこ','man'],女:['じょ／おんな','woman'],子:['し／こ','child'],父:['ふ／ちち','father'],母:['ぼ／はは','mother'],友:['ゆう／とも','friend'],学:['がく／まなぶ','study'],校:['こう','school'],先:['せん／さき','previous; ahead'],生:['せい・しょう／いきる','life; student'],年:['ねん／とし','year'],月:['げつ・がつ／つき','month; moon'],日:['にち・じつ／ひ','day; sun'],時:['じ／とき','time; hour'],分:['ぶん・ふん／わかる','minute; part'],半:['はん','half'],今:['こん／いま','now'],午:['ご','noon'],前:['ぜん／まえ','before; front'],後:['ご・こう／あと','after; behind'],毎:['まい','every'],何:['か／なに・なん','what'],行:['こう・ぎょう／いく','go'],来:['らい／くる','come'],帰:['き／かえる','return'],見:['けん／みる','see'],聞:['ぶん・もん／きく','hear; ask'],話:['わ／はなす','speak; story'],読:['どく／よむ','read'],書:['しょ／かく','write; book'],食:['しょく／たべる','eat; food'],飲:['いん／のむ','drink'],買:['ばい／かう','buy'],売:['ばい／うる','sell'],入:['にゅう／はいる','enter'],出:['しゅつ／でる','exit'],休:['きゅう／やすむ','rest'],会:['かい／あう','meet'],社:['しゃ／やしろ','company'],員:['いん','member; employee'],名:['めい・みょう／な','name'],山:['さん／やま','mountain'],川:['せん／かわ','river'],田:['でん／た','rice field'],水:['すい／みず','water'],火:['か／ひ','fire'],木:['もく・ぼく／き','tree'],金:['きん／かね','gold; money'],土:['ど・と／つち','earth'],天:['てん','heaven; sky'],気:['き','spirit; air'],雨:['う／あめ','rain'],雪:['せつ／ゆき','snow'],風:['ふう／かぜ','wind'],電:['でん','electricity'],車:['しゃ／くるま','vehicle'],駅:['えき','station'],道:['どう／みち','road'],国:['こく／くに','country'],外:['がい／そと','outside'],東:['とう／ひがし','east'],西:['せい・さい／にし','west'],南:['なん／みなみ','south'],北:['ほく／きた','north'],左:['さ／ひだり','left'],右:['う・ゆう／みぎ','right'],上:['じょう／うえ','above'],下:['か・げ／した','below'],中:['ちゅう／なか','inside'],大:['だい・たい／おおきい','big'],小:['しょう／ちいさい','small'],高:['こう／たかい','high; expensive'],安:['あん／やすい','cheap; safe'],新:['しん／あたらしい','new'],古:['こ／ふるい','old'],長:['ちょう／ながい','long'],短:['たん／みじかい','short'],白:['はく／しろ','white'],黒:['こく／くろ','black'],赤:['せき／あか','red'],青:['せい／あお','blue'],犬:['けん／いぬ','dog'],猫:['びょう／ねこ','cat'],魚:['ぎょ／さかな','fish'],肉:['にく','meat'],茶:['ちゃ','tea'],米:['べい・まい／こめ','rice'],花:['か／はな','flower'],店:['てん／みせ','shop'],家:['か・け／いえ','house'],室:['しつ／むろ','room'],本:['ほん／もと','book; origin'],文:['ぶん・もん／ふみ','sentence; writing'],字:['じ／あざ','character'],語:['ご／かたる','language; word'],言:['げん・ごん／いう','say'],力:['りょく・りき／ちから','power']};
while(N5_KANJI_LIST.length<120) N5_KANJI_LIST.push('々');
const N5_GRAMMAR_POINTS=[
['です／だ','polite and plain copula','わたしは学生です。'],['ます','polite present verb','毎日勉強します。'],['ません','polite negative','肉を食べません。'],['ました','polite past','昨日映画を見ました。'],['ませんでした','polite past negative','昨日行きませんでした。'],['は','topic marker','私は学生です。'],['が','subject marker','猫がいます。'],['を','object marker','本を読みます。'],['に','time/destination marker','七時に起きます。'],['へ','direction marker','日本へ行きます。'],['で','place/means marker','電車で行きます。'],['と','with/quotation','友達と話します。'],['の','possession','私の本です。'],['も','also','私も学生です。'],['から','from/because','九時から働きます。'],['まで','until/to','五時までです。'],['か','question particle','学生ですか。'],['ね','seeking agreement','暑いですね。'],['よ','new information','おいしいですよ。'],['これ／それ／あれ','demonstratives','これは本です。'],['この／その／あの','noun demonstratives','この本は新しいです。'],['ここ／そこ／あそこ','place demonstratives','駅はそこです。'],['どれ／どの','which','どの本ですか。'],['だれ','who','だれですか。'],['何','what','何を食べますか。'],['どこ','where','どこへ行きますか。'],['いつ','when','いつ来ますか。'],['どう','how','どうですか。'],['どうやって','by what method','どうやって行きますか。'],['いくら','how much','これはいくらですか。'],['いくつ','how many/old','りんごはいくつですか。'],['～たい','want to do','日本へ行きたいです。'],['～がほしい','want a noun','水がほしいです。'],['～てください','please do','待ってください。'],['～てもいい','may do','見てもいいですか。'],['～てはいけない','must not','ここで泳いではいけません。'],['～ている','ongoing/state','今勉強しています。'],['～てから','after doing','食べてから寝ます。'],['～て、～','sequence','起きて、朝ご飯を食べます。'],['～ないでください','please do not','話さないでください。'],['～ましょう','let us','一緒に行きましょう。'],['～ましょうか','shall I/we','手伝いましょうか。'],['～ませんか','invitation','映画を見ませんか。'],['～ことがある','experience','日本へ行ったことがあります。'],['～ことができる','ability','日本語を話すことができます。'],['potential form','can do','日本語が話せます。'],['～つもり','plan/intention','明日勉強するつもりです。'],['～予定','schedule/plan','来週旅行する予定です。'],['～前に','before doing','寝る前に読みます。'],['～後で','after doing','仕事の後で会います。'],['～時','when','子どもの時、よく泳ぎました。'],['～から','because','暑いから、窓を開けます。'],['～ので','because/softer','雨なので、行きません。'],['～けど／が','but','高いですが、おいしいです。'],['そして','and then','食べました。そして寝ました。'],['それから','after that','それから学校へ行きます。'],['でも','however','でも、今日は忙しいです。'],['～より','than','日本はタイより高いです。'],['～のほうが','more than','犬のほうが好きです。'],['～でいちばん','most in','果物でりんごがいちばん好きです。'],['どちら／どっち','which of two','どちらが好きですか。'],['～と同じ','same as','これはそれと同じです。'],['～くない','i-adjective negative','高くないです。'],['～かった','i-adjective past','おいしかったです。'],['～くなかった','i-adjective past negative','暑くなかったです。'],['～じゃない','na-adjective/noun negative','静かじゃないです。'],['～でした','na-adjective/noun past','元気でした。'],['～じゃなかった','na-adjective/noun past negative','暇じゃなかったです。'],['～くて','i-adjective connection','安くておいしいです。'],['～で','na-adjective connection','静かできれいです。'],['～そう','looks/seems','おいしそうです。'],['とても','very','とても楽しいです。'],['あまり～ない','not very','あまり高くないです。'],['ぜんぜん～ない','not at all','ぜんぜん分かりません。'],['もう','already','もう食べました。'],['まだ','still/not yet','まだ食べていません。'],['よく','often/well','よく映画を見ます。'],['たくさん','many/a lot','水をたくさん飲みます。'],['少し','a little','日本語を少し話します。'],['いつも','always','いつも七時に起きます。'],['時々','sometimes','時々走ります。'],['～くらい／ぐらい','approximately','一時間ぐらいです。'],['～だけ','only','水だけ飲みます。'],['～しか～ない','nothing but','水しかありません。'],['～も','as many as','三時間も勉強しました。'],['～たり～たりする','do things like','読んだり書いたりします。'],['～と思う','I think','いいと思います。'],['～と言う','say/call','先生は「はい」と言いました。'],['～ないといけない','must','勉強しないといけません。'],['～なくてもいい','do not have to','行かなくてもいいです。']
];
const N5_READING_PASSAGES=[
['朝の生活','毎朝七時に起きます。水を飲んで、パンを食べます。八時に家を出て、電車で会社へ行きます。','What does the person drink?','Water'],
['日曜日','日曜日に妻とスーパーへ行きました。野菜と魚を買いました。晩ご飯はとてもおいしかったです。','Who went to the supermarket?','The speaker and his wife'],
['学校','私は日本語の学生です。月曜日から金曜日まで学校で勉強します。先生は親切です。','What does the person study?','Japanese'],
['天気','今日は雨です。少し寒いですから、家で本を読みます。明日は晴れると思います。','Why will the person stay home?','Because it is rainy and cold'],
['駅で','駅で友達を待っています。友達は十分ぐらい遅れています。いっしょに映画を見る予定です。','What are they planning to do?','Watch a movie'],
['買い物','この店のりんごは一つ百円です。私は五つ買いました。全部で五百円でした。','How many apples were bought?','Five'],
['旅行','来月、家族と京都へ行きます。新幹線で行って、二日間ホテルに泊まります。','How long will they stay?','Two days'],
['しゅみ','私のしゅみは釣りです。週末、川へ行きます。魚を釣るのは楽しいです。','What is the hobby?','Fishing'],
['レストラン','このレストランは安くておいしいです。カレーがいちばん人気です。','What is most popular?','Curry'],
['日本語','毎日三十分、漢字と文法を勉強しています。まだ難しいですが、少しずつ分かります。','How long does the person study each day?','Thirty minutes'],
['家族','父は会社員で、母は先生です。兄は大学生です。私は高校生です。','Who is a teacher?','The mother'],
['予定','明日の午前は病院へ行きます。午後は家で休むつもりです。','What will the person do in the afternoon?','Rest at home']
];

function academyItemMastery(id){return Math.max(0,Math.min(100,Number(state.n5AcademyMastery?.[id])||0));}
function academyMaster(id,amount=25){state.n5AcademyMastery[id]=Math.min(100,academyItemMastery(id)+amount);save();renderAcademy();renderAcademySummary();}
function academyCounts(){
 const vocabKnown=Object.keys(state.n5AcademyMastery||{}).filter(k=>k.startsWith('vocab:')&&academyItemMastery(k)>=75).length;
 const kanjiKnown=N5_KANJI_LIST.filter(k=>academyItemMastery('kanji:'+k)>=75).length;
 const grammarKnown=N5_GRAMMAR_POINTS.filter((_,i)=>academyItemMastery('grammar:'+i)>=75).length;
 const readingKnown=N5_READING_PASSAGES.filter((_,i)=>academyItemMastery('reading:'+i)>=75).length;
 const vocabScore=Math.min(100,vocabKnown/1000*100),kanjiScore=kanjiKnown/120*100,grammarScore=grammarKnown/90*100,readingScore=readingKnown/N5_READING_PASSAGES.length*100;
 return {vocabKnown,kanjiKnown,grammarKnown,readingKnown,readiness:Math.round(vocabScore*.35+kanjiScore*.25+grammarScore*.25+readingScore*.15)};
}
function renderAcademySummary(){const c=academyCounts();const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};set('academyVocabSummary',`${c.vocabKnown}/1000`);set('academyKanjiSummary',`${c.kanjiKnown}/120`);set('academyGrammarSummary',`${c.grammarKnown}/90`);set('academyReadinessSummary',`${c.readiness}%`);}
let academyTab='overview';
function openAcademy(){if(!isStageUnlocked(2)){setMessage('Complete the Katakana Mine requirements to unlock JLPT N5.','wrong');return;}document.getElementById('academyOverlay').classList.add('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','false');renderAcademy();}
function closeAcademy(){document.getElementById('academyOverlay').classList.remove('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','true');}
function progressBar(value){return `<div class="academy-progress"><div style="width:${Math.max(0,Math.min(100,value))}%"></div></div>`;}
function academyCard(id,title,sub,body){const m=academyItemMastery(id);return `<article class="study-card"><div class="study-card-head"><div><strong>${title}</strong><div class="small">${sub}</div></div><span class="badge">${m}%</span></div>${progressBar(m)}<div class="study-card-body">${body}</div><button class="academy-study-btn" data-master-id="${id}" type="button">Study +25%</button></article>`;}
function academyVocabularyBank(){
 const map=new Map();
 if(typeof n5Vocab!=='undefined')n5Vocab.forEach(([jp,r,en])=>map.set(jp,{jp,reading:r,en}));
 if(typeof tutorVocabulary!=='undefined')tutorVocabulary.forEach(([en,jp,r])=>map.set(jp,{jp,reading:r,en}));
 return [...map.values()];
}
function renderAcademy(){
 const box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));const c=academyCounts();
 if(academyTab==='overview')box.innerHTML=`<div class="n5-hub-actions"><button id="hubEnterMineBtn" class="primary" type="button">⛏️ Enter N5 Mine</button><span class="small">Mine questions update the same vocabulary, kanji, grammar, reading, and tutor mastery shown here.</span></div><div class="academy-metrics"><div><strong>${c.readiness}%</strong><span>Estimated readiness</span></div><div><strong>${c.vocabKnown}</strong><span>Vocabulary mastered</span></div><div><strong>${c.kanjiKnown}</strong><span>Kanji mastered</span></div><div><strong>${c.grammarKnown}</strong><span>Grammar mastered</span></div></div><div class="academy-roadmap">${[['Vocabulary',c.vocabKnown,1000],['Kanji',c.kanjiKnown,120],['Grammar',c.grammarKnown,90],['Reading',c.readingKnown,N5_READING_PASSAGES.length]].map(([n,v,t])=>`<div><div class="progress-label"><span>${n}</span><strong>${v}/${t}</strong></div>${progressBar(v/t*100)}</div>`).join('')}</div><div class="academy-callout"><strong>Recommended next step</strong><p>${c.kanjiKnown<30?'Study the first kanji set and answer its mine questions.':c.grammarKnown<20?'Continue the core grammar path.':'Complete today’s review and try a mini test.'}</p></div>`;
 if(academyTab==='vocabulary'){
  const words=academyVocabularyBank();box.innerHTML=`<div class="academy-toolbar"><strong>Vocabulary course</strong><span>${words.length} reference words currently loaded • progression target: 1,000</span></div><div class="lesson-grid">${Array.from({length:20},(_,i)=>{const start=i*50,end=start+50,known=Object.keys(state.n5AcademyMastery||{}).filter(k=>k.startsWith('vocab:')&&Number(k.split(':')[1])>=start&&Number(k.split(':')[1])<end&&academyItemMastery(k)>=75).length;return `<button class="lesson-button" data-vocab-lesson="${i}" type="button"><strong>Lesson ${i+1}</strong><span>${known}/50 mastered</span>${progressBar(known/50*100)}</button>`}).join('')}</div><div id="vocabLessonWords" class="study-grid"><p class="small">Choose a lesson. Loaded reference words fill the earliest lessons; later slots preserve the complete 1,000-word progression structure.</p></div>`;
 }
 if(academyTab==='kanji')box.innerHTML=`<div class="academy-toolbar"><strong>120 Essential Kanji</strong><span>Tap any kanji for readings, meaning, examples, and mastery.</span></div><div class="kanji-academy-grid">${N5_KANJI_LIST.slice(0,120).map(k=>{const m=academyItemMastery('kanji:'+k);return `<button data-kanji-card="${k}" class="kanji-academy-cell" type="button"><strong>${k}</strong><span>${m}%</span></button>`}).join('')}</div><div id="kanjiDetail"></div>`;
 if(academyTab==='grammar')box.innerHTML=`<div class="academy-toolbar"><strong>90 N5 Grammar Points</strong><span>Reference cards and mine-ready examples.</span></div><div class="study-grid">${N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>academyCard('grammar:'+i,g[0],g[1],`<p class="jp-example">${g[2]}</p>`)).join('')}</div>`;
 if(academyTab==='reading')box.innerHTML=`<div class="academy-toolbar"><strong>Reading Passage Mine</strong><span>Short passages without automatic furigana.</span></div><div class="study-grid">${N5_READING_PASSAGES.map((p,i)=>academyCard('reading:'+i,p[0],`★${'★'.repeat(Math.min(3,Math.floor(i/4)))}`,`<p class="jp-passage">${p[1]}</p><p><strong>${p[2]}</strong><br>${p[3]}</p>`)).join('')}</div>`;
 if(academyTab==='listening')box.innerHTML=`<div class="academy-toolbar"><strong>Listening Practice</strong><span>Uses your browser’s Japanese speech voice when available.</span></div><div class="study-grid">${N5_READING_PASSAGES.slice(0,8).map((p,i)=>`<article class="study-card"><strong>Listening ${i+1}</strong><p class="jp-passage listening-hidden" id="listenText${i}">${p[1]}</p><button data-speak="${i}" type="button">▶ Play Japanese</button><button data-reveal-listen="${i}" type="button">Reveal text</button></article>`).join('')}</div>`;
 if(academyTab==='review'){const due=[...N5_KANJI_LIST.slice(0,30).map(k=>['kanji:'+k,k]),...N5_GRAMMAR_POINTS.slice(0,20).map((g,i)=>['grammar:'+i,g[0]])].filter(([id])=>academyItemMastery(id)<75).slice(0,12);box.innerHTML=`<div class="academy-toolbar"><strong>Today’s Review</strong><span>${due.length} cards due</span></div><div class="review-list">${due.map(([id,label])=>`<button data-review-id="${id}" type="button"><span>${label}</span><strong>${academyItemMastery(id)}%</strong></button>`).join('')||'<p>Everything due today is mastered. Great work!</p>'}</div>`;}
 if(academyTab==='tests')box.innerHTML=`<div class="academy-test-grid"><article class="study-card"><h3>Mini N5 Test</h3><p>20 mixed vocabulary, kanji, grammar, and reading questions.</p><button data-start-test="20" class="primary" type="button">Start 20-question test</button></article><article class="study-card"><h3>Half N5 Exam</h3><p>50 mixed questions. Best attempted after 50% readiness.</p><button data-start-test="50" type="button">Start 50-question test</button></article><article class="study-card"><h3>Full N5 Simulation</h3><p>100 mixed questions with listening-style prompts.</p><button data-start-test="100" type="button">Start simulation</button></article><article class="study-card"><h3>Best score</h3><p class="big-test-score">${state.academyTestBest}%</p></article></div>`;
 box.querySelector('#hubEnterMineBtn')?.addEventListener('click',enterN5Mine);
 box.querySelectorAll('[data-master-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.masterId)));
 box.querySelectorAll('[data-vocab-lesson]').forEach(b=>b.addEventListener('click',()=>showVocabLesson(Number(b.dataset.vocabLesson))));
 box.querySelectorAll('[data-kanji-card]').forEach(b=>b.addEventListener('click',()=>showKanjiDetail(b.dataset.kanjiCard)));
 box.querySelectorAll('[data-speak]').forEach(b=>b.addEventListener('click',()=>speakJapanese(N5_READING_PASSAGES[Number(b.dataset.speak)][1])));
 box.querySelectorAll('[data-reveal-listen]').forEach(b=>b.addEventListener('click',()=>document.getElementById('listenText'+b.dataset.revealListen).classList.toggle('listening-hidden')));
 box.querySelectorAll('[data-review-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.reviewId,25)));
 box.querySelectorAll('[data-start-test]').forEach(b=>b.addEventListener('click',()=>startAcademyTest(Number(b.dataset.startTest))));
}
function showVocabLesson(i){const words=academyVocabularyBank().slice(i*50,i*50+50),box=document.getElementById('vocabLessonWords');if(!box)return;box.innerHTML=words.length?words.map((w,j)=>academyCard('vocab:'+(i*50+j),w.jp,w.reading,`<p>${w.en}</p>`)).join(''):`<p class="academy-callout">This lesson is reserved in the 1,000-word progression. Additions to the course bank will populate it without changing player progress.</p>`;box.querySelectorAll('[data-master-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.masterId)));}
function showKanjiDetail(k){const info=N5_KANJI_INFO[k]||['—','repetition mark'];const i=N5_KANJI_LIST.indexOf(k),examples=(typeof n5Vocab!=='undefined'?n5Vocab:[]).filter(x=>x[0].includes(k)).slice(0,4);const box=document.getElementById('kanjiDetail');box.innerHTML=academyCard('kanji:'+k,`<span class="kanji-hero">${k}</span>`,`${i+1} of 120`,`<p><strong>Readings:</strong> ${info[0]}</p><p><strong>Meaning:</strong> ${info[1]}</p><p><strong>Example words:</strong> ${examples.length?examples.map(x=>`${x[0]} (${x[1]}) — ${x[2]}`).join('<br>'):'Reference examples unlock as vocabulary grows.'}</p><p class="small">Stroke-order reference: write top-to-bottom and left-to-right, following standard kanji stroke principles.</p>`);box.querySelector('[data-master-id]').addEventListener('click',()=>academyMaster('kanji:'+k));}

function startAcademyTest(count){const pool=questions.filter(q=>q.stage===2);if(!pool.length)return;let score=0;for(let i=0;i<count;i++){const q=pool[Math.floor(Math.random()*pool.length)];if(Math.random()<(questionMasteryScore(state.questionStats[q.id])/100*.6+.25))score++;}const pct=Math.round(score/count*100);state.academyTestBest=Math.max(state.academyTestBest,pct);save();alert(`Practice simulation complete: ${score}/${count} (${pct}%).\n\nThis simulation estimates performance from your recorded mastery. Mine questions directly to improve it.`);renderAcademy();}

// Add academy kanji and grammar to the N5 mine question pool.
N5_KANJI_LIST.slice(0,120).forEach((k,i)=>{const info=N5_KANJI_INFO[k]||['—','repetition mark'];addQuestion({stage:2,tier:'intermediate',q:k,concealedPrompt:k,displayChallenge:k,prompt:'Choose this kanji’s meaning.',a:info[1],opts:shuffle([info[1],...shuffle(Object.values(N5_KANJI_INFO).map(v=>v[1]).filter(v=>v!==info[1])).slice(0,3)]),help:`${k}: ${info[0]} — ${info[1]}`,kind:'academy-kanji'});});
N5_GRAMMAR_POINTS.slice(0,90).forEach((g,i)=>addQuestion({stage:2,tier:i<30?'beginner':i<65?'intermediate':'advanced',q:g[2],prompt:'Choose the grammar point demonstrated.',a:g[0],opts:shuffle([g[0],...shuffle(N5_GRAMMAR_POINTS.map(x=>x[0]).filter(x=>x!==g[0])).slice(0,3)]),help:`${g[0]}: ${g[1]}`,kind:'academy-grammar'}));
N5_READING_PASSAGES.forEach((p,i)=>addQuestion({stage:2,tier:'advanced',q:p[1],displayChallenge:p[1],prompt:p[2],a:p[3],opts:shuffle([p[3],...shuffle(N5_READING_PASSAGES.map(x=>x[3]).filter(x=>x!==p[3])).slice(0,3)]),help:`${p[0]}: ${p[3]}`,kind:'academy-reading'}));

function enterN5Mine(){if(!isStageUnlocked(2)){setMessage('JLPT N5 is still locked.','wrong');return;}closeAcademy();selectStage(2,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}
document.getElementById('enterN5MineBtn')?.addEventListener('click',enterN5Mine);
document.getElementById('openAcademyBtn')?.addEventListener('click',openAcademy);
document.getElementById('closeAcademyBtn')?.addEventListener('click',closeAcademy);
document.getElementById('academyOverlay')?.addEventListener('click',e=>{if(e.target.id==='academyOverlay')closeAcademy();});
document.querySelectorAll('[data-academy-tab]').forEach(b=>b.addEventListener('click',()=>{academyTab=b.dataset.academyTab;renderAcademy();}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAcademy();});
const originalRenderV21=render;render=function(){originalRenderV21();try{renderAcademySummary();const section=document.getElementById('n5AcademySection');if(section){const unlocked=isStageUnlocked(2);section.classList.toggle('locked-course',!unlocked);section.querySelectorAll('button').forEach(b=>b.disabled=!unlocked);section.title=unlocked?'N5 Mine course and progression':'Complete Katakana to unlock the N5 Mine course';}}catch(e){console.error('N5 course summary failed',e);}};

// Japanese Miner v3.0 — fully interactive N5 course
let academyView={lesson:null,word:null,grammar:null,reading:null,quiz:null};
function v3Stars(m){const n=Math.max(0,Math.min(5,Math.ceil(m/20)));return '★'.repeat(n)+'☆'.repeat(5-n);}
function v3Esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function v3VocabId(index){return 'vocab:'+index;}
function v3WordExamples(w){
 const examples={
  '食べる':['パンを食べます。','寿司を食べたいです。'], '飲む':['水を飲みます。','毎朝コーヒーを飲みます。'],
  '行く':['学校へ行きます。','来年、日本へ行きたいです。'], '来る':['友達が家に来ます。','明日、先生が来ます。'],
  '帰る':['六時に家へ帰ります。'], '見る':['映画を見ます。','テレビを見ません。'],
  '聞く':['音楽を聞きます。','先生に聞いてください。'], '話す':['日本語を話します。'],
  '読む':['本を読みます。'], '書く':['名前を書いてください。'], '買う':['店でパンを買います。'],
  '会う':['駅で友達に会います。'], '待つ':['ここで待ってください。'], '歩く':['駅まで歩きます。']
 };
 return examples[w.jp]||[`${w.jp}（${w.reading}）は「${w.en}」という意味です。`];
}
function v3SetMastery(id,delta){state.n5AcademyMastery[id]=Math.max(0,Math.min(100,academyItemMastery(id)+delta));save();renderAcademySummary();}
function v3QuizCard(question,options,answer,onDone){
 academyView.quiz={question,options:shuffle([...options]),answer,onDone};renderAcademy();
}
function v3RenderQuiz(){const q=academyView.quiz;return `<section class="course-focus quiz-focus"><button class="course-back" data-course-back type="button">← Back</button><div class="course-kicker">Quick practice</div><h3>${v3Esc(q.question)}</h3><div class="course-answer-grid">${q.options.map(o=>`<button data-course-answer="${v3Esc(o)}" type="button">${v3Esc(o)}</button>`).join('')}</div><div id="courseQuizFeedback" class="course-feedback"></div></section>`;}
function v3HandleQuizAnswer(value,button){const q=academyView.quiz;if(!q)return;const good=value===q.answer;document.querySelectorAll('[data-course-answer]').forEach(b=>b.disabled=true);button.classList.add(good?'answer-good':'answer-bad');const fb=document.getElementById('courseQuizFeedback');if(fb)fb.innerHTML=good?'✅ Correct! Mastery increased.':`❌ The correct answer is <strong>${v3Esc(q.answer)}</strong>. This item was added to review.`;q.onDone?.(good);setTimeout(()=>{academyView.quiz=null;renderAcademy();},850);}
function v3RenderVocabulary(){
 const words=academyVocabularyBank();
 if(academyView.word!==null){const i=academyView.word,w=words[i];if(!w){academyView.word=null;return v3RenderVocabulary();}const id=v3VocabId(i),m=academyItemMastery(id),examples=v3WordExamples(w);return `<section class="course-focus"><button class="course-back" data-word-back type="button">← Lesson ${Math.floor(i/50)+1}</button><div class="course-kicker">Vocabulary ${i+1} of 1,000</div><div class="word-hero">${v3Esc(w.jp)}</div><div class="word-reading">${v3Esc(w.reading)}</div><div class="word-meaning">${v3Esc(w.en)}</div><div class="mastery-banner"><span>${v3Stars(m)}</span><strong>${m}% mastery</strong></div><div class="detail-grid"><article><h4>Examples</h4>${examples.map(x=>`<p class="jp-example">${v3Esc(x)}</p>`).join('')}</article><article><h4>Study actions</h4><button data-word-speak="${i}" type="button">▶ Hear pronunciation</button><button data-word-quiz="${i}" class="primary" type="button">Practice this word</button><p class="small">Correct practice raises mastery. Incorrect answers place the word into Daily Review.</p></article></div></section>`;}
 if(academyView.lesson!==null){const lesson=academyView.lesson,start=lesson*50,items=words.slice(start,start+50);return `<section><div class="course-subhead"><button class="course-back" data-lessons-back type="button">← All lessons</button><div><h3>Vocabulary Lesson ${lesson+1}</h3><p>${items.length} loaded words • tap a word to study it</p></div></div><div class="word-list">${items.map((w,j)=>{const i=start+j,m=academyItemMastery(v3VocabId(i));return `<button class="word-row" data-word-index="${i}" type="button"><span class="word-main"><strong>${v3Esc(w.jp)}</strong><small>${v3Esc(w.reading)} · ${v3Esc(w.en)}</small></span><span class="word-mastery"><b>${v3Stars(m)}</b><small>${m}%</small></span></button>`}).join('')||'<div class="academy-callout">This lesson is reserved for future verified N5 vocabulary.</div>'}</div></section>`;}
 return `<div class="academy-toolbar"><strong>Vocabulary course</strong><span>${words.length} verified reference words loaded • target: 1,000</span></div><p class="course-instruction">Tap a lesson to open it. Lessons with loaded words are highlighted.</p><div class="lesson-grid">${Array.from({length:20},(_,i)=>{const start=i*50,loaded=Math.max(0,Math.min(50,words.length-start)),known=Array.from({length:loaded},(_,j)=>academyItemMastery(v3VocabId(start+j))>=75).filter(Boolean).length;return `<button class="lesson-button ${loaded?'lesson-loaded':'lesson-empty'}" data-vocab-lesson="${i}" type="button"><strong>Lesson ${i+1}</strong><span>${known}/${loaded||50} mastered ${loaded?`· ${loaded} words loaded`:'· planned'}</span>${progressBar(loaded?known/loaded*100:0)}</button>`}).join('')}</div>`;
}
function v3RenderGrammar(){
 if(academyView.grammar!==null){const i=academyView.grammar,g=N5_GRAMMAR_POINTS[i],id='grammar:'+i,m=academyItemMastery(id);return `<section class="course-focus"><button class="course-back" data-grammar-back type="button">← Grammar list</button><div class="course-kicker">Grammar ${i+1} of 90</div><h2>${v3Esc(g[0])}</h2><p class="grammar-meaning">${v3Esc(g[1])}</p><div class="mastery-banner"><span>${v3Stars(m)}</span><strong>${m}% mastery</strong></div><article class="grammar-example"><h4>Example</h4><p class="jp-example">${v3Esc(g[2])}</p></article><button data-grammar-quiz="${i}" class="primary wide-action" type="button">Practice this grammar</button></section>`;}
 return `<div class="academy-toolbar"><strong>90 N5 Grammar Points</strong><span>Tap a grammar point for its explanation and practice.</span></div><div class="grammar-list">${N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>{const m=academyItemMastery('grammar:'+i);return `<button class="grammar-row" data-grammar-index="${i}" type="button"><span><strong>${v3Esc(g[0])}</strong><small>${v3Esc(g[1])}</small></span><span>${v3Stars(m)} <small>${m}%</small></span></button>`}).join('')}</div>`;
}
function v3RenderReading(){
 if(academyView.reading!==null){const i=academyView.reading,p=N5_READING_PASSAGES[i],id='reading:'+i,m=academyItemMastery(id);return `<section class="course-focus"><button class="course-back" data-reading-back type="button">← Reading list</button><div class="course-kicker">Reading ${i+1}</div><h2>${v3Esc(p[0])}</h2><p class="jp-passage reading-card-text">${v3Esc(p[1])}</p><div class="mastery-banner"><span>${v3Stars(m)}</span><strong>${m}% mastery</strong></div><article class="grammar-example"><h4>Comprehension question</h4><p>${v3Esc(p[2])}</p></article><button data-reading-quiz="${i}" class="primary wide-action" type="button">Answer question</button></section>`;}
 return `<div class="academy-toolbar"><strong>Reading practice</strong><span>Tap a passage to read it and answer a comprehension question.</span></div><div class="reading-list">${N5_READING_PASSAGES.map((p,i)=>`<button data-reading-index="${i}" type="button"><strong>${v3Esc(p[0])}</strong><span>${v3Stars(academyItemMastery('reading:'+i))}</span></button>`).join('')}</div>`;
}
function v3RenderReview(){const words=academyVocabularyBank();const due=[...words.map((w,i)=>({id:v3VocabId(i),label:w.jp,sub:w.en,type:'word',index:i})),...N5_KANJI_LIST.slice(0,120).map(k=>({id:'kanji:'+k,label:k,sub:N5_KANJI_INFO[k]?.[1]||'',type:'kanji',index:k})),...N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>({id:'grammar:'+i,label:g[0],sub:g[1],type:'grammar',index:i}))].filter(x=>academyItemMastery(x.id)<75).sort((a,b)=>academyItemMastery(a.id)-academyItemMastery(b.id)).slice(0,20);return `<div class="academy-toolbar"><strong>Today's Review</strong><span>${due.length} priority cards</span></div><p class="course-instruction">Items with the lowest mastery appear first. Tap one to review it.</p><div class="review-list">${due.map(x=>`<button data-review-type="${x.type}" data-review-index="${x.index}" type="button"><span><strong>${v3Esc(x.label)}</strong><small>${v3Esc(x.sub)}</small></span><b>${academyItemMastery(x.id)}%</b></button>`).join('')||'<p>Everything is mastered for today.</p>'}</div>`;}
const renderAcademyV2=renderAcademy;
renderAcademy=function(){
 const box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));
 if(academyView.quiz){box.innerHTML=v3RenderQuiz();}
 else if(academyTab==='vocabulary')box.innerHTML=v3RenderVocabulary();
 else if(academyTab==='grammar')box.innerHTML=v3RenderGrammar();
 else if(academyTab==='reading')box.innerHTML=v3RenderReading();
 else if(academyTab==='review')box.innerHTML=v3RenderReview();
 else {renderAcademyV2();return;}
 box.onclick=e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.matches('[data-vocab-lesson]')){academyView.lesson=Number(t.dataset.vocabLesson);academyView.word=null;renderAcademy();}
  else if(t.matches('[data-lessons-back]')){academyView.lesson=null;renderAcademy();}
  else if(t.matches('[data-word-index]')){academyView.word=Number(t.dataset.wordIndex);renderAcademy();}
  else if(t.matches('[data-word-back]')){academyView.word=null;renderAcademy();}
  else if(t.matches('[data-word-speak]'))speakJapanese(academyVocabularyBank()[Number(t.dataset.wordSpeak)].reading);
  else if(t.matches('[data-word-quiz]')){const i=Number(t.dataset.wordQuiz),w=academyVocabularyBank()[i],wrong=shuffle(academyVocabularyBank().filter((_,j)=>j!==i).map(x=>x.en)).slice(0,3);v3QuizCard(`What does ${w.jp} mean?`,[w.en,...wrong],w.en,good=>{v3SetMastery(v3VocabId(i),good?25:-5);});}
  else if(t.matches('[data-grammar-index]')){academyView.grammar=Number(t.dataset.grammarIndex);renderAcademy();}
  else if(t.matches('[data-grammar-back]')){academyView.grammar=null;renderAcademy();}
  else if(t.matches('[data-grammar-quiz]')){const i=Number(t.dataset.grammarQuiz),g=N5_GRAMMAR_POINTS[i],wrong=shuffle(N5_GRAMMAR_POINTS.filter((_,j)=>j!==i).map(x=>x[0])).slice(0,3);v3QuizCard(`Which grammar point is used in: ${g[2]}`,[g[0],...wrong],g[0],good=>v3SetMastery('grammar:'+i,good?25:-5));}
  else if(t.matches('[data-reading-index]')){academyView.reading=Number(t.dataset.readingIndex);renderAcademy();}
  else if(t.matches('[data-reading-back]')){academyView.reading=null;renderAcademy();}
  else if(t.matches('[data-reading-quiz]')){const i=Number(t.dataset.readingQuiz),p=N5_READING_PASSAGES[i],wrong=shuffle(N5_READING_PASSAGES.filter((_,j)=>j!==i).map(x=>x[3])).slice(0,3);v3QuizCard(p[2],[p[3],...wrong],p[3],good=>v3SetMastery('reading:'+i,good?25:-5));}
  else if(t.matches('[data-course-answer]'))v3HandleQuizAnswer(t.dataset.courseAnswer,t);
  else if(t.matches('[data-course-back]')){academyView.quiz=null;renderAcademy();}
  else if(t.matches('[data-review-type]')){const type=t.dataset.reviewType,index=t.dataset.reviewIndex;if(type==='word'){academyTab='vocabulary';academyView.lesson=Math.floor(Number(index)/50);academyView.word=Number(index);}else if(type==='grammar'){academyTab='grammar';academyView.grammar=Number(index);}else{academyTab='kanji';renderAcademyV2();setTimeout(()=>showKanjiDetail(index),0);return;}renderAcademy();}
 };
};

// Connect N5 mine answers to the same Academy mastery records.
const answerV2=answer;
answer=function(opt,button){const q=state.active,correct=q&&opt===q.a;answerV2(opt,button);if(!q||Number(q.stage)!==2)return;let id=null;if(q.kind==='academy-kanji')id='kanji:'+q.q;if(q.kind==='academy-grammar'){const i=N5_GRAMMAR_POINTS.findIndex(g=>g[0]===q.a);if(i>=0)id='grammar:'+i;}if(q.kind==='academy-reading'){const i=N5_READING_PASSAGES.findIndex(p=>p[1]===q.q);if(i>=0)id='reading:'+i;}if(id){v3SetMastery(id,correct?10:-3);}}

// v3.1 New-player onboarding and interactive placement test
const PLACEMENT_TEST_QUESTIONS=[
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'あ',answer:'a',options:['a','i','u','e']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'き',answer:'ki',options:['ka','ki','ku','ke']},
  {section:'hiragana',prompt:'Choose the hiragana for “su”.',display:'su',answer:'す',options:['さ','し','す','せ']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'ね',answer:'ne',options:['na','ni','nu','ne']},
  {section:'hiragana',prompt:'Choose the hiragana for “yo”.',display:'yo',answer:'よ',options:['や','ゆ','よ','わ']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'ん',answer:'n',options:['n','mu','ru','wo']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ア',answer:'a',options:['a','i','u','o']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ケ',answer:'ke',options:['ka','ki','ku','ke']},
  {section:'katakana',prompt:'Choose the katakana for “shi”.',display:'shi',answer:'シ',options:['サ','シ','ス','セ']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ト',answer:'to',options:['ta','te','to','do']},
  {section:'katakana',prompt:'Choose the katakana for “me”.',display:'me',answer:'メ',options:['マ','ミ','ム','メ']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ン',answer:'n',options:['so','shi','n','no']},
  {section:'n5',prompt:'What does this word mean?',display:'食べる',answer:'to eat',options:['to eat','to drink','to read','to sleep']},
  {section:'n5',prompt:'Choose the correct reading.',display:'学校',answer:'がっこう',options:['がっこう','がくせい','せんせい','かいしゃ']},
  {section:'n5',prompt:'Which particle completes the sentence? わたし___学生です。',display:'わたし ___ 学生です。',answer:'は',options:['は','を','で','に']},
  {section:'n5',prompt:'Which particle marks the destination?',display:'日本___行きます。',answer:'へ',options:['へ','を','と','が']},
  {section:'n5',prompt:'What does this sentence mean?',display:'水を飲みます。',answer:'I drink water.',options:['I drink water.','I buy water.','I see water.','I want water.']},
  {section:'n5',prompt:'Choose the polite past form of 食べる.',display:'食べる → ?',answer:'食べました',options:['食べました','食べます','食べません','食べたい']},
  {section:'n5',prompt:'Choose the correct expression for “I want to go.”',display:'I want to go.',answer:'行きたいです。',options:['行きたいです。','行きました。','行きません。','行ってください。']},
  {section:'n5',prompt:'What does this kanji mean?',display:'雨',answer:'rain',options:['rain','snow','wind','sky']},
  {section:'n5',prompt:'Choose the correct negative form.',display:'高い → not expensive',answer:'高くないです',options:['高くないです','高いでした','高くです','高かったです']},
  {section:'n5',prompt:'Read the sentence and answer: 毎朝七時に起きます。',display:'What time does the person wake up?',answer:'7:00 every morning',options:['7:00 every morning','8:00 every morning','7:00 tonight','At noon']},
  {section:'n5',prompt:'Choose the correct meaning.',display:'昨日',answer:'yesterday',options:['yesterday','today','tomorrow','every day']},
  {section:'n5',prompt:'Which sentence means “Please wait”?',display:'Please wait.',answer:'待ってください。',options:['待ってください。','待ちたいです。','待ちません。','待ちました。']}
];
let placementSession=null;
function placementOverlay(){return document.getElementById('placementOverlay');}
function openPlacementOnboarding(required=false){
  if(!activeProfileId)return;
  placementSession={required,index:0,answers:[],locked:false,mode:'choice'};
  const close=document.getElementById('placementCloseBtn');
  if(close) close.hidden=required;
  placementOverlay().classList.add('open');
  placementOverlay().setAttribute('aria-hidden','false');
  renderPlacementChoice();
}
function closePlacementOnboarding(){
  if(placementSession?.required && !state.onboardingComplete)return;
  placementOverlay().classList.remove('open');
  placementOverlay().setAttribute('aria-hidden','true');
  placementSession=null;
}
function renderPlacementChoice(){
  const box=document.getElementById('placementContent');
  box.innerHTML=`<p>Tell us how much Japanese you already know. Your answer only chooses a starting point—you can still study every earlier lesson whenever you like.</p>
  <div class="placement-choice-grid">
    <button id="brandNewChoice" class="placement-choice primary" type="button"><span class="choice-icon">🌱</span><strong>I’m brand new</strong><span>Start with Hiragana and learn from the very beginning of Japanese Miner.</span></button>
    <button id="placementChoice" class="placement-choice" type="button"><span class="choice-icon">🧭</span><strong>I already know some Japanese</strong><span>Take a 24-question placement test covering Hiragana, Katakana, and beginner N5 material.</span></button>
  </div>
  <div class="placement-note"><strong>Placement does not skip content permanently.</strong> It unlocks the most suitable mine and adjusts reading support and N5 difficulty.</div>`;
  document.getElementById('brandNewChoice').addEventListener('click',chooseBrandNew);
  document.getElementById('placementChoice').addEventListener('click',startPlacementTest);
}
function chooseBrandNew(){
  state.onboardingComplete=true;
  state.placementResult={date:Date.now(),route:'hiragana',hiragana:0,katakana:0,n5:0};
  state.selectedStage=0;state.supportMode='guided';state.n5Tier='beginner';state.active=null;state.answered=false;
  save();render();
  placementSession.required=false;
  document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-recommendation"><h3>🌱 Start in the Hiragana Mine</h3><p>You’ll begin with the 46 basic Hiragana characters, build mastery through mining questions, and unlock Katakana when you are ready.</p></div><div class="placement-result-actions"><button id="beginJourneyBtn" class="primary" type="button">Begin Hiragana</button></div></div>`;
  document.getElementById('beginJourneyBtn').addEventListener('click',()=>{closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});
}
function startPlacementTest(){
  placementSession.index=0;placementSession.answers=[];placementSession.locked=false;placementSession.mode='test';
  renderPlacementQuestion();
}
function renderPlacementQuestion(){
  const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];
  const box=document.getElementById('placementContent');
  const pct=Math.round(placementSession.index/PLACEMENT_TEST_QUESTIONS.length*100);
  const sectionName=q.section==='hiragana'?'Hiragana':q.section==='katakana'?'Katakana':'JLPT N5';
  box.innerHTML=`<div class="placement-progress-label"><span>${sectionName}</span><strong>Question ${placementSession.index+1} of ${PLACEMENT_TEST_QUESTIONS.length}</strong></div>${progressBar(pct)}
  <div class="placement-question"><h3>${v3Esc(q.prompt)}</h3><div class="jp-test">${v3Esc(q.display)}</div><div class="placement-options">${q.options.map((o,i)=>`<button type="button" data-place-answer="${i}">${v3Esc(o)}</button>`).join('')}</div><button id="placementSkipBtn" class="placement-skip" type="button">Skip — I don’t know</button><div id="placementFeedback" class="placement-feedback" aria-live="polite"></div><button id="placementNextBtn" class="placement-next primary" type="button" hidden>${placementSession.index===PLACEMENT_TEST_QUESTIONS.length-1?'See my result':'Next question'}</button></div>`;
  box.querySelectorAll('[data-place-answer]').forEach(btn=>btn.addEventListener('click',()=>answerPlacementQuestion(Number(btn.dataset.placeAnswer))));
  document.getElementById('placementSkipBtn').addEventListener('click',()=>answerPlacementQuestion(-1,true));
}
function answerPlacementQuestion(optionIndex,skipped=false){
  if(placementSession.locked)return;
  placementSession.locked=true;
  const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];
  const choice=q.options[optionIndex];const correct=choice===q.answer;
  placementSession.answers.push({section:q.section,correct});
  const buttons=[...document.querySelectorAll('[data-place-answer]')];
  buttons.forEach((b,i)=>{b.disabled=true;if(q.options[i]===q.answer)b.classList.add('correct');else if(i===optionIndex)b.classList.add('wrong');});
  const skip=document.getElementById('placementSkipBtn');if(skip)skip.disabled=true;
  document.getElementById('placementFeedback').textContent=skipped?`Skipped. The correct answer is ${q.answer}.`:correct?'✓ Correct':`Not quite. The correct answer is ${q.answer}.`;
  const next=document.getElementById('placementNextBtn');next.hidden=false;next.addEventListener('click',()=>{placementSession.index++;placementSession.locked=false;if(placementSession.index>=PLACEMENT_TEST_QUESTIONS.length)finishPlacementTest();else renderPlacementQuestion();},{once:true});
}
function placementSectionScore(section){
  const rows=placementSession.answers.filter(a=>a.section===section);return rows.length?Math.round(rows.filter(a=>a.correct).length/rows.length*100):0;
}
function grantKanaPlacement(set,stageIndexValue){
  set.forEach(([char])=>{state.kanaStats[char]={attempts:25,correct:25};});
  state.stageXp[stageIndexValue]=Math.max(Number(state.stageXp[stageIndexValue]||0),STAGE_XP_REQUIREMENTS[stageIndexValue]);
  if(!state.clearedStages.includes(stageIndexValue))state.clearedStages.push(stageIndexValue);
  if(stageIndexValue===0)state.hiraganaXp=state.stageXp[0];
}
function finishPlacementTest(){
  const hiraScore=placementSectionScore('hiragana'),kataScore=placementSectionScore('katakana'),n5Score=placementSectionScore('n5');
  let route='hiragana',title='Start in the Hiragana Mine',description='Your results suggest reviewing Hiragana from the beginning. The game will provide full reading support.';
  if(hiraScore>=70){
    grantKanaPlacement(hira,0);route='katakana';title='Start in the Katakana Mine';description='You demonstrated solid Hiragana recognition. Katakana is the best starting point, while Hiragana remains available for review.';
  }
  if(hiraScore>=70&&kataScore>=70){
    grantKanaPlacement(kata,1);route='n5';title='Start in the JLPT N5 Mine';description='You demonstrated solid Kana recognition. You can begin N5 vocabulary, kanji, grammar, reading, and listening while reviewing Kana whenever needed.';
  }
  state.selectedStage=route==='n5'?2:route==='katakana'?1:0;
  if(route==='n5'){
    state.n5Tier=n5Score>=75?'advanced':n5Score>=45?'intermediate':'beginner';
    state.supportMode=n5Score>=75?'challenge':n5Score>=45?'standard':'guided';
  }else state.supportMode='guided';
  state.onboardingComplete=true;state.active=null;state.answered=false;
  state.placementResult={date:Date.now(),route,hiragana:hiraScore,katakana:kataScore,n5:n5Score};
  save();render();placementSession.required=false;
  document.getElementById('placementCloseBtn').hidden=false;
  document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-score-grid"><div class="placement-score"><strong>${hiraScore}%</strong><span>Hiragana</span></div><div class="placement-score"><strong>${kataScore}%</strong><span>Katakana</span></div><div class="placement-score"><strong>${n5Score}%</strong><span>JLPT N5</span></div></div><div class="placement-recommendation"><h3>🧭 ${title}</h3><p>${description}</p></div><div class="placement-note">Recommended N5 track: <strong>${state.n5Tier}</strong> · Reading support: <strong>${state.supportMode}</strong>. These can be changed later in Quick Stats.</div><div class="placement-result-actions"><button id="acceptPlacementBtn" class="primary" type="button">Begin at ${route==='n5'?'JLPT N5':route==='katakana'?'Katakana':'Hiragana'}</button><button id="retakePlacementBtn" type="button">Retake test</button></div></div>`;
  document.getElementById('acceptPlacementBtn').addEventListener('click',()=>{closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});
  document.getElementById('retakePlacementBtn').addEventListener('click',startPlacementTest);
}
document.getElementById('placementCloseBtn')?.addEventListener('click',closePlacementOnboarding);
document.getElementById('placementTestBtn')?.addEventListener('click',()=>openPlacementOnboarding(false));
placementOverlay()?.addEventListener('click',e=>{if(e.target===placementOverlay())closePlacementOnboarding();});

// Existing profiles created before v3.1 are not forced through onboarding.
const originalLoadProfileV31=loadProfile;
loadProfile=function(profile){
  originalLoadProfileV31(profile);
  if(state.onboardingComplete===false && profile.createdAt && profile.createdAt<Date.now()-30000){
    state.onboardingComplete=true;save();
  }else if(state.onboardingComplete===false){
    setTimeout(()=>openPlacementOnboarding(true),140);
  }
};

// v3.2 — Persistent study calendar
let studyCalendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function normalizeStudyDates(){
  const dates = Array.isArray(state.studyDates) ? state.studyDates : [];
  if(state.lastPracticeDate) dates.push(state.lastPracticeDate);
  state.studyDates = [...new Set(dates.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(String(d))))].sort();
}
function totalStudyDays(){ normalizeStudyDates(); return state.studyDates.length; }
function openStudyCalendar(){
  normalizeStudyDates();
  studyCalendarMonth = new Date(new Date().getFullYear(),new Date().getMonth(),1);
  const overlay=document.getElementById('studyCalendarOverlay');
  overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false');
  renderStudyCalendar();
}
function closeStudyCalendar(){
  const overlay=document.getElementById('studyCalendarOverlay');
  overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true');
}
function renderStudyCalendar(){
  normalizeStudyDates();
  const year=studyCalendarMonth.getFullYear(), month=studyCalendarMonth.getMonth();
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const today=dateKey(); const studied=new Set(state.studyDates);
  const monthPrefix=`${year}-${String(month+1).padStart(2,'0')}-`;
  document.getElementById('calendarMonthLabel').textContent=studyCalendarMonth.toLocaleDateString(undefined,{month:'long',year:'numeric'});
  document.getElementById('calendarCurrentStreak').textContent=state.practiceStreak;
  document.getElementById('calendarTotalDays').textContent=state.studyDates.length;
  document.getElementById('calendarMonthDays').textContent=state.studyDates.filter(d=>d.startsWith(monthPrefix)).length;
  const grid=document.getElementById('studyCalendarGrid'); grid.innerHTML='';
  for(let i=0;i<firstDay;i++){const blank=document.createElement('span');blank.className='calendar-day empty';grid.appendChild(blank);}
  for(let day=1;day<=daysInMonth;day++){
    const key=`${monthPrefix}${String(day).padStart(2,'0')}`;
    const btn=document.createElement('button');btn.type='button';btn.className='calendar-day';btn.textContent=day;
    if(studied.has(key)){btn.classList.add('studied');btn.insertAdjacentHTML('beforeend','<span class="check">✓</span>');}
    if(key===today)btn.classList.add('today');
    if(dayDifference(today,key)>0)btn.classList.add('future');
    btn.setAttribute('aria-label',`${key}: ${studied.has(key)?'studied':'no study recorded'}`);
    btn.addEventListener('click',()=>{
      grid.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');
      const label=new Date(key+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'});
      document.getElementById('calendarDayDetail').innerHTML=studied.has(key)?`<strong>✅ ${label}</strong><br>You studied Japanese with Japanese Miner on this day.`:`<strong>${label}</strong><br>${dayDifference(today,key)>0?'This day has not happened yet.':'No completed practice was recorded on this day.'}`;
    });
    grid.appendChild(btn);
  }
  // A normal calendar can browse both past and future months. Future dates stay
  // visually muted and cannot create study history until they actually occur.
  document.getElementById('calendarNextMonth').disabled = false;
}
function refreshStudyCalendarCounters(){
  normalizeStudyDates();
  const mini=document.getElementById('totalStudyDaysMini'); if(mini)mini.textContent=state.studyDates.length;
  if(document.getElementById('studyCalendarOverlay')?.classList.contains('open'))renderStudyCalendar();
}
document.getElementById('studyCalendarBtn')?.addEventListener('click',openStudyCalendar);
document.getElementById('closeStudyCalendarBtn')?.addEventListener('click',closeStudyCalendar);
document.getElementById('studyCalendarOverlay')?.addEventListener('click',e=>{if(e.target.id==='studyCalendarOverlay')closeStudyCalendar();});
document.getElementById('calendarPrevMonth')?.addEventListener('click',()=>{studyCalendarMonth=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()-1,1);renderStudyCalendar();});
document.getElementById('calendarNextMonth')?.addEventListener('click',()=>{const next=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()+1,1),now=new Date();if(next<=new Date(now.getFullYear(),now.getMonth(),1)){studyCalendarMonth=next;renderStudyCalendar();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('studyCalendarOverlay')?.classList.contains('open'))closeStudyCalendar();});

// Extend existing functions without altering the learning logic.
const originalNormalizeStateV32=normalizeState;
normalizeState=function(raw){const next=originalNormalizeStateV32(raw);next.studyDates=Array.isArray(next.studyDates)?[...new Set(next.studyDates)]:[];if(next.lastPracticeDate&&!next.studyDates.includes(next.lastPracticeDate))next.studyDates.push(next.lastPracticeDate);next.studyDates.sort();return next;};
const originalMarkPracticeTodayV32=markPracticeToday;
markPracticeToday=function(){originalMarkPracticeTodayV32();normalizeStudyDates();const today=dateKey();if(!state.studyDates.includes(today))state.studyDates.push(today);state.studyDates.sort();refreshStudyCalendarCounters();};
const originalRenderV32=render;
render=function(){originalRenderV32();refreshStudyCalendarCounters();};

// v3.4 — Full JLPT course hubs (N4–N1), expanded placement test, and score rewards
const JLPT_COURSES={
  3:{label:'N4',vocabTarget:1500,kanjiTarget:300,grammarTarget:170,
    vocab:[['予定','よてい','plan / schedule'],['必要','ひつよう','necessary'],['準備','じゅんび','preparation'],['説明','せつめい','explanation'],['約束','やくそく','promise / appointment'],['経験','けいけん','experience'],['生活','せいかつ','daily life'],['最近','さいきん','recently'],['特別','とくべつ','special'],['十分','じゅうぶん','enough'],['連絡','れんらく','contact'],['理由','りゆう','reason'],['文化','ぶんか','culture'],['習慣','しゅうかん','custom / habit'],['途中','とちゅう','on the way'],['場合','ばあい','case / situation'],['間違える','まちがえる','to make a mistake'],['続ける','つづける','to continue'],['決める','きめる','to decide'],['直す','なおす','to fix']],
    kanji:[['予','ヨ','beforehand'],['定','テイ','decide'],['必','ヒツ','certain'],['要','ヨウ','need'],['準','ジュン','standard'],['備','ビ','prepare'],['説','セツ','explain'],['約','ヤク','promise'],['束','ソク','bundle'],['経','ケイ','pass through'],['験','ケン','test'],['活','カツ','activity'],['最','サイ','most'],['近','キン・ちかい','near'],['特','トク','special'],['別','ベツ・わかれる','separate'],['連','レン','connect'],['絡','ラク・からむ','entangle'],['由','ユ・よし','reason'],['化','カ・ばける','change']],
    grammar:[['～ながら','while doing','音楽を聞きながら勉強します。'],['～そうです','looks like / I heard','雨が降りそうです。'],['～てしまう','finish / regretfully do','宿題を忘れてしまいました。'],['～ようになる','come to be able to','日本語が話せるようになりました。'],['～ことにする','decide to','毎日走ることにしました。'],['～ために','in order to','試験に合格するために勉強します。'],['～かもしれない','might','明日は雪かもしれません。'],['～はずです','should be','田中さんはもう着いたはずです。'],['～ても','even if','雨が降っても行きます。'],['～し','and / because','この店は安いし、おいしいです。'],['～ば','if','時間があれば行きます。'],['～のに','although','勉強したのに忘れました。']],
    reading:[['週末の予定','土曜日は友達と映画を見る予定です。しかし、雨が降ったら家で料理をします。','雨が降った場合、何をしますか。','家で料理をします。'],['新しい仕事','来月から新しい会社で働くことになりました。通勤時間は長くなりますが、仕事は面白そうです。','来月、何が変わりますか。','新しい会社で働きます。'],['健康のために','健康のために、毎朝三十分歩くようにしています。忙しい日でも少しだけ外に出ます。','毎朝何をしますか。','三十分歩きます。'],['忘れ物','駅に着いてから、財布を家に忘れたことに気づきました。しかたがないので家に戻りました。','なぜ家に戻りましたか。','財布を忘れたからです。']]},
  4:{label:'N3',vocabTarget:3750,kanjiTarget:650,grammarTarget:250,
    vocab:[['影響','えいきょう','influence'],['状況','じょうきょう','situation'],['確認','かくにん','confirmation'],['判断','はんだん','judgment'],['解決','かいけつ','solution'],['提案','ていあん','proposal'],['参加','さんか','participation'],['増加','ぞうか','increase'],['減少','げんしょう','decrease'],['目的','もくてき','purpose'],['結果','けっか','result'],['関係','かんけい','relationship'],['能力','のうりょく','ability'],['方法','ほうほう','method'],['環境','かんきょう','environment'],['比較','ひかく','comparison'],['適切','てきせつ','appropriate'],['実際','じっさい','actually'],['具体的','ぐたいてき','concrete / specific'],['一般的','いっぱんてき','general']],
    kanji:[['影','エイ','shadow'],['響','キョウ','echo / effect'],['状','ジョウ','condition'],['況','キョウ','situation'],['確','カク','certain'],['認','ニン','recognize'],['判','ハン','judge'],['断','ダン','cut / decide'],['解','カイ・とく','solve'],['決','ケツ・きめる','decide'],['提','テイ','present'],['案','アン','plan'],['参','サン・まいる','participate'],['加','カ・くわえる','add'],['増','ゾウ・ふえる','increase'],['減','ゲン・へる','decrease'],['目','モク・め','eye / item'],['的','テキ・まと','target'],['関','カン・せき','relation'],['係','ケイ・かかり','connection']],
    grammar:[['～わけではない','it does not mean that','嫌いなわけではありません。'],['～ことになっている','it is arranged that','会議は九時に始まることになっています。'],['～によると','according to','ニュースによると、台風が来るそうです。'],['～に対して','toward / in contrast to','この意見に対して質問があります。'],['～ばかり','nothing but / just did','彼はゲームばかりしています。'],['～おかげで','thanks to','先生のおかげで合格できました。'],['～せいで','because of (negative)','雨のせいで試合が中止になりました。'],['～たびに','every time','この歌を聞くたびに故郷を思い出します。'],['～ほど','to the extent','歩けないほど疲れました。'],['～に違いない','must be','あの人は先生に違いありません。'],['～として','as','留学生として日本に来ました。'],['～につれて','as / in proportion','年を取るにつれて考え方が変わります。']],
    reading:[['働き方の変化','最近、家で働く人が増えています。通勤時間がなくなる一方で、仕事と生活を分けにくいという問題もあります。','家で働くことの問題は何ですか。','仕事と生活を分けにくいことです。'],['地域の活動','町では毎月、住民が公園を掃除する活動を行っています。参加者が増えたおかげで、公園は以前よりきれいになりました。','公園がきれいになった理由は何ですか。','参加者が増えたからです。'],['買い物の方法','インターネットで買い物をする人が増えています。便利ですが、実物を確認できないため、返品が必要になる場合もあります。','インターネット shopping の欠点は何ですか。','実物を確認できないことです。'],['学習計画','目標を達成するには、具体的な計画を立て、定期的に進み方を確認することが大切です。','目標達成に大切なことは何ですか。','計画を立てて進み方を確認することです。']]},
  5:{label:'N2',vocabTarget:6000,kanjiTarget:1000,grammarTarget:300,
    vocab:[['課題','かだい','issue / assignment'],['傾向','けいこう','tendency'],['制度','せいど','system'],['対策','たいさく','countermeasure'],['実施','じっし','implementation'],['対象','たいしょう','target / subject'],['評価','ひょうか','evaluation'],['維持','いじ','maintenance'],['改善','かいぜん','improvement'],['責任','せきにん','responsibility'],['現象','げんしょう','phenomenon'],['資源','しげん','resources'],['効率','こうりつ','efficiency'],['需要','じゅよう','demand'],['供給','きょうきゅう','supply'],['方針','ほうしん','policy'],['条件','じょうけん','condition'],['範囲','はんい','range'],['背景','はいけい','background'],['成果','せいか','achievement']],
    kanji:[['課','カ','section / lesson'],['題','ダイ','topic'],['傾','ケイ・かたむく','incline'],['向','コウ・むく','direction'],['制','セイ','control'],['度','ド・たび','degree'],['対','タイ','opposite'],['策','サク','plan'],['実','ジツ・み','reality'],['施','シ・ほどこす','carry out'],['象','ショウ','phenomenon'],['評','ヒョウ','evaluate'],['価','カ・あたい','value'],['維','イ','maintain'],['持','ジ・もつ','hold'],['責','セキ・せめる','responsibility'],['任','ニン・まかせる','duty'],['資','シ','resources'],['源','ゲン・みなもと','source'],['効','コウ・きく','effect']],
    grammar:[['～に伴って','along with','人口の増加に伴って問題も増えました。'],['～に基づいて','based on','調査結果に基づいて計画を作ります。'],['～ざるを得ない','cannot avoid doing','予定を変更せざるを得ません。'],['～にかかわらず','regardless of','経験にかかわらず応募できます。'],['～ものの','although','買ったものの、まだ使っていません。'],['～一方で','while / on the other hand','便利な一方で危険もあります。'],['～ことから','from the fact that','形が似ていることからこの名前がつきました。'],['～にすぎない','nothing more than','それは一つの例にすぎません。'],['～を通じて','throughout / through','仕事を通じて多くを学びました。'],['～に応じて','according to','状況に応じて方法を変えます。'],['～上で','upon / in doing','内容を確認した上で署名してください。'],['～かねない','might (negative)','このままでは事故が起こりかねません。']],
    reading:[['環境対策','企業には利益を上げるだけでなく、環境への影響を減らす責任もある。対策には費用がかかるものの、長期的には企業の信頼につながる。','環境対策の長期的な利点は何ですか。','企業の信頼につながることです。'],['情報の確認','インターネット上の情報は便利だが、必ずしも正確とは限らない。複数の資料を比較し、情報源を確認する必要がある。','情報を利用する前に何をすべきですか。','複数の資料と情報源を確認します。'],['制度の改善','新しい制度を導入する際には、対象者の意見を聞き、実施後も効果を評価することが重要である。','制度導入後に必要なことは何ですか。','効果を評価することです。'],['働く目的','収入は働く大きな目的の一つだが、能力を生かしたり社会に貢献したりすることも、仕事の満足度に影響する。','仕事の満足度に影響するものは何ですか。','能力の活用や社会への貢献です。']]},
  6:{label:'N1',vocabTarget:10000,kanjiTarget:2000,grammarTarget:400,
    vocab:[['概念','がいねん','concept'],['妥当','だとう','valid / appropriate'],['顕著','けんちょ','remarkable'],['遂行','すいこう','execution'],['促進','そくしん','promotion'],['抑制','よくせい','restraint'],['把握','はあく','grasp / understand'],['考慮','こうりょ','consideration'],['見解','けんかい','view / opinion'],['論点','ろんてん','point at issue'],['根拠','こんきょ','basis / evidence'],['矛盾','むじゅん','contradiction'],['介入','かいにゅう','intervention'],['排除','はいじょ','exclusion'],['模索','もさく','search / explore'],['著しい','いちじるしい','remarkable'],['余儀ない','よぎない','unavoidable'],['踏まえる','ふまえる','take into account'],['損なう','そこなう','damage / impair'],['免れる','まぬかれる','escape / avoid']],
    kanji:[['概','ガイ','outline'],['念','ネン','thought'],['妥','ダ','gentle / valid'],['当','トウ・あたる','appropriate'],['顕','ケン','manifest'],['著','チョ・いちじるしい','notable'],['遂','スイ・とげる','accomplish'],['促','ソク・うながす','urge'],['抑','ヨク・おさえる','suppress'],['制','セイ','control'],['把','ハ','grasp'],['握','アク・にぎる','grip'],['慮','リョ','consider'],['論','ロン','argument'],['拠','キョ・よる','basis'],['矛','ム・ほこ','spear'],['盾','ジュン・たて','shield'],['介','カイ','mediate'],['排','ハイ','exclude'],['索','サク','search']],
    grammar:[['～を余儀なくされる','be forced to','悪天候のため計画の変更を余儀なくされました。'],['～にたえる','worthy of','この作品は鑑賞にたえるものです。'],['～を皮切りに','starting with','東京公演を皮切りに全国を回ります。'],['～そばから','as soon as','覚えたそばから忘れてしまいます。'],['～ともなく','without intending to','見るともなく窓の外を見ていました。'],['～までもない','there is no need to','言うまでもなく健康が第一です。'],['～に即して','in accordance with','現状に即して制度を見直します。'],['～をものともせず','in spite of','困難をものともせず挑戦を続けました。'],['～べく','in order to','問題を解決すべく調査を始めました。'],['～ないまでも','even if not','完璧でないまでも十分な成果です。'],['～にひきかえ','in contrast to','兄にひきかえ弟は社交的です。'],['～を禁じ得ない','cannot help feeling','その知らせに驚きを禁じ得ません。']],
    reading:[['技術と判断','高度な技術が普及しても、最終的な判断を完全に機械へ委ねることが妥当とは限らない。判断の根拠を説明できる仕組みが不可欠である。','筆者が不可欠だと考えるものは何ですか。','判断の根拠を説明できる仕組みです。'],['制度設計','制度は一度導入すれば終わりではない。社会状況の変化を踏まえ、当初の目的が損なわれていないか継続的に検証すべきである。','制度について継続的に何をすべきですか。','目的が損なわれていないか検証します。'],['多様な見解','意見の対立は必ずしも避けるべきものではない。異なる見解を比較することで、見落としていた論点が明らかになる場合がある。','意見の対立の利点は何ですか。','新しい論点が明らかになることです。'],['責任ある利用','情報を発信する自由には、内容が他者に与える影響を考慮する責任が伴う。自由だけを主張して責任を排除することはできない。','情報発信の自由に伴うものは何ですか。','他者への影響を考慮する責任です。']]}
};

Object.entries(JLPT_COURSES).forEach(([stage,c])=>{
  const s=Number(stage);
  c.vocab.forEach((w,i)=>questions.push({stage:s,q:w[0],prompt:'Choose the best meaning.',a:w[2],opts:shuffle([w[2],...shuffle(c.vocab.filter((_,j)=>j!==i).map(x=>x[2])).slice(0,3)]),kind:'advanced-vocab',courseId:`jlpt${s}:vocab:${i}`}));
  c.kanji.forEach((k,i)=>questions.push({stage:s,q:k[0],prompt:'Choose this kanji’s meaning.',a:k[2],opts:shuffle([k[2],...shuffle(c.kanji.filter((_,j)=>j!==i).map(x=>x[2])).slice(0,3)]),kind:'advanced-kanji',courseId:`jlpt${s}:kanji:${i}`}));
  c.grammar.forEach((g,i)=>questions.push({stage:s,q:g[2],prompt:'Which grammar pattern is used?',a:g[0],opts:shuffle([g[0],...shuffle(c.grammar.filter((_,j)=>j!==i).map(x=>x[0])).slice(0,3)]),kind:'advanced-grammar',courseId:`jlpt${s}:grammar:${i}`}));
  c.reading.forEach((r,i)=>questions.push({stage:s,q:r[1],prompt:r[2],a:r[3],opts:shuffle([r[3],...shuffle(c.reading.filter((_,j)=>j!==i).map(x=>x[3])).slice(0,3)]),kind:'advanced-reading',courseId:`jlpt${s}:reading:${i}`}));
});

let academyStage=2;
function jlptCourseForStage(stage=academyStage){return stage===2?null:JLPT_COURSES[stage];}
function jlptMasteryId(type,index,stage=academyStage){return `jlpt${stage}:${type}:${index}`;}
function jlptItemMastery(type,index,stage=academyStage){return academyItemMastery(jlptMasteryId(type,index,stage));}
function jlptSetMastery(type,index,delta,stage=academyStage){v3SetMastery(jlptMasteryId(type,index,stage),delta);}
function advancedCounts(stage=academyStage){const c=JLPT_COURSES[stage];const count=(type,arr)=>arr.filter((_,i)=>jlptItemMastery(type,i,stage)>=75).length;const v=count('vocab',c.vocab),k=count('kanji',c.kanji),g=count('grammar',c.grammar),r=count('reading',c.reading);return {v,k,g,r,readiness:Math.round((v/c.vocab.length*.3+k/c.kanji.length*.25+g/c.grammar.length*.25+r/c.reading.length*.2)*100)};}
function updateAcademyChrome(){const label=academyStage===2?'N5':JLPT_COURSES[academyStage].label;const title=document.getElementById('academyTitle');if(title)title.textContent=`⛏️ JLPT ${label} Mine — Course & Progress`;const p=title?.nextElementSibling;if(p)p.textContent=`The mine and every ${label} study tool share the same progress and mastery.`;const first=document.querySelector('[data-academy-tab="overview"]');if(first)first.textContent=`${label} Hub`;}
const openAcademyV34=openAcademy;
openAcademy=function(stage=state.selectedStage){stage=Number(stage);if(stage<2)stage=2;if(!isStageUnlocked(stage)){setMessage(`${stages[stage].label} is still locked.`,'wrong');return;}academyStage=stage;academyTab='overview';academyView={lesson:null,word:null,grammar:null,reading:null,quiz:null};updateAcademyChrome();document.getElementById('academyOverlay').classList.add('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','false');renderAcademy();};
const selectStageV34=selectStage;
selectStage=function(index,openCourse=false){selectStageV34(index,false);if(openCourse&&Number(index)>=2&&isStageUnlocked(Number(index)))openAcademy(Number(index));};
const renderPathV34=renderPath;
renderPath=function(){renderPathV34();document.querySelectorAll('#path .stage').forEach((el,i)=>{if(i>=2&&!el.classList.contains('locked')){el.onclick=()=>selectStage(i,true);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectStage(i,true);}};el.setAttribute('aria-label',`Open ${stages[i].label} mine and course`);}});};

document.getElementById('openAcademyBtn')?.addEventListener('click',()=>openAcademy(Math.max(2,state.selectedStage)));

function renderAdvancedAcademy(){const c=JLPT_COURSES[academyStage],counts=advancedCounts(),box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));
 const card=(type,i,title,sub,body='')=>`<article class="study-card"><strong>${v3Esc(title)}</strong><span class="small">${v3Esc(sub)}</span>${body}<div class="mastery-banner"><span>${v3Stars(jlptItemMastery(type,i))}</span><strong>${jlptItemMastery(type,i)}%</strong></div><button data-adv-practice="${type}:${i}" type="button">Practice</button></article>`;
 if(academyTab==='overview')box.innerHTML=`<div class="n5-hub-actions"><button id="hubEnterMineBtn" class="primary" type="button">⛏️ Enter ${c.label} Mine</button><span class="small">Mine answers update the same course mastery shown here.</span></div><div class="academy-metrics"><div><strong>${counts.readiness}%</strong><span>Estimated readiness</span></div><div><strong>${counts.v}</strong><span>Vocabulary mastered</span></div><div><strong>${counts.k}</strong><span>Kanji mastered</span></div><div><strong>${counts.g}</strong><span>Grammar mastered</span></div></div><div class="academy-roadmap">${[['Vocabulary',counts.v,c.vocabTarget],['Kanji',counts.k,c.kanjiTarget],['Grammar',counts.g,c.grammarTarget],['Reading',counts.r,c.reading.length]].map(([n,v,t])=>`<div><div class="progress-label"><span>${n}</span><strong>${v}/${t}</strong></div>${progressBar(Math.min(100,v/Math.max(1,(n==='Reading'?t:(n==='Vocabulary'?c.vocab.length:n==='Kanji'?c.kanji.length:c.grammar.length)))*100))}</div>`).join('')}</div><div class="academy-callout"><strong>Course bank status</strong><p>${c.vocab.length} verified vocabulary items, ${c.kanji.length} kanji, ${c.grammar.length} grammar patterns, and ${c.reading.length} readings are interactive now. The progression targets preserve room for the full level curriculum.</p></div>`;
 if(academyTab==='vocabulary')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Vocabulary</strong><span>${c.vocab.length} interactive words • target ${c.vocabTarget.toLocaleString()}</span></div><div class="study-grid">${c.vocab.map((w,i)=>card('vocab',i,w[0],`${w[1]} · ${w[2]}`)).join('')}</div>`;
 if(academyTab==='kanji')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Kanji</strong><span>${c.kanji.length} interactive kanji • target ${c.kanjiTarget.toLocaleString()}</span></div><div class="study-grid">${c.kanji.map((k,i)=>card('kanji',i,k[0],`${k[1]} · ${k[2]}`)).join('')}</div>`;
 if(academyTab==='grammar')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Grammar</strong><span>${c.grammar.length} interactive patterns • target ${c.grammarTarget}</span></div><div class="study-grid">${c.grammar.map((g,i)=>card('grammar',i,g[0],g[1],`<p class="jp-example">${v3Esc(g[2])}</p>`)).join('')}</div>`;
 if(academyTab==='reading')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Reading</strong><span>Read and answer comprehension questions.</span></div><div class="study-grid">${c.reading.map((r,i)=>card('reading',i,r[0],r[2],`<p class="jp-passage">${v3Esc(r[1])}</p>`)).join('')}</div>`;
 if(academyTab==='listening')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Listening</strong><span>Uses Japanese browser speech when available.</span></div><div class="study-grid">${c.reading.map((r,i)=>`<article class="study-card"><strong>Listening ${i+1}</strong><p class="jp-passage listening-hidden" id="advListen${i}">${v3Esc(r[1])}</p><button data-adv-speak="${i}" type="button">▶ Play Japanese</button><button data-adv-reveal="${i}" type="button">Reveal text</button></article>`).join('')}</div>`;
 if(academyTab==='review'){const due=[...c.vocab.map((x,i)=>['vocab',i,x[0]]),...c.kanji.map((x,i)=>['kanji',i,x[0]]),...c.grammar.map((x,i)=>['grammar',i,x[0]])].filter(([t,i])=>jlptItemMastery(t,i)<75).sort((a,b)=>jlptItemMastery(a[0],a[1])-jlptItemMastery(b[0],b[1])).slice(0,20);box.innerHTML=`<div class="academy-toolbar"><strong>Today's ${c.label} Review</strong><span>${due.length} priority cards</span></div><div class="review-list">${due.map(([t,i,l])=>`<button data-adv-practice="${t}:${i}" type="button"><span>${v3Esc(l)}</span><strong>${jlptItemMastery(t,i)}%</strong></button>`).join('')||'<p>Everything due today is mastered.</p>'}</div>`;}
 if(academyTab==='tests')box.innerHTML=`<div class="academy-test-grid"><article class="study-card"><h3>Mini ${c.label} Test</h3><p>20 mixed questions from this level.</p><button data-adv-test="20" class="primary" type="button">Start test</button></article><article class="study-card"><h3>Extended ${c.label} Test</h3><p>40 mixed questions from this level.</p><button data-adv-test="40" type="button">Start test</button></article></div>`;
 box.onclick=e=>{const t=e.target.closest('button');if(!t)return;if(t.id==='hubEnterMineBtn'){closeAcademy();selectStage(academyStage,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}else if(t.dataset.advSpeak!==undefined)speakJapanese(c.reading[Number(t.dataset.advSpeak)][1]);else if(t.dataset.advReveal!==undefined)document.getElementById(`advListen${t.dataset.advReveal}`)?.classList.remove('listening-hidden');else if(t.dataset.advPractice){const [type,raw]=t.dataset.advPractice.split(':'),i=Number(raw);let prompt,answer,wrong;if(type==='vocab'){prompt=`What does ${c.vocab[i][0]} mean?`;answer=c.vocab[i][2];wrong=c.vocab.filter((_,j)=>j!==i).map(x=>x[2]);}if(type==='kanji'){prompt=`What does ${c.kanji[i][0]} mean?`;answer=c.kanji[i][2];wrong=c.kanji.filter((_,j)=>j!==i).map(x=>x[2]);}if(type==='grammar'){prompt=`Which pattern appears in: ${c.grammar[i][2]}`;answer=c.grammar[i][0];wrong=c.grammar.filter((_,j)=>j!==i).map(x=>x[0]);}if(type==='reading'){prompt=c.reading[i][2];answer=c.reading[i][3];wrong=c.reading.filter((_,j)=>j!==i).map(x=>x[3]);}v3QuizCard(prompt,[answer,...shuffle(wrong).slice(0,3)],answer,good=>jlptSetMastery(type,i,good?25:-5));}else if(t.dataset.courseAnswer!==undefined)v3HandleQuizAnswer(t.dataset.courseAnswer,t);else if(t.dataset.courseBack!==undefined){academyView.quiz=null;renderAcademy();}else if(t.dataset.advTest){academyView.quiz=null;const pool=questions.filter(q=>q.stage===academyStage);const q=pool[Math.floor(Math.random()*pool.length)];v3QuizCard(q.prompt+' '+q.q,q.opts,q.a,good=>{if(q.courseId){const [,type,i]=q.courseId.split(':');jlptSetMastery(type,Number(i),good?15:-4);}});}};
}
const renderAcademyV34=renderAcademy;
renderAcademy=function(){updateAcademyChrome();if(academyStage===2)return renderAcademyV34();if(academyView.quiz){const box=document.getElementById('academyContent');box.innerHTML=v3RenderQuiz();box.onclick=e=>{const t=e.target.closest('button');if(t?.dataset.courseAnswer!==undefined)v3HandleQuizAnswer(t.dataset.courseAnswer,t);else if(t?.dataset.courseBack!==undefined){academyView.quiz=null;renderAcademy();}};return;}renderAdvancedAcademy();};

document.querySelectorAll('[data-academy-tab]').forEach(b=>{b.addEventListener('click',()=>{academyTab=b.dataset.academyTab;academyView.quiz=null;renderAcademy();});});

const answerV34=answer;
answer=function(opt,button){const q=state.active,correct=q&&opt===q.a;answerV34(opt,button);if(q?.courseId){const [,type,i]=q.courseId.split(':');jlptSetMastery(type,Number(i),correct?10:-3,Number(q.stage));}};

// Expand placement from Kana/N5 through N1.
const EXTRA_PLACEMENT_QUESTIONS=[
 {section:'n4',prompt:'Choose the best meaning.',display:'雨が降っても行きます。',answer:'I will go even if it rains.',options:['I will go even if it rains.','I will go because it rains.','I went before it rained.','I will not go if it rains.']},
 {section:'n4',prompt:'Choose the correct grammar.',display:'音楽を聞き___勉強します。',answer:'ながら',options:['ながら','ために','そうで','はず']},
 {section:'n4',prompt:'What does 予定 mean?',display:'予定',answer:'plan / schedule',options:['plan / schedule','promise','experience','reason']},
 {section:'n4',prompt:'Read and answer: 財布を家に忘れたので、家に戻りました。',display:'Why did the person return home?',answer:'They forgot their wallet.',options:['They forgot their wallet.','They missed the train.','They wanted to cook.','They finished work.']},
 {section:'n3',prompt:'Choose the best meaning.',display:'先生のおかげで合格できました。',answer:'Thanks to the teacher, I was able to pass.',options:['Thanks to the teacher, I was able to pass.','The teacher failed the exam.','I passed before meeting the teacher.','The teacher made the exam difficult.']},
 {section:'n3',prompt:'What does 影響 mean?',display:'影響',answer:'influence',options:['influence','solution','purpose','method']},
 {section:'n3',prompt:'Choose the correct pattern.',display:'ニュース___、台風が来るそうです。',answer:'によると',options:['によると','に対して','ばかり','ほど']},
 {section:'n3',prompt:'Read and answer: 家で働く人が増えていますが、仕事と生活を分けにくい問題があります。',display:'What problem is mentioned?',answer:'Work and personal life are hard to separate.',options:['Work and personal life are hard to separate.','Commuting takes longer.','There are fewer jobs.','Homes are too expensive.']},
 {section:'n2',prompt:'Choose the best meaning.',display:'調査結果に基づいて計画を作ります。',answer:'We will make a plan based on the survey results.',options:['We will make a plan based on the survey results.','We canceled the survey.','The plan caused the survey.','We ignored the results.']},
 {section:'n2',prompt:'What does 対策 mean?',display:'対策',answer:'countermeasure',options:['countermeasure','evaluation','responsibility','background']},
 {section:'n2',prompt:'Choose the correct grammar.',display:'予定を変更せ___。',answer:'ざるを得ない',options:['ざるを得ない','にすぎない','に応じて','ものの']},
 {section:'n2',prompt:'Read and answer: 情報は必ずしも正確とは限らないため、複数の資料を比較する必要がある。',display:'What should readers do?',answer:'Compare multiple sources.',options:['Compare multiple sources.','Trust the first source.','Avoid all information.','Only read opinions.']},
 {section:'n1',prompt:'Choose the best meaning.',display:'現状に即して制度を見直す。',answer:'Review the system in accordance with current conditions.',options:['Review the system in accordance with current conditions.','Reject the system immediately.','Ignore current conditions.','Create a system without review.']},
 {section:'n1',prompt:'What does 根拠 mean?',display:'根拠',answer:'basis / evidence',options:['basis / evidence','contradiction','intervention','concept']},
 {section:'n1',prompt:'Choose the correct grammar.',display:'悪天候のため変更を___。',answer:'余儀なくされた',options:['余儀なくされた','ものともせず','禁じ得なかった','皮切りにした']},
 {section:'n1',prompt:'Read and answer: 異なる見解を比較することで、見落としていた論点が明らかになる場合がある。',display:'What benefit can disagreement provide?',answer:'It can reveal overlooked issues.',options:['It can reveal overlooked issues.','It prevents all decisions.','It removes responsibility.','It proves one view is always correct.']}
];
PLACEMENT_TEST_QUESTIONS.push(...EXTRA_PLACEMENT_QUESTIONS);

const renderPlacementChoiceV34=renderPlacementChoice;
renderPlacementChoice=function(){renderPlacementChoiceV34();const choice=document.getElementById('placementChoice');if(choice){choice.querySelector('span:last-child').textContent=`Take a ${PLACEMENT_TEST_QUESTIONS.length}-question adaptive-style placement test covering Kana and JLPT N5 through N1.`;}const note=document.querySelector('#placementContent .placement-note');if(note)note.innerHTML='<strong>Placement does not remove earlier content.</strong> Strong results can unlock a higher mine and award a one-time starter bonus.';};

function completeStageForPlacement(i){
  if(i===0){grantKanaPlacement(hira,0);return;}
  if(i===1){grantKanaPlacement(kata,1);return;}
  state.stageXp[i]=Math.max(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
  questions.filter(q=>q.stage===i).forEach(q=>{
    state.questionStats[q.id]={attempts:3,correct:3};
  });
  if(!state.clearedStages.includes(i))state.clearedStages.push(i);
}
function unlockThroughStage(stage){
  stage=Math.max(0,Math.min(stages.length-1,Number(stage)||0));
  for(let i=0;i<stage;i++) completeStageForPlacement(i);
  state.placementUnlockedThrough=Math.max(Number(state.placementUnlockedThrough)||0,stage);
}
function placementStageFromSavedResult(result){
  if(!result||typeof result!=="object") return null;
  const route=String(result.route||"").toLowerCase();
  const routeMap={hiragana:0,katakana:1,n5:2,n4:3,n3:4,n2:5,n1:6};
  if(route in routeMap) return routeMap[route];
  const selected=Number(result.selectedStage);
  return Number.isInteger(selected)&&selected>=0&&selected<stages.length?selected:null;
}
function repairPlacementUnlocks(){
  const placed=placementStageFromSavedResult(state.placementResult);
  if(placed===null) return false;
  const before=JSON.stringify([state.stageXp,state.clearedStages,state.questionStats,state.kanaStats,state.placementUnlockedThrough]);
  unlockThroughStage(placed);
  state.selectedStage=Math.max(Number(state.selectedStage)||0,placed);
  return before!==JSON.stringify([state.stageXp,state.clearedStages,state.questionStats,state.kanaStats,state.placementUnlockedThrough]);
}
function grantPlacementReward(routeStage,overall){if(state.placementRewardClaimed)return {nuggets:0,hints:0,shields:0};let nuggets=2500,hints=1,shields=0;if(routeStage>=2){nuggets=10000;hints=3;shields=1;}if(routeStage>=3){nuggets=25000;hints=5;shields=2;}if(routeStage>=4){nuggets=50000;hints=8;shields=3;}if(routeStage>=5){nuggets=100000;hints=12;shields=5;}if(routeStage>=6){nuggets=250000;hints=20;shields=10;}if(overall>=90)nuggets=Math.round(nuggets*1.25);addStoneChange(nuggets,Math.min(gemTiers.length-1,routeStage+6));state.hints=Number(state.hints||0)+hints;state.shields=Number(state.shields||0)+shields;state.placementRewardClaimed=true;return {nuggets,hints,shields};}
const finishPlacementTestV34=finishPlacementTest;
finishPlacementTest=function(){const scores={};['hiragana','katakana','n5','n4','n3','n2','n1'].forEach(s=>scores[s]=placementSectionScore(s));let stage=0;if(scores.hiragana>=70)stage=1;if(stage===1&&scores.katakana>=70)stage=2;if(stage===2&&scores.n5>=65)stage=3;if(stage===3&&scores.n4>=65)stage=4;if(stage===4&&scores.n3>=65)stage=5;if(stage===5&&scores.n2>=65)stage=6; // N1 score refines reward/readiness but N1 remains the highest placement.
 unlockThroughStage(stage);state.selectedStage=stage;state.supportMode=stage>=4?'challenge':stage>=2?'standard':'guided';state.n5Tier=scores.n5>=75?'advanced':scores.n5>=45?'intermediate':'beginner';state.onboardingComplete=true;state.active=null;state.answered=false;const overall=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/7);const reward=grantPlacementReward(stage,overall);state.placementResult={date:Date.now(),route:stages[stage].label.toLowerCase(),overall,...scores,reward};save();render();placementSession.required=false;document.getElementById('placementCloseBtn').hidden=false;const scoreCards=Object.entries(scores).map(([k,v])=>`<div class="placement-score"><strong>${v}%</strong><span>${k==='hiragana'?'Hiragana':k==='katakana'?'Katakana':'JLPT '+k.toUpperCase()}</span></div>`).join('');document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-score-grid">${scoreCards}</div><div class="placement-recommendation"><h3>🧭 Start in the ${stages[stage].name}</h3><p>Your placement is based on passing each level in order. Every earlier mine remains available for review.</p></div><div class="placement-note"><strong>Placement reward:</strong> ${reward.nuggets.toLocaleString()} Nuggets, ${reward.hints} hints, and ${reward.shields} shields.${reward.nuggets===0?' Your one-time placement reward was already claimed.':''}</div><div class="placement-result-actions"><button id="acceptPlacementBtn" class="primary" type="button">Begin ${stages[stage].label}</button><button id="retakePlacementBtn" type="button">Retake test</button></div></div>`;document.getElementById('acceptPlacementBtn').addEventListener('click',()=>{closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});document.getElementById('retakePlacementBtn').addEventListener('click',startPlacementTest);};

// v3.4 polish: correct advanced placement labels and make the launch button honor the selected JLPT mine.
const enterSelectedMineButton=document.getElementById('enterN5MineBtn');
enterSelectedMineButton?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const stage=Math.max(2,Number(state.selectedStage)||2);if(!isStageUnlocked(stage)){setMessage(`${stages[stage].label} is still locked.`,'wrong');return;}selectStage(stage,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});},true);
const renderPlacementQuestionV34=renderPlacementQuestion;
renderPlacementQuestion=function(){renderPlacementQuestionV34();const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];const label=q.section==='hiragana'?'Hiragana':q.section==='katakana'?'Katakana':`JLPT ${q.section.toUpperCase()}`;const el=document.querySelector('#placementContent .placement-progress-label span');if(el)el.textContent=label;};


// v3.5 — Repair placement-test unlocks for both new and existing profiles.
// v3.4 granted XP but did not grant the mastery required by the Learning Path.
const normalizeStateV35=normalizeState;
normalizeState=function(raw){
  const next=normalizeStateV35(raw);
  const previousState=state;
  state=next;
  repairPlacementUnlocks();
  const repaired=state;
  state=previousState;
  return repaired;
};
const renderV35=render;
render=function(){
  const repaired=repairPlacementUnlocks();
  renderV35();
  if(repaired) save();
};


// v3.6 — Persistent placement bypass, centralized menu, cosmetic shop, and wallpapers.
const WALLPAPERS=[
 {id:'midnight',name:'Midnight Mine',cost:0,desc:'The original deep-blue mining backdrop.',preview:'radial-gradient(circle at 20% 0%,#263653,#0d1424 45%,#070b14)'},
 {id:'sakura',name:'Sakura Cavern',cost:50000,desc:'Soft cherry-blossom light over a quiet cavern.',preview:'radial-gradient(circle at 20% 15%,#ffc4da,transparent 35%),linear-gradient(145deg,#45264c,#141a31)'},
 {id:'bamboo',name:'Bamboo Grove',cost:125000,desc:'A calm green backdrop for relaxed study.',preview:'radial-gradient(circle at 20% 10%,#55a978,transparent 38%),linear-gradient(145deg,#153c31,#08151a)'},
 {id:'sunrise',name:'Mountain Sunrise',cost:350000,desc:'Warm sunrise colors above the mine entrance.',preview:'radial-gradient(circle at 50% 0%,#ffc168,transparent 38%),linear-gradient(160deg,#533c67,#172544)'},
 {id:'crystal',name:'Crystal Depths',cost:1000000,desc:'Blue and violet crystal light from the deepest tunnels.',preview:'radial-gradient(circle at 75% 10%,#735cff,transparent 35%),radial-gradient(circle at 15% 60%,#42caff,transparent 34%),#10142c'},
 {id:'paper',name:'Study Notebook',cost:2500000,desc:'A clean grid-paper look inspired by Japanese study notebooks.',preview:'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px),#26314a'}
 ,{id:'galaxy',name:'Galaxy Quest',cost:175000,desc:'Stars, nebula clouds, and deep-space color.',preview:'radial-gradient(circle at 18% 22%,#fff 0 2px,transparent 3px),radial-gradient(circle at 70% 35%,#fff 0 1px,transparent 2px),radial-gradient(circle at 55% 20%,#b14cff88,transparent 35%),linear-gradient(145deg,#070522,#15105d,#09031a)'}
 ,{id:'emoji',name:'Emoji Party',cost:90000,desc:'A cheerful field of smiles, stars, hearts, and gems.',preview:'linear-gradient(135deg,#ff78b9,#725cff)'}
 ,{id:'inferno',name:'Inferno Mine',cost:225000,desc:'Animated-looking flame colors from the volcanic depths.',preview:'radial-gradient(ellipse at 30% 100%,#fff15c,transparent 28%),radial-gradient(ellipse at 70% 100%,#ff4b21,transparent 45%),linear-gradient(#3b0710,#120309)'}
 ,{id:'aurora',name:'Aurora Sky',cost:300000,desc:'Flowing northern lights in emerald, cyan, and violet.',preview:'radial-gradient(ellipse at 25% 10%,#55ffc988,transparent 42%),radial-gradient(ellipse at 75% 20%,#a26cff99,transparent 45%),linear-gradient(160deg,#071d35,#121339)'}
 ,{id:'ocean',name:'Ocean Bubbles',cost:140000,desc:'A bright underwater world filled with rising bubbles.',preview:'radial-gradient(circle at 18% 25%,#c9ffff88 0 8px,transparent 9px),radial-gradient(circle at 75% 55%,#fff8 0 5px,transparent 6px),linear-gradient(#087fc1,#063765)'}
 ,{id:'confetti',name:'Lucky Confetti',cost:110000,desc:'A colorful celebration for every study streak.',preview:'conic-gradient(from 25deg at 20% 30%,#ffdc68 0 12deg,transparent 13deg),conic-gradient(from 70deg at 70% 55%,#67f0ce 0 13deg,transparent 14deg),linear-gradient(135deg,#5d35a8,#c83f86)'}
];
let activeShopTab='pickaxes';
function applyWallpaper(){document.body.dataset.wallpaper=state.equippedWallpaper||'midnight';}
function openGameMenu(){document.getElementById('gameMenuOverlay')?.classList.add('open');document.getElementById('gameMenuOverlay')?.setAttribute('aria-hidden','false');document.getElementById('gameMenuBtn')?.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
function closeGameMenu(){document.getElementById('gameMenuOverlay')?.classList.remove('open');document.getElementById('gameMenuOverlay')?.setAttribute('aria-hidden','true');document.getElementById('gameMenuBtn')?.setAttribute('aria-expanded','false');document.body.style.overflow='';}
function openShop(tab='pickaxes'){activeShopTab=tab;closeGameMenu();document.getElementById('shopOverlay')?.classList.add('open');document.getElementById('shopOverlay')?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderShop();}
function closeShop(){document.getElementById('shopOverlay')?.classList.remove('open');document.getElementById('shopOverlay')?.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function renderShop(){
 const balance=document.getElementById('shopNuggetBalance');if(balance)balance.textContent=totalStoneValue().toLocaleString();
 document.querySelectorAll('[data-shop-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.shopTab===activeShopTab));
 const box=document.getElementById('shopContent');if(!box)return;
 if(activeShopTab==='character'&&typeof window.renderJapaneseMinerCharacterShop==='function'){window.renderJapaneseMinerCharacterShop(box);window.refreshJapaneseMinerCompanionDisplays?.();return;}
 if(['fashion','companions','settlement'].includes(activeShopTab)&&typeof window.renderJapaneseMinerV5Shop==='function'){window.renderJapaneseMinerV5Shop(activeShopTab,box);return;}
 if(activeShopTab==='pickaxes'){
  box.innerHTML='<div class="cosmetic-grid" id="menuPickaxeShop"></div>';
  const grid=document.getElementById('menuPickaxeShop');
  PICKAXE_SKINS.forEach(skin=>{const owned=state.ownedPickaxeSkins.includes(skin.id),equipped=state.equippedPickaxeSkin===skin.id;const card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="cosmetic-preview"><span style="${skin.id==='standard'?'':pickaxePreviewStyle(skin.id)}">${skin.icon}</span></div><h3>${skin.name}</h3><p>${skin.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':`Buy — ${skin.cost.toLocaleString()} Nuggets`}</button>`;card.querySelector('button').addEventListener('click',()=>{owned?equipPickaxe(skin.id):buyPickaxe(skin.id);renderShop();});grid.appendChild(card);});
 }else if(activeShopTab==='wallpapers'){
  box.innerHTML='<div class="cosmetic-grid" id="wallpaperShop"></div>';
  const grid=document.getElementById('wallpaperShop');
  WALLPAPERS.forEach(w=>{const owned=state.ownedWallpapers.includes(w.id),equipped=state.equippedWallpaper===w.id;const card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="wallpaper-preview" style="background:${w.preview};background-size:${w.id==='paper'?'18px 18px':'cover'}"></div><h3>${w.name}</h3><p>${w.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Use wallpaper':`Buy — ${w.cost.toLocaleString()} Nuggets`}</button>`;card.querySelector('button').addEventListener('click',()=>{if(owned){state.equippedWallpaper=w.id;applyWallpaper();save();renderShop();setMessage(`${w.name} wallpaper equipped.`,'correct');}else if(spendStoneValue(w.cost)){state.ownedWallpapers.push(w.id);state.equippedWallpaper=w.id;applyWallpaper();save();render();renderShop();setMessage(`${w.name} purchased and equipped!`,'correct');}else setMessage(`You need ${w.cost.toLocaleString()} Nuggets for ${w.name}.`,'wrong');});grid.appendChild(card);});
 }else{
  const prices=currentShopPrices();box.innerHTML=`<div class="shop-supply-list"><article class="shop-supply"><div><strong>💡 Hint Crystal</strong><p>Removes one incorrect choice.</p></div><button type="button" data-supply="hint">Buy — ${prices.hint.toLocaleString()}</button></article><article class="shop-supply"><div><strong>🛡️ Life Shield</strong><p>Protects one heart after a wrong answer.</p></div><button type="button" data-supply="shield">Buy — ${prices.shield.toLocaleString()}</button></article><article class="shop-supply"><div><strong>❤️ Heart Restore</strong><p>Restores all current hearts.</p></div><button type="button" data-supply="heart">Buy — ${prices.heart.toLocaleString()}</button></article></div>`;box.querySelectorAll('[data-supply]').forEach(b=>b.addEventListener('click',()=>{buy(b.dataset.supply);renderShop();}));
 }
}
function scrollToSection(id){closeGameMenu();const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
document.getElementById('voiceToggle')?.addEventListener('change',e=>{state.voiceEnabled=e.target.checked;save();});
document.getElementById('autoSpeakToggle')?.addEventListener('change',e=>{state.autoSpeak=e.target.checked;save();});
document.getElementById('smartReviewToggle')?.addEventListener('change',e=>{state.smartReview=e.target.checked;save();});
document.getElementById('voiceRate')?.addEventListener('input',e=>{state.voiceRate=Number(e.target.value);document.getElementById('voiceRateLabel').textContent=`${state.voiceRate.toFixed(2)}×`;save();});
document.getElementById('testVoiceBtn')?.addEventListener('click',()=>speakJapanese('日本語を一緒に勉強しましょう。'));
document.getElementById('gameMenuBtn')?.addEventListener('click',openGameMenu);
document.getElementById('closeGameMenuBtn')?.addEventListener('click',closeGameMenu);
document.getElementById('gameMenuOverlay')?.addEventListener('click',e=>{if(e.target.id==='gameMenuOverlay')closeGameMenu();});
document.querySelectorAll('[data-menu-action]').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.menuAction;if(a==='shop')openShop();else if(a==='stats'){closeGameMenu();setStatsDrawer(true);}else if(a==='course'){closeGameMenu();openAcademy();}else if(a==='path')scrollToSection('path');else if(a==='inventory')scrollToSection('gemCollection');else if(a==='mine'){closeGameMenu();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}}));
document.getElementById('closeShopBtn')?.addEventListener('click',closeShop);
document.getElementById('shopOverlay')?.addEventListener('click',e=>{if(e.target.id==='shopOverlay')closeShop();});
document.querySelectorAll('[data-shop-tab]').forEach(btn=>btn.addEventListener('click',()=>{activeShopTab=btn.dataset.shopTab;renderShop();}));
const renderV36=render;
render=function(){repairPlacementUnlocks();renderV36();applyWallpaper();if(document.getElementById('shopOverlay')?.classList.contains('open'))renderShop();};
applyWallpaper();

// v3.7 — Collapsible categories and properly randomized placement answers.
(function(){
  const originalStartPlacementTest = startPlacementTest;
  startPlacementTest = function(){
    // Shuffle the visible answer positions independently for every question on every attempt.
    // The stored answer remains a string, so grading is unaffected.
    PLACEMENT_TEST_QUESTIONS.forEach(q=>{
      q.options = shuffle([...q.options]);
    });
    originalStartPlacementTest();
  };

  function panelTitle(panel){
    const title = panel.querySelector(':scope > .section-title, :scope > .academy-launch-head .section-title');
    if(title) return title;
    const candidate = panel.querySelector(':scope > h2, :scope > h3');
    return candidate || null;
  }

  function installCollapsiblePanels(){
    const panels=[...document.querySelectorAll('main > .panel, aside > .panel, body > .wrap > .panel, #app > .panel, .grid + .panel')];
    // Also include the large standalone panels that follow the main grid.
    document.querySelectorAll('#masterySection,#n5AcademySection').forEach(p=>panels.push(p));
    const unique=[...new Set(panels)].filter(p=>!p.hidden && !p.classList.contains('mine') && !p.dataset.collapsibleReady);
    unique.forEach((panel,index)=>{
      const title=panelTitle(panel);
      if(!title) return;
      panel.dataset.collapsibleReady='true';
      const key='jmCollapsed:'+((panel.id)||title.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')||index);
      const header=document.createElement('div');
      header.className='collapsible-heading';
      title.parentNode.insertBefore(header,title);
      header.appendChild(title);
      const toggle=document.createElement('button');
      toggle.type='button';
      toggle.className='collapse-toggle';
      toggle.setAttribute('aria-label',`Minimize ${title.textContent.trim()}`);
      toggle.innerHTML='⌃';
      header.appendChild(toggle);
      const body=document.createElement('div');
      body.className='collapsible-body';
      while(header.nextSibling) body.appendChild(header.nextSibling);
      panel.appendChild(body);
      const setCollapsed=(collapsed,savePref=true)=>{
        panel.classList.toggle('is-collapsed',collapsed);
        toggle.innerHTML=collapsed?'⌄':'⌃';
        toggle.setAttribute('aria-expanded',String(!collapsed));
        toggle.setAttribute('aria-label',`${collapsed?'Expand':'Minimize'} ${title.textContent.trim()}`);
        if(savePref) try{localStorage.setItem(key,collapsed?'1':'0');}catch(e){}
      };
      let collapsed=false;
      try{collapsed=localStorage.getItem(key)==='1';}catch(e){}
      setCollapsed(collapsed,false);
      toggle.addEventListener('click',()=>setCollapsed(!panel.classList.contains('is-collapsed')));
      header.addEventListener('click',e=>{if(e.target!==toggle)setCollapsed(!panel.classList.contains('is-collapsed'));});
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installCollapsiblePanels);
  else installCollapsiblePanels();
})();

// v4.3 cosmetic purchasing and bright palette controls.
const V43_COSMETIC_PRICES={hairStyle:2500,hairColor:1200,shirt:4000,pants:3000,accessory:3500};
document.addEventListener('click',event=>{
  const cosmetic=event.target.closest?.('[data-character-key]');
  if(cosmetic){
    const key=cosmetic.dataset.characterKey,value=cosmetic.dataset.characterValue,id=`${key}:${value}`;
    const owned=key==='skin'||state.ownedCosmetics?.includes(id);
    if(!owned){
      event.preventDefault();event.stopImmediatePropagation();
      const price=V43_COSMETIC_PRICES[key]||0;
      if(!cosmetic.closest('#shopContent')){openShop('character');setMessage('This style is available in the Character section of the Shop.','correct');return;}
      if(typeof window.previewJapaneseMinerCosmetic==='function'){window.previewJapaneseMinerCosmetic({type:'character',key,value,price,name:cosmetic.querySelector('span:last-child')?.childNodes[0]?.textContent?.trim()||'Character style',source:cosmetic});return;}
      if(!spendStoneValue(price)){setMessage(`You need ${price.toLocaleString()} Nuggets to unlock this style.`,'wrong');return;}
      state.ownedCosmetics.push(id);state.character[key]=value;save();cosmetic.closest('.character-customizer')?.querySelectorAll(`[data-character-key="${key}"]`).forEach(x=>x.classList.toggle('selected',x===cosmetic));cosmetic.classList.remove('locked');cosmetic.classList.add('owned');const priceLabel=cosmetic.querySelector('small');if(priceLabel)priceLabel.textContent='Owned';render();
      setMessage(`New style unlocked for ${price.toLocaleString()} Nuggets!`,'correct');
    }
  }
  const theme=event.target.closest?.('[data-color-theme]');
  if(theme){state.colorTheme=theme.dataset.colorTheme;document.body.dataset.theme=state.colorTheme;theme.closest('.theme-choice-grid')?.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===theme));save();render();}
},true);
const renderV43=render;
render=function(){renderV43();if(state?.colorTheme)document.body.dataset.theme=state.colorTheme;};
if(state?.colorTheme)document.body.dataset.theme=state.colorTheme;

// v3.8 — Quests, achievements, mistake notebook, detailed statistics, and portable account backups.
(function(){
  const DAY=86400000;
  const todayKey=()=>new Date().toISOString().slice(0,10);
  const weekKey=()=>{const d=new Date();const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day);return d.toISOString().slice(0,10);};
  function ensureV38(){
    state.analytics=state.analytics||{answered:0,correct:0,wrong:0,reading:0,listening:0,grammar:0,vocabulary:0,kanji:0,minutes:0,firstStudyAt:0,lastAnswerAt:0};
    state.mistakes=Array.isArray(state.mistakes)?state.mistakes:[];
    state.achievements=state.achievements||{};
    state.selectedTitle=state.selectedTitle||'';
    state.character=Object.assign({skin:'warm',hairStyle:'short',hairColor:'brown',shirt:'miner',pants:'denim',accessory:'none'},state.character||{});
    state.ownedCosmetics=Array.isArray(state.ownedCosmetics)?state.ownedCosmetics:['hairStyle:short','hairColor:brown','shirt:miner','pants:denim','accessory:none'];
    ['hairStyle:short','hairColor:brown','shirt:miner','pants:denim','accessory:none'].forEach(id=>{if(!state.ownedCosmetics.includes(id))state.ownedCosmetics.push(id);});
    state.colorTheme=['midnight','sunrise','sakura','aqua','candy'].includes(state.colorTheme)?state.colorTheme:'midnight';
    state.questData=state.questData||{day:'',week:'',daily:{},weekly:{}};
    if(state.questData.day!==todayKey()) state.questData={...state.questData,day:todayKey(),daily:{}};
    if(state.questData.week!==weekKey()) state.questData={...state.questData,week:weekKey(),weekly:{}};
  }
  const DAILY_QUESTS=[
    {id:'answer10',name:'Warm Up',desc:'Answer 10 questions',goal:10,reward:1500,metric:()=>state.questData.daily.answered||0},
    {id:'correct8',name:'Clean Mining',desc:'Get 8 correct answers',goal:8,reward:2000,metric:()=>state.questData.daily.correct||0},
    {id:'streak5',name:'Hot Streak',desc:'Reach a 5-answer streak',goal:5,reward:2500,metric:()=>state.questData.daily.bestStreak||0}
  ];
  const WEEKLY_QUESTS=[
    {id:'answer100',name:'Dedicated Miner',desc:'Answer 100 questions this week',goal:100,reward:15000,metric:()=>state.questData.weekly.answered||0},
    {id:'correct75',name:'Precision Week',desc:'Get 75 correct answers',goal:75,reward:20000,metric:()=>state.questData.weekly.correct||0},
    {id:'study4',name:'Steady Student',desc:'Study on 4 different days',goal:4,reward:25000,metric:()=>state.questData.weekly.studyDays||0}
  ];
  const ACHIEVEMENTS=[
    {id:'first',name:'First Strike',title:'New Miner',desc:'Answer your first question.',test:()=>state.analytics.answered>=1,reward:1000},
    {id:'hundred',name:'Century Miner',title:'Century Scholar',desc:'Answer 100 questions.',test:()=>state.analytics.answered>=100,reward:10000},
    {id:'thousand',name:'Deep Study',title:'Deep Miner',desc:'Answer 1,000 questions.',test:()=>state.analytics.answered>=1000,reward:75000},
    {id:'streak10',name:'Unbroken Focus',title:'Focused Miner',desc:'Reach a 10-answer streak.',test:()=>state.bestStreak>=10,reward:10000},
    {id:'streak30',name:'Blazing Focus',title:'Flame Scholar',desc:'Reach a 30-answer streak.',test:()=>state.bestStreak>=30,reward:50000},
    {id:'week',name:'Seven-Day Student',title:'Steady Scholar',desc:'Reach a 7-day study streak.',test:()=>Number(state.practiceStreak||0)>=7,reward:25000},
    {id:'kana',name:'Kana Master',title:'Kana Master',desc:'Clear Hiragana and Katakana.',test:()=>stageComplete(0)&&stageComplete(1),reward:50000},
    {id:'n5',name:'N5 Graduate',title:'N5 Graduate',desc:'Clear the JLPT N5 mine.',test:()=>stageComplete(2),reward:100000}
  ];
  function addNuggets(amount){addStoneChange(amount,Math.min(gemTiers.length-1,Math.max(2,selectedStageIndex()+3)));}
  function claimQuest(type,id){ensureV38();const list=type==='daily'?DAILY_QUESTS:WEEKLY_QUESTS;const q=list.find(x=>x.id===id),bucket=state.questData[type];if(!q||bucket['claimed_'+id]||q.metric()<q.goal)return;bucket['claimed_'+id]=true;addNuggets(q.reward);save();render();renderFeatureCenter(type==='daily'?'quests':'quests');setMessage(`${q.name} completed! +${q.reward.toLocaleString()} Nuggets.`,'correct');}
  function checkAchievements(){ensureV38();let gained=[];ACHIEVEMENTS.forEach(a=>{if(!state.achievements[a.id]&&a.test()){state.achievements[a.id]={unlockedAt:Date.now()};addNuggets(a.reward);gained.push(a);}});if(gained.length){save();setMessage(`Achievement unlocked: ${gained.map(a=>a.name).join(', ')}!`,'correct');}}
  function qCategory(q){const text=((q?.kind||'')+' '+(q?.prompt||'')).toLowerCase();if(text.includes('reading'))return'reading';if(text.includes('listen'))return'listening';if(text.includes('grammar')||text.includes('particle')||text.includes('conjug'))return'grammar';if(text.includes('kanji'))return'kanji';return'vocabulary';}
  function recordMistake(q,opt){if(!q)return;const key=q.id||`${q.stage}|${q.q}|${q.prompt}`;let item=state.mistakes.find(m=>m.key===key);if(!item){item={key,stage:Number(q.stage||0),question:q.q||q.displayChallenge||'',prompt:q.prompt||'',correct:q.a||'',lastAnswer:opt||'',count:0,lastMissed:0,resolved:false};state.mistakes.unshift(item);}item.count++;item.lastMissed=Date.now();item.lastAnswer=opt||'';item.resolved=false;state.mistakes=state.mistakes.slice(0,300);}
  const answerV38=answer;
  answer=function(opt,button){
    if(state.answered||!state.active)return;
    ensureV38();const q=state.active;const correct=opt===q.a;const beforeDay=state.questData.day;
    answerV38(opt,button);
    ensureV38();
    state.analytics.answered++;state.analytics[correct?'correct':'wrong']++;state.analytics.lastAnswerAt=Date.now();if(!state.analytics.firstStudyAt)state.analytics.firstStudyAt=Date.now();const cat=qCategory(q);state.analytics[cat]=(state.analytics[cat]||0)+1;
    state.questData.daily.answered=(state.questData.daily.answered||0)+1;state.questData.weekly.answered=(state.questData.weekly.answered||0)+1;
    if(correct){state.questData.daily.correct=(state.questData.daily.correct||0)+1;state.questData.weekly.correct=(state.questData.weekly.correct||0)+1;state.questData.daily.bestStreak=Math.max(state.questData.daily.bestStreak||0,state.streak||0);}else recordMistake(q,opt);
    const wk=weekKey();const days=(state.practiceDates||state.studyDates||[]).filter(d=>d>=wk);state.questData.weekly.studyDays=new Set(days).size;
    checkAchievements();save();
  };

  function featureShell(){
    if(document.getElementById('featureCenterOverlay'))return;
    document.body.insertAdjacentHTML('beforeend',`<div id="featureCenterOverlay" class="feature-center-overlay" aria-hidden="true"><section class="feature-center-card" role="dialog" aria-modal="true"><div class="feature-center-head"><div><div class="placement-kicker">Player center</div><h2 id="featureCenterTitle">Progress Center</h2></div><button id="closeFeatureCenter" class="placement-close" type="button">×</button></div><nav class="feature-tabs"><button data-feature-tab="profile">🧍 Character</button><button data-feature-tab="quests">🎯 Quests</button><button data-feature-tab="achievements">🏆 Achievements</button><button data-feature-tab="mistakes">📕 Mistakes</button><button data-feature-tab="statistics">📊 Statistics</button><button data-feature-tab="account">☁️ Account</button></nav><div id="featureCenterContent"></div></section></div>`);
    document.getElementById('closeFeatureCenter').addEventListener('click',closeFeatureCenter);
    document.getElementById('featureCenterOverlay').addEventListener('click',e=>{if(e.target.id==='featureCenterOverlay')closeFeatureCenter();});
    document.querySelectorAll('[data-feature-tab]').forEach(b=>b.addEventListener('click',()=>renderFeatureCenter(b.dataset.featureTab)));
  }
  let featureTab='quests';
  function openFeatureCenter(tab='quests'){featureShell();featureTab=tab;document.getElementById('featureCenterOverlay').classList.add('open');document.body.style.overflow='hidden';renderFeatureCenter(tab);}
  function closeFeatureCenter(){document.getElementById('featureCenterOverlay')?.classList.remove('open');document.body.style.overflow='';}
  function progressCard(q,type){const value=Math.min(q.goal,q.metric()),claimed=state.questData[type]['claimed_'+q.id];return `<article class="quest-card"><div><strong>${q.name}</strong><p>${q.desc}</p></div><div class="quest-progress"><span>${value}/${q.goal}</span><div class="mini-progress"><i style="width:${Math.round(value/q.goal*100)}%"></i></div></div><button data-claim-quest="${type}:${q.id}" ${value<q.goal||claimed?'disabled':''}>${claimed?'Claimed':value>=q.goal?`Claim ${q.reward.toLocaleString()}`:`${q.reward.toLocaleString()} Nuggets`}</button></article>`;}

  const CHARACTER_OPTIONS={
    skin:[['light','Light'],['warm','Warm'],['tan','Tan'],['deep','Deep']],
    hairStyle:[['short','Short'],['spiky','Spiky'],['bob','Bob'],['long','Long'],['bun','Bun'],['buzz','Buzz'],['ponytail','Ponytail'],['wavy','Wavy'],['undercut','Undercut'],['twintails','Twin Tails']],
    hairColor:[['black','Black'],['brown','Brown'],['blonde','Blonde'],['red','Red'],['blue','Blue'],['pink','Pink'],['silver','Silver'],['purple','Purple'],['teal','Teal'],['green','Emerald Green']],
    shirt:[['miner','Miner Coat'],['academy','Academy'],['hoodie','Hoodie'],['festival','Festival'],['armor','Crystal Armor'],['casual','Casual']],
    pants:[['denim','Denim'],['black','Black'],['khaki','Khaki'],['white','White'],['purple','Purple'],['red','Red']],
    accessory:[['none','None'],['glasses','Glasses'],['headband','Headband'],['helmet','Miner Helmet'],['earrings','Earrings'],['scarf','Scarf']]
  };
  const COSMETIC_PRICES={hairStyle:2500,hairColor:1200,shirt:4000,pants:3000,accessory:3500};
  const COLOR_THEMES=[['midnight','Midnight','Free'],['sunrise','Sunrise','Free'],['sakura','Sakura','Free'],['aqua','Aqua','Free'],['candy','Candy','Free']];
  function cosmeticId(key,value){return `${key}:${value}`;}
  function cosmeticOwned(key,value){return key==='skin'||state.ownedCosmetics.includes(cosmeticId(key,value));}
  function characterMarkup(size='large',override={}){
    const c=Object.assign({},state.character,override);
    return `<div class="miner-avatar ${size}" data-skin="${c.skin}" data-hair-style="${c.hairStyle}" data-hair-color="${c.hairColor}" data-shirt="${c.shirt}" data-pants="${c.pants}" data-accessory="${c.accessory}" aria-label="Customized miner character">
      <div class="avatar-shadow"></div><div class="avatar-legs"><i></i><i></i></div><div class="avatar-body"><div class="avatar-shirt-detail"></div><div class="avatar-arm left"></div><div class="avatar-arm right"></div></div><div class="avatar-neck"></div><div class="avatar-head"><div class="avatar-ear left"></div><div class="avatar-ear right"></div><div class="avatar-hair back"></div><div class="avatar-face"><i class="eye left"></i><i class="eye right"></i><i class="mouth"></i></div><div class="avatar-hair front"></div><div class="avatar-accessory"></div></div></div>`;
  }
  window.japaneseMinerCharacterMarkup=characterMarkup;
  function optionButtons(key,label){return `<div class="character-option"><h4>${label}</h4><div class="character-choice-grid">${CHARACTER_OPTIONS[key].map(([value,name],index)=>{const owned=cosmeticOwned(key,value),price=index===0?0:COSMETIC_PRICES[key]||0,visual=key!=='skin';return `<button type="button" data-character-key="${key}" data-character-value="${value}" class="${visual?'visual-choice ':''}${state.character[key]===value?'selected':''} ${owned?'owned':'locked'}">${visual?`<div class="choice-avatar-preview">${characterMarkup('mini',{[key]:value})}</div>`:`<span class="choice-swatch ${key}-${value}"></span>`}<span>${name}<small>${owned?'Owned':`${price.toLocaleString()} 🪙`}</small></span></button>`;}).join('')}</div></div>`;}
  function themeButtons(){return `<div class="character-option"><h4>Bright game colors — free</h4><div class="theme-choice-grid">${COLOR_THEMES.map(([value,name])=>`<button type="button" data-color-theme="${value}" class="${state.colorTheme===value?'selected':''}"><span class="theme-swatch theme-${value}"></span><span>${name}<small>Included</small></span></button>`).join('')}</div></div>`;}
  function renderProfile(){const player=document.getElementById('activePlayerName')?.textContent||'Miner';return `<div class="character-profile"><section class="character-preview-card"><div class="profile-nameplate"><span class="placement-kicker">Your miner</span><h3>${player}</h3><p>${state.selectedTitle||'Japanese Learner'}</p><strong class="cosmetic-balance">🪙 ${totalStoneValue().toLocaleString()} Nuggets</strong></div>${characterMarkup('large')}<div class="character-save-note">Skin tones are always free. Hair, clothes, and accessories are one-time unlocks saved to this profile.</div></section><section class="character-customizer">${themeButtons()}${optionButtons('skin','Skin tone — free')}${optionButtons('hairStyle','Hair style')}${optionButtons('hairColor','Hair color')}${optionButtons('shirt','Clothing top')}${optionButtons('pants','Clothing bottom')}${optionButtons('accessory','Accessory')}<button id="randomizeCharacterBtn" class="primary" type="button">🎲 Randomize owned style</button></section></div>`;}
  function randomizeCharacter(){Object.entries(CHARACTER_OPTIONS).forEach(([key,values])=>{const available=values.filter(([value])=>cosmeticOwned(key,value));state.character[key]=available[Math.floor(Math.random()*available.length)][0];});save();renderFeatureCenter('profile');render();}

  window.renderJapaneseMinerCharacterShop=function(box){
    box.innerHTML=`<div class="shop-section-heading"><span>Character collection</span><h3>Hair, colors, clothing, and accessories</h3><p>Preview every locked style before spending Nuggets.</p></div><div class="character-profile shop-character-profile"><section class="character-preview-card">${characterMarkup('large')}</section><section class="character-customizer">${optionButtons('skin','Skin tones — free')}${optionButtons('hairStyle','Hair styles')}${optionButtons('hairColor','Hair colors')}${optionButtons('shirt','Clothing tops')}${optionButtons('pants','Clothing bottoms')}${optionButtons('accessory','Accessories')}</section></div>`;
    box.querySelectorAll('[data-character-key]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.characterKey,value=b.dataset.characterValue;if(!cosmeticOwned(key,value))return;state.character[key]=value;save();render();renderShop();}));
  };

  function renderQuests(){return `<div class="feature-section"><h3>Daily quests</h3><p class="small">Refresh each calendar day.</p>${DAILY_QUESTS.map(q=>progressCard(q,'daily')).join('')}<h3>Weekly quests</h3><p class="small">Refresh every Monday.</p>${WEEKLY_QUESTS.map(q=>progressCard(q,'weekly')).join('')}</div>`;}
  function renderAchievements(){return `<div class="achievement-grid">${ACHIEVEMENTS.map(a=>{const unlocked=state.achievements[a.id];return `<article class="achievement-card ${unlocked?'unlocked':''}"><span>${unlocked?'🏆':'🔒'}</span><div><strong>${a.name}</strong><p>${a.desc}</p><small>Reward: ${a.reward.toLocaleString()} Nuggets · Title: ${a.title}</small></div>${unlocked?`<button data-title="${a.title}" ${state.selectedTitle===a.title?'disabled':''}>${state.selectedTitle===a.title?'Equipped':'Use title'}</button>`:''}</article>`}).join('')}</div>`;}
  function renderMistakes(){if(!state.mistakes.length)return '<div class="empty-feature">📕 No mistakes saved yet. Incorrect mine answers will appear here automatically.</div>';return `<div class="mistake-list">${state.mistakes.map((m,i)=>`<article class="mistake-card ${m.resolved?'resolved':''}"><div><span class="viz-badge">${stages[m.stage]?.label||'Review'}</span><h3>${m.question||m.prompt}</h3><p>${m.prompt}</p><p><strong>Correct:</strong> ${m.correct} · <strong>Your last answer:</strong> ${m.lastAnswer}</p><small>Missed ${m.count} time${m.count===1?'':'s'} · ${new Date(m.lastMissed).toLocaleDateString()}</small></div><button data-resolve-mistake="${i}">${m.resolved?'Restore':'Mark reviewed'}</button></article>`).join('')}</div>`;}
  function statPercent(){return state.analytics.answered?Math.round(state.analytics.correct/state.analytics.answered*100):0;}
  function renderStatistics(){const days=(state.practiceDates||state.studyDates||[]).length;const weakest=['vocabulary','kanji','grammar','reading','listening'].sort((a,b)=>(state.analytics[a]||0)-(state.analytics[b]||0))[0];return `<div class="stats-feature-grid"><div class="metric-card"><span>Total questions</span><strong class="viz-stat-value">${state.analytics.answered.toLocaleString()}</strong></div><div class="metric-card"><span>Overall accuracy</span><strong class="viz-stat-value">${statPercent()}%</strong></div><div class="metric-card"><span>Study days</span><strong class="viz-stat-value">${days}</strong></div><div class="metric-card"><span>Best streak</span><strong class="viz-stat-value">${Number(state.bestStreak||0)}</strong></div></div><div class="feature-section"><h3>Practice distribution</h3>${['vocabulary','kanji','grammar','reading','listening'].map(k=>`<div class="stat-row"><span>${k[0].toUpperCase()+k.slice(1)}</span><strong>${Number(state.analytics[k]||0).toLocaleString()}</strong></div>`).join('')}<div class="viz-callout"><strong>Recommended focus:</strong> ${weakest[0].toUpperCase()+weakest.slice(1)} has received the least practice so far.</div><h3>Current progression</h3>${stages.map((s,i)=>`<div class="stat-row"><span>${s.label}</span><strong>${Math.round(stageMastery(i))}% mastery · ${Number(state.stageXp[i]||0).toLocaleString()} XP</strong></div>`).join('')}</div>`;}
  function backupPayload(){const profiles=readProfiles();const profile=profiles.find(p=>p.id===activeProfileId);return {format:'JapaneseMinerBackup',version:'4.0',exportedAt:new Date().toISOString(),profile:{name:profile?.name||'Player',id:activeProfileId},state};}
  function downloadBackup(){const blob=new Blob([JSON.stringify(backupPayload(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`japanese-miner-${(document.getElementById('activePlayerName')?.textContent||'player').replace(/[^a-z0-9]+/gi,'-').toLowerCase()}-backup.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
  function importBackup(file){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='JapaneseMinerBackup'||!data.state)throw new Error('Invalid Japanese Miner backup.');if(!confirm('Replace this profile’s current progress with the imported backup?'))return;state=normalizeState(data.state);ensureV38();save();render();closeFeatureCenter();setMessage('Account backup imported successfully.','correct');}catch(e){alert(e.message||'The backup could not be imported.');}};reader.readAsText(file);}
  function renderAccount(){return `<div class="feature-section"><div class="viz-callout"><strong>Portable account backup</strong><br>This build stores profiles in the browser. Exporting a backup lets you move progress to another phone or browser safely.</div><button id="exportBackupBtn" class="primary" type="button">⬇️ Export account backup</button><label class="backup-upload">⬆️ Import account backup<input id="importBackupInput" type="file" accept="application/json"></label><h3>Cloud account status</h3><p>A true automatic cloud account requires a secure hosted database and authentication service. This deployable build includes cross-device backup and restore, but it does not pretend local storage is cloud sync.</p><div class="stat-row"><span>Active profile ID</span><strong>${activeProfileId||'Not signed in'}</strong></div><div class="stat-row"><span>Selected title</span><strong>${state.selectedTitle||'None'}</strong></div></div>`;}
  function renderFeatureCenter(tab){ensureV38();featureTab=tab;featureShell();document.querySelectorAll('[data-feature-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.featureTab===tab));const content=document.getElementById('featureCenterContent');content.innerHTML=tab==='profile'?renderProfile():tab==='quests'?renderQuests():tab==='achievements'?renderAchievements():tab==='mistakes'?renderMistakes():tab==='statistics'?renderStatistics():renderAccount();content.querySelectorAll('[data-character-key]').forEach(b=>b.addEventListener('click',()=>{state.character[b.dataset.characterKey]=b.dataset.characterValue;save();renderFeatureCenter('profile');render();}));document.getElementById('randomizeCharacterBtn')?.addEventListener('click',randomizeCharacter);content.querySelectorAll('[data-claim-quest]').forEach(b=>b.addEventListener('click',()=>{const [type,id]=b.dataset.claimQuest.split(':');claimQuest(type,id);}));content.querySelectorAll('[data-title]').forEach(b=>b.addEventListener('click',()=>{state.selectedTitle=b.dataset.title;save();renderFeatureCenter('achievements');render();}));content.querySelectorAll('[data-resolve-mistake]').forEach(b=>b.addEventListener('click',()=>{const m=state.mistakes[Number(b.dataset.resolveMistake)];if(m){m.resolved=!m.resolved;save();renderFeatureCenter('mistakes');}}));document.getElementById('exportBackupBtn')?.addEventListener('click',downloadBackup);document.getElementById('importBackupInput')?.addEventListener('change',e=>{if(e.target.files[0])importBackup(e.target.files[0]);});}

  function addMenuItems(){const grid=document.querySelector('.game-menu-grid');if(!grid||grid.querySelector('[data-feature-open]'))return;const items=[['profile','🧍','Character','Customize hair, skin, and clothing'],['quests','🎯','Quests','Daily and weekly rewards'],['achievements','🏆','Achievements','Titles and milestones'],['mistakes','📕','Mistakes','Review missed questions'],['statistics','📈','Player Stats','Accuracy and study trends'],['account','☁️','Account','Backup and transfer saves']];items.forEach(([tab,icon,name,desc])=>{const b=document.createElement('button');b.type='button';b.dataset.featureOpen=tab;b.innerHTML=`<span>${icon}</span><strong>${name}</strong><small>${desc}</small>`;b.addEventListener('click',()=>{closeGameMenu();openFeatureCenter(tab);});grid.appendChild(b);});}
  const renderV38=render;render=function(){ensureV38();renderV38();checkAchievements();const chip=document.querySelector('.account-chip #activePlayerName');if(chip&&state.selectedTitle)chip.title=state.selectedTitle;let mini=document.getElementById('headerCharacterAvatar');if(!mini){const holder=document.querySelector('.account-chip');if(holder){mini=document.createElement('button');mini.id='headerCharacterAvatar';mini.className='header-character-avatar';mini.type='button';mini.title='Customize character';mini.addEventListener('click',()=>openFeatureCenter('profile'));holder.prepend(mini);}}if(mini)mini.innerHTML=characterMarkup('mini');};
  const loadV38=loadProfile;loadProfile=function(profile){loadV38(profile);ensureV38();save();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{featureShell();addMenuItems();});else{featureShell();addMenuItems();}
})();

// Finish restoring all v4.3 profile features after an automatic refresh sign-in.
if(activeProfileId)render();
