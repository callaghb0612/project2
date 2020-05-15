import {Action} from './actions';

const initialState = {
    isTakingQuiz: false,
    quizBeingTaken: null,
    quizQuestion: -1,  //the question of the quiz we are on (in the index)

    //for showing the correct answer
    isShowingQuestionAnswer: false,
    answer: -1, 
    wasCorrect: false,

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
                quizQuestion: 0,
            }
            break;
        case Action.GotoNextQuestion:
            return{
                ...state,
                quizQuestion: state.quizQuestion+1,
                isShowingQuizAnswer: false,
            }
        case Action.CheckAnswer:
            if(action.payload[1]){
                //they were correct
                return{
                    ...state,
                    wasCorrect: true,
                    answer: action.payload[2],
                }
            } else {
                return{
                    ...state,
                    wasCorrect: false,
                    answer: action.payload[2],
                }
            }
        default:
            return state;
            break;
    }
    return state;
}

export default reducer;