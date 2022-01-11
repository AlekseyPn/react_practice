import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  quizzes: [],
  isLoading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizzes: action.quizzes,
      };
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        isLoading: false,
      };
    default:
      return state;
  }
}
