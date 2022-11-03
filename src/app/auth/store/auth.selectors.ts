import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

const getAuthFeatureState = createFeatureSelector<AuthState>(
  'auth'
);

export const getUser = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.user
);

export const isAuthenticated = createSelector(
  getAuthFeatureState,
    (state) => {
      return state.user ? true : false;
});

export const getToken = createSelector(getAuthFeatureState, (state) => {
  return state.user ? state.user.token : null;
});
