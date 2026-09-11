(function () {
  const out = [];
  const ok = (name, cond, extra) => out.push((cond ? "PASS " : "FAIL ") + name + (extra ? " :: " + extra : ""));
  const cards = () => document.querySelectorAll("#tools .card");
  const click = (el) => el.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  ok("renders exactly the four tools", cards().length === 4, "got " + cards().length);
  ok("links stay relative", Array.from(cards()).map((a) => a.getAttribute("href")).join(",")
     === "/messiah-land-map/,/apostles-sea-map/,/worship-wiki/,/inplace-translation/");
  ok("each opens a new tab",
     Array.from(cards()).every((a) => a.target === "_blank" && /noopener/.test(a.rel)));
  ok("outside links stay limited",
     !Array.from(document.querySelectorAll("main a")).some((a) => /^https?:/.test(a.getAttribute("href") || "")
       && !/biblegateway|github\.com\/nullbotnone/.test(a.href)), "only project source and verse context may leave");

  click(document.querySelector('#langseg button[data-lang="zh"]'));
  ok("switches to Simplified", /让信仰的故事/.test(document.getElementById("tagline").textContent));
  ok("html lang follows", document.documentElement.lang === "zh-CN", document.documentElement.lang);
  ok("card copy follows language", /第一世纪以色列/.test(document.getElementById("tools").textContent));
  click(document.querySelector('#langseg button[data-lang="tw"]'));
  ok("switches to Traditional", /讓信仰的故事/.test(document.getElementById("tagline").textContent));
  ok("alt names follow language", /彌賽亞之地/.test(document.getElementById("tools").textContent));
  click(document.querySelector('#langseg button[data-lang="en"]'));
  ok("switches to English", /See the story/.test(document.getElementById("tagline").textContent));
  ok("alt names drop in English", !/弥赛亚|彌賽亞/.test(document.getElementById("tools").textContent));
  ok("language persisted", JSON.parse(localStorage.getItem("slashai.lang")) === "en");

  const verse = document.getElementById("versetext").textContent;
  ok("verse rendered", verse.length > 5, verse.slice(0, 20));
  ok("verse ref matches language", /^[A-Za-z1-9]/.test(document.getElementById("verseref").textContent));
  ok("context link uses KJV for English", /version=KJV/.test(document.getElementById("verseopen").href));
  click(document.getElementById("verseshuffle"));
  ok("shuffle keeps a verse on screen", document.getElementById("versetext").textContent.length > 5);

  // compare what the page LOOKS like, not the attribute: with no attribute the page renders
  // the stylesheet's base theme, so "absent" and "dark" are the same picture and the old
  // three-state cycle passed an attribute comparison while one click in three painted nothing
  const osLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const appearance = () => document.documentElement.dataset.theme || (osLight ? "light" : "dark");
  const seen = [appearance()];
  for (let i = 0; i < 4; i++) { click(document.getElementById("themebtn")); seen.push(appearance()); }
  ok("every theme click changes the theme",
     seen.every((v, i) => i === 0 || v !== seen[i - 1]), seen.join(" -> "));

  document.title = out.join(" | ");
})();
