import React from 'react';
import cloud from '../../../assets/weather/cloud.svg';
import './Home.styl';

class Home extends React.Component {
  render() {
    let getRandomStyle = () => {
      let randomValue = Math.floor((Math.random() * 10) + 1);
      let width = randomValue * 30;
      let height = randomValue * 10;
      let startLeft = Math.floor((Math.random() * 100) + 1) * 3;
      return {
        'width': 450,
        'height': 150,
        'left': -startLeft - 600,
        'top':startLeft * 0.1
      }
    }
    let clouds = [];
    for(let idx = 0; idx < 4; idx++) {
      clouds.push(
        <img key={idx} src={cloud} style={getRandomStyle()} />
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