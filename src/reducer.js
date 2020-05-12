const initialState = {
    buildingQuiz: false,
    questions: [],
};

function reducer(state = initialState, action){
    switch(action.type){
        case action.StartBuilding:
            return {
                ...state,
                buildingQuiz: true,
            };
        case action.AddQuestion:
            return {
                ...state,
                title: action.title,
                questions: [action.payload, ...state.questions]
            }
        default:
            return state;
    }
    return state;
}

export default reducer;