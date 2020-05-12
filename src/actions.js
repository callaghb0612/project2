import React from 'react';

export const Action = Object.freeze(
    {
        StartBuilding: 'StartBuilding',
        AddQuestion: 'AddQuestion',
    }
);



//starts building a quiz (with the title)
export function StartBuilding(){
    return {
        type: Action.StartBuilding,
    }
}

//add questions to the quiz
export function AddQuestion(question){
    return {
        type: Action.AddQuestion,
        payload: question,
    }
}