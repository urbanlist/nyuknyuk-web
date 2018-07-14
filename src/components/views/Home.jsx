import React from 'react';
import cloud from '../../../assets/weather/cloud.svg';
import Random from '../modules/Random.js';
import './Home.styl';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudPositions: [
        Random(0,window.innerWidth),
        Random(0,window.innerWidth),
        Random(0,window.innerWidth),
        Random(0,window.innerWidth)]
    };
  }

  componentDidMount() {
    this.timer = window.setTimeout(this.moveCloud(), 100);
    this.timer = window.setInterval(this.moveCloud(), 4000);
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

  componentWillUnmount() {
    window.clearTimeout(this.timer);
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
    
    return (
      <div className="home">
        <div className="top">
          <div className="weather">
            {"Sunny, 20°C"}
          </div>
          <div className="place">
            {"SEOUL"}
          </div>
        </div>
        <div className="center">
          <div>
            <div className="datetime">
              {"16:27, 01, July, 2018"}
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