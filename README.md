# IRONFIT Fitness Club — Final Project

SE-2516 · Балагазы Абылайхан · Құралбай Ерасыл · Еркінбек Арсен

Modernized from the supplied Assignment 6 project. The six original pages, program descriptions and membership prices are preserved. Displayed photography uses the user-supplied themed images; original assets remain in the folder. This is a concept club and browser-only student project, not a commercial service.

## Run locally

From this folder, run `python3 -m http.server 8000`, then open http://localhost:8000 in a browser. No npm install or build is needed. Use localhost or HTTPS: the demo password digest uses Web Crypto. Opening HTML directly with file:// is not a supported authentication test.

## Pages and code

- `index.html`: IRONFIT logo hero, animated concept statistics, services and nine-slide gallery; live Astana outdoor workout weather and Sign Up CTA.
- `about.html`: original story, team and working FAQ.
- `programs.html`: original Strength, Cardio and Group Fitness cards; Assignment 6 search migrated to vanilla JS, retaining keyboard suggestions and safe highlighting.
- `trainers.html`: six fictional coaches: strength, cardio, functional training, yoga, boxing and Pilates, using the supplied portraits.
- `pricing.html`: Basic 15,000 ₸, Standard 25,000 ₸, Premium 40,000 ₸; original access/session details, one membership CTA below cards.
- `contact.html`: JavaScript-validated local enquiry with name, email, phone, plan, preferred time and message. Nothing is sent.
- `signup.html`, `login.html`, `profile.html`: demo registration, credential checking, persistent profile and logout.
- `css/style.css`: responsive layout, shared CSS variables, themes and reduced-motion handling.
- `js/theme.js`: applies persisted theme before paint.
- `js/site.js`: storage helpers, navbar session state and theme switch.
- `js/forms.js`: shared JavaScript validation and local enquiries.
- `js/auth.js`: account and session simulation.
- `js/programs.js`, `js/about.js`, `js/weather.js`: page features.
- `js/home.js`: one-time count-up statistics with reduced-motion support and accessible carousel status.
- `css/vendor`, `js/vendor`: bundled Bootstrap from the original project. No CDN required for site layout.
- `images`: user-supplied logo, themed club photographs and six portraits; original project images retained.
- `docs`: presentation plan, testing notes and actual browser screenshots.

Bootstrap Grid, CSS Grid and Flexbox are all used. jQuery was removed after migrating the useful search behavior; no remaining code depends on it. Old Assignment 4–6 demonstrations, exercise counters, clocks, popup, dropdown filters and their scripts/styles were removed.

## Demo account and storage

Create a new account using demonstration details, e.g. `demo.member@example.com` / `DemoFit!26` / `+7 700 123 45 67`. These credentials are examples, not a preloaded account. Sign Up redirects to Log In, which redirects to Profile. Another browser/origin has separate storage.

Password rules: 8+ characters, uppercase, lowercase, number and symbol. Confirmation must match. Email format and 10–15 digit phone format are checked in JavaScript. All forms use `novalidate`; HTML validation attributes are not used.

Storage keys: `ironfit-theme`, `ironfit-users`, `ironfit-session`, `ironfit-enquiry`. Accounts contain a salt and SHA-256 password digest rather than a plaintext password. This does NOT make localStorage authentication secure: users can edit local data and sessions. Use demo details only. Logout clears the session; saved accounts remain available for another login. Clear site data in browser settings to remove all demo records.

The most recent enquiry is saved locally and shown only when its email matches the logged-in demo account. This is a UI simulation, not an access-control guarantee.

## Weather API

Open-Meteo Forecast API: https://open-meteo.com/en/docs

Uses `fetch`, `async/await`, Astana coordinates (51.1694, 71.4491), temperature, WMO weather code, wind and the API's local timestamp. Loading, success, malformed response, HTTP/network failure and a 12-second timeout are handled. Refresh allows a new request. No API key, backend or fabricated fallback data is used. An internet connection is required only for weather. Open-Meteo attribution is displayed in the weather panel.

## Hosting — GitHub Pages

Repository: https://github.com/neqty/ironfit-fitness-club
GitHub Pages: https://neqty.github.io/ironfit-fitness-club/

The GitHub Pages deploy job reported **success** on 18 November 2026 for the Final Project merge commit `e8c522904eab58019e1a1994ba505a7004d7a05d` and reported the URL above. This verifies a successful deployment workflow, not end-to-end browser validation of each live page. Before presenting, open the live HTTPS site and verify all nine pages, images, authentication demo and current weather API.

The site uses relative paths and includes `.nojekyll`; no build process or API key is needed. Authentication and enquiries are browser-only simulations. Check asset usage rights before use beyond coursework.

## Submission and presentation

Deadline supplied by the assignment: **18 November 2026, 23:59**.
Each of the three students submits the ZIP, PDF report and TXT links file together in Moodle's **FINAL EXAM FOLDER**. Confirm the published Pages URL loads and every feature works in your browser before Moodle submission.

See `docs/PRESENTATION.md` for a 4:45 three-person demonstration and `docs/TESTING.md` for actual checks and limitations.

## Visual revision — 17 November 2026

Home displays the supplied logo followed by animated fictional concept figures: 1,200+ members, 8 Astana locations, 6 specialities and 40+ weekly classes. The gallery has nine themed images, uncropped framing, controls below the photo, keyboard support and wraparound navigation. Contact uses the reception conversation photo. All six trainer portraits match their stated training specialities.
