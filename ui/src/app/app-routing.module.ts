import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TripsHomeComponent } from './components/trips/trips-home/trips-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { EditTripComponent } from './components/trips/edit-trip/edit-trip.component';
import { UsersHomeComponent } from './components/users/users-home/users-home.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 1 }
  },
  {
    path: 'trips/:id',
    component: EditTripComponent,
    canActivate: [ AuthGuard ],
    data: { animation: 3 }
  },
  {
    path: 'trips',
    component: TripsHomeComponent,
    canActivate: [ AuthGuard ],
    data: { animation: 2 }
  },
  {
    path: 'users/:id',
    component: EditUserComponent,
    canActivate: [ AuthGuard ],
    data: { animation: 5 }
  },
  {
    path: 'users',
    component: UsersHomeComponent,
    canActivate: [ AuthGuard ],
    data: { animation: 4 }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ GuestGuard ],
    data: { animation: 7 }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ GuestGuard ],
    data: { animation: 8 }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 9 }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
