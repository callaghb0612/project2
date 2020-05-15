import React from 'react';
import './quiz.css';
import {useDispatch} from 'react-redux';
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
            <div className="quiz-left">
                <div className="quiz-title">{quiz.title}</div>
                <div className="quiz-author">by {quiz.author}</div>
            </div>
            <button className="quiz-right" onClick={takeQuiz} >Take Quiz</button>
        </div>
    );
}