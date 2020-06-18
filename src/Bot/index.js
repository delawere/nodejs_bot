import telegraf from 'telegraf';
import cron from 'cron';
import Rates from '../Rates/index.js';
import Weather from '../Weather/index.js';

const { CronJob } = cron;
const { Telegraf } = telegraf;

const bot = new Telegraf(process.env.TOKEN);

const getWeather = () => Weather.getWeather(process.env.WEATHER_TOKEN);
const getRate = ({ from, to }) => Rates.getRate(from, to);

bot.start((ctx) => {
  ctx.reply('Starting!');
  const job = new CronJob(
    '0 45 21 * * *',
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

export default bot;
