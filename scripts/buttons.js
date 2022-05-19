const dashboardButton = document.querySelector('#dashboard-button');
const addButton = document.querySelector('#add-button');
const logoutButton = document.querySelector('#logout-button');
const setsButton = document.querySelector('#sets-button');
const settingsButton = document.querySelector('#settings-button');

setsButton.addEventListener('click', () => location.replace('sets.html'));

settingsButton.addEventListener('click', () => location.replace('settings.html'));

dashboardButton.addEventListener('click', () => location.replace('dashboard.html'));

addButton.addEventListener('click', () => location.replace('add.html'));

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.replace('login.html');
});
