import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBooksComponent } from './flight-books.component';

describe('FlightBooksComponent', () => {
  let component: FlightBooksComponent;
  let fixture: ComponentFixture<FlightBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
