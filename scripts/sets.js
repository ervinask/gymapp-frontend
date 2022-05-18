const table = document.querySelector('tbody');
const url = 'http://localhost:8080/v1';

const getSets = () => {
  fetch(`${url}/sets/`, {
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

        const td4 = tr.insertCell();
        td4.textContent = element.time;
      });
    });
};

const pageRun = () => {
  if (!localStorage.getItem('token')) {
    return location.replace('login.html');
  } else {
    document.querySelector('.profile-name').innerHTML = localStorage.getItem('name');
    getSets();
  }
};

pageRun();
