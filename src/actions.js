const address = 'http://localhost:3442';

export const Action = Object.freeze({
    LoadQuizList: 'LoadQuizesList',
    LoadQuizQuestions: 'LoadQuizQuestions',
});

function checkForErrors(response){
    if(!response.ok){
        throw Error(`Error in reponse.\n${response.status}: ${response.statusText}`);
    }
    return response;
}

export function loadQuizesList(quizes){
    return dispatch => {
        fetch(`${address}/quiz/all`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    //return the list of quizes
                    return {
                        type: Action.LoadQuizList,
                        payload: quizes,
                    };
                }
            })
            .catch(e => console.error(e));
    }
}

export function loadQuizQuestions(questions){
    return{
        type: Action.LoadQuizQuestions,
        payload: questions,
    };
}
