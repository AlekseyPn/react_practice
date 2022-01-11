import api from '../../config/api';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISH_QUIZ,
  NEXT_QUIZ_QUESTION,
  RETRY_QUIZ,
  SET_QUIZ_STATE,
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

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(setQuizState({ [answerId]: 'success' }, results));

      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(nextQuizQuestion(state.activeQuestion + 1));
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(setQuizState({ [answerId]: 'error' }, results));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function setQuizState(answerState, results) {
  return {
    type: SET_QUIZ_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function nextQuizQuestion(activeQuestionNumber) {
  return {
    type: NEXT_QUIZ_QUESTION,
    activeQuestion: activeQuestionNumber,
  };
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  };
}
