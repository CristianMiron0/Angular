import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi-aplicacion-angular';

  constructor(
    public navService: NavigationService,
    private router: Router
  ) {}

  logout() {
    this.navService.logout();
    this.router.navigate(['/home']);
  }
}