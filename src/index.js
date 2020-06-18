/* eslint-disable no-unused-vars */
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import _ from './env.js';
import Bot from './Bot/index.js';

const app = express();
const HEROKU_EXPIRED = 1200000;

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.get('/wakeup', () => {
  console.log("I'm alive");
});

app.listen(process.env.PORT, () => {
  console.log('Webpage for NodeJS Daily Bot listening on port 3000');
});

setTimeout(function wakeUp() {
  fetch('https://nodejs-daily-bot.herokuapp.com/wakeup', () => console.log('Ok!'));
  return setTimeout(wakeUp, HEROKU_EXPIRED);
}, HEROKU_EXPIRED);

Bot.launch();
