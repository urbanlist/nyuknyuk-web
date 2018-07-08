import './Index.styl';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import classnames from 'classnames';
import Home from './views/Home.jsx';

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
            <Route exact path={"/"} render={props => {
              return <Home />;
            }}/>
          </div>
        </Router> 
      </div>
    );
  }
}

export default Index