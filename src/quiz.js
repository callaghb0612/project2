import React from 'react';
import './quiz.css';
import {useSelector, useDispatch} from 'react-redux';
import {loadQuizQuestions} from './actions';



export function Quiz(props){
    const quiz = props.quiz;
    const dispatch = useDispatch();

    const takeQuiz = () => {
        //key is the id
        dispatch(loadQuizQuestions(props.id));
    }

    return(
        <div className="quiz-list-item">
            <div id="quiz-left">
                <div id="quiz-title">{quiz.title}</div>
                <div id="quiz-author">by {quiz.author}</div>
            </div>
            <button id="quiz-right" onClick={takeQuiz} >Take Quiz</button>
        </div>
    );
}