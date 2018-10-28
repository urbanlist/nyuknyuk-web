import React from 'react';
import classNames from 'classnames';
import './Cloud2Layer.styl';


const createItemSize = (windowSize) => {
  let itemSize = 1;
  if (windowSize < 400) {
    itemSize = 1;
  } else if (windowSize < 600) {
    itemSize = 2;
  } else {
    itemSize = 3;
  }
  return itemSize;
}


const createAnimationName = (size) => {
  if (size == 1) {
    return "cloud2layer-ani";
  } else if (size == 2) {
    return "cloud2layer-ani-size2";
  } else if (size == 3) {
    return "cloud2layer-ani-size3";
  }
  return "cloud2layer-ani";
}


class Cloud2Layer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let seconds = 15;
    let windowHalfHeight = Math.floor(
      window.innerHeight/2
    );
    let itemSize = createItemSize(windowHalfHeight);
    let animationName = createAnimationName(itemSize);

    let overcasts = new Array(2).fill(1).map((_, i) => {
      return (<div key={i} className={classNames({
        "cloud2layer-item": itemSize == 1,
        "cloud2layer-item-size2": itemSize == 2,
        "cloud2layer-item-size3": itemSize == 3
      })} style={{
        "animation": `${animationName} ${seconds}s linear infinite`
      }}></div>);
    });

    return (
      <div className="cloud2layer-layer">
        {overcasts}
      </div>
    );
  }
}


export default Cloud2Layer;