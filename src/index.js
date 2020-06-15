const telegraf = require('telegraf');
const cron = require('cron');
const Rates = require('./Rates/index.js');
const Weather = require('./Weather/index.js');

const { CronJob } = cron;
const { Telegraf } = telegraf;

const TOKEN = '1040795017:AAFEZnfyP4-RsqlZWbXJl5UAOW-v0sRFmbg';
const WEATHER_TOKEN = '905c7ffe3e2629ee95b7f5385c8237fb';

const bot = new Telegraf(TOKEN);

const getWeather = () => Weather.getWeather(WEATHER_TOKEN);
const getRate = ({ from, to }) => Rates.getRate(from, to);

bot.start((ctx) => {
  const job = new CronJob(
    '00 22 23 * * *',
    async () => {
      const { description, temp, feelsLike } = await getWeather();
      const { first_name: username } = ctx.from;

      ctx.replyWithMarkdown(`*Привет ${username}!*\n\nСейчас в Москве ${description}\nТемпература воздуха ${temp}°C\nОщущается как ${feelsLike}°C\n\nХорошего дня 🙂`);
    },
    null,
    null,
    'Europe/Moscow',
  );

  job.start();
});

bot.command('weather', async ({ reply }) => {
  const { description, temp, feelsLike } = await getWeather();
  reply(`Сейчас в Москве ${description}\nТемпература воздуха ${temp}°C\nОщущается как ${feelsLike}°C`);
});

bot.command('rates', async ({ reply }) => {
  const eur = await getRate({ from: 'EUR', to: 'RUB' });
  const usd = await getRate({ from: 'USD', to: 'RUB' });

  reply(`🇺🇸 $${eur} RUB\n🇪🇺 €${usd} RUB`);
});

bot.launch();
