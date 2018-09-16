import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import './OvercastLayer.styl';


class OvercastLayer extends React.Component {
  constructor(props) {
    super(props);

    this.amount = props.amount;
  }

  componentDidMount() {
  }

  render() {
    let width = window.innerWidth;
    let pixelDistancePerSec = this.props.windSpeed * 10;
    // let seconds = ConvertWindSpeedToPixel(this.props.windSpeed);
    let seconds = 15;

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