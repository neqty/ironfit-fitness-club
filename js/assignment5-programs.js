// Assignment 5: choose programs with an object, array, loop and switch.
const fitnessPrograms = [
  { name: 'Strength', category: 'power', description: 'Build strength with weights.' },
  { name: 'Cardio', category: 'energy', description: 'Improve your endurance.' },
  { name: 'Group Fitness', category: 'team', description: 'Exercise together with a coach.' }
];
const programSelect = document.getElementById('a5-program-select');
const programResult = document.getElementById('a5-program-result');
const programList = document.getElementById('a5-program-list');
if (programSelect && programResult && programList) {
  // Explicit for loop: display the data stored in an array of objects.
  for (let i = 0; i < fitnessPrograms.length; i++) {
    const program = fitnessPrograms[i];
    const item = document.createElement('li');
    item.textContent = program.name + ': ' + program.description;
    programList.appendChild(item);
  }
  function showProgram(name, callback) {
    let message;
    switch (name) {
      case 'Strength': message = 'Strength is good for building muscles.'; break;
      case 'Cardio': message = 'Cardio helps improve endurance.'; break;
      case 'Group Fitness': message = 'Group Fitness is training together.'; break;
      default: message = 'Choose a program.';
    }
    callback(message);
  }
  programSelect.addEventListener('change', function () {
    showProgram(programSelect.value, function (message) {
      programResult.textContent = message;
      programResult.classList.add('a5-highlight');
      setTimeout(function () { programResult.classList.remove('a5-highlight'); }, 400);
    });
  });
}
