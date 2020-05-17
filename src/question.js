import React, {useState} from 'react';
import './question.css';
import {useDispatch, useSelector} from 'react-redux';
import {checkAnswer, gotoNextQuestion, endQuiz} from './actions';

export function Question(props){
    const question = props.question;
    const isShowingAnswer = props.isShowingAnswer;  
    const wasCorrect = useSelector(state => state.wasCorrect);
    const numQuestions = useSelector(state => state.numQuestions);
    const selectedAnswer = useSelector(state => state.answer);
    const dispatch = useDispatch();

    //so that the text in the box can be used (see onChange in the element)
    const [answerText, setAnswerText] = useState([]);

    const submitAnswer = (event) => {
        if(question.question_type === 0){
            //short answer
            dispatch(checkAnswer(question, answerText));
        } else {
            //multiple choice
            //because we use === here and in actions for comparing the selected answer with the actual answer, this is needed for it to function properly
            let id;
            switch(event.target.id){
                case '0':
                    id = 0;
                    break;
                case '1':
                    id = 1;
                    break;
                case '2':
                    id = 2;
                    break;
                case '3':
                    id = 3;
                    break;
                default:
                    break;

            }
            dispatch(checkAnswer(question, id));
        }
    }

    const nextQuestion = () => {
        if(question.q_num >= numQuestions){
            dispatch(endQuiz())
        } else {
            dispatch(gotoNextQuestion());
        }
    }

    if(question.question_type === 0){
        //short answer
        if(isShowingAnswer){
            if (wasCorrect){
                return (
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div id="answer-box-correct"><span id="correct">Correct!</span> Answer: {question.answer}</div>
                        <button className="next-button" onClick={nextQuestion}>Next</button>
                    </div>
                );
            } else {
                return(
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div id="answer-box-incorrect"><span id="incorrect">Incorrect!</span> Correct answer: {question.answer}</div>
                        <button className="next-button" onClick={nextQuestion}>Next</button>
                    </div>
                );
            }
        } else {
            //haven't answered yet, display the question
            return (
                <div className="question">
                    <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                    <input className="answer-box" onChange={(event) => {setAnswerText(event.target.value)}}></input>
                    <button className="submit-button" onClick={submitAnswer}>Submit</button>
                </div>
            );
        }
    } else if (question.question_type === 1){
        //question is a multiple choiuce question
        if(isShowingAnswer){
            //generate the buttons as variables
            if(wasCorrect){
                //if they are correct, just highlight the one which is correct
                let a, b, c, d;
                if(question.answer === 0){
                    a = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">A. </span>{question.a}</button>;
                } else {
                    a = <button className="mc-answer-no-hover" ><span className="mc-letter">A. </span>{question.a}</button>
                }

                if(question.answer === 1){
                    b = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">B. </span>{question.b}</button>;
                } else {
                    b = <button className="mc-answer-no-hover" ><span className="mc-letter">B. </span>{question.b}</button>
                }

                if(question.answer === 2){
                    c = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">C. </span>{question.c}</button>;
                } else {
                    c = <button className="mc-answer-no-hover" ><span className="mc-letter">C. </span>{question.c}</button>
                }

                if(question.answer === 3){
                    d = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">D. </span>{question.d}</button>;
                } else {
                    d = <button className="mc-answer-no-hover" ><span className="mc-letter">D. </span>{question.d}</button>
                }

                return (
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div className="mc-answers">
                            {a}
                            {b}
                            {c}
                            {d}
                        </div>
                        <button className="next-button" onClick={nextQuestion}>Next</button>
                    </div>
                );
            } else {
                let a, b, c, d;
                //we have to mark the question which is correct, AND the question which they answered which was incorrect
                if(question.answer === 0){
                    a = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">A. </span>{question.a}</button>;
                } else if(selectedAnswer === 0){
                    a = <button className="mc-answer-no-hover" id="mc-incorrect"><span className="mc-letter">A. </span>{question.a}</button>;
                } else {
                    a = <button className="mc-answer-no-hover" ><span className="mc-letter">A. </span>{question.a}</button>
                }

                if(question.answer === 1){
                    b = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">B. </span>{question.b}</button>;
                } else if(selectedAnswer === 1){
                    b = <button className="mc-answer-no-hover" id="mc-incorrect"><span className="mc-letter">B. </span>{question.b}</button>;
                } else {
                    b = <button className="mc-answer-no-hover" ><span className="mc-letter">B. </span>{question.b}</button>
                }

                if(question.answer === 2){
                    c = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">C. </span>{question.c}</button>;
                } else if(selectedAnswer === 2){
                    c = <button className="mc-answer-no-hover" id="mc-incorrect"><span className="mc-letter">C. </span>{question.c}</button>;
                } else {
                    c = <button className="mc-answer-no-hover" ><span className="mc-letter">C. </span>{question.c}</button>
                }

                if(question.answer === 3){
                    d = <button className="mc-answer-no-hover" id="mc-correct"><span className="mc-letter">D. </span>{question.d}</button>;
                } else if(selectedAnswer === 3){
                    d = <button className="mc-answer-no-hover" id="mc-incorrect"><span className="mc-letter">D. </span>{question.d}</button>;
                } else {
                    d = <button className="mc-answer-no-hover" ><span className="mc-letter">D. </span>{question.d}</button>
                }

                return(
                    
                    <div className="question">
                        <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                        <div className="mc-answers">
                            {a}
                            {b}
                            {c}
                            {d}
                        </div>
                        <button className="next-button" onClick={nextQuestion}>Next</button>
                    </div>
                )
                    
            }
        } else {
            return (
                <div className="question">
                    <div className="question-text"><span className="q-num">{question.q_num}. </span>{question.question}</div>
                    <div className="mc-answers">
                        <button className="mc-answer" id='0' onClick={(event) => {
                            submitAnswer(event);
                        }}><span className="mc-letter">A. </span>{question.a}</button>
                        <button className="mc-answer" id='1' onClick={(event) => {
                            submitAnswer(event);
                        }}><span className="mc-letter">B. </span>{question.b}</button>
                        <button className="mc-answer" id='2' onClick={(event) => {
                            submitAnswer(event);
                        }}><span className="mc-letter">C. </span>{question.c}</button>
                        <button className="mc-answer" id='3' onClick={(event) => {
                            submitAnswer(event);
                        }}><span className="mc-letter">D. </span>{question.d}</button>
                    </div>
                </div>
            );
        }
    }
}