import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: any;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
