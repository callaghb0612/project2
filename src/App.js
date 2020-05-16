import React, {useEffect} from 'react';
import './App.css';
import {Quiz} from './quiz';
import {Quiz_Editable} from './quiz-editable';
import {Question} from './question'
import {Question_Editable} from './question-editable';
import {useSelector, useDispatch} from 'react-redux';
import {loadQuizesList, loadEditList} from './actions';

function App() {
  const quizes = useSelector(state => state.quizes);
  //this goes into each quiz, but when we select a quiz it is loaded with the questions so it wont really matter if it is the same for every quiz in the list
  const quizQuestions = useSelector(state => state.quizQuestions);
  const isTakingQuiz = useSelector(state => state.isTakingQuiz)
  const questionIndex = useSelector(state => state.quizQuestion);
  const isShowingAnswer = useSelector(state => state.isShowingQuestionAnswer);
  const isShowingResults = useSelector(state => state.showingResults);
  const numCorrect = useSelector(state => state.numCorrect);
  const numQuestions = useSelector(state => state.numQuestions);
  const quiz = useSelector(state => state.quizes[0]); //this is only called at the end of a quiz being taken, when the quiz is the only element in that array
  const isEditingQuizList = useSelector(state => state.isEditingQuizList);
  const isEditingQuiz = useSelector(state => state.isEditingQuiz);
  const quizBeingEdited = useSelector(state => state.quizBeingEdited);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadQuizesList());
  }, [dispatch]);

  function backToMenu(){
    dispatch(loadQuizesList());
  }

  function editList(){
    dispatch(loadEditList());
  }

  if(isTakingQuiz){
    if(isShowingResults){
      //show results
      return(
        <div id="site">
          <div id="header">Know-A-Bunch</div>
          <div id="app-root">
            <div id="results-box">
              <div id="quiz-title">{quiz.title}</div>
              <div id="score-sentence">You scored <span id="score">{numCorrect}/{numQuestions}</span></div>
              <button id="return-button" onClick={backToMenu}>Return To Menu</button>
            </div>
          </div>
        </div>
      )
    } else {
    //display the quiz
      return (
        <div id="site">
          <div id="header">Know-A-Bunch</div>
          <div id="app-root">
            <Question key={quizQuestions[questionIndex].q_num} question={quizQuestions[questionIndex]} isShowingAnswer={isShowingAnswer}/>
          </div>
        </div>
        );
    }
  } if(isEditingQuizList) {
      if(isEditingQuiz){
        //edit quiz
        return(
          <div id="sites-edit">
            <div id="header-edit">Know-A-Bunch</div>
            <div id="app-root-edit">
              {quizQuestions.map(question => <Question_Editable key={question.q_num} question={question}/>)}
              <button id="add-question-button">Add Question</button>
            </div>
          </div>
        );
      } else {
        //display the quiz list, with the edit/delete buttons instead of take quiz button, as well as the add quiz button
        return(
          <div id="site-edit">
            <div id="header-edit">Know-A-Bunch</div>
            <div id="app-root-edit">
              {quizes.map(quiz => <Quiz_Editable key={quiz.id} quiz={quiz} id={quiz.id}/>)}
              
            </div>
          </div>
        );
      } 
  } else {
    //display the main menu
    //quiz list and add/remove/edit buttons
    return (
      <div id="site">
        <div id="header">Know-A-Bunch</div>
        <div id="app-root">
          {quizes.map(quiz => <Quiz key={quiz.id} quiz={quiz} id={quiz.id}/>)}
         <div id="edit-button-div"><button id="edit-button" onClick={editList}>Edit Quiz List</button></div>
        </div>
      </div>
      );
    }
}

export default App;
