// Functional multilingual entry-flow preview layered onto the real Language Miner v6.4.91 game.
(()=>{
  'use strict';
  const LANGUAGES={
    en:{name:'English',native:'English',flag:'🇺🇸',path:'Alphabet Mine to CEFR C2',mine:'English Alphabet Mine',voice:'en-US'},
    es:{name:'Spanish',native:'Español',flag:'🇪🇸',path:'Alphabet Mine to CEFR C2',mine:'Spanish Alphabet Mine',voice:'es-ES'},
    ru:{name:'Russian',native:'Русский',flag:'🇷🇺',path:'Cyrillic Alphabet to CEFR C2',mine:'Cyrillic Alphabet Mine',voice:'ru-RU'},
    ja:{name:'Japanese',native:'日本語',flag:'🇯🇵',path:'Hiragana to JLPT N1',mine:'Hiragana Mine',voice:'ja-JP'},
    ko:{name:'Korean',native:'한국어',flag:'🇰🇷',path:'Hangul Alphabet to TOPIK 6',mine:'Hangul Alphabet Mine',voice:'ko-KR'},
    zh:{name:'Chinese (Mandarin)',native:'中文（普通话）',flag:'🇨🇳',path:'Pinyin Alphabet & Tones to HSK 9',mine:'Pinyin Alphabet & Tone Mine',voice:'zh-CN'},
    it:{name:'Italian',native:'Italiano',flag:'🇮🇹',path:'Alphabet Mine to CEFR C2',mine:'Italian Alphabet Mine',voice:'it-IT'},
    fr:{name:'French',native:'Français',flag:'🇫🇷',path:'Alphabet Mine to DALF C2',mine:'French Alphabet Mine',voice:'fr-FR'},
    de:{name:'German',native:'Deutsch',flag:'🇩🇪',path:'Alphabet Mine to CEFR C2',mine:'German Alphabet Mine',voice:'de-DE'}
  };
  const EXPEDITION_COURSES={
    en:[
      ['English Alphabet Mine','A–Z letters and their names','🔤'],
      ['Everyday English Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['English Grammar Quarry','Sentence patterns and core grammar','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate English Range','Independent reading and expression','⛰️'],
      ['Advanced English Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete English mastery','🏆']
    ],
    es:[
      ['Spanish Alphabet Mine','A–Z, Ñ, and Spanish letter names','Ñ'],
      ['Everyday Spanish Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Spanish Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Spanish Range','Independent reading and expression','⛰️'],
      ['Advanced Spanish Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete Spanish mastery','🏆']
    ],
    ru:[
      ['Cyrillic Alphabet Mine','All 33 Russian Cyrillic letters','Я'],
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
      ['Hangul Alphabet Mine','Basic Hangul consonants and vowels','한'],
      ['Everyday Korean Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Korean Grammar Quarry','Particles, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['TOPIK I Range','Beginning Korean proficiency','⛰️'],
      ['TOPIK II Depths','Intermediate and advanced Korean','📚'],
      ['TOPIK 6 Summit','Complete Korean mastery','🏆']
    ],
    zh:[
      ['Pinyin Alphabet & Tone Mine','Pinyin initials, finals, and four tones','声'],
      ['Character & Word Cavern','Core characters and daily vocabulary','字'],
      ['Mandarin Grammar Quarry','Word order and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['HSK 1–3 Range','Beginning Mandarin proficiency','⛰️'],
      ['HSK 4–6 Depths','Intermediate Mandarin proficiency','📚'],
      ['HSK 7–9 Summit','Advanced Mandarin mastery','🏆']
    ],
    it:[
      ['Italian Alphabet Mine','The 21 standard Italian letters','A'],
      ['Everyday Italian Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Italian Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Italian Range','Independent reading and expression','⛰️'],
      ['Advanced Italian Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete Italian mastery','🏆']
    ],
    fr:[
      ['French Alphabet Mine','A–Z and French letter names','É'],
      ['Everyday French Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['French Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate French Range','Independent reading and expression','⛰️'],
      ['Advanced French Depths','Nuance, fluency, and advanced texts','📚'],
      ['DALF C2 Summit','Complete French mastery','🏆']
    ],
    de:[
      ['German Alphabet Mine','A–Z, Ä, Ö, Ü, and ß','Ä'],
      ['Everyday German Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['German Grammar Quarry','Cases, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate German Range','Independent reading and expression','⛰️'],
      ['Advanced German Depths','Nuance, fluency, and advanced texts','📚'],
      ['CEFR C2 Summit','Complete German mastery','🏆']
    ]
  };
  function alphabetUnits(source){
    return source.split('|').map(entry=>{const [symbol,name,spoken]=entry.split('~');return {symbol,name,spoken:spoken||name||symbol};});
  }
  const ALPHABET_SYSTEMS={
    en:{name:'English Alphabet',summary:'26 letters · A–Z',units:alphabetUnits('A~ay|B~bee|C~cee|D~dee|E~ee|F~ef|G~gee|H~aitch|I~eye|J~jay|K~kay|L~el|M~em|N~en|O~oh|P~pee|Q~cue|R~ar|S~ess|T~tee|U~you|V~vee|W~double-u|X~ex|Y~why|Z~zee')},
    es:{name:'Spanish Alphabet',summary:'27 letters · includes Ñ',units:alphabetUnits('A~a|B~be|C~ce|D~de|E~e|F~efe|G~ge|H~hache|I~i|J~jota|K~ka|L~ele|M~eme|N~ene|Ñ~eñe|O~o|P~pe|Q~cu|R~erre|S~ese|T~te|U~u|V~uve|W~uve doble|X~equis|Y~ye|Z~zeta')},
    ru:{name:'Russian Cyrillic Alphabet',summary:'33 Cyrillic letters',units:alphabetUnits('А~а|Б~бэ|В~вэ|Г~гэ|Д~дэ|Е~е|Ё~ё|Ж~жэ|З~зэ|И~и|Й~и краткое|К~ка|Л~эл|М~эм|Н~эн|О~о|П~пэ|Р~эр|С~эс|Т~тэ|У~у|Ф~эф|Х~ха|Ц~цэ|Ч~че|Ш~ша|Щ~ща|Ъ~твёрдый знак|Ы~ы|Ь~мягкий знак|Э~э|Ю~ю|Я~я')},
    ko:{name:'Korean Hangul Alphabet',summary:'14 consonants · 10 vowels',units:alphabetUnits('ㄱ~기역|ㄴ~니은|ㄷ~디귿|ㄹ~리을|ㅁ~미음|ㅂ~비읍|ㅅ~시옷|ㅇ~이응|ㅈ~지읒|ㅊ~치읓|ㅋ~키읔|ㅌ~티읕|ㅍ~피읖|ㅎ~히읗|ㅏ~아|ㅑ~야|ㅓ~어|ㅕ~여|ㅗ~오|ㅛ~요|ㅜ~우|ㅠ~유|ㅡ~으|ㅣ~이')},
    zh:{name:'Mandarin Pinyin Alphabet & Tones',summary:'Pinyin initials, finals, and four tones',units:alphabetUnits('b~b (bā)~八|p~p (pā)~趴|m~m (mā)~妈|f~f (fā)~发|d~d (dā)~搭|t~t (tā)~他|n~n (nā)~拿|l~l (lā)~拉|g~g (gē)~哥|k~k (kē)~科|h~h (hē)~喝|j~j (jī)~鸡|q~q (qī)~七|x~x (xī)~西|zh~zh (zhī)~知|ch~ch (chī)~吃|sh~sh (shī)~师|r~r (rì)~日|z~z (zī)~资|c~c (cī)~疵|s~s (sī)~思|y~y (yī)~一|w~w (wū)~屋|a~final a|o~final o|e~final e|i~final i|u~final u|ü~final ü|ā~first tone|á~second tone|ǎ~third tone|à~fourth tone')},
    it:{name:'Italian Alphabet',summary:'21 standard letters',units:alphabetUnits('A~a|B~bi|C~ci|D~di|E~e|F~effe|G~gi|H~acca|I~i|L~elle|M~emme|N~enne|O~o|P~pi|Q~cu|R~erre|S~esse|T~ti|U~u|V~vi|Z~zeta')},
    fr:{name:'French Alphabet',summary:'26 letters · A–Z',units:alphabetUnits('A~a|B~bé|C~cé|D~dé|E~e|F~effe|G~gé|H~ache|I~i|J~ji|K~ka|L~elle|M~emme|N~enne|O~o|P~pé|Q~qu|R~erre|S~esse|T~té|U~u|V~vé|W~double vé|X~ix|Y~i grec|Z~zède')},
    de:{name:'German Alphabet',summary:'26 letters · Ä, Ö, Ü, and ß',units:alphabetUnits('A~a|B~be|C~ce|D~de|E~e|F~eff|G~ge|H~ha|I~i|J~jot|K~ka|L~el|M~em|N~en|O~o|P~pe|Q~ku|R~er|S~es|T~te|U~u|V~vau|W~we|X~iks|Y~ypsilon|Z~zett|Ä~A-Umlaut|Ö~O-Umlaut|Ü~U-Umlaut|ß~Eszett')}
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
  const ALPHABET_PROMPTS={
    en:(name,target)=>`Which symbol in the ${target} alphabet is called “${name}”?`,
    es:(name,target)=>`¿Qué símbolo del alfabeto de ${target} se llama “${name}”?`,
    ru:(name,target)=>`Какой символ алфавита ${target} называется «${name}»?`,
    ja:(name,target)=>`${target}の文字で「${name}」と呼ばれるものはどれ？`,
    ko:(name,target)=>`${target} 문자 중 “${name}”라고 부르는 것은 무엇입니까?`,
    zh:(name,target)=>`${target}字母中哪个符号叫“${name}”？`,
    it:(name,target)=>`Quale simbolo dell'alfabeto ${target} si chiama “${name}”?`,
    fr:(name,target)=>`Quel symbole de l’alphabet ${target} s’appelle « ${name} » ?`,
    de:(name,target)=>`Welches Zeichen im ${target}-Alphabet heißt „${name}“?`
  };
  const POST_GUIDE_TRANSLATIONS={
    en:{title:'Game Guide',subtitle:'Your quick guide to the {language} course.',section:'Quick Start',back:'Back',next:'Next',finish:'Enter Mine',skip:'Skip guide',complete:'Guide complete. Your mine is ready.',pages:[
      ['⛏️','Start mining','Tap the rock or New Question to begin {mine}.',['Choose one answer, then review the correction.','Every answered question builds this language’s saved progress.']],
      ['🔊','Use pronunciation when you want it','Questions stay silent when they open. Use the optional audio button when you want a pronunciation clue.',['The correct pronunciation plays after grading.','Quizzes, placement tests, and guardian tests follow their own audio rules.']],
      ['🗺️','Follow the Expedition Hub','Open the Expedition Hub to see the complete {language} course route.',['Finish lesson checkpoints to move deeper into the course.','Pass each guardian to unlock the next mine.']],
      ['☰','Use your player tools','The menu opens courses, review, the Word Book, Notebook, character, shop, settings, and supporter features.',['Stats and Calendar remain in the header.','Kōji the Mine Gnome recommends what to study next.']],
      ['💎','Review and keep progressing','Correct answers produce gems, progress, and rewards while difficult material returns for review.',['Quiz and test mistakes appear in results and the Notebook.','Use Change Language to switch courses; each language keeps separate progress.']]
    ]},
    es:{title:'Guía del juego',subtitle:'Guía rápida para el curso de {language}.',section:'Inicio rápido',back:'Atrás',next:'Siguiente',finish:'Entrar en la mina',skip:'Omitir guía',complete:'Guía completada. Tu mina está lista.',pages:[
      ['⛏️','Empieza a minar','Pulsa la roca o Nueva pregunta para comenzar {mine}.',['Elige una respuesta y después revisa la corrección.','Cada pregunta contestada guarda progreso para este idioma.']],
      ['🔊','Usa la pronunciación cuando quieras','Las preguntas permanecen en silencio al abrirse. Usa el botón de audio opcional cuando quieras una pista de pronunciación.',['La pronunciación correcta se reproduce después de calificar.','Los cuestionarios, las pruebas de nivel y los guardianes tienen sus propias reglas de audio.']],
      ['🗺️','Sigue el Centro de Expedición','Abre el Centro de Expedición para ver toda la ruta del curso de {language}.',['Completa los puntos de control para avanzar.','Supera cada guardián para desbloquear la siguiente mina.']],
      ['☰','Usa tus herramientas','El menú abre cursos, repaso, vocabulario, cuaderno, personaje, tienda, ajustes y beneficios de Patreon.',['Las estadísticas y el calendario permanecen en la cabecera.','Kōji, el gnomo de la mina, recomienda qué estudiar.']],
      ['💎','Repasa y sigue progresando','Las respuestas correctas producen gemas, progreso y recompensas; el material difícil vuelve al repaso.',['Los errores de cuestionarios y pruebas aparecen en resultados y en el cuaderno.','Cambiar idioma permite cambiar de curso; cada idioma guarda su propio progreso.']]
    ]},
    ru:{title:'Руководство по игре',subtitle:'Краткое руководство по курсу {language}.',section:'Быстрый старт',back:'Назад',next:'Далее',finish:'Войти в шахту',skip:'Пропустить руководство',complete:'Руководство завершено. Шахта готова.',pages:[
      ['⛏️','Начните добычу','Нажмите на камень или «Новый вопрос», чтобы начать {mine}.',['Выберите ответ, затем прочитайте исправление.','Каждый отвеченный вопрос сохраняет прогресс этого языка.']],
      ['🔊','Используйте произношение по желанию','Новый вопрос открывается без звука. Нажмите дополнительную кнопку аудио, если нужна подсказка произношения.',['Правильное произношение звучит после проверки ответа.','Викторины, тест уровня и испытания хранителей используют собственные правила звука.']],
      ['🗺️','Следуйте по Центру экспедиций','Откройте Центр экспедиций, чтобы увидеть весь маршрут курса {language}.',['Проходите контрольные точки уроков, чтобы двигаться дальше.','Победите хранителя, чтобы открыть следующую шахту.']],
      ['☰','Используйте инструменты игрока','Меню открывает курсы, повторение, словарь, блокнот, персонажа, магазин, настройки и бонусы Patreon.',['Статистика и календарь находятся в верхней панели.','Шахтёрский гном Кодзи подсказывает, что учить дальше.']],
      ['💎','Повторяйте и развивайтесь','Правильные ответы дают самоцветы, прогресс и награды, а трудный материал возвращается на повторение.',['Ошибки в викторинах и тестах показываются в результатах и блокноте.','Кнопка смены языка переключает курс; прогресс каждого языка хранится отдельно.']]
    ]},
    ja:{title:'ゲームガイド',subtitle:'{language}コースのクイックガイドです。',section:'クイックスタート',back:'戻る',next:'次へ',finish:'鉱山に入る',skip:'ガイドをスキップ',complete:'ガイドが完了しました。鉱山の準備ができました。',pages:[
      ['⛏️','採掘を始める','岩または「新しい問題」を押して、{mine}を始めます。',['答えを一つ選び、判定後の説明を確認します。','回答した問題ごとに、この言語の進行状況が保存されます。']],
      ['🔊','必要なときだけ発音を聞く','問題を開いたときは自動再生されません。発音のヒントが必要な場合だけ音声ボタンを押します。',['正しい発音は採点後に再生されます。','クイズ、レベル判定、守護者テストにはそれぞれの音声ルールがあります。']],
      ['🗺️','遠征ハブを進む','遠征ハブを開くと、{language}コース全体のルートを確認できます。',['レッスンのチェックポイントを完了して先へ進みます。','守護者をクリアすると次の鉱山が開放されます。']],
      ['☰','プレイヤーツールを使う','メニューからコース、復習、単語帳、ノート、キャラクター、ショップ、設定、Patreon特典を開けます。',['統計とカレンダーはヘッダーにあります。','鉱山ノームのコージが次の学習内容を提案します。']],
      ['💎','復習して成長する','正解すると宝石、進行度、報酬を獲得し、難しい内容は復習に戻ります。',['クイズとテストで間違えた問題だけが結果とノートに表示されます。','「言語を変更」でコースを切り替えられ、進行度は言語ごとに保存されます。']]
    ]},
    ko:{title:'게임 가이드',subtitle:'{language} 코스를 위한 빠른 안내입니다.',section:'빠른 시작',back:'뒤로',next:'다음',finish:'광산 입장',skip:'가이드 건너뛰기',complete:'가이드를 완료했습니다. 광산이 준비되었습니다.',pages:[
      ['⛏️','채굴 시작하기','바위 또는 새 문제를 눌러 {mine}을 시작하세요.',['답을 하나 선택한 뒤 채점 설명을 확인하세요.','답한 문제마다 이 언어의 진행 상황이 저장됩니다.']],
      ['🔊','필요할 때만 발음 듣기','문제가 열릴 때 자동으로 소리가 나지 않습니다. 발음 힌트가 필요할 때만 선택형 오디오 버튼을 누르세요.',['정답 발음은 채점 후 재생됩니다.','퀴즈, 배치 시험, 수호자 시험에는 각각의 오디오 규칙이 있습니다.']],
      ['🗺️','원정 허브 따라가기','원정 허브를 열어 전체 {language} 코스 경로를 확인하세요.',['레슨 체크포인트를 완료해 더 깊이 진행하세요.','각 수호자를 통과하면 다음 광산이 열립니다.']],
      ['☰','플레이어 도구 사용하기','메뉴에서 코스, 복습, 단어장, 노트북, 캐릭터, 상점, 설정, Patreon 혜택을 열 수 있습니다.',['통계와 달력은 상단에 있습니다.','광산 노움 코지가 다음 학습 내용을 추천합니다.']],
      ['💎','복습하며 성장하기','정답은 보석, 진행도, 보상을 만들고 어려운 내용은 복습에 다시 나타납니다.',['퀴즈와 시험에서 틀린 문제만 결과와 노트북에 표시됩니다.','언어 변경으로 코스를 바꿀 수 있으며 진행도는 언어별로 저장됩니다.']]
    ]},
    zh:{title:'游戏指南',subtitle:'{language}课程快速指南。',section:'快速开始',back:'返回',next:'下一步',finish:'进入矿井',skip:'跳过指南',complete:'指南已完成。矿井已准备好。',pages:[
      ['⛏️','开始采矿','点击岩石或“新问题”即可开始{mine}。',['选择一个答案，然后查看批改说明。','每个已回答的问题都会保存该语言的进度。']],
      ['🔊','需要时再听发音','问题打开时不会自动播放声音。需要发音提示时，请主动点击可选音频按钮。',['正确发音会在评分后播放。','测验、分级测试和守护者测试各有自己的音频规则。']],
      ['🗺️','使用远征中心','打开远征中心即可查看完整的{language}课程路线。',['完成课程检查点以继续深入。','通过每位守护者即可解锁下一座矿井。']],
      ['☰','使用玩家工具','菜单可打开课程、复习、单词本、笔记本、角色、商店、设置和Patreon权益。',['统计和日历位于顶部栏。','矿山地精Kōji会建议下一步学习内容。']],
      ['💎','复习并继续进步','正确答案会带来宝石、进度和奖励，困难内容会再次进入复习。',['只有测验和测试中的错题才会出现在结果和笔记本中。','使用“更改语言”切换课程；每种语言分别保存进度。']]
    ]},
    it:{title:'Guida di gioco',subtitle:'Guida rapida al corso di {language}.',section:'Guida rapida',back:'Indietro',next:'Avanti',finish:'Entra nella miniera',skip:'Salta la guida',complete:'Guida completata. La miniera è pronta.',pages:[
      ['⛏️','Inizia a scavare','Tocca la roccia o Nuova domanda per iniziare {mine}.',['Scegli una risposta e poi controlla la correzione.','Ogni domanda completata salva i progressi di questa lingua.']],
      ['🔊','Usa la pronuncia quando vuoi','Le domande restano silenziose quando si aprono. Usa il pulsante audio facoltativo quando vuoi un suggerimento di pronuncia.',['La pronuncia corretta viene riprodotta dopo la valutazione.','Quiz, test di livello e guardiani seguono regole audio proprie.']],
      ['🗺️','Segui il Centro spedizioni','Apri il Centro spedizioni per vedere l’intero percorso del corso di {language}.',['Completa i punti di controllo per avanzare.','Supera ogni guardiano per sbloccare la miniera successiva.']],
      ['☰','Usa gli strumenti del giocatore','Il menu apre corsi, ripasso, vocabolario, taccuino, personaggio, negozio, impostazioni e vantaggi Patreon.',['Statistiche e calendario restano nell’intestazione.','Kōji, lo gnomo della miniera, consiglia cosa studiare.']],
      ['💎','Ripassa e continua a progredire','Le risposte corrette producono gemme, progressi e ricompense; il materiale difficile ritorna nel ripasso.',['Gli errori di quiz e test compaiono nei risultati e nel taccuino.','Cambia lingua permette di cambiare corso; ogni lingua conserva progressi separati.']]
    ]},
    fr:{title:'Guide du jeu',subtitle:'Guide rapide du cours de {language}.',section:'Démarrage rapide',back:'Retour',next:'Suivant',finish:'Entrer dans la mine',skip:'Ignorer le guide',complete:'Guide terminé. Votre mine est prête.',pages:[
      ['⛏️','Commencer à miner','Touchez le rocher ou Nouvelle question pour commencer {mine}.',['Choisissez une réponse, puis consultez la correction.','Chaque question répondue enregistre la progression de cette langue.']],
      ['🔊','Écouter la prononciation au besoin','Les questions restent silencieuses à leur ouverture. Utilisez le bouton audio facultatif lorsque vous souhaitez un indice de prononciation.',['La bonne prononciation est jouée après la correction.','Les quiz, tests de niveau et gardiens ont leurs propres règles audio.']],
      ['🗺️','Suivre le Centre d’expédition','Ouvrez le Centre d’expédition pour voir tout le parcours du cours de {language}.',['Terminez les étapes des leçons pour progresser.','Réussissez chaque gardien pour débloquer la mine suivante.']],
      ['☰','Utiliser les outils du joueur','Le menu ouvre les cours, révisions, vocabulaire, carnet, personnage, boutique, réglages et avantages Patreon.',['Les statistiques et le calendrier restent dans l’en-tête.','Kōji, le gnome de la mine, recommande la prochaine étude.']],
      ['💎','Réviser et progresser','Les bonnes réponses donnent des gemmes, de la progression et des récompenses; les difficultés reviennent en révision.',['Les erreurs des quiz et tests apparaissent dans les résultats et le carnet.','Changer de langue permet de changer de cours; chaque langue garde sa propre progression.']]
    ]},
    de:{title:'Spielanleitung',subtitle:'Kurzanleitung für den {language}-Kurs.',section:'Schnellstart',back:'Zurück',next:'Weiter',finish:'Mine betreten',skip:'Anleitung überspringen',complete:'Anleitung abgeschlossen. Deine Mine ist bereit.',pages:[
      ['⛏️','Mit dem Schürfen beginnen','Tippe auf den Felsen oder auf Neue Frage, um {mine} zu beginnen.',['Wähle eine Antwort und lies danach die Korrektur.','Jede beantwortete Frage speichert den Fortschritt dieser Sprache.']],
      ['🔊','Aussprache nur bei Bedarf hören','Neue Fragen bleiben beim Öffnen stumm. Nutze die optionale Audio-Schaltfläche nur, wenn du einen Aussprachehinweis möchtest.',['Die richtige Aussprache wird nach der Bewertung abgespielt.','Quizze, Einstufungstests und Wächterprüfungen haben eigene Audioregeln.']],
      ['🗺️','Dem Expeditionszentrum folgen','Öffne das Expeditionszentrum, um den vollständigen {language}-Kursweg zu sehen.',['Schließe Lektionen und Kontrollpunkte ab, um weiterzukommen.','Bestehe jeden Wächter, um die nächste Mine freizuschalten.']],
      ['☰','Spielerwerkzeuge verwenden','Das Menü öffnet Kurse, Wiederholung, Wörterbuch, Notizbuch, Charakter, Shop, Einstellungen und Patreon-Vorteile.',['Statistik und Kalender bleiben in der Kopfzeile.','Kōji, der Minengnom, empfiehlt den nächsten Lernschritt.']],
      ['💎','Wiederholen und weiterlernen','Richtige Antworten bringen Edelsteine, Fortschritt und Belohnungen; schwierige Inhalte kehren zur Wiederholung zurück.',['Fehler aus Quizzen und Tests erscheinen in den Ergebnissen und im Notizbuch.','Mit Sprache ändern wechselst du den Kurs; jede Sprache speichert ihren Fortschritt getrennt.']]
    ]}
  };
  const GUIDE_REVIEW_SKIP_TIPS={
    en:'Use Skip Lesson Review to enter a lesson without viewing every preview card.',
    es:'Usa Omitir repaso de la lección para entrar sin ver todas las tarjetas de vista previa.',
    ru:'Нажмите «Пропустить обзор урока», чтобы начать урок без просмотра всех карточек.',
    ja:'すべてのプレビューカードを見ずに始める場合は「レッスン復習をスキップ」を使います。',
    ko:'모든 미리보기 카드를 보지 않고 시작하려면 레슨 복습 건너뛰기를 사용하세요.',
    zh:'如果不想查看全部预览卡片，可使用“跳过课程复习”直接进入课程。',
    it:'Usa Salta ripasso della lezione per entrare senza vedere tutte le schede di anteprima.',
    fr:'Utilisez Ignorer la révision de la leçon pour commencer sans parcourir toutes les cartes d’aperçu.',
    de:'Mit Lektionswiederholung überspringen startest du, ohne alle Vorschaukarten anzusehen.'
  };
  const STORAGE_PREFIX='lm_multilingual_functional_preview_v1:';
  let known='en',learning='ja',step='languages',openedAutomatically=false,activePreviewQuestion=null,multilingualPlacement=null,postGuideIndex=0;
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
  function currentSettings(){const saved=readSettings();saved.placements=saved.placements&&typeof saved.placements==='object'?saved.placements:{};saved.progress=saved.progress&&typeof saved.progress==='object'?saved.progress:{};saved.guides=saved.guides&&typeof saved.guides==='object'?saved.guides:{};return saved;}
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
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-choice-block"><h3>1. Which language do you already know?</h3><p>The post-placement Game Guide and answer meanings use this language.</p><div id="lmKnownChoices" class="lm-language-grid" role="radiogroup" aria-label="Known language — choose one">${Object.keys(LANGUAGES).map(id=>languageOption('known',id,known)).join('')}</div></div><div class="lm-choice-block"><h3>2. Which language do you want to learn?</h3><p>This chooses the course, pronunciation voice, Notebook, quizzes, and placement record.</p><div id="lmLearningChoices" class="lm-language-grid" role="radiogroup" aria-label="Learning language — choose one">${Object.keys(LANGUAGES).map(id=>languageOption('learning',id,learning,known)).join('')}</div></div><div class="lm-flow-note">Exactly one known language and one learning language can be selected.</div><div class="lm-flow-actions"><button id="lmContinuePlacement" class="lm-flow-primary" type="button" ${known&&learning&&known!==learning?'':'disabled'}>Continue to Placement</button></div></section>`;
    content.querySelectorAll('input[name="lm-known"]').forEach(input=>input.addEventListener('change',()=>{known=input.value;if(learning===known)learning='';renderLanguages();}));
    content.querySelectorAll('input[name="lm-learning"]').forEach(input=>input.addEventListener('change',()=>{learning=input.value;renderLanguages();}));
    document.getElementById('lmContinuePlacement')?.addEventListener('click',renderPlacement);
  }
  function originalJapanesePlacementComplete(){return learning==='ja'&&window.placementTestAlreadyCompleted?.()===true;}
  function persistPair(placementValue){const settings=currentSettings();settings.known=known;settings.learning=learning;if(placementValue)settings.placements[learning]=placementValue;saveSettings(settings);applyCourse(settings);}
  function postGuideText(value){
    const target=LANGUAGES[learning];return String(value).replaceAll('{language}',target.native).replaceAll('{mine}',target.mine);
  }
  function renderPostPlacementGuide(){
    const guide=POST_GUIDE_TRANSLATIONS[known]||POST_GUIDE_TRANSLATIONS.en,page=guide.pages[postGuideIndex],target=LANGUAGES[learning],last=postGuideIndex===guide.pages.length-1;
    const tips=page[3].concat(postGuideIndex===2?[GUIDE_REVIEW_SKIP_TIPS[known]||GUIDE_REVIEW_SKIP_TIPS.en]:[]);
    step='post-guide';progress(2);setHead('📘',guide.title,postGuideText(guide.subtitle));
    content.innerHTML=`<section class="lm-post-guide"><div class="lm-guide-pair">${LANGUAGES[known].flag} ${escapeHtml(LANGUAGES[known].native)} <strong>→</strong> ${target.flag} ${escapeHtml(target.native)}</div><div class="lm-post-guide-count"><span>${escapeHtml(guide.section)}</span><strong>${postGuideIndex+1}/${guide.pages.length}</strong></div><div class="lm-placement-meter"><i style="width:${(postGuideIndex+1)/guide.pages.length*100}%"></i></div><article class="lm-post-guide-page"><span class="lm-post-guide-icon">${page[0]}</span><div><h3>${escapeHtml(postGuideText(page[1]))}</h3><p>${escapeHtml(postGuideText(page[2]))}</p><ul>${tips.map(tip=>`<li>${escapeHtml(postGuideText(tip))}</li>`).join('')}</ul></div></article><div class="lm-flow-actions"><button id="lmPostGuideSkip" class="lm-flow-secondary" type="button">${escapeHtml(guide.skip)}</button><button id="lmPostGuideBack" class="lm-flow-secondary" type="button" ${postGuideIndex===0?'disabled':''}>${escapeHtml(guide.back)}</button><button id="lmPostGuideNext" class="lm-flow-primary" type="button">${escapeHtml(last?guide.finish:guide.next)}</button></div></section>`;
    document.getElementById('lmPostGuideSkip').addEventListener('click',completePostPlacementGuide);document.getElementById('lmPostGuideBack').addEventListener('click',()=>{if(postGuideIndex>0){postGuideIndex--;renderPostPlacementGuide();}});document.getElementById('lmPostGuideNext').addEventListener('click',()=>{if(last)completePostPlacementGuide();else{postGuideIndex++;renderPostPlacementGuide();}});
  }
  function openPostPlacementGuide(force=false){
    if(overlay.classList.contains('open')&&step==='post-guide')return;
    const v6Guide=document.querySelector('#v6TourOverlay.open [data-v6-close="tour"]');v6Guide?.click();
    const settings=currentSettings(),guideKey=`${known}:${learning}`;if(!force&&settings.guides[guideKey]===true){finishFlow(`${LANGUAGES[learning].name} course ready.`);return;}
    postGuideIndex=0;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');renderPostPlacementGuide();
  }
  function completePostPlacementGuide(){
    const guide=POST_GUIDE_TRANSLATIONS[known]||POST_GUIDE_TRANSLATIONS.en,settings=currentSettings();settings.guides[`${known}:${learning}`]=true;saveSettings(settings);finishFlow(guide.complete);
  }
  function placementRecordComplete(record){return record==='tested'||!!(record&&typeof record==='object'&&record.status==='tested');}
  function placementRecordBeginner(record){return record==='beginner'||!!(record&&typeof record==='object'&&record.status==='beginner');}
  function hideOriginalJapanesePlacementForOtherCourses(){
    if(learning==='ja')return;
    const japanesePlacement=document.getElementById('placementOverlay');
    if(!japanesePlacement)return;
    japanesePlacement.classList.remove('open');japanesePlacement.setAttribute('aria-hidden','true');window.syncJapaneseMinerPageScroll?.();
  }
  function renderPlacement(){
    step='placement';progress(1);
    const target=LANGUAGES[learning],settings=currentSettings(),placement=settings.placements[learning],tested=placementRecordComplete(placement)||originalJapanesePlacementComplete(),beginner=placementRecordBeginner(placement),score=placement&&typeof placement==='object'?Number(placement.score):null;
    hideOriginalJapanesePlacementForOtherCourses();
    setHead('📝','Choose your starting point',`This decision is stored separately for ${target.name} on this Language Miner account.`);
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-placement-status">${tested?`PLACEMENT COMPLETED${Number.isFinite(score)?` · ${score}/10`:''}`:beginner?'BEGINNER START SAVED':'ONE TEST AVAILABLE FOR THIS LANGUAGE'}</div><div class="lm-placement-options"><article class="lm-placement-option"><span class="lm-big-icon">🌱</span><h3>I’m new to ${escapeHtml(target.name)}</h3><p>Skip placement for now and begin with the first ${escapeHtml(target.name)} lesson. The one-time test remains available until it is completed.</p><button id="lmSkipPlacement" class="lm-flow-secondary lm-flow-skip" type="button" ${tested?'disabled':''}>I’m New — Skip Test</button></article><article class="lm-placement-option"><span class="lm-big-icon">🧭</span><h3>I already know some ${escapeHtml(target.name)}</h3><p>Take a 10-question test using ${escapeHtml(target.name)} words and pronunciation. It never substitutes a Japanese test for another language.</p><button id="lmStartPlacement" class="lm-flow-primary" type="button" ${tested?'disabled':''}>${tested?'Placement Complete':`Start ${escapeHtml(target.name)} Test`}</button></article></div><div class="lm-flow-note">The one-time attempt is stored per account and per learning language. Changing the known language does not create another attempt.</div><div class="lm-flow-actions"><button id="lmPlacementBack" class="lm-flow-secondary" type="button">Back to Languages</button>${tested?'<button id="lmEnterCurrentCourse" class="lm-flow-primary" type="button">Continue to Game Guide</button>':''}</div></section>`;
    document.getElementById('lmPlacementBack').addEventListener('click',renderLanguages);document.getElementById('lmSkipPlacement')?.addEventListener('click',skipPlacement);document.getElementById('lmStartPlacement')?.addEventListener('click',startPlacement);document.getElementById('lmEnterCurrentCourse')?.addEventListener('click',openPostPlacementGuide);
  }
  function multilingualPlacementQuestion(concept,targetId,knownId){
    const answer=concept.forms[targetId],meaning=concept.forms[knownId],options=[answer];
    for(const candidate of shuffled(FOUNDATION_CONCEPTS)){const value=candidate.forms[targetId];if(!options.includes(value))options.push(value);if(options.length===4)break;}
    return {concept,answer,meaning,options:shuffled(options)};
  }
  function beginMultilingualPlacement(){
    const settings=currentSettings();
    if(placementRecordComplete(settings.placements[learning])){renderPlacement();return;}
    multilingualPlacement={learning,known,index:0,correct:0,answered:false,questions:shuffled(FOUNDATION_CONCEPTS).map(concept=>multilingualPlacementQuestion(concept,learning,known))};
    renderMultilingualPlacementQuestion();
  }
  function renderMultilingualPlacementQuestion(){
    const session=multilingualPlacement;if(!session)return renderPlacement();
    const target=LANGUAGES[session.learning],question=session.questions[session.index],number=session.index+1,total=session.questions.length,prompt=(QUESTION_PROMPTS[session.known]||QUESTION_PROMPTS.en)(question.meaning,target.name);
    step='placement-test';progress(1);setHead('🧭',`${target.name} Placement Test`,`Question ${number} of ${total} · this test uses ${target.name}, not Japanese.`);
    content.innerHTML=`<section class="lm-placement-test-shell"><div class="lm-placement-test-top"><span>${target.flag} ${escapeHtml(target.name)} placement</span><strong>${number}/${total}</strong></div><div class="lm-placement-meter"><i style="width:${(session.index/total)*100}%"></i></div><article class="lm-placement-question"><div class="lm-question-kicker">${escapeHtml(target.name)} · Foundation placement</div><h3>${escapeHtml(prompt)}</h3><button id="lmPlacementSpeak" class="lm-speak-button" type="button">🔊 Hear question in ${escapeHtml(LANGUAGES[session.known].name)}</button><div class="lm-answer-grid">${question.options.map((option,index)=>`<button type="button" data-lm-placement-option="${index}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmPlacementFeedback" class="lm-course-feedback" aria-live="polite"></div><button id="lmPlacementNext" class="lm-next-course-question" type="button" hidden>${number===total?'See Placement Result':'Next Question'}</button></article><div class="lm-flow-note">This test can be completed only once for ${escapeHtml(target.name)} on this account.</div></section>`;
    document.getElementById('lmPlacementSpeak')?.addEventListener('click',()=>speakLanguage(prompt,session.known));content.querySelectorAll('[data-lm-placement-option]').forEach(button=>button.addEventListener('click',()=>answerMultilingualPlacement(button)));document.getElementById('lmPlacementNext')?.addEventListener('click',advanceMultilingualPlacement);
  }
  function answerMultilingualPlacement(button){
    const session=multilingualPlacement;if(!session||session.answered)return;
    const question=session.questions[session.index],selected=question.options[Number(button.dataset.lmPlacementOption)],correct=selected===question.answer;session.answered=true;if(correct)session.correct++;
    content.querySelectorAll('[data-lm-placement-option]').forEach(option=>{option.disabled=true;const value=question.options[Number(option.dataset.lmPlacementOption)];if(value===question.answer)option.classList.add('correct');else if(option===button)option.classList.add('wrong');});
    const feedback=document.getElementById('lmPlacementFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ Correct — <strong>${escapeHtml(question.answer)}</strong>`:`The correct answer is <strong>${escapeHtml(question.answer)}</strong>.`;}
    document.getElementById('lmPlacementNext').hidden=false;speakTarget(question.answer);
  }
  function advanceMultilingualPlacement(){
    const session=multilingualPlacement;if(!session||!session.answered)return;
    if(session.index>=session.questions.length-1){finishMultilingualPlacement();return;}
    session.index++;session.answered=false;renderMultilingualPlacementQuestion();
  }
  function finishMultilingualPlacement(){
    const session=multilingualPlacement;if(!session)return;
    const target=LANGUAGES[session.learning],score=session.correct,total=session.questions.length;
    const band=score<=3?{xp:0,label:'Foundation Lesson 1',title:`Start at the beginning of ${target.name}`,copy:'Build recognition and pronunciation from the first foundation lesson.'}:score<=6?{xp:25,label:'Foundation Lesson 2',title:`Continue with early ${target.name} foundations`,copy:'You recognized several essentials, so the second foundation lesson is recommended.'}:score<=8?{xp:50,label:'Foundation Lesson 3',title:`Begin in the middle of ${target.name} foundations`,copy:'Your core vocabulary is developing well. Begin with the third foundation lesson.'}:{xp:75,label:'Foundation Lesson 4',title:`Begin with advanced ${target.name} foundations`,copy:'You showed strong recognition of the foundation set. Begin with the fourth lesson before the guardian check.'};
    const settings=currentSettings();settings.placements[session.learning]={status:'tested',score,total,recommendedXp:band.xp,completedAt:Date.now()};const savedProgress=settings.progress[session.learning]||{answered:0,correct:0,xp:0};savedProgress.xp=Math.max(Number(savedProgress.xp)||0,band.xp);settings.progress[session.learning]=savedProgress;settings.known=session.known;settings.learning=session.learning;saveSettings(settings);applyCourse(settings);multilingualPlacement=null;
    setHead('🎯',`${target.name} Placement Result`,`${score} of ${total} correct · one completed attempt for ${target.name}.`);
    content.innerHTML=`<section class="lm-placement-result"><span>${target.flag} ${escapeHtml(target.name)} result</span><strong>${score}/${total}</strong><h3>${escapeHtml(band.title)}</h3><p>${escapeHtml(band.copy)}</p><div class="lm-placement-recommendation">Recommended starting point: <b>${escapeHtml(band.label)}</b></div><div class="lm-flow-actions"><button id="lmFinishPlacement" class="lm-flow-primary" type="button">Continue to Game Guide</button></div></section>`;
    document.getElementById('lmFinishPlacement').addEventListener('click',openPostPlacementGuide);
  }
  function skipPlacement(){persistPair('beginner');hideOriginalJapanesePlacementForOtherCourses();if(learning==='ja'){closeFlow();if(window.openPlacementOnboarding?.(true))window.chooseBrandNew?.();return;}openPostPlacementGuide();}
  function startPlacement(){persistPair();if(learning==='ja'){closeFlow();if(window.openPlacementOnboarding?.(true))window.startPlacementTest?.();return;}hideOriginalJapanesePlacementForOtherCourses();beginMultilingualPlacement();}
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
  function speakLanguage(text,languageId){
    if(!('speechSynthesis'in window)||!text)return;
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=(LANGUAGES[languageId]||LANGUAGES.en).voice;utterance.rate=.82;speechSynthesis.speak(utterance);
  }
  function speakTarget(text){speakLanguage(text,learning);}
  function makeFoundationQuestion(){
    const concept=shuffled(FOUNDATION_CONCEPTS.filter(item=>item.id!==activePreviewQuestion?.concept?.id))[0]||FOUNDATION_CONCEPTS[0];
    const answer=concept.forms[learning],meaning=concept.forms[known],options=[answer];
    for(const item of shuffled(FOUNDATION_CONCEPTS)){const value=item.forms[learning];if(!options.includes(value))options.push(value);if(options.length===4)break;}
    return {concept,answer,meaning,options:shuffled(options)};
  }
  function makeAlphabetQuestion(){
    const system=ALPHABET_SYSTEMS[learning],previous=activePreviewQuestion?.unit?.symbol;
    const unit=shuffled(system.units.filter(item=>item.symbol!==previous))[0]||system.units[0],options=[unit.symbol];
    for(const item of shuffled(system.units)){if(!options.includes(item.symbol))options.push(item.symbol);if(options.length===4)break;}
    return {mode:'alphabet',unit,answer:unit.symbol,label:unit.name,spoken:unit.spoken,options:shuffled(options)};
  }
  function renderFoundationQuestion(){
    if(learning==='ja')return;
    const system=ALPHABET_SYSTEMS[learning];activePreviewQuestion=makeAlphabetQuestion();const target=LANGUAGES[learning],prompt=(ALPHABET_PROMPTS[known]||ALPHABET_PROMPTS.en)(activePreviewQuestion.label,target.name),area=document.getElementById('challengeArea'),message=document.getElementById('message');
    if(!area)return;
    area.innerHTML=`<section class="lm-course-question lm-alphabet-question" aria-label="${escapeHtml(target.name)} alphabet question"><div class="lm-question-kicker">${target.flag} ${escapeHtml(system.name)} · ${escapeHtml(system.summary)}</div><h3>${escapeHtml(prompt)}</h3><div class="lm-question-actions"><button id="lmSpeakQuestion" class="lm-speak-button" type="button">🔊 Replay pronunciation clue (optional)</button></div><div class="lm-answer-grid lm-alphabet-answers">${activePreviewQuestion.options.map(option=>`<button type="button" data-lm-course-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmCourseFeedback" class="lm-course-feedback" aria-live="polite"></div><button id="lmNextCourseQuestion" class="lm-next-course-question" type="button" hidden>Next ${escapeHtml(target.name)} Alphabet Question</button></section>`;
    if(message)message.textContent='';document.getElementById('lmSpeakQuestion')?.addEventListener('click',()=>speakTarget(activePreviewQuestion.spoken));document.querySelectorAll('[data-lm-course-answer]').forEach(button=>button.addEventListener('click',()=>answerFoundationQuestion(button)));document.getElementById('lmNextCourseQuestion')?.addEventListener('click',renderFoundationQuestion);
    const quickLabel=document.getElementById('quickMineLabel');if(quickLabel)quickLabel.textContent='Return to Alphabet Question';area.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function answerFoundationQuestion(button){
    const selected=button.dataset.lmCourseAnswer,correct=selected===activePreviewQuestion.answer,buttons=[...document.querySelectorAll('[data-lm-course-answer]')];
    buttons.forEach(item=>{item.disabled=true;if(item.dataset.lmCourseAnswer===activePreviewQuestion.answer)item.classList.add('correct');else if(item===button)item.classList.add('wrong');});
    const progress=languageProgress();progress.answered=Number(progress.answered||0)+1;progress.correct=Number(progress.correct||0)+(correct?1:0);progress.xp=Math.min(100,Number(progress.xp||0)+(correct?10:3));saveLanguageProgress(progress);updateFoundationProgress();
    const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ Correct — <strong>${escapeHtml(activePreviewQuestion.answer)}</strong> is ${escapeHtml(activePreviewQuestion.label)}.`:`Not quite. The correct symbol is <strong>${escapeHtml(activePreviewQuestion.answer)}</strong> — ${escapeHtml(activePreviewQuestion.label)}.`;}
    document.getElementById('lmNextCourseQuestion').hidden=false;speakTarget(activePreviewQuestion.spoken||activePreviewQuestion.answer);
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
    return `<div class="world-road lm-expedition-road">${thresholds.map((threshold,index)=>{const open=unlocked&&progress>=threshold;return `${index?'<i class="road-piece"></i>':''}<button type="button" data-lm-expedition-lesson="${stageIndex}" class="world-node ${open?'open':'locked'} ${open&&index===current?'current':''}" ${open?'':'disabled'}><span>${open?index+1:'🔒'}</span><small>Lesson ${index+1}</small></button>`;}).join('')}<i class="road-piece"></i><button type="button" data-lm-expedition-lesson="${stageIndex}" class="world-node ${unlocked&&progress>=100?'open':'locked'}" ${unlocked&&progress>=100?'':'disabled'}><span>🏯</span><small>Alphabet Check</small></button></div>`;
  }
  function multilingualExpeditionMap(){
    const target=LANGUAGES[learning],course=EXPEDITION_COURSES[learning]||EXPEDITION_COURSES.en,alphabet=ALPHABET_SYSTEMS[learning],stored=languageProgress(),answered=Number(stored.answered||0),foundationProgress=Math.min(100,Number(stored.xp)||0);
    return `<div class="lm-course-world-map"><div class="v5-hero world-hero lm-expedition-hero"><div><span>${escapeHtml(target.name)} Language Miner Map</span><h3>${escapeHtml(target.mine)}</h3><p>The Expedition Hub now follows the selected ${escapeHtml(target.name)} course. Its first mine teaches that language’s alphabet or writing system and saves progress separately.</p></div><b>${target.flag}</b></div><div class="world-legend"><span>🟢 Available</span><span>⭐ Current</span><span>🔒 Locked</span><span>🏯 Guardian</span></div><div class="world-map-scroll"><div class="world-map-canvas"><div class="map-cloud c1">☁️</div><div class="map-cloud c2">☁️</div>${course.map((stage,index)=>{const unlocked=index===0,progress=unlocked?foundationProgress:0,progressLabel=unlocked?`${progress}% alphabet mastery · ${answered} answered`:'Complete the previous course region';return `<section class="world-region region-${index} ${index===0?'current-region':''} ${unlocked?'':'locked-region'}"><div class="region-scenery">${stage[2]} <small>${escapeHtml(target.name)} Mine ${index+1}</small></div><div class="region-label"><strong>${escapeHtml(stage[0])}</strong><span>${escapeHtml(stage[1])} · ${progressLabel}</span></div>${index===0&&alphabet?`<div class="lm-alphabet-strip" aria-label="${escapeHtml(alphabet.name)}"><span>${alphabet.units.map(unit=>escapeHtml(unit.symbol)).join('</span><span>')}</span></div>`:''}${expeditionLessonRoad(index,unlocked,progress)}</section>`;}).join('')}<div class="world-finish">🏆 ${escapeHtml(target.name)} Master</div></div></div></div>`;
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
    hideOriginalJapanesePlacementForOtherCourses();updateCourseChrome();lastAppliedLearning=learning;
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
    const originalPlacement=document.getElementById('placementOverlay');originalPlacement?.classList.remove('open');originalPlacement?.setAttribute('aria-hidden','true');
    overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');renderLanguages();
  }
  function closeFlow(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
  function scheduleGuideAfterJapanesePlacement(event){
    if(!event.target.closest?.('#beginJourneyBtn,#acceptPlacementBtn'))return;
    setTimeout(openPostPlacementGuide,340);
  }
  function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500);}
  function build(){
    overlay=document.createElement('div');overlay.id='lmMultilingualOverlay';overlay.className='lm-multilingual-overlay';overlay.setAttribute('aria-hidden','true');overlay.innerHTML=`<section class="lm-multilingual-card" role="dialog" aria-modal="true" aria-labelledby="lmFlowTitle"><header class="lm-flow-head"><div id="lmFlowIcon" class="lm-flow-icon">🌐</div><div class="lm-flow-copy"><h2 id="lmFlowTitle">Choose your Language Miner course</h2><p id="lmFlowCopy"></p></div><button id="lmFlowClose" class="lm-flow-close" type="button" aria-label="Close language setup">×</button></header><div class="lm-flow-progress" aria-label="Language setup progress"><i class="active"></i><i></i><i></i></div><div id="lmFlowContent"></div></section>`;document.body.appendChild(overlay);
    toast=document.createElement('div');toast.className='lm-preview-toast';toast.setAttribute('role','status');document.body.appendChild(toast);
    content=document.getElementById('lmFlowContent');title=document.getElementById('lmFlowTitle');copy=document.getElementById('lmFlowCopy');icon=document.getElementById('lmFlowIcon');indicator=document.getElementById('lmCourseIndicator');changeButton=document.getElementById('lmChangeLanguageBtn');
    document.getElementById('lmFlowClose').addEventListener('click',closeFlow);changeButton?.addEventListener('click',openFlow);document.addEventListener('click',handleCourseControls,true);document.addEventListener('click',scheduleGuideAfterJapanesePlacement);window.openLanguageMinerTranslatedGuide=()=>{openPostPlacementGuide(true);return true;};applyCourse();
    const timer=setInterval(()=>{if(!signedIn())return;applyCourse();if(!openedAutomatically&&!localStorage.getItem(STORAGE_PREFIX+accountKey())){openedAutomatically=true;openFlow();}else if(!openedAutomatically){openedAutomatically=true;}clearInterval(timer);},350);
    setInterval(()=>{if(signedIn()&&!overlay.classList.contains('open'))applyCourse();},800);
    window.addEventListener('lm-cloud-session-changed',()=>{openedAutomatically=false;});
  }
  window.addEventListener('DOMContentLoaded',build);
})();
