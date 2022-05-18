const url = 'http://localhost:8080/v1';

const displayExercises = () => {
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

function createElement(type, props, ...children) {
  const element = document.createElement(type); /// p
  if (props) Object.assign(element, props);

  for (let child of children) {
    if (typeof child === 'string') element.appendChild(document.createTextNode(child));
    else element.append(child);
  }
  return element;
}

const pageRun = () => {
  if (!localStorage.getItem('token')) {
    return location.replace('login.html');
  } else {
    document.querySelector('.profile-name').innerHTML = localStorage.getItem('name');
    displayExercises();
  }
};

window.onload = () => {
  pageRun();
};
