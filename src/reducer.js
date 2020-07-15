import * as actions from "./actions";

export default function reducer(state, action) {
    switch(action.type) {
      case actions.UPDATE_NAME:
        return {
          ...state,
          playerName: action.newName
        }
      case actions.START_GAME:
        const playedQuestion = state.questions[Math.floor(Math.random() * (state.questions.length - 1))];
        return {
          ...state,
          playedQuestion: playedQuestion,
          noMoreQuestions: false,
          remainingQuestions: state.questions,
          gameStarted: true
        }
      case actions.SWITCH_TO_QM:
        return {
          ...state,
          screen: 'qm'
        }
      case actions.SWITCH_TO_GAME:
        return {
          ...state,
          screen: 'game'
        }
      case actions.EDIT_QUESTION:
        return {
          ...state,
          editedQuestion: action.editedQuestion
        }
      case actions.ADD_QUESTION:
        return {
          ...state,
          questions: [...state.questions, action.newQuestion],
          editedQuestion: {
            question: "",
            ans1: "",
            ans2: "",
            ans3: "",
            ans4: "",
            correct: ""
          }
        }
      case actions.DELETE_QUESTION:
        return {
          ...state, 
          questions: state.questions.filter((item) => item.id !== action.id)
        }
      case actions.CHANGE_ANSWER:
        return {
          ...state,
          selectedAnswer: action.selected
        }
      case actions.CORRECT_ANSWER:
        return {
          ...state,
          score: state.score + 1,
          showNext: true,
          showIncorrect: false,
          showCorrect: true,
        }
      case actions.INCORRECT_ANSWER:
        return {
          ...state,
          showNext: true,
          showIncorrect: true,
          showCorrect: false,
        }
      case actions.NEXT_QUESTION:
        const remaining = state.remainingQuestions.filter((item) => item.id !== state.playedQuestion.id);
        const played = remaining[Math.floor(Math.random() * (remaining.length - 1))]
        return {
          ...state,
          showNext: false,
          selectedAnswer: null,
          showIncorrect: false,
          showCorrect: false,
          remainingQuestions: remaining,
          playedQuestion: played,
          noMoreQuestions: remaining.length === 0
        }
      case "FINISH_GAME":
        return {
          ...state,
          selectedAnswer: null,
          gameStarted: false,
          showIncorrect: false,
          showCorrect: false,
          score: 0,
          playerName: "",
        }
      default: return state;
    }
}