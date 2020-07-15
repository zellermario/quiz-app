export const UPDATE_NAME = "UPDATE_NAME";
export const START_GAME = "START_GAME";
export const SWITCH_TO_QM = "SWITCH_TO_QM";
export const SWITCH_TO_GAME = "SWITCH_TO_GAME";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CHANGE_ANSWER = "CHANGE_ANSWER";
export const CORRECT_ANSWER = "CORRECT_ANSWER";
export const INCORRECT_ANSWER = "INCORRECT_ANSWER";
export const NEXT_QUESTION = "NEXT_QUESTION";

export function updateName(newName) {
    return { type: UPDATE_NAME, newName}
}