import React from 'react';
import classnames from 'classnames';
import IntervalTimer from '../modules/IntervalTimer.js';
import './TextTypingControl.styl';


class TextTypingControl extends React.Component {
  constructor(props) {
    super(props);

    this.speed = this.props.speed ? this.props.speed : 40;
    this.text = this.props.text ? this.props.text : "";
    this.isLastIcon = this.props.isLastIcon ? true : false;

    this.timer = new IntervalTimer(this.typing.bind(this), this.speed);
    this.state = {
      text: "",
      isLast: false
    };

    this.textLength = this.text.length;
    this.pointer = 0;
  }

  componentDidMount() {
    this.timer.start();
  }

  typing() {
    if (this.textLength <= this.pointer) {
      this.timer.stop();
      this.setState({
        isLast: true
      });
      return;
    }

    this.setState({
      text: this.state.text + this.text[this.pointer]
    });
    this.pointer += 1;
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    if (this.text != this.props.text) {
      this.text = this.props.text;
      this.textLength = this.text.length;
      this.pointer = 0;
      this.state.text = "";
      this.state.isLast = false;
      this.timer.start();
      return <div><p>|</p></div>;
    }

    let last = this.isLastIcon && this.state.isLast ? (<span className="next">|</span>) : null;
    let go = this.state.isLast ? "" : "|";

    return (<div className="text-typing-control">
      <p><span>{this.state.text}</span><span className="next">{go}</span></p>
      <p>{last}</p>
    </div>)
  }
}

export default TextTypingControl;