import React from "react";
import TimelineController from "../modules/TimelineController";
import classNames from 'classnames';
import "./TimelineControl.styl";


class TimelineControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timelines: [],
      timelineIndex: 0
    };
    this.timelineController = new TimelineController();
  }

  async componentDidMount() {
    console.log(await this.timelineController.getAsync());
    this.setState({
      timelines: await this.timelineController.getAsync(),
      timelineIndex: 0
    });
  }

  moveLeft() {
    let index = this.state.timelineIndex + 1;
    
    // 마지막
    if (index == this.state.timelines.length) {
      if (this.props.onEnd) {
        this.props.onEnd({});
      }
    }
    if (index > this.state.timelines.length) {
      if (this.props.onEnd) {
        this.props.onEnd({});
      }
      return;
    }
    
    const timeline = this.state.timelines[this.state.timelineIndex];
    this.setState({
      timelineIndex: index
    });
    if (this.props.onPointClick != null) {
      let date = new Date(timeline.viewTime);
      this.props.onPointClick({
        color: {
          start: {
            red: timeline.maxVectorRed,
            green: timeline.maxVectorGreen,
            blue: timeline.maxVectorBlue
          },
          end: {
            red: timeline.minVectorRed,
            green: timeline.minVectorGreen,
            blue: timeline.minVectorBlue
          }
        },
        skyStatus: timeline.skyStatus,
        newsArticles: timeline.newsHead,
        date: date,
        temperature: timeline.temperature ? timeline.temperature : '',
        windSpeed: timeline.windSpeed ? timeline.windSpeed : '',
      });
    };
  }

  render() {
    const timelines = this.state.timelines;
    if (timelines == null) {
      return <div></div>
    }

    const remainCount = timelines.length - this.state.timelineIndex;

    return (
      <div className="timeline-control">
        <button className={classNames({
          "arrow-left": true,
          "hidden": remainCount == 0
        })} onClick={e => this.moveLeft()}>
          <svg width="30" height="30">
            <line x1="4" x2="20" y1="16" y2="4" stroke={this.props.fontColor} strokeWidth="2"></line>
            <line x1="4" x2="20" y1="15" y2="26" stroke={this.props.fontColor} strokeWidth="2"></line>
          </svg>
          <div style={{color: this.props.fontColor}}>{remainCount} days</div>
        </button>
      </div>)
  }
}

export default TimelineControl;