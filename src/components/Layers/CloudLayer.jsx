import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import cloud1 from '../../../assets/weather/cloud.svg';
import cloud2 from '../../../assets/weather/cloud2.svg';
import cloud3 from '../../../assets/weather/cloud3.svg';
import Random from '../modules/Random.js';
import './CloudLayer.styl';


class CloudLayer extends React.Component {
  constructor(props) {
    super(props);

    this.amount = props.amount;
  }

  componentDidMount() {
  }

  render() {
    let cloudType = this.props.cloudType;
    let seconds = ConvertWindSpeedToPixel(this.props.windSpeed);

    // todo: size에 따라 속도를 다르게 주어야함
    return (
      <div className="cloud-layer">
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className="cloud cloud-more" style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
      </div>
    )
  }
}


export default CloudLayer;