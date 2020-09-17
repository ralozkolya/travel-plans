import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { TripsHomeComponent } from './components/trips/trips-home/trips-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { FormComponent } from './components/base/form/form.component';
import { ListComponent } from './components/list/list.component';
import { CreateTripsFormComponent } from './components/trips/create-trips-form/create-trips-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { TripsListComponent } from './components/trips/trips-list/trips-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { EditTripComponent } from './components/trips/edit-trip/edit-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavigationComponent,
    HomeComponent,
    TripsHomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AutoFocusDirective,
    FormComponent,
    ListComponent,
    CreateTripsFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TripsListComponent,
    PaginationComponent,
    DeleteButtonComponent,
    EditTripComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
