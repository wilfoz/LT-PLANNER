import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/store/auth.effects';
import * as auth from './auth/store/auth.reducer';

export interface AppState {
  auth: auth.AuthState
}

export const authReducer: ActionReducerMap<AppState> = {
  auth: auth.authReducer
}

export const appEffects = [
  AuthEffects
]
