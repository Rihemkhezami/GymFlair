
import { UserItems, url } from '../types';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private router: Router, private service: UserService) {}

  data: UserItems[] = []
  imageUrl = url
  ngOnInit(): void {
     this.service.getAllusers().subscribe(
      {
        next: response => {
          if(!!response) {
           this.data = response
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

  deleteuser(id: String) {
    this.service.deleteuser(id).subscribe(
      {
        next: response => {
          if(response.message) {
            this.refreshCurrentRoute()
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

  refreshCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
