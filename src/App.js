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
  const isTakingQuiz = useSelector(state => state.isTakingQuiz)
  const questionIndex = useSelector(state => state.quizQuestion);
  const isShowingAnswer = useSelector(state => state.isShowingAnswer);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadQuizesList());
  }, [dispatch]);

  if(isTakingQuiz){
    //display the quiz
    return (
      <div id="site">
        <div id="header">Know-A-Bunch</div>
        <div id="app-root">
           <Question key={quizQuestions[questionIndex].q_num} question={quizQuestions[questionIndex]} isShowingAnswer={isShowingAnswer}/>)}
        </div>
      </div>
      );
  } else {
    return (
      <div id="site">
        <div id="header">Know-A-Bunch</div>
        <div id="app-root">
          {quizes.map(quiz => <Quiz key={quiz.id} quiz={quiz} id={quiz.id}/>)}
        </div>
      </div>
      );
    }
}

export default App;
