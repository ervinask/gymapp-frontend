const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');

const forgotPass = document.querySelector('.forgot-password');
const register = document.querySelector('.register-now');

register.addEventListener('click', () => {
  location.replace('register.html');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = e.target.elements.email.value.trim();
  let password = e.target.elements.password.value;

  console.log({ email, password });

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
  console.log(data);
  localStorage.setItem('token', data.token);
  if (data.err) {
    return (document.querySelector('.error-msg').innerHTML = data.err);
  } else {
    return location.replace('dashboard.html');
  }
};

// Removing error msg if user is trying to write new email

document.querySelector('#email').addEventListener('input', () => {
  document.querySelector('.error-msg').innerHTML = '';
});
