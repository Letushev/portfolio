import './styles/main.scss';
import { enableScrolling, disableScrolling } from './js/prevent-scroll';
import Logo from './js/animated-logo';

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 848) {
    init();
  } else {
    disableScrolling();
    const photo = document.querySelector('.banner__photo');
    photo.addEventListener('load', () => {
      enableScrolling();
      init();
    });
  }
});

function init() {
  const background = document.querySelector('.banner__background');
  background.classList.add('banner__background--visible');

  const wrapper = document.querySelector('.page-wrapper');
  wrapper.classList.add('page-wrapper--visible');
    
  window.addEventListener('load', () => {
    const canvas = document.querySelector('.animated-logo__canvas');
    const logo = new Logo(canvas);
    logo.animate();
  });
}
