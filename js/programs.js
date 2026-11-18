'use strict';
// Assignment 6 live search retained with safe highlighting and keyboard suggestions.
const search = document.getElementById('program-search');
const cards = [...document.querySelectorAll('#program-grid > div')];
const suggestions = document.getElementById('search-suggestions');
const terms = ['Strength', 'Cardio', 'Group Fitness', 'Free weights', 'Machines', 'Progress tracking', 'Treadmills', 'Bikes', 'Interval sessions', 'HIIT', 'Functional training', 'Mobility'];
const originalText = new Map();
cards.forEach(card => {
  card.dataset.search = card.textContent.toLowerCase().replace(/\s+/g, ' ');
  card.querySelectorAll('h3, p, li').forEach(element => originalText.set(element, element.textContent.trim()));
});
let activeSuggestion = -1;
function closeSuggestions() {
  suggestions.hidden = true;
  search.setAttribute('aria-expanded', 'false');
  search.removeAttribute('aria-activedescendant');
  activeSuggestion = -1;
}
function highlight(element, query) {
  const text = originalText.get(element);
  element.replaceChildren();
  if (!query) { element.textContent = text; return; }
  let start = 0;
  let index;
  while ((index = text.toLowerCase().indexOf(query, start)) !== -1) {
    element.append(document.createTextNode(text.slice(start, index)));
    const mark = document.createElement('mark');
    mark.className = 'search-match';
    mark.textContent = text.slice(index, index + query.length);
    element.append(mark);
    start = index + query.length;
  }
  element.append(document.createTextNode(text.slice(start)));
}
function filterPrograms() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  cards.forEach(card => {
    card.hidden = !card.dataset.search.includes(query);
    if (!card.hidden) count++;
    card.querySelectorAll('h3, p, li').forEach(element => highlight(element, query));
  });
  document.getElementById('search-count').textContent = `${count} ${count === 1 ? 'program' : 'programs'} found`;
  document.getElementById('search-empty').hidden = count !== 0;
  suggestions.replaceChildren();
  closeSuggestions();
  if (query) {
    terms.filter(term => term.toLowerCase().includes(query)).slice(0, 6).forEach((term, i) => {
      const option = document.createElement('li');
      option.id = `suggestion-${i}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.textContent = term;
      option.addEventListener('mousedown', event => event.preventDefault());
      option.addEventListener('click', () => chooseSuggestion(option));
      suggestions.append(option);
    });
    suggestions.hidden = !suggestions.children.length;
    search.setAttribute('aria-expanded', String(!suggestions.hidden));
  }
}
function chooseSuggestion(option) {
  search.value = option.textContent;
  filterPrograms(); closeSuggestions(); search.focus();
}
search.addEventListener('input', filterPrograms);
search.addEventListener('blur', closeSuggestions);
search.addEventListener('keydown', event => {
  if (event.key === 'Escape') return closeSuggestions();
  const options = [...suggestions.children];
  if (suggestions.hidden || !options.length) return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    activeSuggestion = (activeSuggestion + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
    options.forEach((option, index) => option.setAttribute('aria-selected', String(index === activeSuggestion)));
    search.setAttribute('aria-activedescendant', options[activeSuggestion].id);
  } else if (event.key === 'Enter' && activeSuggestion >= 0) {
    event.preventDefault(); chooseSuggestion(options[activeSuggestion]);
  }
});
filterPrograms();
