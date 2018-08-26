import React from 'react';
import cloud from '../../../assets/weather/cloud.svg';
import Random from '../modules/Random.js';
import WeatherController from '../modules/WeatherController.js';
import NewsController from '../modules/NewsController.js';
import Timer from '../modules/Timer.js';
import CloudLayer from '../Layers/CloudLayer.jsx';
import OvercastLayer from '../Layers/OvercastLayer.jsx';
import './Home.styl';


let skyCodeToName = code => {
  let dic = {
    "SKY_A01":"맑음",
    "SKY_A02":"구름 조금",
    "SKY_A03":"구름 많음",
    "SKY_A04":"구름 많고 비",
    "SKY_A05":"구름 많고 눈",
    "SKY_A06":"구름 많고 비 또는 눈",
    "SKY_A07":"흐림",
    "SKY_A08":"흐리고 비",
    "SKY_A09":"흐리고 눈",
    "SKY_A10":"흐리고 비 또는 눈",
    "SKY_A11":"흐리고 낙뢰",
    "SKY_A12":"뇌우/비",
    "SKY_A13":"뇌우/눈",
    "SKY_A14":"뇌우/비 또는 눈",
    "none":"알 수 없음"
  }
  return dic[code];
}


let monthToName = month => {
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
        Random(0,window.innerWidth),
        Random(0,window.innerWidth),
        Random(0,window.innerWidth),
        Random(0,window.innerWidth)],
      date:'-',
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
        skyStatus: skyCodeToName(data.sky.status),
        windSpeed: data.wind.speed,
        color: data.color
      });
    });
  }

  setClock() {
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();

    this.setState({
      date: hour + ':' + min + ' ' + day + ', ' + monthToName(month) + ', ' + year
    });
  }

  render() {
    let newsArticles = this.state.newsArticles.length > 0 ? this.state.newsArticles : ["북미, 일부 성과에도 입장차 확인…후속협상에 공 넘겨"];
    let cloudPositions = this.state.cloudPositions;
    let getRandomStyle = (position) => {
      return {
        'left': position - 300,
        'visibility': position > 0 ? 'visible' : 'collapse',
        'transition': 'left linear 4s'
      }
    }

    let clouds = [];
    for(let idx = 0; idx < cloudPositions.length; idx++) {
      clouds.push(
        <div key={idx}>
          <img src={cloud} style={getRandomStyle(cloudPositions[idx])} />
        </div>
      )
    }

    let color = this.state.color;
    let background = `background linear-gradient(to bottom,rgb(${color.start.red}, ${color.start.green}, ${color.start.blue}) , rgb(${color.end.red}, ${color.end.green}, ${color.end.blue}))`;
    
    return (
      <div className="home" style={{
       "background" : background
      }}>
        <div className="top">
          <div className="weather">
            {this.state.skyStatus + ", " + this.state.temperature + "°C"}
          </div>
          <div className="place">
            {"SEOUL"}
          </div>
        </div>
        <div className="center">
          <div>
            <div className="datetime">
              {this.state.date}
            </div>
            <div className="content">
              {newsArticles[0].title}
            </div>
          </div>
        </div>
        <div className="background">
          {/* {clouds} */}
          {<CloudLayer windSpeed={this.state.windSpeed}/>}
          {/* <OvercastLayer windSpeed={this.state.windSpeed}/> */}
        </div>
      </div>
    )
  }
}

export default Home;