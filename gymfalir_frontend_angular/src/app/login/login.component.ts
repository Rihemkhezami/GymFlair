import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private loginService: LoginService, 
    private router: Router
  ){}
   user = {
    username: '',
    password: ''
  };

  sumbit() {
    this.loginService.login(this.user.username, this.user.password).subscribe(
      {
        next: response => {
          if(!!response.token) {
            if(response.role === 'adherant') {
              alert("Not allowed")
            } else {
              localStorage.setItem('token', response.token)
              localStorage.setItem('role', response.role)
              this.router.navigate(['/'])
            }
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

}
