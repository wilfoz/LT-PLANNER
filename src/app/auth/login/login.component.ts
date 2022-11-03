import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.states';
import * as fromAuthAction from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ] })
    });
  }

  onSubmit() {
    this.store.dispatch(fromAuthAction.Login(this.form.getRawValue()));
  }

}
