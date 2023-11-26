import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/guard/auth-guard.service';
import { DashComponent } from './pages/dash/dash.component';
import { DefaultComponent } from './layout/default/default.component';

const routes: Routes = [
  //{path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashComponent,
      },
      {
        path: 'composition',
        loadChildren: () =>
          import('./pages/composition/composition.module').then(
            (mod) => mod.CompositionModule
          ),
      },
      {
        path: 'list-construction',
        loadChildren: () =>
          import('./pages/list-construction/list-construction.module').then(
            (mod) => mod.ListConstructionModule
          ),
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('./pages/activity/task.module').then(
            (mod) => mod.ActivityModule
          ),
      },
      {
        path: 'production',
        loadChildren: () =>
          import('./pages/production/production.module').then(
            (mod) => mod.ProductionModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
