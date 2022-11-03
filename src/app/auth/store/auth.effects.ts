import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromAuthAction from './auth.actions';
import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.LOGIN),
      exhaustMap((payload: UserModel) => this.authService.login(payload)
      .pipe(
        map((payload) =>{
          return fromAuthAction.LoginSuccess({ payload })
        }),
        catchError(error => of(fromAuthAction.LoginFailure({ error })))
      ))
    )
  );

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.LOGIN_SUCCESS),
      tap((user: any) => {
        localStorage.setItem('token', user.payload.access_token);
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.LOGIN_FAILURE)
    ), { dispatch: false }
  );

  signup$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.SIGNUP),
      exhaustMap((payload: UserModel) => this.authService.register(payload)
      .pipe(
        map((payload) =>{
          return fromAuthAction.SignupSuccess({ payload })
        }),
        catchError(error => of(fromAuthAction.SignupFailure({ error })))
      ))
    )
  );

  signupSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.SIGNUP_SUCCESS),
      tap(() => {
        this.router.navigateByUrl('/login');
      })
    ), { dispatch: false }
  );

  signupFailure$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.SIGNUP_FAILURE)
    ), { dispatch: false }
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromAuthAction.AuthActionTypes.LOGOUT),
      tap(() => {
        localStorage.removeItem('token');
      })
    ), { dispatch: false }
  );
}
