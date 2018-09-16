import React from 'react';
import getURLParam from 'get-url-param';
import cloud from '../../../assets/weather/cloud.svg';
import Random from '../modules/Random.js';
import WeatherController from '../modules/WeatherController.js';
import NewsController from '../modules/NewsController.js';
import Timer from '../modules/Timer.js';
import CloudLayer from '../Layers/CloudLayer.jsx';
import Cloud2Layer from '../Layers/Cloud2Layer.jsx';
import OvercastLayer from '../Layers/OvercastLayer.jsx';
import RainLayer from '../Layers/RainLayer.jsx';
import './Home.styl';


let convertSkyCodeToName = code => {
  let dic = {
    "SKY_A01": "맑음",
    "SKY_A02": "구름 조금",
    "SKY_A03": "구름 많음",
    "SKY_A04": "구름 많고 비",
    "SKY_A05": "구름 많고 눈",
    "SKY_A06": "구름 많고 비 또는 눈",
    "SKY_A07": "흐림",
    "SKY_A08": "흐리고 비",
    "SKY_A09": "흐리고 눈",
    "SKY_A10": "흐리고 비 또는 눈",
    "SKY_A11": "흐리고 낙뢰",
    "SKY_A12": "뇌우/비",
    "SKY_A13": "뇌우/눈",
    "SKY_A14": "뇌우/비 또는 눈",
    "none": "알 수 없음"
  }
  return dic[code];
}


let convertSkyCodeToParameter = code => {
  let result = {
    isDefault: false,
    isSnow: false,
    isRain: false,
    isThunder: false,
    isOvercase: false,
    cloudLevel: 0,
  };

  switch (code) {
    case "SKY_A01":
      result.isDefault = true;
      return result;
    case "SKY_A02":
      result.cloudLevel = 1;
      return result;
    case "SKY_A03":
      result.cloudLevel = 2;
      return result;
    case "SKY_A04":
      result.cloudLevel = 2;
      result.isRain = true;
      return result;
    case "SKY_A05":
      result.cloudLevel = 2;
      result.isSnow = true;
      return result;
    case "SKY_A06":
      result.cloudLevel = 2;
      result.isRain = true;
      result.isSnow = true;
      return result;
    case "SKY_A07":
      result.isOvercase = true;
      return result;
    case "SKY_A08":
      result.isOvercase = true;
      result.isRain = true;
      return result;
    case "SKY_A09":
      result.isOvercase = true;
      result.isSnow = true;
      return result;
    case "SKY_A10":
      result.isOvercase = true;
      result.isRain = true;
      result.isSnow = true;
      return result;
    case "SKY_A11":
      result.isOvercase = true;
      result.isThunder = true;
      return result;
    case "SKY_A12":
      result.isOvercase = true;
      result.isThunder = true;
      result.isRain = true;
      return result;
    case "SKY_A13":
      result.isOvercase = true;
      result.isThunder = true;
      result.isSnow = true;
      return result;
    case "SKY_A14":
      result.isOvercase = true;
      result.isThunder = true;
      result.isRain = true;
      result.isSnow = true;
      return result;
    default:
      return result;
  }
}


let convertMonthToName = month => {
  let dic = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }
  return dic[month];
}


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cloudPositions: [
        Random(0, window.innerWidth),
        Random(0, window.innerWidth),
        Random(0, window.innerWidth),
        Random(0, window.innerWidth)],
      date: '-',
      temperature: '-',
      skyStatus: '-',
      windSpeed: '-',
      color: {
        start: {
          red: 0,
          green: 0,
          blue: 0
        },
        end: {
          red: 0,
          green: 0,
          blue: 0
        },
      },
      newsArticles: []
    };

    this.weatherController = new WeatherController();
    this.newsController = new NewsController();
    this.weatherTimer = new Timer(this.setWeather.bind(this), 60 * 1000);
    this.clockTimer = new Timer(this.setClock.bind(this), 60 * 1000);
  }

  componentDidMount() {
    this.weatherTimer.start();
    this.clockTimer.start();

    this.newsController.get(data => {
      this.setState({
        newsArticles: data.articles
      });
    });
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    this.weatherTimer.stop();
    this.clockTimer.stop();
  }

  setWeather() {
    this.weatherController.get(data => {
      this.setState({
        temperature: data.temperature,
        skyStatus: data.sky.status,
        windSpeed: data.wind.speed,
        color: data.color
      });
    });
  }

  setClock() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let hourFormat = ("0" + hour).slice(-2); 
    let minFormat = ("0" + min).slice(-2);

    this.setState({
      date: `${year}. ${month}. ${day}. ${hourFormat}:${minFormat}`
    });
  }

  render() {
    let parsed = getURLParam(location.search, "sky");
    let skyStatus = this.state.skyStatus;
    if (parsed) {
      skyStatus = parsed;
    }
    let skyAttrs = convertSkyCodeToParameter(skyStatus);

    let newsArticles = this.state.newsArticles.length > 0 ? this.state.newsArticles : ["북미, 일부 성과에도 입장차 확인…후속협상에 공 넘겨"];

    let color = this.state.color;
    let background = `linear-gradient(to bottom,rgb(${color.start.red}, ${color.start.green}, ${color.start.blue}) , rgb(${color.end.red}, ${color.end.green}, ${color.end.blue}))`;
    // let background = "linear-gradient(to bottom, rgb(96, 111, 163) , rgb(185, 195, 222))";
    let clarity = () => {
      return (<div className="clarity"> </div>)
    }

    let fontStyle = {
      "color": (color.start.red + color.start.green + color.start.blue) / 3 < 140 ? "#fff" : "#000"
    };

    return (
      <div className="home" style={{
        "background": background
      }}>
        {skyAttrs.isDefault && clarity()}
        <div className="top" style={fontStyle}>
          <div className="weather">
            {convertSkyCodeToName(this.state.skyStatus) + ", " + this.state.temperature + "°C"}
          </div>
          <div className="place">
            {"YONGIN"}
          </div>
        </div>
        <div className="center" style={fontStyle}>
          <div className="text">
            <div className="datetime">
              {this.state.date}
            </div>
            <div className="content">
              {newsArticles[0].title}
            </div>
          </div>
        </div>
        <div className="background">
          {<CloudLayer windSpeed={this.state.windSpeed} cloudType={skyAttrs.cloudLevel} />}
          {skyAttrs.cloudLevel == 2 && <Cloud2Layer />}
          {skyAttrs.isOvercase && <OvercastLayer windSpeed={this.state.windSpeed}/>}
          <RainLayer isRain={skyAttrs.isRain} isSnow={skyAttrs.isSnow} isThunder={skyAttrs.isThunder}/>
        </div>
      </div>
    )
  }
}

export default Home;