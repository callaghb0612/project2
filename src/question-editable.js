import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './question-editable.css';  
import {deleteQuestion, saveQuestion} from './actions'; 

export function QuestionEditable(props){
    const dispatch = useDispatch();
    const quizID = useSelector(state => state.quizBeingEdited);
    const question = props.question;
    let [answerText, setAnswerText] = useState([]);
    let [questionText, setQuestionText] = useState([]);
    let [AText, setAText] = useState([]);
    let [BText, setBText] = useState([]);
    let [CText, setCText] = useState([]);
    let [DText, setDText] = useState([]);
    AText = question.a;
    BText = question.b;
    CText = question.c;
    DText = question.d;
    answerText = question.answer;
    questionText = question.question;

    const editQuestion = (event) => {
        //I dont know why this doesnt work
        //setQuestionText(event.target.value);
        questionText = event.target.value;
    }

    const editAnswer = (event) => {
        //I dont know why this doesnt work
        //setAnswerText(event.target.value);
        answerText = event.target.value;
    }

    const editMC = (event) => {
        switch(event.target.id){
            case '0':
                //I dont know why this doesnt work
                //setAText(event.target.value);
                AText = event.target.value;
                break;
            case '1':
                //setBText(event.target.value);
                BText = event.target.value;
                break;
            case '2':
                //setCText(event.target.value);
                CText = event.target.value;
                break;
            case '3':
                //setDText(event.target.value);
                DText = event.target.value;
                break;
        }
    }

    const deleteQ = () => {
        dispatch(deleteQuestion(quizID, question.q_num));
    }

    const saveQ = () => {
        console.log(`question type is ${question.question_type}`)
        if(question.question_type === 0){
            //short answer
            const questionObject = {
                question: questionText,
                answer: answerText,
                q_num: question.q_num,
                question_type: 0,
            }

            dispatch(saveQuestion(quizID, questionObject));
        } else {
            //multiple choice
            const questionObject = {
                question: questionText,
                answer: 0, //for now all new mc questions will have to be 0
                a: AText,
                b: BText,
                c: CText,
                d: DText,
                q_num: question.q_num,
                question_type: 1
            }

            dispatch(saveQuestion(quizID, questionObject));
        }
    }

    if(question.question_type === 0){
        //short answer question
        //the placeholder stuff is how I got the default value to be visible before the click, it isnt actually there until the click is made
        return(
            <div className="question-edit">
                <div className="question-text"><div className="q-num-edit">{question.q_num}.</div> <div className="question-word">Question: </div>
                <input className="question-text-edit" placeholder={questionText} onClick={(event) => {event.target.value = questionText;}} onChange={editQuestion}/></div>
                <div className="answer-word">Answer: </div>
                <input className="answer-box-edit" placeholder={answerText} onClick={(event) => {event.target.value = answerText;}} onChange={editAnswer}/>
                <button className="delete-button" onClick={deleteQ}>Delete Question</button>
                <button className="save-button" onClick={saveQ}>Save</button>
            </div>
        );
    } else {
        //multiple choice quesiton
        return(
            <div className="question-edit">
                <div className="question-text"><div className="q-num-edit">{question.q_num}.</div> <div className="question-word">Question: </div>
                <input className="question-text-edit" placeholder={questionText} onClick={(event) => {event.target.value = questionText;}} onChange={editQuestion}/></div>
                <div className="answer-word">A: </div>
                <input className="answer-box-edit" id='0' placeholder={AText} onClick={(event) => {event.target.value = AText;}} onChange={editMC}/>
                <div className="answer-word">B:</div>
                <input className="answer-box-edit" id='1' placeholder={BText} onClick={(event) => {event.target.value = BText;}} onChange={editMC}/>
                <div className="answer-word">C: </div>
                <input className="answer-box-edit" id='2' placeholder={CText} onClick={(event) => {event.target.value = CText;}} onChange={editMC}/>
                <div className="answer-word">D: </div>
                <input className="answer-box-edit" id='3' placeholder={CText} onClick={(event) => {event.target.value = DText;}} onChange={editMC}/>
                <button className="delete-button" onClick={deleteQ}>Delete Question</button>
                <button className="save-button" onClick={saveQ}>Save</button>
            </div>
        );
    }
    
}