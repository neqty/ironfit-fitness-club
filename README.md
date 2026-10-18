# IRONFIT Fitness Club — Assignment #4: Introduction to JavaScript

Modernized responsive fitness club concept built by students with HTML, CSS, Bootstrap 5.3, and JavaScript. This continues the Assignment #3 project without removing the Bootstrap layouts or the 9-image gallery carousel.

## Team responsibilities

- **Абылайхан** — Home (`index.html`) and Programs (`programs.html`); Task 3 popup subscription form, Task 5 current date and time.
- **Құралбай Ерасыл** — About (`about.html`) and Trainers (`trainers.html`); Task 2 JavaScript FAQ accordion.
- **Еркінбек Арсен** — Pricing (`pricing.html`) and Contact (`contact.html`); Task 1 JavaScript form validation, Task 4 background-color switcher.

## Assignment #4: Where to demonstrate each task

| Task | Page | Behavior | JavaScript file |
| --- | --- | --- | --- |
| Task 1: Form Validation | `contact.html` | Required fields, email format, 8-character password, matching confirmation, inline error messages | `js/contact.js` |
| Task 2: FAQ Accordion | `about.html` | Each question opens/closes smoothly by clicking | `js/about.js` |
| Task 3: Popup Form | `index.html` | Opens on click, closes via ×, outside click, or Escape | `js/home.js` |
| Task 4: Background Color | `pricing.html` | Cycles through predefined colors using `document.body.style.backgroundColor` | `js/pricing.js` |
| Task 5: Current Date and Time | Footer on all pages | Real-time local date/time using `new Date()` and `setInterval` | `js/site.js` |

**Note:** Forms are client-side demonstrations only. They validate locally but **do not send, save, or register real information**. No backend is included. Please do not enter a real password.

## Other features retained from Assignment #3

- CSS Media Queries for responsive headings and a 3/2/1 card group on Home
- Bootstrap 12-column Grid, cards, spacing utilities and buttons
- Responsive hamburger navbar on all six pages
- Home image carousel with nine slides
- Contact Bootstrap form layout

## Project structure

```text
ironfit-fitness-club-main/
├── index.html
├── about.html
├── programs.html
├── trainers.html
├── pricing.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── site.js
│   ├── home.js
│   ├── about.js
│   ├── pricing.js
│   └── contact.js
├── images/
└── README.md
```

## Run locally

Open `index.html` in a browser, or start a local development server such as VS Code Live Server. An internet connection is needed for the Bootstrap CSS and JS CDN used by the project.

## Deployment

- Repository: https://github.com/neqty/ironfit-fitness-club
- Deployment used by the team: https://ironfit-aitu.netlify.app/

**Publishing this ZIP does not automatically update GitHub or Netlify.** Commit and push the updated files, and redeploy as needed.

## Submission

For Assignment #4, submit the report, ZIP of the project, and deployed website URL. The report should include team members/group, tasks with screenshots, step-by-step descriptions, and the deployment link. Each team member should be able to explain the JavaScript feature they implemented and the others' work.

## Design refresh (Assignment #4)

The visual refresh keeps the code simple: a warm-paper and forest-green palette, energetic lime accents, larger headlines, Bootstrap Grid and Cards, and custom CSS hover effects. It uses existing local images; no extra component library or backend was added.

- Home hero features a gym workout photo and three club facts.
- Home's three feature cards **still use custom CSS Grid + media queries**, without Bootstrap for that exercise.
- Navbar, cards, forms and pricing components still use Bootstrap classes.
- JavaScript tasks #1–5 are unchanged in purpose and can be demonstrated on their original pages.
- The theme switcher now cycles between warm paper, mint, blue and peach so its effect is clear.
