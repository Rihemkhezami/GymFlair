
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventItems, url } from '../types';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  constructor(private router: Router, private service: EventService) {}

  
  data: EventItems[] = []
  imageUrl = url
  ngOnInit(): void {
     this.service.getAllevents().subscribe(
      {
        next: response => {
          if(!!response) {
           this.data = response.events
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

  deleteevent(id: String) {
    this.service.deleteevent(id).subscribe(
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
