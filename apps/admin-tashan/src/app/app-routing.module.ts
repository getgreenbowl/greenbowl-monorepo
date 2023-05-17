import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './authentication/login/login.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/analytics/analytics.module').then(
            (m) => m.AnalyticsModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./features/items/items.module').then((m) => m.ItemsModule),
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import('./features/subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),
      },
      {
        path: 'app-users',
        loadChildren: () =>
          import('./features/app-users/app-users.module').then(
            (m) => m.AppUsersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
