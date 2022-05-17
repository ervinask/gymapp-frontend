const url = 'http://localhost:8080/v1';

const dashboardButton = document.querySelector('#dashboard-button');

const exercisesButton = document.querySelector('#add-button');

const logoutButton = document.querySelector('#logout-button');

const setsButton = document.querySelector('#sets-button');

dashboardButton.addEventListener('click', () => {
  location.replace('dashboard.html');
});

exercisesButton.addEventListener('click', () => {
  location.replace('add.html');
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.replace('login.html');
});

setsButton.addEventListener('click', () => {
  location.replace('sets.html');
});

const displayExercises = () => {
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
        document
          .querySelector('.exercises-con')
          .append(
            createElement(
              'div',
              { className: 'exercise' },
              createElement('p', { className: 'exercise-name-display' }, element.name),
              createElement(
                'iframe',
                { className: 'exercise-video-display', src: `https://www.youtube.com/embed/${element.video}` },
                ''
              ),
              createElement('p', { className: 'exercise-desc-display' }, element.description)
            )
          );
      });
    });
};

displayExercises();

function createElement(type, props, ...children) {
  const element = document.createElement(type); /// p
  if (props) Object.assign(element, props);

  for (let child of children) {
    if (typeof child === 'string') element.appendChild(document.createTextNode(child));
    else element.append(child);
  }
  return element;
}
