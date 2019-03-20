import React from 'react';
import classnames from 'classnames';
import IntervalTimer from '../modules/IntervalTimer.js';
import './TextFadeInControl.styl';


class TextFadeInControl extends React.Component {
  constructor(props) {
    super(props);

    this.timer = new IntervalTimer(this.typing.bind(this), this.props.speed);
    this.state = {
      text: this.props.text,
      visible: false
    };
    this.text = this.state.text;
  }

  componentDidMount() {
    this.timer.start();
  }

  typing() {
    this.setState({
      text: this.props.text,
      visible: true
    });
    this.timer.stop();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    if (this.text != this.props.text) {
      this.text = this.props.text;
      
      this.timer.start();
      return <div><p></p></div>;
    }

    return (<div className="text-fadein-control">
      <p className="text ani">{this.props.text}</p>
    </div>)
  }
}

export default TextFadeInControl;