import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { authReducer } from './app.states';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DefaultModule } from './layout/default/default.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    SharedModule,
    StoreModule.forRoot(authReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
