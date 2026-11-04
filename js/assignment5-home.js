// Assignment 5: Home page exercises
const moreButton = document.getElementById('a5-more-button');
const moreText = document.getElementById('a5-more-text');
if (moreButton && moreText) {
  moreButton.addEventListener('click', function () {
    moreText.hidden = !moreText.hidden;
    // Exercise requirement: update visibility through the style.display property.
    moreText.style.display = moreText.hidden ? 'none' : 'block';
    moreButton.textContent = moreText.hidden ? 'Read more' : 'Read less';
  });
}

// Navigate the main menu with left and right arrow keys.
const menuLinks = document.querySelectorAll('#mainNavbar .nav-link');
menuLinks.forEach(function (link, index) {
  link.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % menuLinks.length;
    else next = (index - 1 + menuLinks.length) % menuLinks.length;
    menuLinks[next].focus();
  });
});
