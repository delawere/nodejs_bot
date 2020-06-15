const fetch = require('node-fetch');
const setParams = require('../utils');

class Weather {
  static async getWeather(token) {
    const params = {
      q: 'Moscow', units: 'metric', lang: 'ru', APPID: token,
    };
    const url = setParams('http://api.openweathermap.org/data/2.5/find', params);
    const { list } = await fetch(url).then((data) => data.json());
    const [current] = list;
    const { weather } = current;
    const [currentWeather] = weather;
    const { description } = currentWeather;
    const {
      main: {
        temp, feels_like: feelsLike,
      },
    } = current;

    return {
      description,
      temp,
      feelsLike,
    };
  }

  //   static async getAverageTemp(token) {
  //     const params = {
  //       q: 'Moscow', units: 'metric', lang: 'ru', APPID: token,
  //     };
  //     const url = setParams('http://api.openweathermap.org/data/2.5/forecast', params);
  //     const { list } = await fetch(url).then((data) => data.json());

  //     const filtered = list.filter(({ dt_txt: dateString }) => {
  //       dayjs.extend(isSameOrBefore);
  //       dayjs.extend(isSameOrAfter);

  //       const now = dayjs();
  //       const begin = now.hour(12).minute(0).second(0);
  //       const end = now.hour(15).minute(0).second(0);
  //       const before = dayjs(dateString).isSameOrBefore(begin);
  //       const after = dayjs(dateString).isSameOrAfter(end);

  //       console.log(begin, end);
  //     });

//     return filtered;
//   }
}

module.exports = Weather;
