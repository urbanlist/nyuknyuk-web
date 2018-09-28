import React from 'react';
import classnames from 'classnames';
import Random from '../modules/Random.js';
import './Cloud.styl';
import Timer from '../modules/Timer.js';


class Cloud extends React.Component {
  constructor(props) {
    super(props);

    this.movement = Random(0, 20) - 40;
    this.height = Random(0, 50) - 20;

    this.viewTime = props.viewTime;

    this.state = {
      opacity: 0,
      transform: `translateX(${this.movement}vw)`
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        opacity: 1,
        transform: `translateX(${this.movement + 140}vw)`
      });
    }, 100);
    setTimeout(() => {
      this.setState({
        opacity: 0
      });
    }, (this.viewTime - 2) * 1000);
  }

  render() {
    let cloudClass = classnames({
      "cloud": true,
      "cloud-type-1": this.props.type == 1,
      "cloud-type-2": this.props.type != 1,
    });

    return (
      <div className="cloud-container" style={{
        "transform": `translateY(${this.height}vh)`
      }}>
        <div className={cloudClass} style={{
          "opacity": this.state.opacity,
          "transform": this.state.transform,
          "transition": this.state.opacity ? `opacity 2s linear, transform ${this.viewTime}s linear` : ""
        }}>

        </div>
      </div>
    )
  }
}


export default Cloud;