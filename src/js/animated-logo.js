import logoSVG from '../images/logo.svg';

export default class Logo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // from outer to inner
    this.waves = [
      { color: '#42a4f5' },
      { color: '#64b5f6' },
      { color: '#90caf9' },
      { color: '#bbdefb' },
      { color: '#e3f2fd' },
    ];

    this.img;
    this.setImg();

    this.animationId;
    this.isRunning = false;
    this.init();
    this.animate();

    window.addEventListener('blur', this.stop);
    window.addEventListener('focus', this.animate);

    this.windowWidth  = window.innerWidth;
    window.addEventListener('resize', this.onWindowResize);
  }

  init() {
    this.width = this.setSize(this.canvas);
    this.waveWidth = this.getWaveWidth();
    this.R = this.width / 2;
    this.configureWaves();
  }

  onWindowResize = () => {
    const newWidth = window.innerWidth;
    if (this.windowWidth !== newWidth) {
      this.reconfigure();
      this.windowWidth = newWidth;
    }
  }

  setSize(canvas) {
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = width;
    return width;
  }

  setImg() {
    const img = new Image();
    img.src = logoSVG;
    img.addEventListener('load', () => { 
      this.img = img;
    });
  }

  center() {
    const center = this.width / 2;
    return [center, center];
  }

  getWaveWidth() {
    // 1 set of waves occupy 25% of logo
    // set of waves consists of all waves + shell with shadow
    return this.width / 4 / (this.waves.length + 2);
  }

  configureWaves() {
    // time for outermost wave to get around circle (ms)
    const time = 3500;

    const r = this.R
      - this.waveWidth * 2 // skip shell and shadow
      - this.waveWidth / 2; // stroke path is in the middle of lineWidth

    const speed = 2 * Math.PI * r / time;

    this.waves = this.waves.map((wave, waveIndex) => {
      const waveRadius = r - waveIndex * this.waveWidth;

      // angle to move in 1 ms
      const angleMove  = speed / waveRadius;

      return {
        ...wave,
        radius: waveRadius,
        clockwise: true,
        angle: 0,
        angleMove,
      };
    });
  }

  drawImg() {
    if (this.img) {
      const size = this.width / 4;
      const imgCorner = this.center().map(coord => coord - size / 2);
      this.ctx.beginPath();
      this.ctx.drawImage(this.img, ...imgCorner, size, size);
    }
  }

  drawShell() {
    this.ctx.save();
    this.ctx.beginPath();

    // shadow
    this.ctx.shadowBlur = this.waveWidth;
    this.ctx.shadowColor = this.waves[0].color;

    // shell & background
    this.ctx.fillStyle = '#fff';
    this.ctx.arc(...this.center(), this.R - this.waveWidth, 0, Math.PI * 2, false);
    this.ctx.fill();

    this.ctx.restore();
  }

  // to start from -90 degree
  getAngle = angle => (angle - Math.PI / 2)

  drawWaves(timeDiff) {
    this.ctx.lineWidth = this.waveWidth;

    this.waves.forEach(wave => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = wave.color;

      const angleChange = wave.angleMove * timeDiff;

      if (wave.clockwise) {
        wave.angle += angleChange;

        // more than 360 degrees -> change direction
        if (wave.angle >= Math.PI * 2) {
          wave.clockwise = false;
        }
      } else { // anticlockwise
        wave.angle -= angleChange;

        // less than 270 degrees -> change direction
        if (wave.angle <= Math.PI * 3 / 2) {
          wave.clockwise = true;
        }
      }

      this.ctx.arc(
        ...this.center(),
        wave.radius,
        this.getAngle(0),
        this.getAngle(wave.angle),
        false
      );

      this.ctx.stroke();
    });
  }

  draw(prevTime) {
    const nextTime = new Date().getTime();
    const diff = nextTime - prevTime;

    this.ctx.clearRect(0, 0, this.width, this.width);

    this.drawShell();
    this.drawImg();
    this.drawWaves(diff);

    this.animationId = window.requestAnimationFrame(() => {
      this.draw(nextTime);
    });
  }

  animate = () => {
    if (this.isRunning) return;

    const start = new Date().getTime();
    this.animationId = window.requestAnimationFrame(() => {
      this.draw(start);
    });

    this.isRunning = true;
  }

  stop = () => {
    this.isRunning = false;
    window.cancelAnimationFrame(this.animationId);
  }

  reconfigure() {
    this.stop();
    this.init();
    this.animate();
  }
}
