import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router:Router
    ) {}

  onSubmit(): void {
    const loggedIn = this.authService.login(this.username, this.password);
    if (loggedIn) {
      this.router.navigate(['/edicion']);
      // this.router.navigate(['/editproduct']);
      //   <a class="a_nav_list" [routerLink]="['/editproduct']">Edit</a>

    } else {
      alert('Credenciales inválidas. Inténtalo de nuevo.');
    }
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
