import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
    isSidebarExpanded = true;
    expandedMenu: string | null = null;

    constructor(private authService: AuthService) { }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded;
    }

    toggleMenu(menuName: string, event: Event) {
        event.preventDefault();

        if (!this.isSidebarExpanded) {
            this.isSidebarExpanded = true;
        }

        if (this.expandedMenu === menuName) {
            this.expandedMenu = null;
        } else {
            this.expandedMenu = menuName;
        }
    }

    logout() {
        this.authService.logout();
    }
}
