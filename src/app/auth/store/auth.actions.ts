import { createAction, props } from '@ngrx/store';
import { UserModel } from '../model/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
}

export const Login = createAction(
  AuthActionTypes.LOGIN,
  props<{ payload: UserModel }>()
);

export const LoginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ payload: { token: string } }>()
);

export const LoginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ error: string }>()
);

export const Signup = createAction(
  AuthActionTypes.SIGNUP,
  props<{ payload: UserModel }>()
);

export const SignupSuccess = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{ payload: UserModel }>()
);

export const SignupFailure = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{ error: string }>()
);

export const Logout = createAction(
  AuthActionTypes.LOGOUT
);
