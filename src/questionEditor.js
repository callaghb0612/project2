import React from 'react';

export function QuestionEditor(props){
    let question = props.question;
    let answer = props.answer;

    return (
        <div className="question-editor">
            <div className="question-edit-question">Edit Question: <input>{question}</input></div>
            <div className="question-edit-answer">Edit Answer: <input>{answer}</input></div>
        </div>
    );
}