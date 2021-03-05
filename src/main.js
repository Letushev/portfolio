import './styles/main.scss';
import { enableScrolling, disableScrolling } from './js/prevent-scroll';
import Logo from './js/animated-logo';

window.addEventListener('DOMContentLoaded', () => {
  disableScrolling();

  const photo = document.querySelector('.banner__photo');

  // after main photo is loaded:
  // - enable scrolling
  // - animate background
  // - show all content with opacity transition
  // - start animated-logo
  photo.addEventListener('load', () => {
    enableScrolling();
    
    const background = document.querySelector('.banner__background');
    background.classList.add('banner__background--visible');

    const wrapper = document.querySelector('.page-wrapper');
    wrapper.classList.add('page-wrapper--visible');
    
    const canvas = document.querySelector('.animated-logo__canvas');
    const logo = new Logo(canvas);
    logo.animate();
  });
});
