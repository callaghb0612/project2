import React from 'react';

export function Question(props){
    const question = props.question;
    console.log('question.js setting up question');

    if(question.question_type === 0){
        return (
            <div className="question">
                <div className="question-text">{question.question}</div>
                <input className="answer-box"></input>
            </div>
        )
    } else if (question.question_type === 1){
        //question is a multiple choiuce question
        return (
            <div>MCQ</div>
        );
    }
}