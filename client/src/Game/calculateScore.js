export const calculateScore = (guessDistance, clickspotLat) => {
  let zoom = 1;
  let score = 0;

  if (guessDistance > 3000000) {
    zoom = 1;
  } else if (
    guessDistance > 1000000 &&
    (clickspotLat > 58 || clickspotLat < -58)
  ) {
    zoom = 2;
  } else if (guessDistance > 1750000) {
    zoom = 2;
  } else if (guessDistance > 1000000) {
    zoom = 3;
  } else if (guessDistance > 500000) {
    zoom = 4;
  } else if (guessDistance > 200000) {
    zoom = 5;
  } else if (guessDistance > 100000) {
    zoom = 6;
  } else if (guessDistance > 50000) {
    zoom = 7;
  } else if (guessDistance > 20000) {
    zoom = 8;
  } else if (guessDistance > 5000) {
    zoom = 9;
  } else if (guessDistance > 1000) {
    zoom = 10;
  } else {
    zoom = 11;
  }

  if (guessDistance <= 100) {
    score = 2000;
  } else if (guessDistance <= 250) {
    score = 1975;
  } else if (guessDistance <= 500) {
    score = 1950;
  } else if (guessDistance <= 1000) {
    score = 1900;
  } else if (guessDistance <= 2000) {
    score = 1850;
  } else if (guessDistance <= 20000) {
    score = 1800;
  } else if (guessDistance <= 50000) {
    score = 1750;
  } else if (guessDistance <= 100000) {
    score = 1700;
  } else if (guessDistance <= 150000) {
    score = 1600;
  } else if (guessDistance <= 200000) {
    score = 1500;
  } else if (guessDistance <= 300000) {
    score = 1400;
  } else if (guessDistance <= 400000) {
    score = 1200;
  } else if (guessDistance <= 700000) {
    score = 1000;
  } else if (guessDistance <= 1200000) {
    score = 800;
  } else if (guessDistance <= 1600000) {
    score = 600;
  } else if (guessDistance <= 2000000) {
    score = 500;
  } else if (guessDistance <= 4000000) {
    score = 400;
  } else if (guessDistance <= 5000000) {
    score = 200;
  } else if (guessDistance <= 6000000) {
    score = 100;
  }

  return { zoom, score };
};
