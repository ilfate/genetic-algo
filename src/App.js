import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import DevTools from 'mobx-react-devtools';
import Player from "./js/Player";

class App extends Component {
  render() {
    return (
        <div className="game-root">
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Player}/>
                </Switch>
            </BrowserRouter>
            <DevTools/>
        </div>
);
  }
}

export default App;
