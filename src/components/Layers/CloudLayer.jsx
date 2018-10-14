import React from 'react';
import Timer from '../modules/Timer.js';
import Cloud from '../controls/Cloud.jsx';
import Random from '../modules/Random.js';
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
    let cloudTuple = this.state.cloudKeys;

    let height = Random(0, 50) - 10;
    if (cloudTuple.length > 0) {
      let lastedCloudHeight = cloudTuple[cloudTuple.length-1][1];
      while (lastedCloudHeight + 10 > height &&
             lastedCloudHeight - 10 < height) {
        height = Random(0, 50) - 20;
      }
    }

    cloudTuple.push(
      [this.cloudId, height]
    );

    if (cloudTuple.length >= 10) {
      cloudTuple.shift();
    }
    this.setState({
      cloudTuple: cloudTuple
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
          this.state.cloudKeys.map(tuple => <Cloud 
            key={tuple[0]}
            height={tuple[1]}
            viewTime={cloudSpeed} 
            type={1}/>)
        }
      </div>
    )
  }
}


export default CloudLayer;