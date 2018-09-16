import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import './Cloud2Layer.styl';


class Cloud2Layer extends React.Component {
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
      <div className="cloud2layer-layer">
        <div className="cloud2layer-item" style={{
          "animation": `cloud2layer ${seconds}s linear infinite`
        }}></div>
        <div className="cloud2layer-item" style={{
          "animation": `cloud2layer ${seconds}s linear infinite`
        }}></div>
      </div>
    )
  }
}


export default Cloud2Layer;