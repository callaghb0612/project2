import {Action} from './actions';

const initialState = {
    isTakingQuiz: false,
    quizBeingTaken: null, //the id of the quiz which is being taken
    quizQuestion: -1,  //the question of the quiz we are on (in the index)
    numQuestions: -1, //the number of questions in the quiz

    //for showing the correct answer
    isShowingQuestionAnswer: false,
    answer: -1,                         //the answer that was enetered
    wasCorrect: false,
    numCorrect: 0,
    showingResults: false,

    quizes: [],     //contains only one quiz if we are taking a quiz or editing a quiz
    quizQuestions: [],
    isWaiting: false,
    isEditingQuizList: false,   //true if we are in edit mode
    isEditingQuiz: false,
    quizBeingEdited: -1,
}

function reducer(state = initialState, action){
    switch(action.type){
        case Action.LoadQuizList:
            return {
                ...state, //takes in all the preivous properties of state except the stuff defined below
                quizes: action.payload,
                isTakingQuiz: false,
                showingResults: false,
                quizBeingTaken: null,
                quizQuestions: [],
            }
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
                quizBeingTaken: action.payload[0],
                quizes: [quiz],
                quizQuestion: 0,
                numQuestions: action.payload[1].length,
                numCorrect: 0,
            }
        case Action.GotoNextQuestion:
            return{
                ...state,
                quizQuestion: state.quizQuestion +1,
                isShowingQuestionAnswer: false,
            }
        case Action.CheckAnswer:
            if(action.payload[1]){
                //they were correct
                return{
                    ...state,
                    numCorrect: state.numCorrect+1,
                    wasCorrect: true,
                    answer: action.payload[2],
                    isShowingQuestionAnswer: true,
                }
            } else {
                return{
                    ...state,
                    wasCorrect: false,
                    answer: action.payload[2],
                    isShowingQuestionAnswer: true
                }
            }
        case Action.EndQuiz:
            return{
                ...state,
                showingResults: true,
                isShowingQuestionAnswer: false,
            }
        case Action.LoadEditList:
            return{
                ...state,
                isEditingQuizList: true,
                quizes: action.payload,
                isEditingQuiz: false,
            }
        case Action.LoadQuizEditor:
            let quiz_e;
            for(let i=0; i<state.quizes.length; i++){
                if(state.quizes[i].id === action.payload[0]){
                    quiz_e = state.quizes[i];
                }
            }

            return {
                ...state,
                isEditingQuiz: true,
                quizes: [quiz_e],
                quizQuestions: action.payload[1],
                quizBeingEdited: action.payload[0],
                numQuestions: action.payload[1].length
            }
        case Action.CreateNewShort:
            return{
                ...state
            }
        case Action.CreateNewMC:
            return{
                ...state,
            }
        case Action.DeleteQuestion:
            return{
                ...state,
            }
        case Action.ExitEditMode:
            return{
                ...state,
                isEditingQuizList: false,
                quizes: action.payload
            }
        case Action.SaveQuizSettings:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;