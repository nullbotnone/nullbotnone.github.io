# slashai.app

The front door for the tools hosted under this account. Static: no build step,
no dependencies, no framework. GitHub Pages serves `main` as-is.

| File | What it holds |
| --- | --- |
| `index.html` | The page skeleton. Everything inside it is filled in by `app.js`. |
| `app.js` | UI strings (简/繁/EN), the verse list, the link catalogue, and all rendering. |
| `styles.css` | Warm-atlas palette, shared with the two map projects. Light and dark. |
| `selftest.sh` | Interaction self-check. Run it before pushing. |

## Adding a site

Append an entry to `LINKS` in `app.js`:

```js
{ cat: "study", name: "Site name", url: "https://example.org/", tags: "search keywords 中文关键词",
  desc: { zh: "一句话说清它有什么用。", tw: "一句話說清它有什麼用。", en: "One line on what it is for." } },
```

`cat` must match an id in `CATS`. `tags` is never displayed — it only widens
what the search box matches, so put the other language's words there.

**Check the URL resolves before committing it.** A dead card is worse than no
card. If a link rots, delete the line rather than leaving it up.

## Self-check

```sh
./selftest.sh
```

Builds a throwaway copy of `index.html` with the assertions injected, renders it
in headless Chrome, and prints one line per check. All 21 should say PASS.
Set `CHROME=` if Chrome is not in the usual place.

## Verses

和合本 and KJV, both public domain — which is exactly why those two are the
translations sitting in this repo.
