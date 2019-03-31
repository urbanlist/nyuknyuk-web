import React from 'react';
import Timer from '../modules/Timer.js';
import Cloud from '../controls/Cloud.jsx';
import Random from '../modules/Random.js';
import './CloudLayer.styl';


const buildCloudHeight = () => {
  const val = Random(0, 35) - 13;
  return val;
}


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
    if (!this.props.isVisible){
      this.state.cloudKeys = [];
      return;
    }

    let cloudCount = 10;
    let cloudTuple = this.state.cloudKeys;

    let height = buildCloudHeight();
    let whileCount = 0;
    if (cloudTuple.length > 0) {
      let lastedCloudHeight = cloudTuple[cloudTuple.length-1][1];
      while (lastedCloudHeight + 20 > height &&
             lastedCloudHeight - 20 < height) {
        height = buildCloudHeight();
        whileCount += 1;
        if (whileCount > 100)
          return;
      }
    }

    cloudTuple.push(
      [this.cloudId, height]
    );

    if (cloudTuple.length >= cloudCount) {
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