const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');
const select = document.querySelector('select');

const dashboardButton = document.querySelector('#dashboard-button');
const exercisesButton = document.querySelector('#add-button');
const logoutButton = document.querySelector('#logout-button');
const setsButton = document.querySelector('#sets-button');

setsButton.addEventListener('click', () => location.replace('sets.html'));

dashboardButton.addEventListener('click', () => location.replace('dashboard.html'));

exercisesButton.addEventListener('click', () => location.replace('add.html'));

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.replace('login.html');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('lopas');

  let weight = e.target.elements.weight.value;
  let reps = e.target.elements.reps.value;
  let sets = e.target.elements.sets.value;
  let exercise_id = document.querySelector('#exercise_name').value;

  console.log({ weight, reps, sets, exercise_id });
  addExercise({ weight, reps, sets, exercise_id });
});

const addExercise = async (exerciseData) => {
  const res = await fetch(`${url}/sets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(exerciseData),
  });
  const data = await res.json();
  console.log(data);
};

const createDropMenu = () => {
  if (!localStorage.getItem('token')) {
    return location.replace('login.html');
  }

  fetch(`${url}/exercises/`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const option = document.createElement('option');
        option.textContent = element.name;
        select.append(option);
      });
    });
};

createDropMenu();
