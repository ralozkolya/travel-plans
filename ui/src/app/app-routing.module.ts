import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TripsHomeComponent } from './components/trips/trips-home/trips-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 1 }
  },
  {
    path: 'trips',
    component: TripsHomeComponent,
    canActivate: [ AuthGuard ],
    data: { animation: 2 }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ GuestGuard ],
    data: { animation: 3 }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ GuestGuard ],
    data: { animation: 4 }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 5 }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
