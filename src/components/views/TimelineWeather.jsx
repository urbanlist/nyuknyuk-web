import React from 'react';
import WeatherController from '../modules/WeatherController.js';
import SkyCodeConverter from '../helper/SkyCodeConverter.js';
import './TimelineWeather.styl';


let weatherController = new WeatherController();


const createTimelineItem = (props) => {
  const item = props.raw;
  const color = {
    start: {
      red: item.maxVectorRed,
      blue: item.maxVectorBlue,
      green: item.maxVectorGreen
    },
    end: {
      red: item.minVectorRed,
      blue: item.minVectorBlue,
      green: item.minVectorGreen
    }
  }

  let currentBackground = `linear-gradient(to bottom,rgb(${color.start.red}, ${color.start.green}, ${color.start.blue}) , rgb(${color.end.red}, ${color.end.green}, ${color.end.blue}))`;

  return (<div className="item">
    <div className="title">{props.raw.timestamp} + 09:00</div>
    <div className="title">{props.news.articles[0].title}</div>
    <div className="sky-image" style={{
      "backgroundImage": currentBackground
    }}></div>
    <div className="title">{SkyCodeConverter.codeToName(props.raw.skyStatus)}</div>
    <div className="color">
      <div>
        <span>{props.raw.maxVectorRed}, </span>
        <span>{props.raw.maxVectorGreen}, </span>
        <span>{props.raw.maxVectorBlue}</span>
      </div>
      <div>
        <span>{props.raw.minVectorRed}, </span>
        <span>{props.raw.minVectorGreen}, </span>
        <span>{props.raw.minVectorBlue}</span>
      </div>
    </div>
  </div>);
}


class TimelineWeather extends React.Component {
  constructor(props) {
    super(props);

    this.inputDate = null;
    this.inputTime = null;

    this.state = {
      weatherList: new Array()
    };
  }

  componentDidMount() {
    // getWeathers();
  }

  getWeathers() {
    const dateTimeNumber = Date.parse(`${this.inputDate} ${this.inputTime}`);
    const datetime = new Date(dateTimeNumber);
    datetime.setTime(datetime.getTime());
    const dateIso = datetime.toISOString();

    weatherController.getWather(dateIso, data => {
      this.setState({
        weatherList: data
      });
    });
  }

  render() {
    let weathers = this.state.weatherList.map(i => {
      return createTimelineItem(i);
    });

    return (
      <div className="timeline-weather">
        <div className="search">
          <div>
            <label>
              날짜 :
            <input type="date" onChange={e => this.inputDate = e.target.value} />
            </label>
          </div>
          <div>
            <label>
              시간 :
            <input type="time"
                onChange={e => this.inputTime = e.target.value} />
            </label>
          </div>
          <div>
            <button onClick={e => this.getWeathers()}>검색</button>
          </div>
        </div>
        <div className="items">
          <div>시간별 표시</div>
          <div className="item">
            {weathers}
          </div>
        </div>
      </div>)
  }
}


export default TimelineWeather;