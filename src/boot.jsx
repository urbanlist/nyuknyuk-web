import './boot.styl';
import Index from './components/Index.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'; // required

function creatMainComponent() {
  let element = document.createElement('div');
  element.innerHTML = "Loading...";
  element.id = "boot";
  return element;
}
document.body.appendChild(creatMainComponent());
RenderApp();

function RenderApp() {
  ReactDOM.render(
  <AppContainer>
    <Index/>
  </AppContainer>, document.getElementById('boot'));
}

if (module.hot) {
  module
    .hot
    .accept('./components/Index.jsx', function () {
      RenderApp();
    })
}