import {Action} from './actions';

const initialState = {
    quizes: [],
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
        default:
            return state;
            break;
    }
    return state;
}

export default reducer;