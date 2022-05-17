const dashboardButton = document.querySelector('#dashboard-button');
const exercisesButton = document.querySelector('#exercises-button');
const logoutButton = document.querySelector('#logout-button');
const setsButton = document.querySelector('#sets-button');
const table = document.querySelector('tbody');

setsButton.addEventListener('click', () => location.replace('sets.html'));

dashboardButton.addEventListener('click', () => location.replace('dashboard.html'));

exercisesButton.addEventListener('click', () => location.replace('add.html'));

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.replace('login.html');
});

const getSets = () => {
  if (!localStorage.getItem('token')) {
    console.log('lopas');
    return location.replace('login.html');
  }

  fetch('http://localhost:8080/v1/sets/', {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const tr = table.insertRow();

        const td0 = tr.insertCell();
        td0.textContent = element.exercise_id;

        const td1 = tr.insertCell();
        td1.textContent = element.weight;

        const td2 = tr.insertCell();
        td2.textContent = element.reps;

        const td3 = tr.insertCell();
        td3.textContent = element.sets;
      });
    });
};

getSets();
