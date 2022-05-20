const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');
const btnCloseModal = document.querySelector('.close-modal');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let oldPassword = e.target.elements.oldPassword.value;
  let newPassword = e.target.elements.newPassword.value;

  changePass({ oldPassword, newPassword });
});

const changePass = async (exerciseData) => {
  const res = await fetch(`${url}/users/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(exerciseData),
  });
  const data = await res.json();
  if (data.err) {
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
    return (document.querySelector('.error-msg').innerHTML = data.err);
  } else {
    location.replace('dashboard.html');
  }
};

btnCloseModal.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

const pageRun = () => {
  if (!localStorage.getItem('token')) {
    return location.replace('login.html');
  } else {
    document.querySelector('.profile-name').innerHTML = localStorage.getItem('name');
  }
};

pageRun();
