import React from 'react';
import Timer from '../modules/Timer.js';
import Cloud from '../controls/Cloud.jsx';
import './CloudLayer.styl';


class CloudLayer extends React.Component {
  constructor(props) {
    super(props);
    
    let timerTicks = (window.innerWidth / 20) * 1000 / 3;
    this.timer = new Timer(this.buildCloud.bind(this), timerTicks);
    this.state = {
      cloudKeys: []
    };
    this.cloudId = 0;
  }

  buildCloud() {
    let cloudKeys = this.state.cloudKeys;

    cloudKeys.push(this.cloudId);
    if (cloudKeys.length >= 10) {
      cloudKeys.shift();
    }
    this.setState({
      cloudKeys: cloudKeys
    });
    this.cloudId += 1;
  }

  componentDidMount() {
    this.timer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    let cloudType = this.props.cloudType;
    if (cloudType != 1) {
      return (<div></div>);
    }

    let cloudSpeed = window.innerWidth / 20;

    return (
      <div className="cloud-layer">
        {
          this.state.cloudKeys.map(key => <Cloud key={key} viewTime={cloudSpeed} type={1}/>)
        }
      </div>
    )
  }
}


export default CloudLayer;