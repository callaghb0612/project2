import React, {usestate} from 'react';
import './App.css';
import { QuizBuilder } from './QuizBuilder';

function loadBuilder(){
  this.usestate
}

function App() {
  return (
    <div id="root">
      <div id="header"><span id="title">Know-A-Bunch</span><span id="add-button" onClick={() => loadBuilder()}>+</span></div>
      <div id="content">
        <div id="content-builder" hidden>
        {QuizBuilder()}
        </div>
      </div>
    </div>
  );
}

export default App;
