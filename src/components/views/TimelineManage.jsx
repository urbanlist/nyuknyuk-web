import React from 'react';
import TimelineController from '../modules/TimelineController.js';
import TimelineModel from '../models/TimelineModel.js';
import SkyCodeConverter from '../helper/SkyCodeConverter.js';
import './TimelineManage.styl';


const timelineController = new TimelineController();

class TimelineItem extends React.Component {
  constructor(props) {
    super(props);

    this.clickDeleteAsync = this.clickDeleteAsync.bind(this);
  }

  async clickDeleteAsync() {
    const rowKey = this.props.item.rowKey;
    await timelineController.deleteAsync(rowKey);
    location.reload();
  }

  render() {
    const {
      item
    } = this.props;
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

    return (
      <div className="timeline-item">
        <div className="container">
          <div>
            {item.viewTime}
          </div>
          <div className="sky-image" style={{
            "backgroundImage": currentBackground
          }}></div>
          <div className="header">
            <a href={item.newsUrl} target="_blank">
              {item.newsHead}
            </a>
          </div>
          <div className="skhy-status">
            {SkyCodeConverter.codeToName(item.skyStatus)}
          </div>
          <div>
            <button onClick={e => this.clickDeleteAsync()}>삭제</button>
          </div>
        </div>
      </div>
    )
  }
}


class TimelineList extends React.Component {
  render() {
    const {
      list
    } = this.props;

    let key = 0;
    const items = list.map(i => {
      return (<TimelineItem key={key++} item={i}>
      </TimelineItem>)
    });

    return (
      <div>
        {items}
      </div>
    )
  }
}


const inputModel = {

}


class TimelineInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorStartRed: 0,
      colorStartGreen: 0,
      colorStartBlue: 0,
      colorEndRed: 0,
      colorEndGreen: 0,
      colorEndBlue: 0
    }

    this.weatherSelectDom = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    inputModel.skyStatus = "SKY_A01";
  }

  handleSubmit(event) {
    this.uploadAsync();
    event.preventDefault();
  }

  async uploadAsync() {
    const dateTimeNumber = Date.parse(`${inputModel.date} ${inputModel.time}`);
    const datetime = new Date(dateTimeNumber);
    const dateIso = datetime.toISOString();

    await timelineController.postAsync({
      maxVectorRed: this.state.colorStartRed,
      maxVectorGreen: this.state.colorStartGreen,
      maxVectorBlue: this.state.colorStartBlue,
      minVectorRed: this.state.colorEndRed,
      minVectorGreen: this.state.colorEndGreen,
      minVectorBlue: this.state.colorEndBlue,
      skyStatus: inputModel.skyStatus,
      temperature: inputModel.temperature,
      windSpeed: inputModel.windSpeed,
      newsHead: inputModel.newsHead,
      newsUrl: inputModel.newsUrl,
      viewTime: dateIso,
    });

    location.reload();
  }

  render() {
    const color = {
      start: {
        red: this.state.colorStartRed,
        green: this.state.colorStartGreen,
        blue: this.state.colorStartBlue
      },
      end: {
        red: this.state.colorEndRed,
        green: this.state.colorEndGreen,
        blue: this.state.colorEndBlue
      }
    }

    let currentBackground = `linear-gradient(to bottom,rgb(${color.start.red}, ${color.start.green}, ${color.start.blue}) , rgb(${color.end.red}, ${color.end.green}, ${color.end.blue}))`;

    return (
      <form className="timeline-input" onSubmit={this.handleSubmit}>
        <h2>
          데이터 입력
        </h2>
        <div>
          <label>
            날짜 :
            <input type="date" onChange={e => inputModel.date = e.target.value} />
          </label>
        </div>
        <div>
          <label>
            시간 :
            <input type="time"
              onChange={e => inputModel.time = e.target.value} />
          </label>
        </div>
        <div>
          <label >
            뉴스 제목 :
            <input type="text" placeholder="뉴스 제목"
              onChange={e => inputModel.newsHead = e.target.value} />
          </label>
        </div>
        <div>
          <label >
            뉴스 url :
            <input type="text" placeholder="뉴스 url"
              onChange={e => inputModel.newsUrl = e.target.value} />
          </label>
        </div>
        <div>
          <label>
            날씨 :
            <select ref={this.weatherSelectDom} onChange={e => {
              const dom = this.weatherSelectDom.current;
              const value = dom.options[dom.selectedIndex].value;
              inputModel.skyStatus = value;
            }}>
              <option value="SKY_A01">맑음</option>
              <option value="SKY_A02">구름 조금</option>
              <option value="SKY_A03">구름 많음</option>
              <option value="SKY_A04">구름 많음 + 비</option>
              <option value="SKY_A05">구름 많음 + 눈</option>
              <option value="SKY_A06">구름 많음 + 비 + 눈</option>
              <option value="SKY_A07">흐림</option>
              <option value="SKY_A08">흐림 + 비</option>
              <option value="SKY_A09">흐림 + 눈</option>
              <option value="SKY_A10">흐름 + 비 + 눈</option>
              <option value="SKY_A11">흐림 + 낙뢰</option>
              <option value="SKY_A12">뇌우 + 비</option>
              <option value="SKY_A13">뇌우 + 눈</option>
              <option value="SKY_A14">뇌우 + 비 + 눈</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            시작 색깔 :
            <input type="number" placeholder="red" value={this.state.colorStartRed}
              onChange={e => this.setState({ colorStartRed: e.target.value })} />
            <input type="number" placeholder="green" value={this.state.colorStartGreen}
              onChange={e => this.setState({ colorStartGreen: e.target.value })} />
            <input type="number" placeholder="blue" value={this.state.colorStartBlue}
              onChange={e => this.setState({ colorStartBlue: e.target.value })} />
          </label>
        </div>
        <div>
          <label>
            종료 색깔 :
            <input type="number" placeholder="red" value={this.state.colorEndRed}
              onChange={e => this.setState({ colorEndRed: e.target.value })} />
            <input type="number" placeholder="green" value={this.state.colorEndGreen}
              onChange={e => this.setState({ colorEndGreen: e.target.value })} />
            <input type="number" placeholder="blue" value={this.state.colorEndBlue}
              onChange={e => this.setState({ colorEndBlue: e.target.value })} />
          </label>
        </div>
        <div className="sky-image" style={{
          "backgroundImage": currentBackground
        }}></div>
        <div>
          <button>저장</button>
        </div>
      </form>
    )
  }
}


class TimelineManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }

  async componentDidMount() {
    await this.getTimeline();
  }

  async getTimeline() {
    let list = await timelineController.getAsync();
    this.setState({
      list: list
    });
  }

  render() {
    const {
      list
    } = this.state;

    return (
      <div className="timeline-manage">
        <TimelineInput />
        <TimelineList list={list} />
      </div>
    )
  }
}


export default TimelineManage;