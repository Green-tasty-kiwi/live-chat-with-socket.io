import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './assets/styles/index.css';
import App from './App';
import JSChat from './pages/JS-chat';
import ChatsList from './pages/chatsList'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App >
        <Switch>
          <Route exact path="/" component={ChatsList} />
          <Route path="/:chatId" exact component={JSChat} />
        </Switch>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
