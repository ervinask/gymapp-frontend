const url = 'http://localhost:8080/v1';
const form = document.querySelector('form');

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
};
