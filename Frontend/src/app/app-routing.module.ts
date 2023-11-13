import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyTripComponent } from './my-trip/my-trip.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FlightBooksComponent } from './flight-books/flight-books.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-trip', component: MyTripComponent },
  { path: 'Authentication', component: AuthenticationComponent },
  { path: 'flight-books/:id', component: FlightBooksComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
