import './styles/main.scss';
import Logo from './js/animated-logo';
import resume from './files/Oleksiy_Letushev_resume.pdf';

function initLogo() {
  const canvas = document.querySelector('.animated-logo__canvas');
  new Logo(canvas);
}

window.addEventListener('load', initLogo);

const resumeButton = document.querySelector('.greeting__button');
resumeButton.href = resume;
