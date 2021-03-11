import './styles/main.scss';
import { enableScrolling, disableScrolling } from './js/prevent-scroll';
import Logo from './js/animated-logo';

let initialized = false;

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 848) {
    init();
  } else {
    disableScrolling();
    const photo = document.querySelector('.banner__photo');

    if (photo.complete) {
      init();
    } else {
      photo.addEventListener('load', () => {
        init();
      });
    }

    setTimeout(() => {
      if (!initialized) {
        init();
      }
    }, 3000);
  }
});

function init() {
  initialized = true;
  enableScrolling();

  const background = document.querySelector('.banner__background');
  background.classList.add('banner__background--visible');

  const wrapper = document.querySelector('.page-wrapper');
  wrapper.classList.add('page-wrapper--visible');

  if (document.readyState === 'complete') {
    initLogo();
  } else {
    window.addEventListener('load', initLogo);
  }
}

function initLogo() {
  const canvas = document.querySelector('.animated-logo__canvas');
  new Logo(canvas);
}
