# slashai.app

The front door for the four tools hosted under this account. Static: no build
step, no dependencies, no framework. GitHub Pages serves `main` as-is.

| File | What it holds |
| --- | --- |
| `index.html` | The semantic page structure and interactive showcase surfaces. |
| `app.js` | UI strings (简/繁/EN), verses, tool data, rendering, and interactions. |
| `styles.css` | Responsive visual system, mini tool previews, motion, light and dark themes. |
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

## Licence

[Apache License 2.0](LICENSE), copyright 2026 Jie Li, for the code. The verse
text is public domain, as above. Keep the notice, state your changes, expect no
warranty.
