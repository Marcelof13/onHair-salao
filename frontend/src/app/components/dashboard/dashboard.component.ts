import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('step2') step2!: ElementRef;
  @ViewChild('step3') step3!: ElementRef;
  @ViewChild('step4') step4!: ElementRef;
  services: any[] = [];
  professionals: any[] = [];
  myAppointments: any[] = [];

  // Selections
  selectedService: any = null;
  selectedPro: any = null;
  selectedDate: string | null = null;
  selectedTime: string | null = null;

  // UI State
  timeSlots: string[] = [];
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit() {
    this.generateTimeSlots();
    this.loadData();
  }

  generateTimeSlots() {
    const slots = [];
    for (let h = 9; h <= 19; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== 19) {
        slots.push(`${h.toString().padStart(2, '0')}:30`);
      }
    }
    this.timeSlots = slots;
  }

  loadData() {
    this.appointmentsService.getServices().subscribe({
      next: (res) => this.services = res,
      error: (err) => console.log(err)
    });

    this.appointmentsService.getProfessionals().subscribe({
      next: (res) => this.professionals = res,
      error: (err) => console.log(err)
    });

    this.loadMyAppointments();
  }

  loadMyAppointments() {
    this.appointmentsService.getMyAppointments().subscribe({
      next: (res) => this.myAppointments = res,
      error: (err) => console.log(err)
    });
  }

  selectService(s: any) { this.selectedService = s; 
    setTimeout(() => {
    this.step2?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 0);

  }
  selectPro(p: any) { this.selectedPro = p; 
      console.log('clicou', p);
      this.selectedPro = p;

  }

  selectTime(t: string) { this.selectedTime = t; 
    setTimeout(() => {
    this.step4?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 0);
  }
  onDateChange(event: any) { this.selectedDate = event.target.value; }

  canSubmit(): boolean {
    return !!(this.selectedService && this.selectedPro && this.selectedDate && this.selectedTime);
  }

  submitAppointment() {
    if (!this.canSubmit()) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const datetimeStr = `${this.selectedDate}T${this.selectedTime}:00`;

    this.appointmentsService.createAppointment({
      professionalId: this.selectedPro.id,
      serviceId: this.selectedService.id,
      date: datetimeStr
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Agendamento confirmado com sucesso!';
        this.resetSelections();
        this.loadMyAppointments();
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Erro ao agendar. Tente novamente.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  resetSelections() {
    this.selectedService = null;
    this.selectedPro = null;
    this.selectedDate = '';
    this.selectedTime = '';
  }
}
