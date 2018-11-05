import React from 'react';
import classNames from 'classnames';
import Random from '../modules/Random.js';
import './StarLayer.styl';
import starImage from '../../../assets/weather/star.svg';


class StarLayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let starMargin = Math.floor(
      (window.innerHeight/9) * 3
    );

    let starMarginHeight = starMargin / 3;
    let starCount = Math.floor(Math.floor(window.innerWidth / starMarginHeight) / 2 + 1);
    let starItems1 = new Array(starCount).fill(1).map((_, i) => {
      return (
        <div key={i} className="star-item" style={{
          height: starMarginHeight,
          width: starMarginHeight * 2
        }}>
          <img src={starImage} alt="" style={{
            "animation": `star-ani1 ${Random(50, 70)/10}s ${Random(0, 60)/10}s linear infinite`
          }}/>
        </div>
      );
    });
    let starItems2 = new Array(starCount).fill(1).map((_, i) => {
      return (
        <div key={i} className="star-item" style={{
          height: starMarginHeight,
          width: starMarginHeight * 2
        }}>
          <img src={starImage} alt="" style={{
            "animation": `star-ani1 ${Random(50, 70)/10}s ${Random(0, 60)/10}s linear infinite`
          }}/>
        </div>
      );
    });

    return (
      <div className="star-layer">
        <div className="star-container">
          {starItems1}
        </div>
        <div className="star-container">
          <div style={{
            width: starMarginHeight,
            display: "inline-block"
          }}></div>
          {starItems2}
        </div>
      </div>
    );
  }
}


export default StarLayer;