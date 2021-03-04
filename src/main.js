import './styles/main.scss';
import Logo from './animated-logo';

const photo = document.querySelector('.banner__photo');
photo.addEventListener('load', () => {
  const canvas = document.querySelector('.animated-logo__canvas');
  const logo = new Logo(canvas);
  logo.animate();
});
