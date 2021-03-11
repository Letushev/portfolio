import './styles/main.scss';
import Logo from './js/animated-logo';

if (document.readyState === 'complete') {
  initLogo();
} else {
  window.addEventListener('load', initLogo);
}

const background = document.querySelector('.banner__background');
background.classList.add('banner__background--visible');

function initLogo() {
  const canvas = document.querySelector('.animated-logo__canvas');
  new Logo(canvas);
}
