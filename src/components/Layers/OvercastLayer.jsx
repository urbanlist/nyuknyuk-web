import React from 'react';
import './OvercastLayer.styl';


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
    let overcasts = new Array(overcastCount).fill(1).map((_, i) => {
      return (<div key={i} className="overcast-item" style={{
        "animation": `overcast ${seconds}s linear infinite`
      }}></div>);
    });

    return (
      <div className="overcast-layer">
        {overcasts}
      </div>
    );
  }
}


export default OvercastLayer;