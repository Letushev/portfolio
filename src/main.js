import './styles/main.scss';
import './js/lazy-images';
import Logo from './js/animated-logo';
import resume from './files/Oleksiy_Letushev_resume.pdf';

window.addEventListener('load', initLogo);

function initLogo() {
  const canvas = document.querySelector('.animated-logo__canvas');
  new Logo(canvas);
}

const resumeButton = document.querySelector('.greeting__button');
resumeButton.href = resume;
