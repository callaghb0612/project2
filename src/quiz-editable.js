import React from 'react';
import './quiz-editable.css';
import {useDispatch} from 'react-redux';
import {loadQuizEditor} from './actions';



export function Quiz_Editable(props){
    const quiz = props.quiz;
    const dispatch = useDispatch();

    const editQuiz = () => {
        dispatch(loadQuizEditor(quiz.id));
    }

    const deleteQuiz = () => {
        //delete quiz
    }

    return(
        <div className="quiz-list-item-edit">
            <div className="quiz-left-edit">
                <div className="quiz-title-edit">{quiz.title}</div>
                <div className="quiz-author-edit">by {quiz.author}</div>
            </div>
            <div className="quiz-right-edit"><button className="quiz-edit-button" onClick={editQuiz}>Edit</button> <button className="quiz-delete-button" onClick={deleteQuiz}>Delete</button></div>
        </div>
    );
}