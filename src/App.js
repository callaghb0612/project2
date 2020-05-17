import React, {useEffect, useState} from 'react';
import './App.css';
import {Quiz} from './quiz';
import {QuizEditable} from './quiz-editable';
import {Question} from './question'
import {QuestionEditable} from './question-editable';
import {useSelector, useDispatch} from 'react-redux';
import {loadQuizesList, loadEditList, createNewMC, createNewShort, loadQuizEditor, exitEditMode, saveQuizSettings, createQuiz} from './actions';

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
  const isWaiting = useSelector(state => state.isWaiting); //for loading indicator
  const dispatch = useDispatch();

  //for editing a specific quiz
  let quizTitle= useState();
  let quizAuthor = useState();
  

  const editTitle = (event) => {
    quizTitle = event.target.value;
  }

  const editAuthor = (event) => {
    quizAuthor = event.target.value;
  }


  useEffect(() =>{
    dispatch(loadQuizesList());
  }, [dispatch]);

  function backToMenu(){
    dispatch(loadQuizesList());
  }

  function editList(){
    dispatch(loadEditList());
  }

  //these add new multiple choice questions and short answer questions, etc.
  const addMC = () => {
    dispatch(createNewMC(quizBeingEdited, numQuestions + 1));
    dispatch(loadQuizEditor(quizBeingEdited));
  }

  const addShort = () =>{
    dispatch(createNewShort(quizBeingEdited, numQuestions + 1));
    dispatch(loadQuizEditor(quizBeingEdited));
  }

  const exitEdit = () => {
    dispatch(exitEditMode());
  }

  const returnToEditList = () => {
    dispatch(loadEditList())
  }

  const saveQuiz = () => {
    dispatch(saveQuizSettings(quizTitle, quizAuthor, quizBeingEdited));
  }

  const addQuiz = () => {
    dispatch(createQuiz());
  }

  //defines whether the site should be pulsing or not
  let siteID;
  if(isTakingQuiz){
    if(isWaiting){
      siteID = "site-pulse";
    } else {
      siteID = "site";
    }
    if(isShowingResults){
      //show results
      return(
        <div id={siteID}>
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
        <div id={siteID}>
          <div id="header">Know-A-Bunch</div>
          <div id="app-root">
            <Question key={quizQuestions[questionIndex].q_num} question={quizQuestions[questionIndex]} isShowingAnswer={isShowingAnswer}/>
          </div>
        </div>
        );
    }
  } if(isEditingQuizList) {
    if(isWaiting){
      siteID = "site-edit-pulse";
    } else {
      siteID = "site-edit";
    }
      if(isEditingQuiz){
        quizTitle = quiz.title;
        quizAuthor = quiz.author;
        //edit quiz
        return(
          <div id={siteID}>
            <div id="header-edit">Know-A-Bunch</div>
            <div id="app-root-edit">
              <div id="title-editor">
                Title:
                <div><input id="title-edit" placeholder={quizTitle} onClick={(event) => {event.target.value = quizTitle;}} onChange={editTitle}/></div>
                Author:
                <div><input id="author-edit" placeholder={quizAuthor} onClick={(event) => {event.target.value = quizAuthor;}} onChange={editAuthor}/></div>
                <button id="save-quiz-button" onClick={saveQuiz}>Save</button>
              </div>
              {quizQuestions.map(question => <QuestionEditable key={question.q_num} question={question}/>)}
              <button id="add-s-question-button" onClick={addShort}>Add Short Answer Question</button>
              <button id="add-mc-question-button" onClick={addMC}>Add Multiple Choice Question</button>

              <div><button id="return-to-edit-list-button" onClick={returnToEditList}>Return To Quiz List</button></div>
            </div>
          </div>
        );
      } else {
        //display the quiz list, with the edit/delete buttons instead of take quiz button, as well as the add quiz button
        return(
          <div id={siteID}>
            <div id="header-edit">Know-A-Bunch</div>
            <div id="app-root-edit">
              {quizes.map(quiz => <QuizEditable key={quiz.id} quiz={quiz} id={quiz.id}/>)}
              <div><button id="add-quiz-button" onClick={addQuiz}>Add Quiz</button></div>
              <button id="exit-edit-button" onClick={exitEdit}>Return To Menu</button>
            </div>
          </div>
        );
      } 
  } else {
    //display the main menu
    //quiz list and add/remove/edit buttons
    if(isWaiting){
      siteID = "site-pulse";
    } else {
      siteID = "site";
    }
    return (
      <div id={siteID}>
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
