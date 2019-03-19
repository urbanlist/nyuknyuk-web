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
import StarLayer from '../Layers/StarLayer.jsx';
import TextTypingControl from '../controls/TextTypingControl.jsx';
import LoadingLayer from '../Layers/LoadingLayer.jsx';
import EpilogLayer from '../Layers/EpilogLayer.jsx';
import TimelineControl from '../controls/TimelineControl.jsx';
import './Home.styl';
import DateTimeHelper from '../helper/DateTimeHelper.js';

import icn_a01 from '../../../assets/icn/icn_a01.svg';
import icn_a02 from '../../../assets/icn/icn_a02.svg';
import icn_a03 from '../../../assets/icn/icn_a03.svg';
import icn_a04 from '../../../assets/icn/icn_a04.svg';
import icn_a05 from '../../../assets/icn/icn_a05.svg';
import icn_a06 from '../../../assets/icn/icn_a06.svg';
import icn_a07 from '../../../assets/icn/icn_a07.svg';
import icn_a08 from '../../../assets/icn/icn_a08.svg';
import icn_a09 from '../../../assets/icn/icn_a09.svg';
import icn_a10 from '../../../assets/icn/icn_a10.svg';
import icn_a11 from '../../../assets/icn/icn_a11.svg';
import icn_a12 from '../../../assets/icn/icn_a12.svg';
import icn_a13 from '../../../assets/icn/icn_a13.svg';
import icn_a14 from '../../../assets/icn/icn_a14.svg';


const removeNewsCompanyName = str => {
  let split = str.split('-');
  if (split.length > 1) {
    return str.replace(`-${split[split.length-1]}`, '');
  } else {
    return str;
  }
}


const convertSkyCodeToName = code => {
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

  let startArg = Math.floor((color.start.red + color.start.green + color.start.blue) / 3);
  let endArg = Math.floor((color.end.red + color.end.green + color.end.blue) / 3);
  endArg = Math.floor((startArg + endArg) / 2);

  return {
    start: {
      red: startArg < 36 ? color.start.red : startArg - 36,
      green: startArg < 6 ? color.start.green : startArg - 6,
      blue: startArg < 41 ? startArg + 20 : startArg + 41
    },
    end: {
      red: endArg < 36 ? color.end.red : endArg - 36,
      green: endArg < 6 ? color.end.green : endArg - 6,
      blue: endArg < 41 ? startArg + 20 : endArg + 41
    },
    isNight: endArg < 50
  }
}


const convertSkyCodeToParameter = code => {
  let result = {
    isDefault: false,
    isSnow: false,
    isRain: false,
    isThunder: false,
    isOvercase: false,
    cloudLevel: 0,
    weatherIcon: icn_a01
  };

  switch (code) {
    case "SKY_A01":
      result.isDefault = true;
      result.weatherIcon = icn_a01;
      return result;
    case "SKY_A02":
      result.cloudLevel = 1;
      result.weatherIcon = icn_a02;
      return result;
    case "SKY_A03":
      result.cloudLevel = 2;
      result.weatherIcon = icn_a03;
      return result;
    case "SKY_A04":
      result.cloudLevel = 2;
      result.weatherIcon = icn_a04;
      result.isRain = true;
      return result;
    case "SKY_A05":
      result.cloudLevel = 2;
      result.weatherIcon = icn_a05;
      result.isSnow = true;
      return result;
    case "SKY_A06":
      result.cloudLevel = 2;
      result.isRain = true;
      result.weatherIcon = icn_a06;
      result.isSnow = true;
      return result;
    case "SKY_A07":
      result.isOvercase = true;
      result.weatherIcon = icn_a07;
      return result;
    case "SKY_A08":
      result.isOvercase = true;
      result.weatherIcon = icn_a08;
      result.isRain = true;
      return result;
    case "SKY_A09":
      result.isOvercase = true;
      result.weatherIcon = icn_a09;
      result.isSnow = true;
      return result;
    case "SKY_A10":
      result.isOvercase = true;
      result.weatherIcon = icn_a10;
      result.isRain = true;
      result.isSnow = true;
      return result;
    case "SKY_A11":
      result.isOvercase = true;
      result.isThunder = true;
      result.weatherIcon = icn_a11;
      return result;
    case "SKY_A12":
      result.isOvercase = true;
      result.isThunder = true;
      result.isRain = true;
      result.weatherIcon = icn_a12;
      return result;
    case "SKY_A13":
      result.isOvercase = true;
      result.isThunder = true;
      result.isSnow = true;
      result.weatherIcon = icn_a13;
      return result;
    case "SKY_A14":
      result.isOvercase = true;
      result.isThunder = true;
      result.isRain = true;
      result.isSnow = true;
      result.weatherIcon = icn_a14;
      return result;
    default:
      return result;
  }
}


const convertMonthToName = month => {
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


const createRightIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.12 15.41">
    <g><g><polyline style={{
      "fill": "none",
      "stroke": "#fff",
      "strokeMiterlimit": 10,
      "strokeWidth": 2
    }} points="0.71 0.71 7.71 7.71 0.71 14.71" /></g></g>
  </svg>);
}


const ViewMode = {
  News: 0,
  Epilog: 1,
  Timeline: 2
}

const BottomViewMode = {
  Main: 0,
  Epilog: 1,
  Timeline: 2,
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
      dateStr: '-',
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
      newsArticles: [],
      viewMode: ViewMode.News,
      bottomViewMode: BottomViewMode.Main
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
    //   console.log("change color");
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
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.weatherTimer.start();
    this.clockTimer.start();
  }

  stopTimer() {
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
    this.newsController.get(data => {
      this.setState({
        newsArticles: data.articles
      });
    });
  }

  setClock() {
    let date = new Date();
    this.setState({
      dateStr: DateTimeHelper.toStringForNyukNyuk(date)
    });
  }

  viewEpilog() {
    this.stopTimer();
    this.setState({
      viewMode: ViewMode.Epilog,
      bottomViewMode: BottomViewMode.Epilog,
      color: {
        start: {
          red: 150,
          green: 150,
          blue: 190
        },
        end: {
          red: 100,
          green: 100,
          blue: 140
        }
      },
      skyStatus: "SKY_A02"
    });
  }

  viewTimeline() {
    this.stopTimer();
    this.setState({
      viewMode: ViewMode.Timeline,
      bottomViewMode: BottomViewMode.Timeline
    });
  }

  viewMain() {
    this.startTimer();
    this.setState({
      viewMode: ViewMode.News,
      bottomViewMode: BottomViewMode.Main
    });
  }

  onTimelinePointClick(data) {
    this.setState({
      viewMode: ViewMode.Timeline,
      color: data.color,
      skyStatus: data.skyStatus,
      newsArticles: [{
        title: data.newsArticles
      }],
      dateStr: DateTimeHelper.toStringForNyukNyuk(data.date),
      temperature: data.temperature,
      windSpeed: data.windSpeed,
    });
  }

  render() {
    let parsed = getURLParam(location.search, "sky");
    let skyStatus = this.state.skyStatus;
    if (parsed) {
      skyStatus = parsed;
    }
    let skyAttrs = convertSkyCodeToParameter(skyStatus);

    let newsArticles = this.state.newsArticles.length > 0 ? this.state.newsArticles : [{ title: "-" }];

    let color = convertColorAsSkyStatus(this.state.color, skyStatus);

    let clarity = () => {
      return (<div className="clarity"> </div>)
    }

    let fontColor = (color.start.red + color.start.green + color.start.blue) / 3 < 140 ? "#fff" : "#000";

    return (
      <div className="home">
        <SkyColorLayer color={color} />
        {skyAttrs.isDefault && color.isNight == false && clarity()}
        {(this.state.viewMode == ViewMode.News || this.state.viewMode == ViewMode.Timeline) && <div className="top" style={{ "color": fontColor }}>
          <div className="weather-img">
            <img src={skyAttrs.weatherIcon} />
          </div>
          <div className="weather">
            <div>{convertSkyCodeToName(this.state.skyStatus) + ", " + this.state.temperature + "°C"}</div>
          </div>
          <div className="place">
            {"Korea"}
          </div>
        </div>}
        <div className="bottom">
          {this.state.bottomViewMode == BottomViewMode.Main && <div className="bottom-main">
            <button className="timeline" onClick={e => this.viewTimeline()}>
              <span style={{ "color": fontColor }}>ONE FINE DAYS</span>
              {createRightIcon()}
            </button>
            <button className="epilog" onClick={e => this.viewEpilog()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 59.93" style={{ fill: fontColor }}><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path d="M45.5,0H2A2,2,0,0,0,0,2V57.93a2,2,0,0,0,2,2H29l.36,0,.14,0,.23-.07.14-.08a1.06,1.06,0,0,0,.21-.11,1.42,1.42,0,0,0,.3-.25l16.5-16.5a1.87,1.87,0,0,0,.32-.42l.06-.12a2,2,0,0,0,.17-.48h0a1.58,1.58,0,0,0,0-.38V2A2,2,0,0,0,45.5,0ZM31,53.1V43.43h9.67ZM43.5,39.43H29a2,2,0,0,0-2,2v14.5H4V4H43.5Z" /><rect x="10.75" y="10.93" width="26" height="4" /><rect x="11" y="19.93" width="26" height="4" /><rect x="11" y="28.93" width="26" height="4" /></g></g></svg>
            </button>
          </div>}
          {this.state.bottomViewMode == BottomViewMode.Timeline && <div className="timeline">
            <TimelineControl onPointClick={e => this.onTimelinePointClick(e)} fontColor={fontColor}/>
          </div>}
          {this.state.bottomViewMode == BottomViewMode.Timeline && <div className="back-to-main">
            <button className="back-to-main" onClick={e => this.viewMain()}>
              <span style={{ "color": fontColor }}>오늘로 돌아가기 ></span>
              <div className="line" style={{ "backgroundColor": fontColor }}></div>
            </button>
          </div>}
          {/* <div className="infomation">
            {this.state.viewMode == ViewMode.News && <button className="epilog-btn" onClick={e => this.viewEpilog()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 59.93" style={{ fill: fontColor }}><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path d="M45.5,0H2A2,2,0,0,0,0,2V57.93a2,2,0,0,0,2,2H29l.36,0,.14,0,.23-.07.14-.08a1.06,1.06,0,0,0,.21-.11,1.42,1.42,0,0,0,.3-.25l16.5-16.5a1.87,1.87,0,0,0,.32-.42l.06-.12a2,2,0,0,0,.17-.48h0a1.58,1.58,0,0,0,0-.38V2A2,2,0,0,0,45.5,0ZM31,53.1V43.43h9.67ZM43.5,39.43H29a2,2,0,0,0-2,2v14.5H4V4H43.5Z" /><rect x="10.75" y="10.93" width="26" height="4" /><rect x="11" y="19.93" width="26" height="4" /><rect x="11" y="28.93" width="26" height="4" /></g></g></svg>
            </button>}
          </div> */}
        </div>
        {(this.state.viewMode == ViewMode.News || this.state.viewMode == ViewMode.Timeline) && (<div className="center" style={{ "color": fontColor }}>
          <div className="text">
            <div className="datetime">
              {this.state.dateStr}
            </div>
            <div className="content">
              <TextTypingControl 
                text={removeNewsCompanyName(newsArticles[0].title)} 
                speed={80} />
            </div>
          </div>
        </div>)}
        <div className="sky">
          <div style={{
            opacity: skyAttrs.cloudLevel == 1 ? 1 : 0
          }}>
            <CloudLayer windSpeed={this.state.windSpeed} cloudType={skyAttrs.cloudLevel} isVisible={skyAttrs.cloudLevel == 1} />
          </div>
          <div style={{
            opacity: skyAttrs.cloudLevel == 2 ? 1 : 0
          }}>
            <Cloud2Layer />
          </div>
          <div style={{
            opacity: skyAttrs.isOvercase ? 1 : 0
          }}>
            <OvercastLayer windSpeed={this.state.windSpeed} />
          </div>
          <div style={{
            opacity: skyAttrs.isRain || skyAttrs.isSnow || skyAttrs.isThunder ? 1 : 0
          }}>
            <RainLayer
              isRain={skyAttrs.isRain}
              isSnow={skyAttrs.isSnow}
              isThunder={skyAttrs.isThunder} />
          </div>
          <div style={{
            opacity: (this.state.skyStatus == "SKY_A01" || this.state.skyStatus == "SKY_A02") && (color.isNight == true) ? 1 : 0
          }}>
            <StarLayer />
          </div>
        </div>
        {PRODUCTION && <LoadingLayer />}
        {this.state.viewMode == ViewMode.Epilog && <EpilogLayer />}
      </div>
    )
  }
}

export default Home;