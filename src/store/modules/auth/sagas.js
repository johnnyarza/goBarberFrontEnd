import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });
    const { token, user } = response.data;
    console.tron.log(user);
    if (!user.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    toast.success('Autenticação foi um sucesso!');
    yield put(signInSuccess(token, user));
  } catch (err) {
    toast.error('Falha na atutenticação!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(signFailure());
  }
}
export function* setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  api.defaults.headers.Authorization = `Bearer ${token}`;

  if (token) {
    try {
      yield call(api.post, 'sessions/checkToken', { token });
    } catch (error) {
      toast.error('Falha na atutenticação!');
      yield put(signFailure());
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
