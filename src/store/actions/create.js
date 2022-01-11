import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import api from '../../config/api';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const state = getState().create;

    try {
      await api.post('quizes.json', state.quiz);
      dispatch(resetQuizCreation());
    } catch (e) {
      console.log(e);
    }
  };
}
