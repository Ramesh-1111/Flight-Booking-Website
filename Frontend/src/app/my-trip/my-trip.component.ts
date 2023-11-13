import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.css']
})
@Injectable()
export class MyTripComponent implements OnInit {
  Bookings:any[]=[]
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod(){
    this.http.get('http://localhost:3000/api/bookings/all').subscribe((data:any)=>{
      console.log(data);
      this.Bookings = data;
    });
  }
  removeBooking(bookingId: string) {
    const url = `http://localhost:3000/api/bookings/${bookingId}`; // Interpolate the bookingId in the URL
  
    this.http.delete(url)
      .subscribe(
        (response) => {
          console.log('Booking removed:', response);
          // Optionally, update the UI to reflect the successful deletion, e.g., show a success message
          // Remove the booking from the array
          this.Bookings = this.Bookings.filter((booking) => booking._id !== bookingId);
        },
        (error) => {
          console.error('Error while removing booking:', error);
          // Handle the error, e.g., show an error message
        }
      );
  }
  downloadTicket() {
    const flight = 'AirIndia';  
    const date = '2023-06-06';  
    const name = 'Ramesh';
    const from = 'Che';
    const to = 'Mum';  
    const name1 = 'Ramesh';
    const from1 = 'Che';
    const to1 = 'Mum';  

    // Make an HTTP GET request to the backend endpoint
    this.http.get('http://localhost:3000/download-ticket', {
      params: { flight, date,name,from,to,name1,from1,to1 },
      responseType: 'blob', // Set the response type to blob
    }).subscribe(response => {
      // Create a blob URL from the response
      const blobURL = URL.createObjectURL(response);

      // Create a link element
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'ticket.pdf';

      // Programmatically click the link to start the download
      link.click();
    });
  }
}
