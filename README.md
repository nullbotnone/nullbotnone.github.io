# slashai.app

The front door for the three tools hosted under this account. Static: no build
step, no dependencies, no framework. GitHub Pages serves `main` as-is.

| File | What it holds |
| --- | --- |
| `index.html` | Page skeleton. Everything inside it is filled in by `app.js`. |
| `app.js` | UI strings (简/繁/EN), the verse list, the three tool entries, and all rendering. |
| `styles.css` | Warm-atlas palette, shared with the two map projects. Light and dark. |
| `selftest.sh` | Interaction self-check. Run it before pushing. |

The page lists only the tools built here. It deliberately carries no directory
of outside sites — one of the self-checks fails if an external link shows up in
the body, the single exception being the verse's "read in context" link.

## Self-check

```sh
./selftest.sh
```

Builds a throwaway copy of `index.html` with the assertions injected, renders it
in headless Chrome, and prints one line per check. All 17 should say PASS.
Set `CHROME=` if Chrome is not in the usual place.

## Verses

和合本 and KJV, both public domain — which is exactly why those two are the
translations sitting in this repo.
