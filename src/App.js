import React, {usestate} from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {StartBuilding} from './actions';



function App() {
  const buildingQuiz = useSelector(state => state.buildingQuiz);
  const dispatch = useDispatch();

  const newQuiz = () => {
    document.getElementById("quizBuilder").toggleAttribute('hidden');
    document.getElementById("quiz-list").toggleAttribute('hidden');
    dispatch(StartBuilding());
  }

  const quizQuestions = useSelector(state => state.questions)

  return (
    <div id="root">
      <div id="header"><span id="title">Know-A-Bunch</span><span id="add-button" onClick={newQuiz}>New Quiz</span></div>
      <div id="content">
        <div id="quizBuilder" hidden>
          <div id="title-quiz">Quiz name: <input id="title-input" type="text"/></div>
          <div id="add-question-button">+</div>
        </div>
        <div id='quiz-list'>

        </div>
      </div>
    </div>
  );
}

export default App;
