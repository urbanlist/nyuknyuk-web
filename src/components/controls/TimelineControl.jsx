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
      },
      isVisibleLeft: false,
      isVisibleRight: true
    };
    this.scrollX = 0;
    this.timelineBar = React.createRef();
  }

  _moveToRight() {
    let isVisibleLeft = true;
    let isVisibleRight = true;

    let controlWidth = this.timelineBar.current.clientWidth;
    let timelineWidth = controlWidth * -1;
    this.scrollX = this.scrollX - getTimelineViewWidth() + 20;
    if (this.scrollX < timelineWidth + getTimelineViewWidth()) {
      this.scrollX = timelineWidth + getTimelineViewWidth();
      isVisibleRight = false;
    }

    this.setState({
      timelineBarStyle: {
        "transform": `translateX(${this.scrollX}px)`
      },
      isVisibleLeft: isVisibleLeft,
      isVisibleRight: isVisibleRight
    });
  }

  _moveToLeft() {
    let isVisibleLeft = true;
    let isVisibleRight = true;

    this.scrollX = this.scrollX + getTimelineViewWidth() - 20;
    if (this.scrollX > 0) {
      isVisibleLeft = false;
      this.scrollX = 0;
    }

    this.setState({
      timelineBarStyle: {
        "transform": `translateX(${this.scrollX}px)`
      },
      isVisibleLeft: isVisibleLeft,
      isVisibleRight: isVisibleRight
    });
  }

  _onPointClick1() {
    if (this.props.onPointClick)
      this.props.onPointClick({
        date: '2018. 7. 13. 21:46',
        temperature: '20',
        windSpeed: '-',
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
        newsArticles: [{
          title: "테스트1"
        }],
        skyStatus: "SKY_A02"
      });
  }

  _onPointClick2() {
    if (this.props.onPointClick)
      this.props.onPointClick({
        date: '2018. 3. 13. 21:46',
        temperature: '20',
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
        newsArticles: [{
          title: "테스트2"
        }],
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
    let controlWidth = 700;
    let blockAboutMonth = controlWidth / 12;

    let monthBars = new Array(11).fill(1).map((val,idx) => {
      return (
        <div className="month-bar" key={idx} style={{
          transform: `translateX(${(idx+1)*blockAboutMonth}px)`
        }}></div>
      )
    });
    let monthTextes = ["Jan.", "Feb.", "Mar.", "Apr.",
                      "May.", "Jun.", "Jul.", "Aug.",
                      "Sep.", "Oct.", "Nov."]
                      .map((val, idx) => {
                        return (
                          <div className="month-text" key={idx} style={{
                            transform: `translateX(${(idx+1)*blockAboutMonth}px)`
                          }}>{val}</div>
                        )
                      });

    return (
      <div className="timeline-control">
        <div className="margin"></div>
        <button className="left" onClick={e => this._moveToLeft()} style={{
          visibility: this.state.isVisibleLeft ? "visible" : "hidden"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.12 15.41">
            <g><g><polyline style={{
              "fill": "none",
              "stroke": "#fff",
              "strokeMiterlimit": 10,
              "strokeWidth": 2
            }} points="8.41 0.71 1.41 7.71 8.41 14.71" /></g></g>
          </svg>
        </button>
        <div className="margin-8px"></div>
        <div className="timeline-bar-control"
          onTouchStart={e => this._onTimelineTouchStart(e)} onTouchMove={e => this._onTimelineTouchMove(e)}>
          <div className="timeline-bar" style={this.state.timelineBarStyle} ref={this.timelineBar}>
            <div className="start-text">
              <p>2018</p>
              <p>01.01</p>
            </div>
            <div className="start-bar"></div>
            <div className="middle-bar">
              <div className="bar"></div>
              {monthBars}
              {monthTextes}
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
              <p>TODAY</p>
            </div>
          </div>
        </div>
        <div className="margin-8px"></div>
        <button className="right" onClick={e => this._moveToRight()} style={{
          visibility: this.state.isVisibleRight ? "visible" : "hidden"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.12 15.41">
            <g><g><polyline style={{
              "fill": "none",
              "stroke": "#fff",
              "strokeMiterlimit": 10,
              "strokeWidth": 2
            }} points="0.71 0.71 7.71 7.71 0.71 14.71" /></g></g>
          </svg>
        </button>
        <div className="margin"></div>
      </div>)
  }
}

export default TimelineControl;