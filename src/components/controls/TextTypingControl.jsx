import React from 'react';
import classnames from 'classnames';
import IntervalTimer from '../modules/IntervalTimer.js';
import './TextTypingControl.styl';


class TextTypingControl extends React.Component {
  constructor(props) {
    super(props);

    this.speed = this.props.speed ? this.props.speed : 40;
    this.text = this.props.text;
    this.textLength = this.text.length;
    this.pointer = 0;
    this.isLast = this.props.isLast ? true : false;

    this.timer = new IntervalTimer(this.typing.bind(this), this.speed);
    this.state = {
      text: "",
      isLast: false
    };
  }

  typing() {
    if (this.textLength <= this.pointer) {
      this.timer.stop();
      this.setState({
        isLast: this.isLast
      });
      return;
    }

    this.setState({
      text: this.state.text + this.text[this.pointer]
    });
    this.pointer += 1;
    // if (this.textLength == this.pointer) {

    // }
  }

  componentDidMount() {
    this.timer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    let last = this.state.isLast ? (<span class="next">_</span>) : null;
    return (<div>
      <p><span>{this.state.text}</span></p>
      <p>{last}</p>
    </div>)
  }
}

export default TextTypingControl;