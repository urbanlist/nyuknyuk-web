import React from 'react';
import './OvercastLayer.styl';
import OvercastImage from '../../../assets/weather/cloud-body.svg';


class OvercastLayer extends React.Component {
  constructor(props) {
    super(props);

    this.amount = props.amount;
  }

  render() {
    return (
      <div className="overcast-layer">
        <div className="overcast-item"></div>
        <div className="overcast-item"></div>
        <div className="overcast-item"></div>
        <div className="overcast-item"></div>
        <div className="overcast-item"></div>
        <div className="overcast-item"></div>
      </div>
    )
  }
}


export default OvercastLayer;