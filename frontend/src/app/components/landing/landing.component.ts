import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  mouseX = 0;
  mouseY = 0;
  mouseXRatio = 0;
  mouseYRatio = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight / 2;
    }
  }

  onMouseMove(event: MouseEvent) {
    const heroElement = document.getElementById('home');
    if (!heroElement) return;

    const rect = heroElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.mouseX = x;
    this.mouseY = y;

    this.mouseXRatio = (x / rect.width - 0.5) * 2;
    this.mouseYRatio = (y / rect.height - 0.5) * 2;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
