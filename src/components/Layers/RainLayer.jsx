import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import Random from '../modules/Random.js';
import './RainLayer.styl';


const buildRain = () => {
  let margin = 80;
  let height = 20;

  let lines = [];
  for (let idx = 0; idx < 30; idx++) {
    let line = (<line key={idx} x1="20" y1="0" x2="20" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
      <animate
        attributeName="y1"
        from={idx * margin - height}
        to={(idx + 1) * margin - height}
        dur="3s"
        repeatCount="indefinite" />
      <animate
        attributeName="y2"
        from={idx * margin}
        to={(idx + 1) * margin}
        dur="3s"
        repeatCount="indefinite" />
    </line>);
    lines.push(line);
  }

  return lines;
}


const buildSnow = () => {
  let margin = 80;
  let height = 20;
  let half = 3;

  let snowes = [];
  for (let idx = 0; idx < 30; idx++) {
    let snow = (<g key={idx}>
      <line x1="20" y1="0" x2="20" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - height}
          to={(idx + 1) * margin - height}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin}
          to={(idx + 1) * margin}
          dur="3s"
          repeatCount="indefinite" />
      </line>
      <line x1="10" y1="0" x2="30" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - (height / 2)}
          to={(idx + 1) * margin - (height / 2)}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin - (height / 2)}
          to={(idx + 1) * margin - (height / 2)}
          dur="3s"
          repeatCount="indefinite" />
      </line>
      <line x1="13" y1="0" x2="26" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - (height / 2) - (half * 2)}
          to={(idx + 1) * margin - (height / 2) - (half * 2)}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin - (height / 2) + (half * 2)}
          to={(idx + 1) * margin - (height / 2) + (half * 2)}
          dur="3s"
          repeatCount="indefinite" />
      </line>
      <line x1="13" y1="0" x2="26" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - (height / 2) + (half * 2)}
          to={(idx + 1) * margin - (height / 2) + (half * 2)}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin - (height / 2) - (half * 2)}
          to={(idx + 1) * margin - (height / 2) - (half * 2)}
          dur="3s"
          repeatCount="indefinite" />
      </line>
    </g>);
    snowes.push(snow);
  }

  return snowes;
}


const buildThunder = () => {
  let startX = 2;
  let width = 40;
  let elementHeight = 80;

  let lines = [];
  for (let idx = 0; idx < 20; idx++) {
    let line = (<line key={idx} x1={idx % 2 == 0 ? startX : startX + width} y1={idx * elementHeight - idx} x2={idx % 2 == 1 ? startX : startX + width} y2={(idx + 1) * elementHeight - idx} stroke="rgb(255,255,255)" strokeWidth="2"></line>)
    lines.push(line);
  }

  return lines;
}


const buildElements = (count, isThunder, isRain, isSnow) => {
  let idx = 0;
  let elements = new Array(Math.round(count)).fill(1).map(i => {
    if (isThunder) {
      if (isSnow & isRain) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) :
          idx % 4 == 0 ? buildRain().map(i => i) : buildSnow().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      } else if (isSnow) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : buildSnow().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      } else if (isRain) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : buildRain().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      } else {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : null;
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      }
    } else {
      if (isSnow & isRain) {
        let element = idx % 2 == 0 ? buildSnow().map(i => i) : buildRain().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      } else if (isSnow) {
        let element = buildSnow().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      } else if (isRain) {
        let element = buildRain().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width="50px" height="120%">
            {element}
          </svg>
        </div>)
      }
    }
    return null;
  });
  return elements;
}


class RainLayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isRain = this.props.isRain;
    let isSnow = this.props.isSnow;
    let isThunder = this.props.isThunder;

    let count = (window.innerWidth * 2) / 80;

    let elements = buildElements(count, isThunder, isRain, isSnow);

    return (
      <div className="rain-layer">
        {elements}
      </div>
    )
  }
}

export default RainLayer;