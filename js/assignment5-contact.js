// Assignment 5: two-step trial visit form (demo, no server).
const trialForm = document.getElementById('a5-trial-form');
if (trialForm) {
  const steps = trialForm.querySelectorAll('.a5-step');
  const nextButton = document.getElementById('a5-next');
  const backButton = document.getElementById('a5-back');
  const finishButton = document.getElementById('a5-finish');
  const message = document.getElementById('a5-trial-message');
  let step = 0;

  // Callback is called after the step changes.
  function changeStep(number, callback) {
    step = number;
    steps.forEach(function (section, index) {
      section.hidden = index !== step;
    });
    backButton.hidden = step === 0;
    nextButton.hidden = step === steps.length - 1;
    finishButton.hidden = step !== steps.length - 1;
    callback();
  }

  nextButton.addEventListener('click', function () {
    const name = document.getElementById('a5-trial-name').value.trim();
    if (name.length < 2) {
      message.textContent = 'Please enter at least 2 letters.';
      return;
    }
    changeStep(1, function () { message.textContent = 'Step 2 of 2'; });
  });
  backButton.addEventListener('click', function () {
    changeStep(0, function () { message.textContent = 'Step 1 of 2'; });
  });
  trialForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('a5-trial-name').value.trim();
    const program = document.getElementById('a5-trial-program').value;
    message.textContent = 'Thanks, ' + name + '! You selected ' + program + '. Demo only: nothing was sent.';
    trialForm.reset();
    // Stay on the final step so the success message is visible.
  });
  changeStep(0, function () { message.textContent = 'Step 1 of 2'; });
}
