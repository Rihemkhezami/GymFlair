import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../services/equipments.service';
import { Items, url } from '../types';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.css'
})
export class EquipmentsComponent implements OnInit{
constructor(private service:EquipmentsService, private router: Router) {}
  data: Items[] = []
  imageUrl = url
  ngOnInit(): void {
     this.service.getAllEquipments().subscribe(
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

  deleteEquipment(id: String) {
    this.service.deleteEquipment(id).subscribe(
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
