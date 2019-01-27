import axios from 'axios';

class WeatherController {
  constructor() {

  }

  get(resAction) {
    axios
      .get('https://urbanlist.kr/api/nyuknyuk')
      .then(res => {
        resAction(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default WeatherController;