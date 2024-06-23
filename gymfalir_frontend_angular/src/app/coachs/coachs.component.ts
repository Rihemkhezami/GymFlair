import { CoachService } from '../services/coach.service';
import { CoachItems, url } from '../types';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coachs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coachs.component.html',
  styleUrl: './coachs.component.css'
})
export class CoachsComponent implements OnInit {

  constructor(private router: Router, private service: CoachService) {}

  data: CoachItems[] = []
  imageUrl = url
  ngOnInit(): void {
     this.service.getAllcoachs().subscribe(
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

  deletecoach(id: String) {
    this.service.deletecoach(id).subscribe(
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
