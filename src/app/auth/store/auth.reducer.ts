import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '../model/user.model';
import * as fromAuthAction from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserModel | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(fromAuthAction.LoginSuccess, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    users: payload,
    error: '',
  })),

  on(fromAuthAction.LoginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error: error,
  })),

  on(fromAuthAction.SignupSuccess, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    users: payload,
    error: '',
  })),

  on(fromAuthAction.SignupFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error: error,
  })),

  on(fromAuthAction.Logout, (state) => ({
    ...state
  })),
)

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
