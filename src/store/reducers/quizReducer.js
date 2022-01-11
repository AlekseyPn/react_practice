import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISH_QUIZ,
  NEXT_QUIZ_QUESTION,
  RETRY_QUIZ,
  SET_QUIZ_STATE,
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
    case SET_QUIZ_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };

    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case NEXT_QUIZ_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null,
      };

    case RETRY_QUIZ:
      return {
        ...state,
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        results: {},
      };
    default:
      return state;
  }
}
