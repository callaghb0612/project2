import React, {useEffect} from 'react';
import './App.css';
import {Quiz} from './quiz';
import {Question} from './question'
import {useSelector, useDispatch} from 'react-redux';
import {loadQuizesList} from './actions';

function App() {
  const quizes = useSelector(state => state.quizes);
  //this goes into each quiz, but when we select a quiz it is loaded with the questions so it wont really matter if it is the same for every quiz in the list
  const quizQuestions = useSelector(state => state.quizQuestions);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadQuizesList());
  }, [dispatch]);

  if(useSelector(state => state.isTakingQuiz)){
    //display the quiz

    return (
      <div id="site">
        <div id="header">Know-A-Bunch</div>
        <div id="questions">
          {quizQuestions.map(question => <Question key={question.q_num} question={question}/>)}
        </div>
      </div>
      );
  } else {
    return (
      <div id="site">
        <div id="header">Know-A-Bunch</div>
        <div id="quiz-list">
          {quizes.map(quiz => <Quiz key={quiz.id} quiz={quiz} id={quiz.id}/>)}
        </div>
      </div>
      );
    }
}

export default App;
