const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');

const forgotPass = document.querySelector('.forgot-password');
const login = document.querySelector('.login-now');

login.addEventListener('click', () => location.replace('login.html'));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = e.target.elements.email.value.trim();
  let name = e.target.elements.name.value.trim();
  let password = e.target.elements.password.value;
  createAccount({ name, email, password });
});

const createAccount = async (registrationData) => {
  const res = await fetch(`${url}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });

  const data = await res.json();
  location.replace('login.html');
};
