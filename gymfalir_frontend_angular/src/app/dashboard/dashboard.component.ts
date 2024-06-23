import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  url } from '../types';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 constructor(private socketService: SocketService, private service: UserService) {}
  data: any = []
  info = {
    users: 0,
    events: 0,
    equipments: 0,
    cours: 0,
    coachs: 0,
  }
  imageUrl = url
  ngOnInit(): void {
    this.socketService.getData().subscribe((data) => {
      this.data = data
    })

    this.service.getDashboard().subscribe(
      {
        next: response => {
          if(!!response) {
            console.log(response)
           this.info = response
           this.data = response.count
          }
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }
}
