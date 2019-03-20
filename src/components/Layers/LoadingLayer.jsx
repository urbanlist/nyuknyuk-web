import React from "react";
import "./LoadingLayer.styl";


class LoadingLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClose: false
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        isClose: true
      });
    }, 4000);
  }

  render() {
    if (this.state.isClose)
      return null;

    return (
      <div className="loading-layer">
        <div className="loading-center">
          <div className="loading-left loading-bar">
            <div className="bar bar-left"></div>
          </div>
          <div className="title">One Fine Day</div>
          <div className="loading-right loading-bar">
            <div className="bar bar-right"></div>
          </div>
        </div>
        <div className="loading-footer">
          <span>Urbanlist</span>
        </div>
      </div>
    )
  }
}


export default LoadingLayer;