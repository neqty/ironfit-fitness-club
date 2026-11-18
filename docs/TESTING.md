# Verification record — 15 November 2026

Local HTTP preview in the Codex in-app browser. These are checks actually performed during modernization, not a claim of certification or cross-browser coverage.

## Browser scenarios — passed

- Sign Up: empty fields; invalid email and phone; short/weak password; non-matching confirmation; valid account creation; duplicate email rejected.
- Log In: incorrect credentials rejected; valid credentials accepted; email normalized without case sensitivity; redirect to Profile.
- Profile: correct demo name, email, phone and plan; reload keeps session; logout returns to Log In; opening Profile while logged out redirects.
- Navigation changes from Log In to Profile after successful login.
- Theme: light → dark and dark → light; navigation and reload retain choice. Mobile menu exposes theme/account actions.
- Programs: `bikes` gives one Cardio result; ArrowDown + Enter accepts suggestion; no-match query shows empty message; clearing restores all three cards.
- Contact: empty-field errors; valid enquiry saved locally; matching account sees the saved enquiry. No message is transmitted.
- About: FAQ expands. Home: carousel Next changes the active slide.
- Live weather: actual Open-Meteo response displayed temperature, WMO condition text, wind, timestamp and recommendation.
- Weather failure tests: a separate local QA fixture loaded the unmodified production `weather.js`, with controlled fetch failures. Loading sets aria-busy and disables Refresh; rejected request, HTTP 503 and malformed response show the error state and re-enable Refresh. Retrying after failure remains functional. The fixture is not part of the visitor site, and no synthetic weather is shipped as real data.
- Final browser console inspection returned no captured errors or warnings for the application tab.

## Responsive checks

Measured the DOM viewport and document scroll width at **390, 768, 1024 and 1440 CSS pixels** on all nine pages (Profile while signed in). Public pages were checked in both themes; Profile was checked in dark mode. The test runner accounted for the in-app browser's viewport scaling and verified actual `innerWidth`.

A 4 px overflow was found in Home, About and Contact at 390 px. Fixed the Bootstrap g-5 horizontal gutter to fit the mobile container, then verified those pages and the final light-theme matrix again. Final measured document widths equal viewport widths. Mobile menu interaction and representative desktop/mobile screenshots were visually reviewed.

## Source checks

- 9 HTML pages parsed with html5lib: no parse errors.
- 224 local HTML asset/navigation references resolved; no missing targets or anchor references.
- Unique IDs and label/ARIA reference targets checked.
- All forms use novalidate; prohibited native validation attributes and type=email absent.
- 7 application JavaScript files passed `node --check`.
- Custom stylesheet parsed with tinycss2 without syntax errors.
- Removed widget labels and obsolete script/style references checked.
- Original images retained; locally referenced image paths verified. Browser-loaded Home images decoded successfully.

## Boundaries and remaining work

- Not deployed. Live hosting, repository URL and production-host checks remain pending authorization.
- No claim of testing Safari, Firefox, physical devices or every accessibility criterion.
- Reduced-motion CSS is implemented and source-reviewed; OS-level motion preference was not changed during testing.
- API loading/failure/retry were tested in the browser using a QA fixture; live success used the real endpoint. The exact 12-second timeout expiry was not separately timed.
- Browser storage-denied error paths are implemented, but a browser-wide storage restriction was not imposed.
- Report screenshots are genuine local browser captures. Demo data belongs only to the test account; it is not preloaded in the deliverable.
- This static project does not send emails, accept payment or authenticate against a server. These are intentional simulation boundaries.

## Visual revision — 17 November 2026

- Replaced displayed images with supplied themed assets; original files retained.
- Carousel: Next, Previous, slide 9 indicator, last-to-first wraparound and ArrowRight verified in the browser.
- Six coach cards and their six different specialities verified.
- Home counter animation observed at intermediate values and at final 1,200+, 8, 6 and 40+ values.
- Home, Trainers, Contact, Programs and Pricing measured at 390, 768 and 1440 CSS px: no horizontal document overflow.
- Revised source check: 9 HTML pages, 249 local references, zero reported errors; all 8 application JS files passed syntax checks.
- New Home, statistics, trainers and gallery screenshots saved. Other screenshots and the broader authentication/API checks above are from the initial 15 November verification.
