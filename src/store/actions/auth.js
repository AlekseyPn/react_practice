import axios from 'axios';
import { API_KEY } from '../../config/apiKeys';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
      }

      const { data } = await axios.post(url, authData);

      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      console.log(e);
    }
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      return;
    }

    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate <= new Date()) {
      dispatch(logout());
      return;
    }

    dispatch(authSuccess(token));
    dispatch(
      autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
}
