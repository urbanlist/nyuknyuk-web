import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import classnames from 'classnames';
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

    let cloudClass = classnames({
      "cloud": true,
      "cloud-type-1": cloudType == 1,
      "cloud-type-2": cloudType == 2,
    });

    // todo: size에 따라 속도를 다르게 주어야함
    return (
      <div className="cloud-layer">
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
        <div className={cloudClass} style={{
          "animation": `cloud ${seconds + Random(-3,7)}s ${Random(0, seconds)/3}s infinite linear`
        }}></div>
      </div>
    )
  }
}


export default CloudLayer;