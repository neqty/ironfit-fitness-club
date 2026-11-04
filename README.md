# IRONFIT Fitness Club — Assignment #5: Advanced JavaScript and DOM Manipulation

A student-built responsive fitness club website using HTML, CSS, Bootstrap 5.3, and JavaScript. Assignment 5 continues our previous project and adds advanced DOM manipulation, event handling, data structures, sound effects, and animations.

## Team

- **Балагазы Абылайхан** — Home (`index.html`) and Programs (`programs.html`)
- **Құралбай Ерасыл** — About (`about.html`) and Trainers (`trainers.html`)
- **Еркінбек Арсен** — Pricing (`pricing.html`) and Contact (`contact.html`)

## Assignment 5: Where to demonstrate the features

| Requirement | Page | Main code |
| --- | --- | --- |
| DOM selection / text update | Home, Programs, Pricing | `js/assignment5-home.js`, `js/assignment5-programs.js` |
| Dynamic styling | Pricing | `js/pricing.js` |
| Read More / Read Less | Home | `js/assignment5-home.js` |
| Button click listener | Home | `js/assignment5-home.js` |
| Arrow-key menu navigation | Home navigation | `js/assignment5-home.js` |
| Callback / multi-step form | Contact | `js/assignment5-contact.js` |
| Switch statement | Programs | `js/assignment5-programs.js` |
| Objects / arrays / loop | Programs | `js/assignment5-programs.js` |
| Higher-order functions (`filter`, `forEach`) | Pricing | `js/assignment5-pricing.js` |
| Sound effect generated with Web Audio API | Pricing price filter | `js/assignment5-pricing.js` |
| Animation triggered by interaction | Programs, Pricing | `js/assignment5-programs.js`, `js/assignment5-pricing.js`, `css/assignment5.css` |

### Retained from Assignment 4

- Contact registration form validation (`js/contact.js`)
- About FAQ accordion (`js/about.js`)
- Home subscription popup (`js/home.js`)
- Pricing background color changes (`js/pricing.js`)
- Current local date/time on all pages (`js/site.js`)

Forms are **demonstrations only**. They do not submit data to a backend or save real registrations. Please avoid entering real passwords.

## Files

```text
ironfit-fitness-club/
├── index.html
├── about.html
├── programs.html
├── trainers.html
├── pricing.html
├── contact.html
├── css/
│   ├── style.css
│   └── assignment5.css
├── js/
│   ├── site.js
│   ├── home.js
│   ├── about.js
│   ├── contact.js
│   ├── pricing.js
│   ├── assignment5-home.js
│   ├── assignment5-programs.js
│   ├── assignment5-pricing.js
│   └── assignment5-contact.js
└── images/
```

## Run and test

Open the project in VS Code with Live Server. Test Read More on Home, the program selector on Programs, the price filter and sound on Pricing, and the trial session two-step form on Contact. On Home, focus a navigation link and use the left/right arrow keys.

Bootstrap 5 is loaded from a CDN, so an internet connection is needed for Bootstrap's styling and interactive components.

## Repository and deployment

- Repository: https://github.com/neqty/ironfit-fitness-club
- Website: https://ironfit-aitu.netlify.app/

Publishing this ZIP does not itself commit, push, or deploy the changes.

## Submission

For Assignment 5, submit the **PDF report**, the **ZIP** project, and the deployed website URL. The report should contain team/group information, code and website screenshots, step-by-step explanation, and the deployed link. All team members must submit and defend their work.
