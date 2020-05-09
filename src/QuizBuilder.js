import React from 'react';
import './QuizBuilder.css';

export function QuizBuilder(){
    console.log('quiz-builder called');
    return (
        <div id="quiz-builder">
            <div id="title-quiz">Quiz name: <input id="title-input" type="text"/></div>
        </div>
    );
}