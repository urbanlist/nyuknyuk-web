import React from 'react';
import './Cloud2Layer.styl';


class Cloud2Layer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let seconds = 15;

    let overcastCount = Math.floor(
      window.innerHeight/360
    ) + 1;
    let overcasts = new Array(overcastCount).fill(1).map((_, i) => {
      return (<div key={i} className="cloud2layer-item" style={{
        "animation": `overcast ${seconds}s linear infinite`
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