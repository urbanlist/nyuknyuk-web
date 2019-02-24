import axios from 'axios';


let url = "//localhost:10717";
if (PRODUCTION) {
  url = "https://urbanlist.kr";
}


class WeatherController {
  constructor() {

  }

  get(resAction) {
    axios
      .get(`${url}/api/nyuknyuk`)
      .then(res => {
        resAction(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getWather(datetime, resAction) {
    axios
      .get(`${url}/api/nyuknyuk/monitor?time=${datetime}`)
      .then(res => {
        resAction(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default WeatherController;