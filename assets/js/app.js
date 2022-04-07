const btnStart = document.querySelector('.btnStartFree');
const btnContact = document.querySelector('.btnContact');

btnStart.addEventListener('click', () => {
  window.open('https://www.themoviedb.org/movie', '_target');
});

const modalWindow = document.querySelector('.modalContact');
const modalClose = document.querySelector('.modal__close');
const body = document.querySelector('body');

btnContact.addEventListener('click', () => {
      modalWindow.style.display = 'flex';
      body.classList.add('noscroll');
    })

modalWindow.addEventListener('click', (e) => {
  const isModal = e.target.closest('.modal__inner');

  if (!isModal) {
    modalWindow.style.display = 'none';
    body.classList.remove('noscroll');
  }
});

modalClose.addEventListener('click', () => {
  modalWindow.style.display = 'none';
  body.classList.remove('noscroll');
})
