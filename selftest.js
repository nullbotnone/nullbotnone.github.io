(function () {
  const out = [];
  const ok = (name, cond, extra) => out.push((cond ? "PASS " : "FAIL ") + name + (extra ? " :: " + extra : ""));
  const n = () => document.querySelectorAll("#results .card").length;
  const click = (el) => el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const key = (k) => document.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));

  ok("renders all entries", n() === 35, "got " + n());

  // language switch
  click(document.querySelector('#langseg button[data-lang="zh"]'));
  const zh = document.getElementById("tagline").textContent;
  ok("switches to Simplified", /圣经地图/.test(zh), zh.slice(0, 12));
  ok("html lang follows", document.documentElement.lang === "zh-CN", document.documentElement.lang);
  click(document.querySelector('#langseg button[data-lang="tw"]'));
  ok("switches to Traditional", /聖經地圖/.test(document.getElementById("tagline").textContent));
  click(document.querySelector('#langseg button[data-lang="zh"]'));

  // search, in Chinese, across tags
  const q = document.getElementById("q");
  q.value = "地图"; q.dispatchEvent(new Event("input", { bubbles: true }));
  const hits = n();
  ok("search narrows", hits > 0 && hits < 35, "hits " + hits);
  ok("search finds both maps", /Messiah Land Map/.test(document.getElementById("results").innerHTML)
     && /Apostles Sea Map/.test(document.getElementById("results").innerHTML));
  // search by English tag while UI is Chinese
  q.value = "strongs"; q.dispatchEvent(new Event("input", { bubbles: true }));
  ok("search crosses languages", /Blue Letter Bible/.test(document.getElementById("results").innerHTML), "n=" + n());
  key("Escape");
  ok("escape clears search", n() === 35, "got " + n());

  // favourites
  const star = document.querySelector('.fav[data-key="https://hymnary.org/"]');
  click(star);
  ok("fav chip appears", !!document.querySelector('.chip[data-cat="fav"]'));
  ok("pinned group rendered", /★/.test(document.querySelector(".group-head h2").textContent));
  ok("fav persisted", JSON.parse(localStorage.getItem("slashai.favs")).includes("https://hymnary.org/"));
  click(document.querySelector('.chip[data-cat="fav"]'));
  ok("fav filter shows one", n() === 1, "got " + n());
  // unstar the last favourite while the fav filter is active
  click(document.querySelector(".fav"));
  ok("recovers from empty favs", n() === 35, "got " + n());
  ok("fav chip gone", !document.querySelector('.chip[data-cat="fav"]'));

  // category filter
  click(document.querySelector('.chip[data-cat="own"]'));
  ok("own filter shows three", n() === 3, "got " + n());
  ok("own cards keep relative urls", document.querySelector("#results .card").getAttribute("href") === "/messiah-land-map/");
  ok("every card opens a new tab",
     Array.from(document.querySelectorAll("#results .card")).every((a) => a.target === "_blank" && /noopener/.test(a.rel)));
  click(document.querySelector('.chip[data-cat="worship"]'));
  ok("worship filter", n() === 5, "got " + n());
  click(document.querySelector('.chip[data-cat="all"]'));

  // keyboard navigation
  key("ArrowDown"); key("ArrowDown");
  ok("arrow keys move focus", document.querySelectorAll("#results .card.active").length === 1);

  // theme
  const before = document.documentElement.dataset.theme;
  click(document.getElementById("themebtn"));
  ok("theme toggles", document.documentElement.dataset.theme !== before,
     String(before) + " -> " + String(document.documentElement.dataset.theme));

  // passage jump builds a Bible Gateway url rather than navigating
  let opened = "";
  window.open = (u) => { opened = u; return null; };
  document.getElementById("jumpq").value = "约 3:16";
  document.getElementById("jump").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  ok("jump builds search url", opened.startsWith("https://www.biblegateway.com/passage/?search=") && /version=CUVS/.test(opened), opened.slice(0, 78));

  // verse shuffle keeps a verse on screen
  click(document.getElementById("verseshuffle"));
  ok("shuffle keeps text", document.getElementById("versetext").textContent.length > 5);

  document.title = out.join(" | ");
})();
