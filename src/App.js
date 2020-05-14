import React, {useEffect} from 'react';
import './App.css';
import {Quiz} from './quiz';
import {useSelector, useDispatch} from 'react-redux';
import {loadQuizesList} from './actions';

function App() {
  const quizes = useSelector(state => state.quizes);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadQuizesList());
  }, [dispatch]);

  return (
    <div id="site">
      <div id="header">Know-A-Bunch</div>
      <div id="quiz-list">
        {quizes.map(quiz => <Quiz key={quiz.id} quiz={quiz} />)}
      </div>
      <div id="quiz-root:"></div>
    </div>
    );
}

export default App;
