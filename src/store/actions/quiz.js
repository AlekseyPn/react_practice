import api from '../../config/api';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from './actionTypes';

export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await api.get('quizes.json');

      const quizzes = [];
      Object.keys(response.data || {}).forEach((key, index) => {
        quizzes.push({ id: key, name: `Тест №${index + 1}` });
      });

      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (e) {
      dispatch(fetchQuizzesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await api.get(`quizes/${quizId}.json`);

      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizzesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START,
  };
}

export function fetchQuizzesError(error) {
  return {
    type: FETCH_QUIZZES_ERROR,
    error,
  };
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes,
  };
}
