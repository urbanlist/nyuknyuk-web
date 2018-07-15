import React from 'react';
import cloud from '../../../assets/weather/cloud.svg';
import Random from '../modules/Random.js';
import WeatherController from '../modules/WeatherController.js';
import Timer from '../modules/Timer.js';
import './Home.styl';

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
      }
    };

    this.weatherController = new WeatherController();
    this.weatherTimer = new Timer(this.setWeather.bind(this), 60 * 1000);
    this.clockTimer = new Timer(this.setClock.bind(this), 60 * 1000);
  }

  componentDidMount() {
    this.weatherTimer.start();
    this.clockTimer.start();
    this.timer = window.setTimeout(this.moveCloud(), 100);
    this.timer = window.setInterval(this.moveCloud(), 4000);
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
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();

    this.setState({
      date: hour + ':' + min + ' ' + day + ', ' + month + ', ' + year
    });
  }

  moveCloud() {
    return () => {
      let arr = this.state.cloudPositions;
      for (let idx = 0; idx < arr.length; idx++) {
        if (arr[idx] > window.innerWidth + 450) {
          arr[idx] = 0;
        }
        else {
          arr[idx] += Random(100, window.innerWidth/2);
        }
      }
      this.setState({
        cloudPositions: arr
      });
    };
  }

  render() {
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
              {"북미, 일부 성과에도 입장차 확인…후속협상에 공 넘겨"}
            </div>
          </div>
        </div>
        <div className="background">
          {clouds}
        </div>
      </div>
    )
  }
}

export default Home;