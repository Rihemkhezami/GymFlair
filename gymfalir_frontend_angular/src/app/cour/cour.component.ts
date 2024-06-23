import { CourItems, url } from '../types';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component} from '@angular/core';
import { CourService } from '../services/cour.service';

@Component({
  selector: 'app-cour',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cour.component.html',
  styleUrl: './cour.component.css'
})
export class CourComponent {
  constructor(private router: Router, private service: CourService) {}

  
  data: CourItems[] = []
  ngOnInit(): void {
     this.service.getAllcours().subscribe(
      {
        next: response => {
          if(!!response) {
           this.data = response.courses
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

  deletecour(id: String) {
    this.service.deletecour(id).subscribe(
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
