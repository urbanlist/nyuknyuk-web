import React, { Component } from 'react';
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
import SkyColorLayer from '../Layers/SkyColorLayer.jsx';
import TextTypingControl from '../controls/TextTypingControl.jsx';
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
  if (dic.hasOwnProperty(code)) {
    return dic[code];
  } else {
    return "";
  }
}

const convertColorAsSkyStatus = (color, skyStatus) => {
  if (skyStatus !== "SKY_A01" && skyStatus !== "SKY_A02" && skyStatus !== "SKY_A03") {
    return color;
  }

  let startArg = (color.start.red + color.start.green + color.start.blue) / 3;
  let endArg = (color.end.red + color.end.green + color.end.blue) / 3;
  endArg = (startArg + endArg) / 2;

  return {
    start: {
      red: startArg < 36 ? color.start.red : startArg-36,
      green: startArg < 6 ? color.start.green : startArg-6,
      blue: startArg < 41 ? startArg+20 : startArg+41
    },
    end: {
      red: endArg < 36 ? color.end.red : endArg-36,
      green: endArg < 6 ? color.end.green : endArg-6,
      blue: endArg < 41 ? startArg+20 : endArg+41
    }
  }
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
    
    this.backgroundToggle = false;
    this.lastBackground = null;

    // 배경 테스트용 값
    // let toggle = true;
    // window.setInterval(() => {
    //   toggle = !toggle;
    //   this.setState({
    //     color: {
    //       start: {
    //         red: toggle ? 0 : 255,
    //         green: 0,
    //         blue: 0
    //       },
    //       end: {
    //         red: 0,
    //         green: toggle ? 255 : 0,
    //         blue: 0
    //       }
    //     }
    //   });
    // }, 8000);
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

    let color = convertColorAsSkyStatus(this.state.color, skyStatus);
    console.log(skyStatus);
    console.log(color);

    let clarity = () => {
      return (<div className="clarity"> </div>)
    }

    let fontStyle = {
      "color": (color.start.red + color.start.green + color.start.blue) / 3 < 140 ? "#fff" : "#000"
    };

    return (
      <div className="home" >
        <SkyColorLayer color={color}/>
        {skyAttrs.isDefault && clarity()}
        <div className="top" style={fontStyle}>
          <div className="weather">
            {convertSkyCodeToName(this.state.skyStatus) + ", " + this.state.temperature + "°C"}
          </div>
          <div className="place">
            {"YONGIN"}
          </div>
        </div>
        <div className="bottom">
          <div className="infomation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 59.93" style={{fill:"white"}}><title>자산 1</title><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path d="M45.5,0H2A2,2,0,0,0,0,2V57.93a2,2,0,0,0,2,2H29l.36,0,.14,0,.23-.07.14-.08a1.06,1.06,0,0,0,.21-.11,1.42,1.42,0,0,0,.3-.25l16.5-16.5a1.87,1.87,0,0,0,.32-.42l.06-.12a2,2,0,0,0,.17-.48h0a1.58,1.58,0,0,0,0-.38V2A2,2,0,0,0,45.5,0ZM31,53.1V43.43h9.67ZM43.5,39.43H29a2,2,0,0,0-2,2v14.5H4V4H43.5Z"/><rect x="10.75" y="10.93" width="26" height="4"/><rect x="11" y="19.93" width="26" height="4"/><rect x="11" y="28.93" width="26" height="4"/></g></g></svg>
          </div>
        </div>
        <div className="center" style={fontStyle}>
          <div className="text">
            <div className="datetime">
              {this.state.date}
            </div>
            <div className="content">
              {newsArticles[0].title && <TextTypingControl text={newsArticles[0].title} speed={80}/>}
            </div>
          </div>
        </div>
        <div className="sky">
          <div style={{
            opacity: skyAttrs.cloudLevel == 1 ? 1 : 0
          }}>
            <CloudLayer windSpeed={this.state.windSpeed} cloudType={skyAttrs.cloudLevel} />
          </div>
          <div style={{
            opacity: skyAttrs.cloudLevel == 2 ? 1 : 0
          }}>
            <Cloud2Layer />
          </div>
          <div style={{
            opacity: skyAttrs.isOvercase ? 1 : 0
          }}>
            <OvercastLayer windSpeed={this.state.windSpeed}/>
          </div>
          <div style={{
            opacity: skyAttrs.isRain || skyAttrs.isSnow || skyAttrs.isThunder ? 1 : 0
          }}>
            <RainLayer 
              isRain={skyAttrs.isRain} 
              isSnow={skyAttrs.isSnow} 
              isThunder={skyAttrs.isThunder} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;