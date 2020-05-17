export const address = 'https://know-a-bunch.duckdns.org:3442';

export const Action = Object.freeze({
    LoadQuizList: 'LoadQuizesList',
    LoadQuizQuestions: 'LoadQuizQuestions',
    LoadEditList: 'LoadEditList',
    LoadQuizEditor: 'LoadQuizEditor',
    GotoNextQuestion: 'GotoNextQuestion',
    CheckAnswer: 'CheckAnswer',
    EndQuiz: 'EndQuiz',
    CreateNewMC: 'CreateNewMC',
    CreateNewShort: 'CreateNewShort',
    DeleteQuestion: 'DeleteQuestion',
    SaveQuestion: 'SaveQuestion'
});

function checkForErrors(response){
    if(!response.ok){
        throw Error(`Error in reponse.\n${response.status}: ${response.statusText}`);
    }
    return response;
}

export function loadQuizes(quizes){
    //return the list of quizes
    return {
        type: Action.LoadQuizList,
        payload: quizes,
    };
}

export function loadQuizesList(){
    return dispatch => {
        console.log('getting all quizes');
        fetch(`${address}/quiz/all`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadQuizes(data.quizList));
                }
            })
            .catch(e => console.error(e));
    }
}

export function loadQuizQuestions(id){
    return dispatch => {
        fetch(`${address}/quiz/${id}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data =>{
                if(data.ok){
                    dispatch({
                        type: Action.LoadQuizQuestions,
                        payload: [id, data.questionList]
                    });
                }
            })
            .catch(e => console.error(e));
    }
}

export function gotoNextQuestion(){
    return{
        type: Action.GotoNextQuestion,
    }
}

export function checkAnswer(question, answer){
    //short answer
    console.log(question.answer);
    console.log(answer);
    //i guess we have to do double equals here, not sure why
    if(answer === question.answer){        
        return{
            type: Action.CheckAnswer,
            payload: [question.question_type, true, answer]
        }
    } else {
        return {
            type: Action.CheckAnswer,
            payload: [question.quesiton_type, false, answer]
        }
    }
}

export function endQuiz(){
    return{
        type: Action.EndQuiz
    }
}

export function loadEditList(){
    return dispatch => {
        fetch(`${address}/quiz/all`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch({
                        type: Action.LoadEditList,
                        payload: data.quizList,
                    });
                }
            })
            .catch(e => console.error(e));
    }
}

export function loadQuizEditor(id){
    return dispatch => {
            fetch(`${address}/quiz/${id}`)
                .then(checkForErrors)
                .then(response => response.json())
                .then(data =>{
                    if(data.ok){
                        dispatch({
                            type: Action.LoadQuizEditor,
                            payload: [id, data.questionList]
                        });
                    }
                })
                .catch(e => console.error(e));
            }
}

export function createNewShort(id, num){
    const newQ = {q_num: `${num}`, question: 'Q', answer: 'A'}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQ)
    };
    
    return dispatch => {
        fetch(`${address}/quiz/add/${id}/short`, options)
            .then(checkForErrors)
            .then(data => {
                if(data.ok){
                    dispatch(loadQuizEditor(id));
                }
            })
            .catch(e => console.error(e));
    }
}

export function createNewMC(id, num){
    const newQ = {q_num: `${num}`, question: 'Q', a: 'A', b: 'B', c: 'C', d: 'D', answer: `0`}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQ),
    }
    return dispatch => {
        fetch(`${address}/quiz/add/${id}/mc`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadQuizEditor(id));
                }
            })
            .catch(e => console.error(e));
    };
}

export function deleteQuestion(id, num){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return dispatch => {
        fetch(`${address}/quiz/${id}/delete/${num}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadQuizEditor(id));
                }
            })
            .catch(e => console.error(e));
    }
}

export function saveQuestion(id, newQ){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQ)
    }
    console.log(newQ);
    return dispatch => {
        fetch(`${address}/quiz/${id}/edit/${newQ.q_num}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadQuizEditor(id));
                }
            })
            .catch(e => console.error(e));
    }
}