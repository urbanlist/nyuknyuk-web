import React from 'react';
import ConvertWindSpeedToPixel from '../modules/WindSpeed.js';
import Random from '../modules/Random.js';
import './RainLayer.styl';


const buildRain = () => {
  let margin = 80;
  let height = 18;

  let lines = [];
  for (let idx = 0; idx < 30; idx++) {
    let line = (<line key={idx} x1="20" y1="0" x2="20" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
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
  let margin = 100;
  let height = 12;
  let startX = 10;
  let maxWidth = 20;
  let width = 16;
  let degree = 1;
  let diagonalMinus = 2;

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
      <line x1={startX + maxWidth - width} y1="0" x2={startX + width} y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
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
      <line x1="16" y1="0" x2="24" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - (height / 2) - (degree * 2) - diagonalMinus}
          to={(idx + 1) * margin - (height / 2) - (degree * 2) - diagonalMinus}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin - (height / 2) + (degree * 2) + diagonalMinus}
          to={(idx + 1) * margin - (height / 2) + (degree * 2) + diagonalMinus}
          dur="3s"
          repeatCount="indefinite" />
      </line>
      <line x1="16" y1="0" x2="24" y2="100" stroke="rgb(255,255,255)" strokeWidth="1">
        <animate
          attributeName="y1"
          from={idx * margin - (height / 2) + (degree * 2) + diagonalMinus}
          to={(idx + 1) * margin - (height / 2) + (degree * 2) + diagonalMinus}
          dur="3s"
          repeatCount="indefinite" />
        <animate
          attributeName="y2"
          from={idx * margin - (height / 2) - (degree * 2) - diagonalMinus}
          to={(idx + 1) * margin - (height / 2) - (degree * 2) - diagonalMinus}
          dur="3s"
          repeatCount="indefinite" />
      </line>
    </g>);
    snowes.push(snow);
  }

  return snowes;
}


const buildValues = (from, to, count, position) => {
  let property = [];
  for (let idx = 0; idx <= count; idx++) {
    if (idx <= position) {
      property.push(from);
    } else {
      property.push(to);
    }
  }
  return property;
}


const buildKeyTimes = (count, position) => {
  let property = [];
  for (let idx = 0; idx <= count; idx++) {
    property.push(idx / count);
  }
  return property;
}


const buildThunder = () => {
  let startX = 2;
  let width = 40;
  let elementHeight = 80;
  let count = 20;
  let delay = 20;

  let lines = [];
  let time = "5s";
  for (let idx = 0; idx < count; idx++) {
    let x1 = idx % 2 == 0 ? startX : startX + width;
    let x2 = idx % 2 == 1 ? startX : startX + width;
    let y1 = idx * elementHeight - idx;
    let y2 = (idx + 1) * elementHeight - idx;

    let valuesX2 = buildValues(x1, x2, count, idx).concat(Array(delay + count).fill(x2)).join(";");
    let valuesY2 = buildValues(y1, y2, count, idx).concat(Array(delay + count).fill(y2)).join(";");
    let keyTimesX2 = buildKeyTimes(count + delay + count, idx).join(";");
    let keyTimesY2 = buildKeyTimes(count + delay + count, idx).join(";");
    
    let valuesX1 = Array(delay + count).fill(x1).concat(buildValues(x1, x2, count, idx)).join(";");
    let valuesY1 = Array(delay + count).fill(y1).concat(buildValues(y1, y2, count, idx)).join(";");
    let keyTimesX1 = buildKeyTimes(count + delay + count, idx).join(";");
    let keyTimesY1 = buildKeyTimes(count + delay + count, idx).join(";");

    let line = (<line key={idx}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgb(180,180,180)"
      strokeWidth="2">
      <animate
        attributeName="x2"
        begin={`${0}s`}
        values={valuesX2}
        keyTimes={keyTimesX2}
        dur={time}
        repeatCount="indefinite" />
      <animate
        attributeName="y2"
        begin={`${0}s`}
        values={valuesY2}
        keyTimes={keyTimesY2}
        dur={time}
        repeatCount="indefinite" />
      <animate
        attributeName="x1"
        begin={`${0}s`}
        values={valuesX1}
        keyTimes={keyTimesX1}
        dur={time}
        repeatCount="indefinite" />
      <animate
        attributeName="y1"
        begin={`${0}s`}
        values={valuesY1}
        keyTimes={keyTimesY1}
        dur={time}
        repeatCount="indefinite" />
    </line>)
    lines.push(line);
  }

  return lines;
}


const buildElements = (count, isThunder, isRain, isSnow) => {
  let idx = 0;
  let width = 50;

  let elements = new Array(Math.round(count)).fill(1).map(i => {
    if (isThunder) {
      if (isSnow & isRain) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) :
          idx % 4 == 0 ? buildRain().map(i => i) : buildSnow().map(i => i);
        return (<div key={idx++} className="thunder-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      } else if (isSnow) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : buildSnow().map(i => i);
        return (<div key={idx++} className="thunder-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      } else if (isRain) {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : buildRain().map(i => i);
        return (<div key={idx++} className="thunder-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      } else {
        let element = idx % 2 == 1 ? buildThunder().map(i => i) : null;
        return (<div key={idx++} className="thunder-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      }
    } else {
      if (isSnow & isRain) {
        let element = idx % 2 == 0 ? buildSnow().map(i => i) : buildRain().map(i => i);
        return (<div key={idx++} className="snow-rain-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      } else if (isSnow) {
        let element = buildSnow().map(i => i);
        return (<div key={idx++} className="snow-element">
          <svg width={width} height="120%">
            {element}
          </svg>
        </div>)
      } else if (isRain) {
        let element = buildRain().map(i => i);
        return (<div key={idx++} className="rain-element">
          <svg width={width} height="120%">
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