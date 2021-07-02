const startButton   = document.querySelector('[data-action="start"]')
const stopButton    = document.querySelector('[data-action="stop"]')
const resetButton   = document.querySelector('[data-action="reset"]')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
let timerTime       = '00';
let isRunning = false;
let interval;


const startTimer = () => {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(incrementTimer, 1000);
};

const stopTimer = () => {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(interval);
};

const resetTimer = () => {
  stopTimer();
  timerTime = '00';
  minutes.innerText = '00';
  seconds.innerText = '00';
};

const incrementTimer = () => {
  timerTime++;
  const numberOfMinutes = Math.floor(timerTime / 60);
  const numberOfSeconds = timerTime % 60;

  minutes.innerText = pad(numberOfMinutes);
  seconds.innerText = pad(numberOfSeconds);
}

const pad = (number) => {
  return (number < 10) ? '0' + number : number;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

export { startTimer, stopTimer, resetTimer, incrementTimer }