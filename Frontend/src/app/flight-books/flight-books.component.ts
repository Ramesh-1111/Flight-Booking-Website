import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-books',
  templateUrl: './flight-books.component.html',
  styleUrls: ['./flight-books.component.css'],
})
export class FlightBooksComponent implements OnInit {
  BookingForm = new FormGroup({
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
    ]),
    lname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    passportno: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z0-9]*'),
      Validators.minLength(8),
    ]),
    visano: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9]*'),
      Validators.minLength(8),
    ]),
    termsandcondition: new FormControl(false, Validators.requiredTrue),
  });
  Bookings: any[] = [];
  Booinkingflights: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const ObjId = params['id'];
      const myObj = history.state.myObject;
      console.log(JSON.stringify(myObj._id));
      this.Bookings.push(myObj);
      this.Booinkingflights = myObj;

      console.log(this.Bookings);
    });
  }

  get fname() {
    return this.BookingForm.get('fname');
  }
  get lname() {
    return this.BookingForm.get('lname');
  }
  get email() {
    return this.BookingForm.get('email');
  }
  get mobilenumber() {
    return this.BookingForm.get('mobilenumber');
  }
  get passportno() {
    return this.BookingForm.get('passportno');
  }
  get visano() {
    return this.BookingForm.get('visano');
  }
  AddBooking() {
    const BookingDetails = {
      ...this.Booinkingflights,
      Firstname: this.BookingForm.value.fname,
      Lastname: this.BookingForm.value.lname,
      email: this.BookingForm.value.email,
      Mobilenumber: Number(this.BookingForm.value.mobilenumber),
      PassportNo: this.BookingForm.value.passportno,
    };
    console.log(BookingDetails);

    // this.subscription = this.http
    //   .post('http://localhost:3000/api/bookings',BookingDetails )
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log('Booking added:', response);
    //       // Optionally, update the UI to reflect the successful booking, e.g., show a success message
    //     },
    //     error: (error: any) => {
    //       console.error('Error while adding booking:', error);
    //       // Handle the error, e.g., show an error message
    //     },
    //   });
    const network = this.http
      .post('http://localhost:3000/api/bookings', BookingDetails)
      .subscribe({
        next: (response: any) => {
          console.log('Booking Added Succesfully', response);
        },
        error: (error: any) => {
          console.error('Error while adding booking:', error);
        },
      });
    if (!network.closed) {
      this.router.navigate(['my-trip']);
    }
  }
}
