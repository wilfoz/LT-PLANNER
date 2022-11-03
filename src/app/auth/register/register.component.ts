import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import * as fromAuthAction from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  Roles: any = ['CONTROLLER', 'ADMIN', 'ROOT'];

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      role: new FormControl('', { validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ] })
    });
  }

  onSubmit() {
    this.store.dispatch(fromAuthAction.Signup(this.form.getRawValue()));
  }
}
