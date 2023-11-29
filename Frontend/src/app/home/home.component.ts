import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  from!: string;
  to!: string;
  date: Date;
  Interfrom!: string;
  Interto!: string;
  Interdate: Date;
  filteredFlights: any[] = [];
  flights: any[] = [];
  InterNationalFlights: any[] = [];
  InterNationalfilteredFlights: any[] = [];
  domestic: boolean = true;
  International: boolean = false;
  subscription: Subscription | undefined;
  Math: any;
  collapse: Number[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.date = new Date();
    this.Interdate = new Date();
  }

  ngOnInit(): void {
    this.getMethod();
    this.getData();
  }

  public getMethod() {
    this.http
      .get('http://localhost:3000/api/users/getAll')
      .subscribe((data: any) => {
        console.log(data);
        this.flights = data;
      });
  }

  public getData() {
    this.http
      .get('http://localhost:3000/api/internationaldetails/getAll')
      .subscribe((data: any) => {
        console.log(data);
        this.InterNationalFlights = data;
      });
  }
  addBooking(details: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        myObject: details,
      },
    };

    this.router.navigate(['flight-books', details._id], navigationExtras);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  searchFlights(): void {
    this.filteredFlights = this.flights.filter(
      (flight) =>
        flight.from.toLowerCase().includes(this.from.toLowerCase()) &&
        flight.to.toLowerCase().includes(this.to.toLowerCase()) &&
        this.formatDate(flight.date) === this.formatDate(this.date)
    );
    console.log(this.filteredFlights);
  }
  formatDate(date: Date): string {
    if (date && typeof date.getFullYear === 'function') {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }
  searchInterNationalFlights(): void {
    this.InterNationalfilteredFlights = this.InterNationalFlights.filter(
      (flight) =>
        flight.from.toLowerCase().includes(this.Interfrom.toLowerCase()) &&
        flight.to.toLowerCase().includes(this.Interto.toLowerCase()) &&
        this.InterformatDate(flight.date) ===
          this.InterformatDate(this.Interdate)
    );
    console.log(this.InterNationalfilteredFlights);
  }
  InterformatDate(Interdate: Date): string {
    if (Interdate && typeof Interdate.getFullYear === 'function') {
      const year = Interdate.getFullYear();
      const month = ('0' + (Interdate.getMonth() + 1)).slice(-2);
      const day = ('0' + Interdate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }
  convertToDollars(ticketAmount: number): string {
    const conversionRate = 0.014;
    const dollarAmount = ticketAmount * conversionRate;
    return dollarAmount.toFixed(2);
  }

  Tabchange(): void {
    this.domestic = !this.domestic;
    this.International = !this.International;
    console.log(this.domestic);
    console.log(this.International);
  }
  SwitchTab() {
    this.domestic = !this.domestic;
    this.International = !this.International;
    console.log(this.domestic);
    console.log(this.International);
  }
}
