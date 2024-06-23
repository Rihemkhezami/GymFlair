import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  url } from '../types';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-present',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './present.component.html',
  styleUrl: './present.component.css'
})
export class PresentComponent {
  constructor(private socketService: SocketService) {}
  data: any = []
  imageUrl = url
  ngOnInit(): void {
    this.socketService.getData().subscribe((data) => {
      console.log(data)
      this.data = data
    })
  }
}
