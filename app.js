/* slashai.app — a front door for the three in-house tools plus the outside
   sites worth keeping a shortcut to. No framework, no build step: the whole
   thing is this file, rendered into index.html at load. */

const LANGS = ["zh", "tw", "en"];

const UI = {
  zh: {
    langName: "简", htmlLang: "zh-CN",
    tagline: "圣经地图、原文工具与敬拜资源，收在一个地方。",
    herosub: "三个自制的开源工具，加上三十来个用得上的外部站点。全部在浏览器里打开，不需要登录这个页面。",
    jumpLabel: "快速查经文",
    jumpPlaceholder: "约 3:16、诗篇 23、John 3:16",
    jumpGo: "打开",
    jumpHint: "交给 Bible Gateway 解析，中英文书卷名都认得。",
    searchPlaceholder: "搜索工具、网站、用途…… 按 / 聚焦",
    all: "全部",
    favs: "常用",
    own: "本站工具",
    empty: "没有匹配的条目。换个词试试，或者清掉筛选。",
    shuffle: "换一节",
    copy: "复制",
    copied: "已复制",
    open: "读上下文",
    footnote: "经文为和合本与 KJV，均属公有领域。外部链接与本站无关，仅作指路。",
    suggest: "建议新增站点",
    themeLabel: "切换主题",
  },
  tw: {
    langName: "繁", htmlLang: "zh-TW",
    tagline: "聖經地圖、原文工具與敬拜資源，收在一個地方。",
    herosub: "三個自製的開源工具，加上三十來個用得上的外部站點。全部在瀏覽器裡打開，不需要登入這個頁面。",
    jumpLabel: "快速查經文",
    jumpPlaceholder: "約 3:16、詩篇 23、John 3:16",
    jumpGo: "開啟",
    jumpHint: "交給 Bible Gateway 解析，中英文書卷名都認得。",
    searchPlaceholder: "搜尋工具、網站、用途…… 按 / 聚焦",
    all: "全部",
    favs: "常用",
    own: "本站工具",
    empty: "沒有符合的條目。換個詞試試，或者清掉篩選。",
    shuffle: "換一節",
    copy: "複製",
    copied: "已複製",
    open: "讀上下文",
    footnote: "經文為和合本與 KJV，均屬公有領域。外部連結與本站無關，僅作指路。",
    suggest: "建議新增站點",
    themeLabel: "切換主題",
  },
  en: {
    langName: "EN", htmlLang: "en",
    tagline: "Bible maps, original-language tools, and worship resources in one place.",
    herosub: "Three open-source tools built here, plus thirty-odd outside sites worth a shortcut. Everything runs in the browser; this page asks for no login.",
    jumpLabel: "Jump to a passage",
    jumpPlaceholder: "John 3:16, Psalm 23, 约 3:16",
    jumpGo: "Open",
    jumpHint: "Bible Gateway does the parsing — it reads Chinese and English book names alike.",
    searchPlaceholder: "Search tools, sites, purposes… press / to focus",
    all: "All",
    favs: "Pinned",
    own: "Built here",
    empty: "Nothing matches. Try another word, or clear the filter.",
    shuffle: "Another",
    copy: "Copy",
    copied: "Copied",
    open: "Read in context",
    footnote: "Verses are CUV and KJV, both public domain. Outside links are unaffiliated — just signposts.",
    suggest: "Suggest a site",
    themeLabel: "Toggle theme",
  },
};

const CATS = [
  { id: "read",    zh: "读经",     tw: "讀經",     en: "Read" },
  { id: "original",zh: "原文",     tw: "原文",     en: "Original languages" },
  { id: "study",   zh: "查经装备", tw: "查經裝備", en: "Study" },
  { id: "geo",     zh: "地理历史", tw: "地理歷史", en: "Geography" },
  { id: "worship", zh: "敬拜诗歌", tw: "敬拜詩歌", en: "Worship" },
  { id: "media",   zh: "影音广播", tw: "影音廣播", en: "Media" },
];

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

/* The three tools built here. Paths are relative: these are project Pages
   sitting under the same domain as this page. */
const OWN = [
  { id: "messiah", url: "/messiah-land-map/", name: "Messiah Land Map", alt: { zh: "弥赛亚之地", tw: "彌賽亞之地", en: "" },
    tags: "map israel galilee terrain 地图 地形 以色列 加利利 福音书",
    desc: {
      zh: "第一世纪以色列的地形图，高程取自实测数据。把福音书的叙事放回它真实的距离和高差里。",
      tw: "第一世紀以色列的地形圖，高程取自實測資料。把福音書的敘事放回它真實的距離和高差裡。",
      en: "A relief map of first-century Israel on measured elevation data — the Gospels at their true distances and drops." } },
  { id: "apostles", url: "/apostles-sea-map/", name: "Apostles Sea Map", alt: { zh: "直到地极", tw: "直到地極", en: "" },
    tags: "map acts paul journeys rome 地图 使徒行传 保罗 宣教 罗马",
    desc: {
      zh: "使徒行传走过的那片海：63 个地点、四段宣教行程，以及公元 50 年前后的罗马行省。",
      tw: "使徒行傳走過的那片海：63 個地點、四段宣教行程，以及公元 50 年前後的羅馬行省。",
      en: "The sea Acts moves across: 63 places, four journeys, and the Roman provinces as they stood around AD 50." } },
  { id: "worship", url: "/worship-wiki/", name: "Worship Wiki", alt: { zh: "敬拜维基", tw: "敬拜維基", en: "" },
    tags: "lyrics slides ppt pptx keynote pdf 歌词 投影 诗歌 主日 敬拜团",
    desc: {
      zh: "歌词投影工具。建立曲库、自动分页、实时预览，导出 PowerPoint、Keynote 和 PDF。",
      tw: "歌詞投影工具。建立曲庫、自動分頁、即時預覽，匯出 PowerPoint、Keynote 和 PDF。",
      en: "Lyric slides for worship teams: a shared song library, auto-pagination, live preview, PowerPoint/Keynote/PDF export." } },
];

/* Outside sites. Every URL here was checked before it went in; if one rots,
   delete the line rather than leaving a dead card on the page. */
const LINKS = [
  // ---- read ----
  { cat: "read", name: "YouVersion 圣经", url: "https://www.bible.com/", tags: "bible app reading plan 读经 计划 手机",
    desc: { zh: "最常见的读经 App，几千种译本，读经计划做得最全。", tw: "最常見的讀經 App，幾千種譯本，讀經計劃做得最全。", en: "The ubiquitous Bible app — thousands of versions, the deepest bench of reading plans." } },
  { cat: "read", name: "Bible Gateway", url: "https://www.biblegateway.com/", tags: "search passage version 经文 搜索 译本 对照",
    desc: { zh: "按关键词或经节查，多译本并排对照，本页的快速查经文就交给它。", tw: "按關鍵詞或經節查，多譯本並排對照，本頁的快速查經文就交給它。", en: "Search by word or reference, compare versions side by side. The jump box above hands off to it." } },
  { cat: "read", name: "信望愛聖經工具", url: "https://bible.fhl.net/", tags: "fhl chinese 中文 繁体 和合本 字典",
    desc: { zh: "华人教会用了二十多年的老站，中文译本、字典、注释都在里面。", tw: "華人教會用了二十多年的老站，中文譯本、字典、註釋都在裡面。", en: "A two-decade institution in Chinese churches: versions, lexicons, and commentary in one place." } },
  { cat: "read", name: "中文聖經網", url: "https://cnbible.com/", tags: "chinese bible parallel 中英对照 和合本 新译本",
    desc: { zh: "中英对照读经，和合本、新译本与英文译本并排。", tw: "中英對照讀經，和合本、新譯本與英文譯本並排。", en: "Chinese–English parallel reading: CUV, CNV, and the major English versions in columns." } },
  { cat: "read", name: "微读圣经", url: "https://wd.bible/", tags: "chinese app reading 中文 读经 笔记",
    desc: { zh: "中文读经 App 的网页版，笔记和读经计划同步。", tw: "中文讀經 App 的網頁版，筆記和讀經計劃同步。", en: "The web face of a popular Chinese reading app; notes and plans sync across devices." } },
  { cat: "read", name: "NET Bible", url: "https://netbible.org/", tags: "notes translation footnotes 注释 译注",
    desc: { zh: "六万条译注是它的真正价值，译者把每个取舍都写出来了。", tw: "六萬條譯註是它的真正價值，譯者把每個取捨都寫出來了。", en: "Its 60,000 translators' notes are the point — every rendering decision, argued in the open." } },
  { cat: "read", name: "ESV.org", url: "https://www.esv.org/", tags: "esv english reading audio 英文",
    desc: { zh: "ESV 官方在线版，排版干净，带朗读。", tw: "ESV 官方線上版，排版乾淨，帶朗讀。", en: "The official ESV reader — clean typography, audio, and a usable study layer." } },
  { cat: "read", name: "eBible", url: "https://ebible.org/", tags: "download offline languages 下载 离线 多语",
    desc: { zh: "上千种语言的圣经文本，可整本下载离线用。", tw: "上千種語言的聖經文本，可整本下載離線用。", en: "Public-domain and freely licensed Bibles in over a thousand languages, downloadable whole." } },

  // ---- original languages ----
  { cat: "original", name: "Blue Letter Bible", url: "https://www.blueletterbible.org/", tags: "strongs greek hebrew interlinear 原文 字义 编号",
    desc: { zh: "Strong 编号查原文字义，逐字对照，免费且没有门槛。", tw: "Strong 編號查原文字義，逐字對照，免費且沒有門檻。", en: "Strong's numbers, interlinears, and lexicons — free, and the gentlest on-ramp to the original text." } },
  { cat: "original", name: "STEP Bible", url: "https://www.stepbible.org/", tags: "tyndale greek hebrew parallel 原文 剑桥",
    desc: { zh: "丁道尔研经工具做的，原文与多译本任意组合并排。", tw: "丁道爾研經工具做的，原文與多譯本任意組合並排。", en: "From Tyndale House, Cambridge: stack any combination of originals and versions in parallel columns." } },
  { cat: "original", name: "Bible Hub", url: "https://biblehub.com/", tags: "interlinear commentary parallel 逐字 注释 汇编",
    desc: { zh: "逐字对照加历代注释汇编，查一节经文的老注解最快。", tw: "逐字對照加歷代註釋彙編，查一節經文的老註解最快。", en: "Interlinear plus a century of public-domain commentary, aggregated verse by verse." } },
  { cat: "original", name: "CBOL 原文聖經", url: "https://cbol.fhl.net/", tags: "fhl greek hebrew chinese 原文 中文 信望爱",
    desc: { zh: "信望愛的原文工具，希腊文希伯来文的中文解析，华人做的少有的好东西。", tw: "信望愛的原文工具，希臘文希伯來文的中文解析，華人做的少有的好東西。", en: "Greek and Hebrew parsing explained in Chinese — rare, and done properly." } },
  { cat: "original", name: "Sefaria", url: "https://www.sefaria.org/", tags: "hebrew talmud jewish midrash 犹太 希伯来 塔木德",
    desc: { zh: "犹太教典籍全文库，读旧约背景和第二圣殿时期语境用得上。", tw: "猶太教典籍全文庫，讀舊約背景和第二聖殿時期語境用得上。", en: "The open library of Jewish texts — invaluable for Second Temple background to the Old Testament." } },

  // ---- study ----
  { cat: "study", name: "BibleProject", url: "https://bibleproject.com/", tags: "video animation theme chinese 视频 主题 动画 中文",
    desc: { zh: "动画短片讲每卷书的结构和主题，有中文字幕，适合带查经。", tw: "動畫短片講每卷書的結構和主題，有中文字幕，適合帶查經。", en: "Animated shorts on the shape and themes of each book — Chinese subtitles, and good small-group fuel." } },
  { cat: "study", name: "Enduring Word", url: "https://enduringword.com/", tags: "commentary guzik verse 注释 逐节",
    desc: { zh: "David Guzik 的逐节注释，全本免费，讲道备课常用。", tw: "David Guzik 的逐節註釋，全本免費，講道備課常用。", en: "David Guzik's verse-by-verse commentary on the whole Bible, free — a sermon-prep workhorse." } },
  { cat: "study", name: "Third Millennium", url: "https://thirdmill.org/", tags: "seminary course free chinese 神学 课程 免费 中文",
    desc: { zh: "免费神学课程，有完整中文版，系统神学和释经都齐。", tw: "免費神學課程，有完整中文版，系統神學和釋經都齊。", en: "A full free seminary curriculum, Chinese included — systematics through hermeneutics." } },
  { cat: "study", name: "CCEL", url: "https://www.ccel.org/", tags: "classics augustine calvin public domain 经典 教父",
    desc: { zh: "基督教经典电子图书馆，教父到清教徒的著作全文。", tw: "基督教經典電子圖書館，教父到清教徒的著作全文。", en: "The Christian Classics Ethereal Library: the Fathers through the Puritans, full text." } },
  { cat: "study", name: "中文查經資料", url: "https://www.ccbiblestudy.net/", tags: "chinese study notes 查经 讲章 资料",
    desc: { zh: "华人教会的查经讲章资料库，按卷按章整理。", tw: "華人教會的查經講章資料庫，按卷按章整理。", en: "A Chinese-church archive of study notes and sermon material, arranged book by book." } },
  { cat: "study", name: "The Gospel Coalition", url: "https://www.thegospelcoalition.org/", tags: "articles theology reformed 文章 神学",
    desc: { zh: "福音联盟的文章与书评，看当代教会在想什么。", tw: "福音聯盟的文章與書評，看當代教會在想什麼。", en: "Essays, reviews, and course material — a read on what the contemporary church is arguing about." } },
  { cat: "study", name: "Desiring God", url: "https://www.desiringgod.org/", tags: "piper sermons devotional 讲道 灵修",
    desc: { zh: "John Piper 三十多年的讲道与文章，全部免费。", tw: "John Piper 三十多年的講道與文章，全部免費。", en: "Three decades of John Piper's sermons and writing, all free." } },
  { cat: "study", name: "OpenBible 主题查经", url: "https://www.openbible.info/", tags: "topical labs topics 主题 检索",
    desc: { zh: "按主题检索经文，排序是读者投票出来的，找相关经文很快。", tw: "按主題檢索經文，排序是讀者投票出來的，找相關經文很快。", en: "Topical verse search ranked by reader votes — the fastest way to a related-passage list." } },

  // ---- geography & history ----
  { cat: "geo", name: "OpenBible Geocoding", url: "https://www.openbible.info/geo/", tags: "atlas coordinates places 坐标 地名 地图",
    desc: { zh: "圣经地名的经纬度数据库，可下载，做地图的原始材料。", tw: "聖經地名的經緯度資料庫，可下載，做地圖的原始材料。", en: "Coordinates for biblical place names, downloadable — raw material for anyone building a map." } },
  { cat: "geo", name: "Bible Mapper", url: "https://biblemapper.com/", tags: "maps atlas download 地图 图集",
    desc: { zh: "免费的圣经地图集与制图软件，地图可直接用在讲义里。", tw: "免費的聖經地圖集與製圖軟體，地圖可直接用在講義裡。", en: "A free biblical atlas and mapping program; the maps drop straight into handouts." } },
  { cat: "geo", name: "Bible History", url: "https://bible-history.com/", tags: "archaeology timeline ancient 考古 年表 历史",
    desc: { zh: "考古、年表与古代近东背景资料，图多。", tw: "考古、年表與古代近東背景資料，圖多。", en: "Archaeology, timelines, and ancient Near East background, heavily illustrated." } },

  // ---- worship ----
  { cat: "worship", name: "Hymnary.org", url: "https://hymnary.org/", tags: "hymn score public domain 圣诗 乐谱 公有领域",
    desc: { zh: "圣诗数据库，词曲来源、乐谱与版权状态都查得到。", tw: "聖詩資料庫，詞曲來源、樂譜與版權狀態都查得到。", en: "The hymn database: authorship, scores, tune histories, and copyright status." } },
  { cat: "worship", name: "Hymnal.net", url: "https://www.hymnal.net/", tags: "chinese hymn audio 中文 诗歌 伴奏",
    desc: { zh: "中英文诗歌，带乐谱与伴奏音轨，中文诗歌收得很全。", tw: "中英文詩歌，帶樂譜與伴奏音軌，中文詩歌收得很全。", en: "Hymns in Chinese and English with scores and backing tracks — unusually strong on Chinese repertoire." } },
  { cat: "worship", name: "讚美之泉", url: "https://sop.org/", tags: "stream of praise chinese worship 中文 敬拜 赞美之泉",
    desc: { zh: "赞美之泉的官方站，中文敬拜歌曲的乐谱与资源。", tw: "讚美之泉的官方站，中文敬拜歌曲的樂譜與資源。", en: "Stream of Praise — sheet music and resources for the Chinese worship repertoire." } },
  { cat: "worship", name: "CCLI SongSelect", url: "https://songselect.ccli.com/", tags: "license chord chart lyrics 版权 和弦 授权",
    desc: { zh: "查歌曲版权与授权，下载和弦谱，教会投影合规要用。", tw: "查歌曲版權與授權，下載和弦譜，教會投影合規要用。", en: "Licensing lookup and chord charts — the compliance side of projecting lyrics on Sunday." } },
  { cat: "worship", name: "WorshipTogether", url: "https://www.worshiptogether.com/", tags: "chord charts new songs 和弦 新歌",
    desc: { zh: "英文敬拜新歌的和弦谱与教学视频。", tw: "英文敬拜新歌的和弦譜與教學影片。", en: "Chord charts and tutorials for new English worship songs." } },

  // ---- media ----
  { cat: "media", name: "JESUS Film", url: "https://www.jesusfilm.org/", tags: "film languages evangelism 福音 影片 多语",
    desc: { zh: "路加福音改编的影片，两千多种语言配音，传福音常用。", tw: "路加福音改編的影片，兩千多種語言配音，傳福音常用。", en: "The Luke-based film dubbed into over two thousand languages — a standard evangelistic tool." } },
  { cat: "media", name: "良友電台", url: "https://rtv.org.tw/", tags: "radio chinese broadcast 广播 中文 灵修",
    desc: { zh: "中文基督教广播，灵修节目与圣经讲解可在线收听。", tw: "中文基督教廣播，靈修節目與聖經講解可線上收聽。", en: "Chinese-language Christian radio: devotionals and Bible teaching, streamable." } },
  { cat: "media", name: "YouVersion 读经计划", url: "https://www.bible.com/reading-plans", tags: "plan devotional schedule 计划 灵修 进度",
    desc: { zh: "上万个读经计划，一年通读到三天主题灵修都有。", tw: "上萬個讀經計劃，一年通讀到三天主題靈修都有。", en: "Thousands of plans, from a year through the whole Bible to a three-day topical devotional." } },
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

const state = {
  lang: pickLang(),
  theme: store.get("theme", "auto"),
  cat: "all",
  q: "",
  favs: new Set(store.get("favs", [])),
  verse: null,
};

const $ = (sel) => document.querySelector(sel);
const t = () => UI[state.lang];
const keyOf = (item) => item.url;

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

function matches(item, needle) {
  if (!needle) return true;
  const hay = [
    item.name || "",
    item.alt ? Object.values(item.alt).join(" ") : "",
    Object.values(item.desc).join(" "),
    item.tags || "",
    item.url,
  ].join(" ").toLowerCase();
  return needle.split(/\s+/).filter(Boolean).every((word) => hay.includes(word));
}

function cardHtml(item) {
  const fav = state.favs.has(keyOf(item));
  const external = /^https?:/.test(item.url);
  const alt = item.alt && item.alt[state.lang] ? item.alt[state.lang] : "";
  const host = external ? new URL(item.url).hostname.replace(/^www\./, "") : "";
  return `
    <a class="card" href="${item.url}"${external ? ' target="_blank" rel="noopener"' : ""} data-key="${item.url}">
      <span class="name">${item.name}${alt ? `<span class="zh-alt">${alt}</span>` : ""}${external ? '<span class="ext">↗</span>' : ""}</span>
      <span class="desc">${item.desc[state.lang]}</span>
      ${host ? `<span class="host">${host}</span>` : ""}
    </a>
    <button class="fav" type="button" data-key="${item.url}" aria-pressed="${fav}" title="${t().favs}">${fav ? "★" : "☆"}</button>`;
}

function groupHtml(title, items, isOwn) {
  if (!items.length) return "";
  // Each card is an <a> with a sibling <button>; wrapping both in a relative
  // cell keeps the star clickable without nesting a button inside a link.
  const cells = items.map((item) => `<div class="cell">${cardHtml(item)}</div>`).join("");
  return `<section class="group">
      <div class="group-head"><h2>${title}</h2><span class="count">${items.length}</span></div>
      <div class="grid${isOwn ? " own" : ""}">${cells}</div>
    </section>`;
}

function render() {
  const ui = t();
  document.documentElement.lang = ui.htmlLang;
  document.documentElement.dataset.lang = state.lang;

  $("#tagline").textContent = ui.tagline;
  $("#herosub").textContent = ui.herosub;
  $("#jumplabel").textContent = ui.jumpLabel;
  $("#jumpq").placeholder = ui.jumpPlaceholder;
  $("#jumpgo").textContent = ui.jumpGo;
  $("#jumphint").textContent = ui.jumpHint;
  $("#q").placeholder = ui.searchPlaceholder;
  $("#footnote").textContent = ui.footnote;
  $("#suggest").textContent = ui.suggest;
  $("#themebtn").title = ui.themeLabel;
  $("#themebtn").textContent = state.theme === "auto" ? "◐" : state.theme === "dark" ? "☾" : "☀";

  // The version follows the interface language until the reader overrides it;
  // after that it is their choice, not ours.
  if (!versionTouched) $("#jumpv").value = defaultVersion();

  $("#langseg").innerHTML = LANGS.map((l) =>
    `<button type="button" data-lang="${l}" aria-pressed="${l === state.lang}">${UI[l].langName}</button>`).join("");

  $("#chips").innerHTML =
    `<button class="chip" data-cat="all" aria-pressed="${state.cat === "all"}">${ui.all}</button>` +
    (state.favs.size ? `<button class="chip" data-cat="fav" aria-pressed="${state.cat === "fav"}">★ ${ui.favs}</button>` : "") +
    `<button class="chip" data-cat="own" aria-pressed="${state.cat === "own"}">${ui.own}</button>` +
    CATS.map((c) => `<button class="chip" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c[state.lang]}</button>`).join("");

  if (state.cat === "fav" && !state.favs.size) state.cat = "all";

  const needle = state.q.trim().toLowerCase();
  const own = OWN.filter((i) => matches(i, needle));
  const ext = LINKS.filter((i) => matches(i, needle));
  const isFav = (i) => state.favs.has(keyOf(i));

  let html = "";
  if (state.cat === "fav") {
    html = groupHtml("★ " + ui.favs, own.filter(isFav).concat(ext.filter(isFav)), false);
  } else if (state.cat === "own") {
    html = groupHtml(ui.own, own, true);
  } else {
    const pinnedExt = ext.filter(isFav);
    const pinnedOwn = own.filter(isFav);
    if (!needle && (pinnedExt.length || pinnedOwn.length) && state.cat === "all") {
      html += groupHtml("★ " + ui.favs, pinnedOwn.concat(pinnedExt), false);
    }
    if (state.cat === "all") html += groupHtml(ui.own, own, true);
    for (const c of CATS) {
      if (state.cat !== "all" && state.cat !== c.id) continue;
      html += groupHtml(c[state.lang], ext.filter((i) => i.cat === c.id), false);
    }
  }

  $("#results").innerHTML = html;
  const none = !html;
  $("#empty").hidden = !none;
  $("#empty").textContent = ui.empty;
  active = -1;
  renderVerse();
}

/* ------------------------------------------------------------ interaction */

let active = -1;
let versionTouched = false;
const cards = () => Array.from(document.querySelectorAll("#results .card"));
const defaultVersion = () => (state.lang === "tw" ? "CUV" : state.lang === "en" ? "ESV" : "CUVS");

function setActive(next) {
  const list = cards();
  if (!list.length) return;
  list.forEach((c) => c.classList.remove("active"));
  active = (next + list.length) % list.length;
  const el = list[active];
  el.classList.add("active");
  el.scrollIntoView({ block: "nearest" });
}

document.addEventListener("click", (event) => {
  const fav = event.target.closest(".fav");
  if (fav) {
    const key = fav.dataset.key;
    state.favs.has(key) ? state.favs.delete(key) : state.favs.add(key);
    store.set("favs", Array.from(state.favs));
    render();
    return;
  }
  const lang = event.target.closest("#langseg button");
  if (lang) { state.lang = lang.dataset.lang; store.set("lang", state.lang); render(); return; }

  const chip = event.target.closest(".chip");
  if (chip) { state.cat = chip.dataset.cat; render(); return; }

  if (event.target.closest("#themebtn")) {
    const order = ["auto", "light", "dark"];
    state.theme = order[(order.indexOf(state.theme) + 1) % order.length];
    store.set("theme", state.theme);
    applyTheme();
    render();
  }
});

function applyTheme() {
  if (state.theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = state.theme;
}

$("#q").addEventListener("input", (event) => { state.q = event.target.value; render(); });

document.addEventListener("keydown", (event) => {
  const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName);
  if (event.key === "/" && !typing) { event.preventDefault(); $("#q").focus(); return; }
  if (event.key === "Escape") {
    if (state.q) { state.q = ""; $("#q").value = ""; render(); }
    $("#q").blur();
    return;
  }
  if (typing && event.target.id !== "q") return;
  if (event.key === "ArrowDown") { event.preventDefault(); setActive(active + 1); }
  else if (event.key === "ArrowUp") { event.preventDefault(); setActive(active - 1); }
  else if (event.key === "Enter" && active >= 0) { const el = cards()[active]; if (el) el.click(); }
});

$("#jumpv").addEventListener("change", () => { versionTouched = true; });

$("#jump").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#jumpq").value.trim();
  if (!query) return;
  const url = "https://www.biblegateway.com/passage/?search=" +
    encodeURIComponent(query) + "&version=" + $("#jumpv").value;
  window.open(url, "_blank", "noopener");
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
  try { await navigator.clipboard.writeText(text); } catch (_) { return; }
  const button = event.target;
  button.textContent = t().copied;
  setTimeout(() => { button.textContent = t().copy; }, 1400);
});

/* -------------------------------------------------------------------- boot */

$("#jumpv").innerHTML = [
  ["CUVS", "和合本（简）"], ["CUV", "和合本（繁）"], ["CNVS", "新译本"],
  ["ESV", "ESV"], ["NIV", "NIV"], ["KJV", "KJV"],
].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");

state.verse = verseOfToday();
applyTheme();
render();
