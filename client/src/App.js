import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';

import Login from './components/Login'
// import Game from './components/Game';
import Canvas from './components/Canvas';


function App() {
  const [username, setUserName] = useState("")
  const [accesscode, setAccessCode] = useState("")

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login setAccessCode={setAccessCode} setUserName={setUserName} username={username} accesscode={accesscode} />
        </Route>
        <Route exact path="/game/:accesscode">
          <Canvas/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
