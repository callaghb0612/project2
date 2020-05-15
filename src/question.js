import React, {useState} from 'react';
import './question.css';
import {useDispatch, useSelector} from 'react-redux';
import { checkAnswer } from './actions';


export function Question(props){
    const question = props.question;
    const isShowingAnswer = props.isShowingAnswer;  
    const wasCorrect = useSelector(state => state.wasCorrect);
    const numQuestions = useSelector(state => state.numQuestions);
    const dispatch = useDispatch();

    const [answerText, setAnswerText] = useState([]);

    const submitAnswer = (answer) => {
        dispatch(checkAnswer(question, answer));
    }

    const nextQuestion = () => {
        if(numQuestions >= question.q_num){
            //quiz over
        } else {
            dispatch(nextQuestion());
        }
    }

    if(question.question_type === 0){
        if(isShowingAnswer){
            if (wasCorrect){
                console.log('they were correct');
                return (
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div className="answer-box-correct"></div>
                        <button className="next-button" onClick={nextQuestion}>Next Question</button>
                    </div>
                );
            } else {
                console.log('they were not correct');
                return(
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div className="answer-box-incorrect"></div>
                        <button className="next-button" onClick={nextQuestion}>Next Question</button>
                    </div>
                );
            }
        } else {
            //haven't answered yet, display the question
            return (
                <div className="question">
                    <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                    <input className="answer-box" onChange={(event) => {setAnswerText(event.target.value)}}></input>
                    <button className="submit-button" onClick={submitAnswer()}>Submit</button>
                </div>
            );
        }
    } else if (question.question_type === 1){
        //question is a multiple choiuce question
        if(isShowingAnswer){
            //todo: somehow react to which was correct and which was not
            return (
                <div className="question">
                    <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                    <div className="mc-answers">
                        <button className="mc-answer-no-hover" ><span className="mc-letter">A. </span>{question.a}</button>
                        <button className="mc-answer-no-hover" ><span className="mc-letter">B. </span>{question.b}</button>
                        <button className="mc-answer-no-hover" ><span className="mc-letter">C. </span>{question.c}</button>
                        <button className="mc-answer-no-hover" ><span className="mc-letter">D. </span>{question.c}</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="question">
                    <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                    <div className="mc-answers">
                        <button className="mc-answer" onClick={() => {
                            
                        }}><span className="mc-letter">A. </span>{question.a}</button>
                        <button className="mc-answer" onClick={() => {
                            
                        }}><span className="mc-letter">B. </span>{question.b}</button>
                        <button className="mc-answer" onClick={() => {
                            
                        }}><span className="mc-letter">C. </span>{question.c}</button>
                        <button className="mc-answer" onClick={() => {
                            
                        }}><span className="mc-letter">D. </span>{question.c}</button>
                    </div>
                </div>
            );
        }
    }
}