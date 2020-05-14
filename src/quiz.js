import React from 'react';
import './quiz.css';

export function Quiz(props){
    const quiz = props.quiz;
    return(
        <div className="quiz-list-item">
            <div id="quiz-left">
                <div id="quiz-title">{quiz.title}</div>
                <div id="quiz-author">by {quiz.author}</div>
            </div>
            <div id="quiz-right">Take Quiz</div>
        </div>
    );
}