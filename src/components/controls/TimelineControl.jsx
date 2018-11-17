import React from "react";
import "./TimelineControl.styl";


const getData = () => {
  return {
    data: [
      {
        dateStr: '2018.08.02 오후 6:14',
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
          title: "효도관광 길 네 모녀 역주행 차량에 '날벼락'"
        }],
        skyStatus: "SKY_A02"
      },
      {
        dateStr: '2018.08.18. 15:33',
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
          title: "부산 아파트 엘리베이터에서 20대 경비원 추락사"
        }],
        skyStatus: "SKY_A11"
      },
    ]
  };
}


const getMonthNameList = ["Jan.", "Feb.", "Mar", "Apr.",
  "May.", "Jun.", "Jul.", "Aug.",
  "Sep.", "Oct.", "Nov.", "Dec."]


const getMonthNames = (month) => {
  let list = getMonthNameList.concat(getMonthNameList);
  return list.splice(month + 1, 11);
}


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

  _onPointClick(model) {
    if (this.props.onPointClick)
      this.props.onPointClick(model);
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

    let monthBars = new Array(11).fill(1).map((val, idx) => {
      return (
        <div className="month-bar" key={idx} style={{
          transform: `translateX(${(idx + 1) * blockAboutMonth}px)`
        }}></div>
      )
    });

    let monthList = getMonthNames(11);
    let monthTextes = monthList
      .map((val, idx) => {
        return (
          <div className="month-text" key={idx} style={{
            transform: `translateX(${(idx + 1) * blockAboutMonth}px)`
          }}>{val}</div>
        )
      });

    let newsPoints = getData().data.map((val, idx) => {
      return (
        <button className="time-point-button" key={idx} onClick={e => this._onPointClick(val)} style={{
          left: 50 + idx * 50
        }}>
          <div className="time-point"></div>
        </button>
      );
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
              {newsPoints}
              {/* <button className="time-point-button" onClick={e => this._onPointClick1()} style={{
                left: 50
              }}>
                <div className="time-point"></div>
              </button>
              <button className="time-point-button" onClick={e => this._onPointClick2()} style={{
                left: 150
              }}>
                <div className="time-point"></div>
              </button> */}
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