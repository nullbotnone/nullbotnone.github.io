/* slashai.app -- the front door for the five tools built here. Static: no
   framework, no build step, no dependencies. */

const LANGS = ["zh", "tw", "en"];

const UI = {
  zh: {
    langName: "简", htmlLang: "zh-CN",
    skip: "跳到工具",
    eyebrow: "为基督徒而造的开源工具",
    tagline: "让信仰的故事，看得见、用得上。",
    herosub: "从圣经世界的山海，到主日敬拜的投影——我把技术做成简单、开放、随手可用的工具，服事教会，也帮助每一个认真探索信仰的人。",
    navTools: "工具", navVerse: "今日经文", explore: "探索五个工具", source: "查看开源代码",
    collection: "工具集", toolsHeading: "已经启程的作品", toolsIntro: "每一个项目都从真实的需要开始：更清楚地理解圣经，更专注地预备敬拜。无需账号，打开就能使用。",
    verseHeading: "今日经文", roadmap: "接下来", comingTitle: "更多，正在路上。", comingBody: "这不是一个完成的清单，而是一间持续工作的数字工坊。新的圣经学习与教会服事工具会陆续来到这里。", follow: "在 GitHub 关注进展",
    shuffle: "换一节", copy: "复制经文", copied: "已复制", open: "读上下文",
    footnote: "经文采用公有领域的和合本与 KJV。所有工具均为开源项目。",
    themeLabel: "切换主题",
  },
  tw: {
    langName: "繁", htmlLang: "zh-TW",
    skip: "跳到工具",
    eyebrow: "為基督徒而造的開源工具",
    tagline: "讓信仰的故事，看得見、用得上。",
    herosub: "從聖經世界的山海，到主日敬拜的投影——我把技術做成簡單、開放、隨手可用的工具，服事教會，也幫助每一個認真探索信仰的人。",
    navTools: "工具", navVerse: "今日經文", explore: "探索五個工具", source: "查看開源程式碼",
    collection: "工具集", toolsHeading: "已經啟程的作品", toolsIntro: "每一個項目都從真實的需要開始：更清楚地理解聖經，更專注地預備敬拜。無需帳號，打開就能使用。",
    verseHeading: "今日經文", roadmap: "接下來", comingTitle: "更多，正在路上。", comingBody: "這不是一個完成的清單，而是一間持續工作的數位工坊。新的聖經學習與教會服事工具會陸續來到這裡。", follow: "在 GitHub 關注進展",
    shuffle: "換一節", copy: "複製經文", copied: "已複製", open: "讀上下文",
    footnote: "經文採用公有領域的和合本與 KJV。所有工具均為開源項目。",
    themeLabel: "切換主題",
  },
  en: {
    langName: "EN", htmlLang: "en",
    skip: "Skip to tools",
    eyebrow: "Open-source tools for Christians",
    tagline: "See the story. Serve with better tools.",
    herosub: "From the mountains and seas of the biblical world to Sunday lyric slides—I turn technology into simple, open tools for churches and for anyone exploring faith with care.",
    navTools: "Tools", navVerse: "Daily verse", explore: "Explore all five", source: "View the source",
    collection: "The collection", toolsHeading: "Tools already in motion", toolsIntro: "Each project began with a real need: understand Scripture more clearly and prepare worship with less friction. No account required—just open and use.",
    verseHeading: "A verse for today", roadmap: "What’s next", comingTitle: "More is on the way.", comingBody: "This isn’t a finished list. It’s an active digital workshop, with more tools for Bible study and church ministry coming here over time.", follow: "Follow progress on GitHub",
    shuffle: "Another verse", copy: "Copy verse", copied: "Copied", open: "Read in context",
    footnote: "Verses use the public-domain CUV and KJV. Every tool is open source.",
    themeLabel: "Toggle theme",
  },
};

/* Verse of the day. CUV and KJV are both public domain, which is the whole
   reason those two translations are the ones sitting in this file. */
const VERSES = [
  { ref: "John 3:16", zhRef: "约翰福音 3:16", twRef: "約翰福音 3:16",
    zh: "神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。",
    tw: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。",
    en: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
  { ref: "Psalm 23:1", zhRef: "诗篇 23:1", twRef: "詩篇 23:1",
    zh: "耶和华是我的牧者，我必不至缺乏。",
    tw: "耶和華是我的牧者，我必不至缺乏。",
    en: "The LORD is my shepherd; I shall not want." },
  { ref: "Philippians 4:13", zhRef: "腓立比书 4:13", twRef: "腓立比書 4:13",
    zh: "我靠着那加给我力量的，凡事都能作。",
    tw: "我靠著那加給我力量的，凡事都能作。",
    en: "I can do all things through Christ which strengtheneth me." },
  { ref: "Romans 8:28", zhRef: "罗马书 8:28", twRef: "羅馬書 8:28",
    zh: "我们晓得万事都互相效力，叫爱神的人得益处，就是按他旨意被召的人。",
    tw: "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。",
    en: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
  { ref: "Proverbs 3:5-6", zhRef: "箴言 3:5-6", twRef: "箴言 3:5-6",
    zh: "你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。",
    tw: "你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上都要認定他，他必指引你的路。",
    en: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
  { ref: "Isaiah 40:31", zhRef: "以赛亚书 40:31", twRef: "以賽亞書 40:31",
    zh: "但那等候耶和华的必从新得力。他们必如鹰展翅上腾；他们奔跑却不困倦，行走却不疲乏。",
    tw: "但那等候耶和華的必從新得力。他們必如鷹展翅上騰；他們奔跑卻不困倦，行走卻不疲乏。",
    en: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
  { ref: "Jeremiah 29:11", zhRef: "耶利米书 29:11", twRef: "耶利米書 29:11",
    zh: "耶和华说：我知道我向你们所怀的意念是赐平安的意念，不是降灾祸的意念，要叫你们末后有指望。",
    tw: "耶和華說：我知道我向你們所懷的意念是賜平安的意念，不是降災禍的意念，要叫你們末後有指望。",
    en: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
  { ref: "Psalm 119:105", zhRef: "诗篇 119:105", twRef: "詩篇 119:105",
    zh: "你的话是我脚前的灯，是我路上的光。",
    tw: "你的話是我腳前的燈，是我路上的光。",
    en: "Thy word is a lamp unto my feet, and a light unto my path." },
  { ref: "Matthew 11:28", zhRef: "马太福音 11:28", twRef: "馬太福音 11:28",
    zh: "凡劳苦担重担的人可以到我这里来，我就使你们得安息。",
    tw: "凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。",
    en: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
  { ref: "John 14:6", zhRef: "约翰福音 14:6", twRef: "約翰福音 14:6",
    zh: "耶稣说：我就是道路、真理、生命；若不藉着我，没有人能到父那里去。",
    tw: "耶穌說：我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。",
    en: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
  { ref: "Ephesians 2:8", zhRef: "以弗所书 2:8", twRef: "以弗所書 2:8",
    zh: "你们得救是本乎恩，也因着信；这并不是出于自己，乃是神所赐的。",
    tw: "你們得救是本乎恩，也因著信；這並不是出於自己，乃是神所賜的。",
    en: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God." },
  { ref: "Galatians 5:22-23", zhRef: "加拉太书 5:22-23", twRef: "加拉太書 5:22-23",
    zh: "圣灵所结的果子，就是仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制。",
    tw: "聖靈所結的果子，就是仁愛、喜樂、和平、忍耐、恩慈、良善、信實、溫柔、節制。",
    en: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance." },
  { ref: "Hebrews 11:1", zhRef: "希伯来书 11:1", twRef: "希伯來書 11:1",
    zh: "信就是所望之事的实底，是未见之事的确据。",
    tw: "信就是所望之事的實底，是未見之事的確據。",
    en: "Now faith is the substance of things hoped for, the evidence of things not seen." },
  { ref: "Psalm 46:1", zhRef: "诗篇 46:1", twRef: "詩篇 46:1",
    zh: "神是我们的避难所，是我们的力量，是我们在患难中随时的帮助。",
    tw: "神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。",
    en: "God is our refuge and strength, a very present help in trouble." },
  { ref: "Matthew 28:19", zhRef: "马太福音 28:19", twRef: "馬太福音 28:19",
    zh: "所以，你们要去，使万民作我的门徒，奉父、子、圣灵的名给他们施洗。",
    tw: "所以，你們要去，使萬民作我的門徒，奉父、子、聖靈的名給他們施洗。",
    en: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
  { ref: "Romans 12:2", zhRef: "罗马书 12:2", twRef: "羅馬書 12:2",
    zh: "不要效法这个世界，只要心意更新而变化，叫你们察验何为神的善良、纯全、可喜悦的旨意。",
    tw: "不要效法這個世界，只要心意更新而變化，叫你們察驗何為神的善良、純全、可喜悅的旨意。",
    en: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." },
  { ref: "Philippians 4:6-7", zhRef: "腓立比书 4:6-7", twRef: "腓立比書 4:6-7",
    zh: "应当一无挂虑，只要凡事藉着祷告、祈求，和感谢，将你们所要的告诉神。神所赐、出人意外的平安必在基督耶稣里保守你们的心怀意念。",
    tw: "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。",
    en: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
  { ref: "Isaiah 41:10", zhRef: "以赛亚书 41:10", twRef: "以賽亞書 41:10",
    zh: "你不要害怕，因为我与你同在；不要惊惶，因为我是你的神。我必坚固你，我必帮助你。",
    tw: "你不要害怕，因為我與你同在；不要驚惶，因為我是你的神。我必堅固你，我必幫助你。",
    en: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee." },
  { ref: "Joshua 1:9", zhRef: "约书亚记 1:9", twRef: "約書亞記 1:9",
    zh: "你当刚强壮胆！不要惧怕，也不要惊惶；因为你无论往哪里去，耶和华你的神必与你同在。",
    tw: "你當剛強壯膽！不要懼怕，也不要驚惶；因為你無論往哪裡去，耶和華你的神必與你同在。",
    en: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
  { ref: "Psalm 27:1", zhRef: "诗篇 27:1", twRef: "詩篇 27:1",
    zh: "耶和华是我的亮光，是我的拯救，我还怕谁呢？耶和华是我性命的保障，我还惧谁呢？",
    tw: "耶和華是我的亮光，是我的拯救，我還怕誰呢？耶和華是我性命的保障，我還懼誰呢？",
    en: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?" },
  { ref: "2 Corinthians 5:17", zhRef: "哥林多后书 5:17", twRef: "哥林多後書 5:17",
    zh: "若有人在基督里，他就是新造的人，旧事已过，都变成新的了。",
    tw: "若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。",
    en: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." },
  { ref: "1 Peter 5:7", zhRef: "彼得前书 5:7", twRef: "彼得前書 5:7",
    zh: "你们要将一切的忧虑卸给神，因为他顾念你们。",
    tw: "你們要將一切的憂慮卸給神，因為他顧念你們。",
    en: "Casting all your care upon him; for he careth for you." },
  { ref: "1 John 4:19", zhRef: "约翰一书 4:19", twRef: "約翰一書 4:19",
    zh: "我们爱，因为神先爱我们。",
    tw: "我們愛，因為神先愛我們。",
    en: "We love him, because he first loved us." },
  { ref: "Psalm 121:1-2", zhRef: "诗篇 121:1-2", twRef: "詩篇 121:1-2",
    zh: "我要向山举目；我的帮助从何而来？我的帮助从造天地的耶和华而来。",
    tw: "我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。",
    en: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth." },
  { ref: "Micah 6:8", zhRef: "弥迦书 6:8", twRef: "彌迦書 6:8",
    zh: "世人哪，耶和华已指示你何为善。他向你所要的是什么呢？只要你行公义，好怜悯，存谦卑的心，与你的神同行。",
    tw: "世人哪，耶和華已指示你何為善。他向你所要的是甚麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。",
    en: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?" },
  { ref: "Matthew 6:33", zhRef: "马太福音 6:33", twRef: "馬太福音 6:33",
    zh: "你们要先求他的国和他的义，这些东西都要加给你们了。",
    tw: "你們要先求他的國和他的義，這些東西都要加給你們了。",
    en: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
  { ref: "Romans 5:8", zhRef: "罗马书 5:8", twRef: "羅馬書 5:8",
    zh: "惟有基督在我们还作罪人的时候为我们死，神的爱就在此向我们显明了。",
    tw: "惟有基督在我們還作罪人的時候為我們死，神的愛就在此向我們顯明了。",
    en: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
  { ref: "Psalm 1:2", zhRef: "诗篇 1:2", twRef: "詩篇 1:2",
    zh: "惟喜爱耶和华的律法，昼夜思想，这人便为有福。",
    tw: "惟喜愛耶和華的律法，晝夜思想，這人便為有福。",
    en: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
  { ref: "1 Corinthians 13:13", zhRef: "哥林多前书 13:13", twRef: "哥林多前書 13:13",
    zh: "如今常存的有信，有望，有爱这三样，其中最大的是爱。",
    tw: "如今常存的有信，有望，有愛這三樣，其中最大的是愛。",
    en: "And now abideth faith, hope, charity, these three; but the greatest of these is charity." },
  { ref: "Revelation 21:4", zhRef: "启示录 21:4", twRef: "啟示錄 21:4",
    zh: "神要擦去他们一切的眼泪；不再有死亡，也不再有悲哀、哭号、疼痛，因为以前的事都过去了。",
    tw: "神要擦去他們一切的眼淚；不再有死亡，也不再有悲哀、哭號、疼痛，因為以前的事都過去了。",
    en: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
  { ref: "Psalm 90:12", zhRef: "诗篇 90:12", twRef: "詩篇 90:12",
    zh: "求你指教我们怎样数算自己的日子，好叫我们得着智慧的心。",
    tw: "求你指教我們怎樣數算自己的日子，好叫我們得著智慧的心。",
    en: "So teach us to number our days, that we may apply our hearts unto wisdom." },
];

/* Paths are relative: these are project Pages under the same domain. */
const TOOLS = [
  { id: "land", url: "/messiah-land-map/", name: "Messiah Land Map", featured: true, accent: "#e2c57b",
    alt: { zh: "弥赛亚之地", tw: "彌賽亞之地", en: "" },
    kind: { zh: "圣经地理", tw: "聖經地理", en: "BIBLICAL GEOGRAPHY" },
    tags: { zh: ["3D 地形", "福音书"], tw: ["3D 地形", "福音書"], en: ["3D terrain", "Gospels"] },
    desc: {
      zh: "第一世纪以色列的地形图，高程取自实测数据。平移、俯仰，把福音书的叙事放回它真实的距离和高差里。",
      tw: "第一世紀以色列的地形圖，高程取自實測資料。平移、俯仰，把福音書的敘事放回它真實的距離和高差裡。",
      en: "A relief map of first-century Israel built on measured elevation data. Pan and tilt the land, and read the Gospels against the distances and drops they happened in." } },
  { id: "sea", url: "/apostles-sea-map/", name: "Apostles Sea Map", accent: "#91a89f",
    alt: { zh: "直到地极", tw: "直到地極", en: "" },
    kind: { zh: "使徒行程", tw: "使徒行程", en: "APOSTOLIC JOURNEYS" },
    tags: { zh: ["63 地点", "4 段旅程"], tw: ["63 地點", "4 段旅程"], en: ["63 places", "4 journeys"] },
    desc: {
      zh: "使徒行传走过的那片海：63 个地点、四段宣教行程画在真实地形上，以及公元 50 年前后的罗马行省。",
      tw: "使徒行傳走過的那片海：63 個地點、四段宣教行程畫在真實地形上，以及公元 50 年前後的羅馬行省。",
      en: "The sea the book of Acts moves across: 63 places and four itineraries drawn over real terrain, with the Roman provinces as they stood around AD 50." } },
  { id: "worship", url: "/worship-wiki/", name: "Worship Wiki", accent: "#c8a75d",
    alt: { zh: "敬拜维基", tw: "敬拜維基", en: "" },
    kind: { zh: "敬拜预备", tw: "敬拜預備", en: "WORSHIP PLANNING" },
    tags: { zh: ["歌词投影", "多格式导出"], tw: ["歌詞投影", "多格式匯出"], en: ["Lyric slides", "Multi-export"] },
    desc: {
      zh: "给教会敬拜团队的歌词投影工具。建立并搜索曲库、自动分页、实时预览，导出 PowerPoint、Keynote 和 PDF。",
      tw: "給教會敬拜團隊的歌詞投影工具。建立並搜尋曲庫、自動分頁、即時預覽，匯出 PowerPoint、Keynote 和 PDF。",
      en: "Lyric slides for worship teams: build and search a song library, auto-paginate, preview live, and export PowerPoint, Keynote, and PDF." } },
  { id: "translation", url: "/inplace-translation/", name: "InPlace Translation", featured: true, accent: "#d8bd79",
    alt: { zh: "讲道翻译", tw: "講道翻譯", en: "" },
    kind: { zh: "实时讲道翻译", tw: "即時講道翻譯", en: "LIVE SERMON TRANSLATION" },
    tags: { zh: ["本地运行", "语音 + 字幕"], tw: ["本地運行", "語音 + 字幕"], en: ["Runs locally", "Voice + subtitles"] },
    desc: {
      zh: "在教会 Wi-Fi 上实时翻译讲道。访客扫码即可听到自己的语言并看到字幕；识别、翻译和语音合成都在一台 Mac 上本地运行，声音不出教会。",
      tw: "在教會 Wi-Fi 上即時翻譯講道。訪客掃描 QR Code 即可聽到自己的語言並看到字幕；辨識、翻譯和語音合成都在一台 Mac 上本地運行，聲音不出教會。",
      en: "Live sermon translation over church Wi-Fi. Visitors scan a QR code for translated audio and subtitles; recognition, translation, and speech all run locally on one Mac." } },
  { id: "festival", url: "/festival-games/", name: "Festival Games", accent: "#d39a6b",
    alt: { zh: "欢聚", tw: "歡聚", en: "" },
    kind: { zh: "节日破冰", tw: "節日破冰", en: "FESTIVAL ICEBREAKERS" },
    tags: { zh: ["4 个游戏", "投影即用"], tw: ["4 個遊戲", "投影即用"], en: ["4 games", "Projector-ready"] },
    desc: {
      zh: "给北美华人教会节日聚会的互动游戏，简繁英三语可切换：中秋抽卡、春节接福、元宵灯谜、家宴连线。一台接投影的电脑就能带，不收集任何参与者资料。",
      tw: "給北美華人教會節日聚會的互動遊戲，簡繁英三語可切換：中秋抽卡、春節接福、元宵燈謎、家宴連線。一台接投影的電腦就能帶，不收集任何參與者資料。",
      en: "Icebreakers for Chinese church festival gatherings in Simplified, Traditional, and English: Mid-Autumn prompt cards, Lunar New Year blessings, Lantern Festival riddles, and a potluck bingo. One laptop and a projector, no sign-ups, no data kept." } },
];

/* ------------------------------------------------------------------ state */

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem("slashai." + key); return v === null ? fallback : JSON.parse(v); }
    catch (_) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("slashai." + key, JSON.stringify(value)); } catch (_) { /* private mode */ }
  },
};

const pickLang = () => {
  const saved = store.get("lang", null);
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("zh")) return /hant|tw|hk|mo/.test(nav) ? "tw" : "zh";
  return "en";
};

const state = { lang: pickLang(), theme: store.get("theme", "auto"), verse: null };

const $ = (sel) => document.querySelector(sel);
const t = () => UI[state.lang];

/* ------------------------------------------------------------------ verse */

function verseOfToday() {
  const start = Date.UTC(new Date().getUTCFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start) / 86400000);
  return VERSES[day % VERSES.length];
}

function verseRef(v) {
  return state.lang === "zh" ? v.zhRef : state.lang === "tw" ? v.twRef : v.ref;
}

function renderVerse() {
  const v = state.verse;
  const box = $("#verse");
  if (!v) { box.hidden = true; return; }
  box.hidden = false;
  $("#versetext").textContent = v[state.lang];
  $("#verseref").textContent = verseRef(v);
  $("#verseshuffle").textContent = t().shuffle;
  $("#versecopy").textContent = t().copy;
  const open = $("#verseopen");
  open.textContent = t().open;
  const version = state.lang === "zh" ? "CUVS" : state.lang === "tw" ? "CUV" : "KJV";
  open.href = "https://www.biblegateway.com/passage/?search=" +
    encodeURIComponent(v.ref) + "&version=" + version;
}

/* ----------------------------------------------------------------- render */

function toolVisual(tool) {
  const bar = `<div class="window-top"><i></i><i></i><i></i><span>${tool.name.toUpperCase()}</span></div>`;
  if (tool.id === "land") {
    return `<div class="tool-window">${bar}<div class="mini-map">
      <span class="contour contour-a"></span><span class="contour contour-b"></span><span class="map-route"></span>
      <span class="map-label one">GALILEE</span><span class="map-label two">JUDEA</span><span class="map-label three">SAMARIA</span>
    </div></div>`;
  }
  if (tool.id === "sea") {
    return `<div class="tool-window">${bar}<div class="mini-sea">
      <span class="sea-coast a"></span><span class="sea-coast b"></span><span class="sea-route"></span>
      <span class="map-label one">ANTIOCH</span><span class="map-label two">ROME</span><span class="map-label three">EPHESUS</span>
    </div></div>`;
  }
  if (tool.id === "translation") {
    const first = state.lang === "en" ? "Turn with me to John chapter three." : state.lang === "tw" ? "請和我一起翻到約翰福音第三章。" : "请和我一起翻到约翰福音第三章。";
    const second = state.lang === "en" ? "For God so loved the world, that he gave his only Son." : state.lang === "tw" ? "神愛世人，甚至將他的獨生子賜給他們。" : "神爱世人，甚至将他的独生子赐给他们。";
    return `<div class="tool-window">${bar}<div class="translation-stage">
      <div class="translation-top"><span class="translation-live"><i></i> LIVE</span><span>24 LISTENING</span></div>
      <div class="translation-line past"><small>EN · PULPIT</small><p>“Turn with me to John chapter three.”</p><strong>${first}</strong></div>
      <div class="translation-line"><small>EN · PULPIT</small><p>“For God so loved the world, that he gave his only Son.”</p><strong>${second}</strong></div>
      <div class="translation-audio"><span>▶</span><span>PLAYING · ≈4S BEHIND</span></div>
    </div></div>`;
  }
  if (tool.id === "festival") {
    const prompt = state.lang === "en" ? "Who did you miss<br>this Mid-Autumn?" : state.lang === "tw" ? "今年中秋<br>你想念誰？" : "今年中秋<br>你想念谁？";
    return `<div class="tool-window">${bar}<div class="slide-stage">
      <div class="slide-rail"><span class="slide-thumb active"></span><span class="slide-thumb"></span><span class="slide-thumb"></span><span class="slide-thumb"></span></div>
      <div class="slide-canvas"><span>${prompt}</span></div><span class="slide-cursor"></span>
    </div></div>`;
  }
  const lyric = state.lang === "en" ? "Be Thou my vision<br>O Lord of my heart" : state.lang === "tw" ? "成為我異象<br>懇求心中王" : "成为我异象<br>恳求心中王";
  return `<div class="tool-window">${bar}<div class="slide-stage">
    <div class="slide-rail"><span class="slide-thumb active"></span><span class="slide-thumb"></span><span class="slide-thumb"></span></div>
    <div class="slide-canvas"><span>${lyric}</span></div><span class="slide-cursor"></span>
  </div></div>`;
}

function render() {
  const ui = t();
  document.documentElement.lang = ui.htmlLang;
  document.documentElement.dataset.lang = state.lang;

  document.title = state.lang === "en" ? "slashai.app | Open-source tools for Christians" : "slashai.app｜为教会而造的数字工具";
  $("#skiplink").textContent = ui.skip;
  $("#eyebrow").textContent = ui.eyebrow;
  $("#tagline").textContent = ui.tagline;
  $("#herosub").textContent = ui.herosub;
  $("#navtools").textContent = ui.navTools;
  $("#navverse").textContent = ui.navVerse;
  $("#explorelabel").textContent = ui.explore;
  $("#sourcelabel").textContent = ui.source;
  $("#collectionlabel").textContent = ui.collection;
  $("#tools-heading").textContent = ui.toolsHeading;
  $("#toolsintro").textContent = ui.toolsIntro;
  $("#verseheading").textContent = ui.verseHeading;
  $("#roadmaplabel").textContent = ui.roadmap;
  $("#coming-title").textContent = ui.comingTitle;
  $("#comingbody").textContent = ui.comingBody;
  $("#followlabel").textContent = ui.follow;
  $("#footnote").textContent = ui.footnote;
  $("#themebtn").title = ui.themeLabel;
  $("#themelabel").textContent = ui.themeLabel;

  $("#langseg").innerHTML = LANGS.map((l) =>
    `<button type="button" data-lang="${l}" aria-pressed="${l === state.lang}">${UI[l].langName}</button>`).join("");

  $("#tools").innerHTML = TOOLS.map((tool, index) => {
    const alt = tool.alt[state.lang] ? `<span class="zh-alt">${tool.alt[state.lang]}</span>` : "";
    const ink = tool.accent;
    return `<a class="card reveal${tool.featured ? " featured" : ""}" href="${tool.url}" target="_blank" rel="noopener"
        style="--card-accent:${tool.accent};--card-accent-ink:${ink};--card-dark:#061014" aria-label="${tool.name}${tool.alt[state.lang] ? ` — ${tool.alt[state.lang]}` : ""}">
        <div class="card-visual">${toolVisual(tool)}</div>
        <div class="card-content">
          <div class="card-meta"><span class="tool-no">0${index + 1}</span><span>${tool.kind[state.lang]}</span></div>
          <span class="name">${tool.name}${alt}</span>
          <span class="desc">${tool.desc[state.lang]}</span>
          <span class="card-foot"><span class="card-tags">${tool.tags[state.lang].map((tag) => `<span>${tag}</span>`).join("")}</span>
            <span class="card-arrow" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M6 14 14 6M8 6h6v6" /></svg></span>
          </span>
        </div>
      </a>`;
  }).join("");

  renderVerse();
}

/* ------------------------------------------------------------ interaction */

/* "auto" is what the rest of slashai.app stores, but this page has no
   prefers-color-scheme rules, so auto paints exactly like dark. Resolve it against the OS
   and always write an explicit theme, otherwise one click in three changes nothing. */
function shown() {
  if (state.theme !== "auto") return state.theme;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light" : "dark";
}

function applyTheme() {
  document.documentElement.dataset.theme = shown();
  document.querySelector('meta[name="theme-color"]').content =
    shown() === "light" ? "#f1eadb" : "#071013";
  $("#themebtn").dataset.mode = shown();
}

document.addEventListener("click", (event) => {
  const lang = event.target.closest("#langseg button");
  if (lang) { state.lang = lang.dataset.lang; store.set("lang", state.lang); render(); return; }

  if (event.target.closest("#themebtn")) {
    state.theme = shown() === "light" ? "dark" : "light";   // flip what is on screen, every time
    store.set("theme", state.theme);
    applyTheme();
    render();
  }
});

document.addEventListener("pointermove", (event) => {
  const card = event.target.closest(".card");
  if (!card || event.pointerType === "touch") return;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - box.left}px`);
  card.style.setProperty("--my", `${event.clientY - box.top}px`);
});

$("#verseshuffle").addEventListener("click", () => {
  let next = state.verse;
  while (next === state.verse && VERSES.length > 1) next = VERSES[Math.floor(Math.random() * VERSES.length)];
  state.verse = next;
  renderVerse();
});

$("#versecopy").addEventListener("click", async (event) => {
  const v = state.verse;
  const text = `${v[state.lang]}（${verseRef(v)}）`;
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }
  const button = event.target;
  button.textContent = t().copied;
  const toast = $("#toast");
  toast.textContent = t().copied;
  toast.classList.add("show");
  setTimeout(() => { button.textContent = t().copy; }, 1400);
  setTimeout(() => { toast.classList.remove("show"); }, 1600);
});

/* -------------------------------------------------------------------- boot */

state.verse = verseOfToday();
applyTheme();
render();
