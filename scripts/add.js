const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');
const select = document.querySelector('select');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let weight = e.target.elements.weight.value;
  let reps = e.target.elements.reps.value;
  let sets = e.target.elements.sets.value;
  let exercise_id = document.querySelector('#exercise_name').value;
  let time = new Date().toUTCString();
  console.log(time);

  addExercise({ weight, reps, sets, exercise_id, time });
  location.replace('sets.html');
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
};

const createDropMenu = () => {
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

const pageRun = () => {
  if (!localStorage.getItem('token')) {
    return location.replace('login.html');
  } else {
    document.querySelector('.profile-name').innerHTML = localStorage.getItem('name');
    createDropMenu();
  }
};

pageRun();
