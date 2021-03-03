import './styles/main.scss';

import anotherFile from './another.js';

console.log('file from main.js');
anotherFile();

class Human {
  age = 13;
  say = (...args) => {
    const [a, b] = args;
    console.log(a, b);
    console.log(args);
    console.log('hello' + this.age);
  }
}

const Any = new Human();
Any.say(1, 2, 3);
