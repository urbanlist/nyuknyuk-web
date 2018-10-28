import React from 'react';
import classNames from 'classnames';
import './OvercastLayer.styl';


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
    return "overcast";
  } else if (size == 2) {
    return "overcast-size2";
  } else if (size == 3) {
    return "overcast-size3";
  }
  return "overcast";
}


class OvercastLayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let seconds = 15;
    let overcastCount = Math.floor(
      window.innerHeight/180
    ) + 1;

    let windowHalfHeight = Math.floor(
      window.innerHeight/2
    );
    let itemSize = createItemSize(windowHalfHeight);
    let animationName = createAnimationName(itemSize);

    let overcasts = new Array(overcastCount).fill(1).map((_, i) => {
      return (<div key={i} className={classNames({
        "overcast-item": itemSize == 1,
        "overcast-item-size2": itemSize == 2,
        "overcast-item-size3": itemSize == 3
      })} style={{
        "animation": `${animationName} ${seconds}s linear infinite`
      }}></div>);
    });

    // let overcasts = new Array(overcastCount).fill(1).map((_, i) => {
    //   return (<div key={i} className="overcast-item" style={{
    //     "animation": `overcast ${seconds}s linear infinite`
    //   }}></div>);
    // });

    return (
      <div className="overcast-layer">
        {overcasts}
      </div>
    );
  }
}


export default OvercastLayer;