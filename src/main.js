import './styles/main.scss';
import Logo from './js/animated-logo';

window.addEventListener('load', initLogo);

function initLogo() {
  const canvas = document.querySelector('.animated-logo__canvas');
  new Logo(canvas);
}
