import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    loginForm: FormGroup;
    errorMessage = '';
    isLoading = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                if (response.user && response.user.role === 'ADMIN') {
                    this.router.navigate(['/admin-dashboard']);
                } else {
                    this.authService.logout();
                    this.errorMessage = 'Acesso negado. Apenas administradores podem acessar esta área.';
                }
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Credenciais inválidas ou erro no servidor.';
            }
        });
    }
}
