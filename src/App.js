import React from 'react';
import './App.css';
import {Quiz} from './quiz';

function App() {
  const initialQuizes = [
    {title: "Temp Quiz", author: "Bryant W. Callaghan"},
    {title: "Temp Quiz 2", author: "Bryant W. Callaghan 2"},
  ];

  return (
    <div id="site">
      <div id="header">Know-A-Bunch</div>
      <div id="quiz-list">
        {initialQuizes.map(quiz => <Quiz quiz={quiz} />)}
      </div>
    </div>
    );
}

export default App;
