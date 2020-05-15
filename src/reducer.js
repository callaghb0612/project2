import {Action} from './actions';

const initialState = {
    isTakingQuiz: false,
    quizBeingTaken: null,
    quizes: [],
    quizQuestions: [],
    isWaiting: false,
}

function reducer(state = initialState, action){
    switch(action.type){
        case Action.LoadQuizList:
            return {
                ...state, //takes in all the preivous properties of state except the stuff defined below
                quizes: action.payload
            }
            break;
        case Action.LoadQuizQuestions:
            //determine which quiz is being taken
            //id is payload[0]
            //quesiton list is payload[1]
            let quiz;
            for(let i=0; i<state.quizes.length; i++){
                if(state.quizes[i].id === action.payload[0]){
                    quiz = state.quizes[i];
                }
            }
            
            //return the quiz being taken
            return{
                ...state,
                quizQuestions: action.payload[1],
                isTakingQuiz: true,
                quizBeingTaken: action.q_id,
                quizes: [quiz],
            }
            break;
        default:
            return state;
            break;
    }
    return state;
}

export default reducer;