import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from './services/navigation.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public navService: NavigationService,
    private router: Router
  ) {}

  logout() {
    this.navService.logout();
    this.router.navigate(['/home']);
  }
}