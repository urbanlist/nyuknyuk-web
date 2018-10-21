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
    this.isLast = false;

    this.timer = new IntervalTimer(this.typing.bind(this), this.speed);
    this.state = {
      text: ""
    };
  }

  typing() {
    if (this.textLength <= this.pointer) {
      this.timer.stop();
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
    let last = this.isLast ? (<span class="continue">▪️</span>) : null;
    return (<div>
      <span>{this.state.text}</span>
      {last}
    </div>)
  }
}

export default TextTypingControl;