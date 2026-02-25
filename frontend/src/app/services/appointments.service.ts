import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) { }

  getProfessionals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/professionals`);
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/services`);
  }

  getMyAppointments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createAppointment(data: { professionalId: string, serviceId: string, date: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
