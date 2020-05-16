const address = 'https://know-a-bunch.duckdns.org:3442';

export const Action = Object.freeze({
    LoadQuizList: 'LoadQuizesList',
    LoadQuizQuestions: 'LoadQuizQuestions',
    GotoNextQuestion: 'GotoNextQuestion',
    CheckAnswer: 'CheckAnswer',
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