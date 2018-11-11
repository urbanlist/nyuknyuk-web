import React from "react";
import "./TimelineControl.styl";


const getTimelineViewWidth = () => {
  return window.innerWidth - 70 - 70;
}


class TimelineControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timelineBarStyle: {
        "transform": "translateX(0px)"
      }
    };
    this.scrollX = 0;
    this.timelineBar = React.createRef();
  }

  _moveToRight() {
    let controlWidth = this.timelineBar.current.clientWidth;
    let timelineWidth = controlWidth * -1 - 50;
    this.scrollX = this.scrollX - getTimelineViewWidth() + 20;
    if (this.scrollX < timelineWidth + getTimelineViewWidth())
      this.scrollX = timelineWidth + getTimelineViewWidth();

    this.setState({
      timelineBarStyle: {
        "transform": `translateX(${this.scrollX}px)`
      }
    });
  }

  _moveToLeft() {
    this.scrollX = this.scrollX + getTimelineViewWidth() - 20;
    if (this.scrollX > 0)
      this.scrollX = 0;

    this.setState({
      timelineBarStyle: {
        "transform": `translateX(${this.scrollX}px)`
      }
    });
  }

  _onPointClick1() {
    if (this.props.onPointClick)
      this.props.onPointClick({
        color: {
          start: {
            red: 30,
            green: 30,
            blue: 30
          },
          end: {
            red: 40,
            green: 40,
            blue: 40
          }
        },
        skyStatus: "SKY_A03"
      });
  }

  _onPointClick2() {
    if (this.props.onPointClick)
      this.props.onPointClick({
        color: {
          start: {
            red: 20,
            green: 10,
            blue: 10
          },
          end: {
            red: 40,
            green: 30,
            blue: 30
          }
        },
        skyStatus: "SKY_A11"
      });
  }

  _onTimelineTouchStart(e) {
    this.timelineTouchStartClientX = e.touches[0].clientX;
    this.isTimelineTouchStart = true;
  }

  _onTimelineTouchMove(e) {
    if (!this.isTimelineTouchStart)
      return;

    let touchClientX = e.touches[0].clientX;
    if (this.timelineTouchStartClientX - touchClientX > 50) {
      this._moveToRight();
      this.isTimelineTouchStart = false;
    } else if (this.timelineTouchStartClientX - touchClientX < -50) {
      this._moveToLeft();
      this.isTimelineTouchStart = false;
    }
  }

  render() {
    // transform translate3d(200px, 4px, 0)

    return (
      <div className="timeline-control">
        <div className="margin"></div>
        <button className="left" onClick={e => this._moveToLeft()} >(-</button>
        <div className="margin"></div>
        <div className="timeline-bar-control"
          onTouchStart={e => this._onTimelineTouchStart(e)} onTouchMove={e => this._onTimelineTouchMove(e)}>
          <div className="timeline-bar" style={this.state.timelineBarStyle} ref={this.timelineBar}>
            <div className="start-text">
              <span>2018.01.01</span>
            </div>
            <div className="start-bar"></div>
            <div className="middle-bar">
              <div className="bar"></div>
              <button className="time-point-button" onClick={e => this._onPointClick1()} style={{
                left: 50
              }}>
                <div className="time-point"></div>
              </button>
              <button className="time-point-button" onClick={e => this._onPointClick2()} style={{
                left: 150
              }}>
                <div className="time-point"></div>
              </button>
            </div>
            <div className="end-bar"></div>
            <div className="end-text">
              <span>TODAY</span>
            </div>
          </div>
        </div>
        <div className="margin"></div>
        <button className="right" onClick={e => this._moveToRight()}>-)</button>
        <div className="margin"></div>
      </div>)
  }
}

export default TimelineControl;