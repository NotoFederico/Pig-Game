'use strict';

const player0 = 0;
const player1 = 1;
const thresholdScore = 100;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0TotEl = document.querySelector('#score--0');
const score1TotEl = document.querySelector('#score--1');
const score0CurrEl = document.querySelector('#current--0');
const score1CurrEl = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let gameFinished, scoreCurrVal, scoreTotVal, activePlayer;

const hideDice = function (bool) {
  bool === true
    ? diceEl.classList.add('hidden')
    : diceEl.classList.remove('hidden');
};

const init = function () {
  console.log('Hecho por Federico Noto');
  gameFinished = false;
  scoreCurrVal = [0, 0];
  scoreTotVal = [0, 0];
  activePlayer = player0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  hideDice(true);
  scoreTotVal[player0] = Number((score0TotEl.textContent = 0));
  scoreTotVal[player1] = Number((score1TotEl.textContent = 0));
  scoreCurrVal[player0] = Number((score0CurrEl.textContent = 0));
  scoreCurrVal[player1] = Number((score1CurrEl.textContent = 0));
  console.log('Game reseted');
};

const switchPlayer = function () {
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = scoreCurrVal[activePlayer] = 0;
  activePlayer = activePlayer == player0 ? player1 : player0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const roll = function () {
  if (gameFinished === false) {
    const diceVal = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceVal}.png`;
    hideDice(false);
    if (diceVal != 1) {
      scoreCurrVal[activePlayer] += diceVal;
      document.querySelector(`#current--${activePlayer}`).textContent =
        scoreCurrVal[activePlayer];
    } else {
      switchPlayer();
    }
  }
};

const hold = function () {
  if (gameFinished === false) {
    scoreTotVal[activePlayer] += scoreCurrVal[activePlayer];
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoreTotVal[activePlayer];
    if (scoreTotVal[activePlayer] < thresholdScore) {
      switchPlayer();
    } else {
      gameFinished = true;
      hideDice(true);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      console.log(
        `The winner is the player ${activePlayer} with a score of ${scoreTotVal[activePlayer]}`
      );
    }
  }
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);

init();
