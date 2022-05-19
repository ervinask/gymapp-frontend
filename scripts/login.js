const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');

const forgotPass = document.querySelector('.forgot-password');
const register = document.querySelector('.register-now');
const btnCloseModal = document.querySelector('.close-modal');

register.addEventListener('click', () => location.replace('register.html'));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = e.target.elements.email.value.trim();
  let password = e.target.elements.password.value;
  login({ email, password });
});

const login = async (loginData) => {
  const res = await fetch(`${url}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('name', data.name);
  if (data.err) {
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
    return (document.querySelector('.error-msg').innerHTML = data.err);
  } else {
    return location.replace('dashboard.html');
  }
};

btnCloseModal.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});
