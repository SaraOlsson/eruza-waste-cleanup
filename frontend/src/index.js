import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EventApp from './EventApp';
import { HashRouter as BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <EventApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);