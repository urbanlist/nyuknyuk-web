import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import './OvercastLayer.styl';
import OvercastImage from '../../../assets/weather/cloud-body.svg';


class OvercastLayer extends React.Component {
  constructor(props) {
    super(props);

    this.amount = props.amount;
  }

  render() {
    let width = window.innerWidth;
    let pixelDistancePerSec = windSpeed * 10;
    let seconds = ConvertWindSpeedToPixel(this.props.windSpeed);

    return (
      <div className="overcast-layer">
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
        <div className="overcast-item" style={{
          "animation": `overcast ${seconds}s linear infinite`
        }}></div>
      </div>
    )
  }
}


export default OvercastLayer;