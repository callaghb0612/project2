import React, {useState} from 'react';
import './question-editable.css';

export function Question_Editable(props){
    const question = props.question;
    let [answerText, setAnswerText] = useState([]);
    let [questionText, setQuestionText] = useState([]);
    answerText = question.answer;
    questionText = question.question;

    if(question.question_type === 0){
        //short answer question
        return(
            <div className="question-edit">
                <div className="question-text"><div className="q-num-edit">{question.q_num}.</div> <div className="question-word">Question: </div>
                <input className="question-text-edit" placeholder={questionText} onClick={(event) => {event.target.value = questionText;}} onChange={(event) => {setQuestionText(event.target.value)}}/></div>
                <div className="answer-word">Answer: </div>
                <input className="answer-box-edit" placeholder={answerText} onClick={(event) => {event.target.value = answerText;}} onChange={(event) => {setAnswerText(event.target.value)}}/>
            </div>
        );
    } else {
        //multiple choice quesiton
        return(
            <div className="question-edit">
                
            </div>
        );
    }
    
}