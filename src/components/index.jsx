import './Index.styl';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import classnames from 'classnames';
import Home from './views/Home.jsx';
import TimelineManage from './views/TimelineManage.jsx';
import TimelineWeather from './views/TimelineWeather.jsx';


const getPath = () => {
  if (PRODUCTION) {
    return "/content/one-fine-day";
  } else {
    return "";
  }
}


class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let indexClasses = classnames({
      'index': true,
      'index-background': true
    });

    return (
      <div className={indexClasses} >
        <Router ref={ref => this.router = ref}>
          <div className="router">
            <Route exact path={`${getPath()}/`} render={props => {
              return <Home />;
            }}/>
            <Route path={`${getPath()}/timelinemanage`} render={props => {
              return <TimelineManage />;
            }}/>
            <Route path={`${getPath()}/timelineweather`} render={props => {
              return <TimelineWeather />;
            }}/>
          </div>
        </Router> 
      </div>
    );
  }
}


export default Index