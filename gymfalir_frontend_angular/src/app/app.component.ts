import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SocketService } from './services/socket.service';
import { ToastComponent } from './toast/toast.component';
import { AddZeroPipe } from './pipes/add-zero.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, AddZeroPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer!: ViewContainerRef;
  isLoginRoute: boolean = false;

  constructor(private router: Router, private socketService: SocketService) {}

  title = 'gym_falir_front';
  isLogin = !!localStorage.getItem('token')
  isAdmin = false
 
  count: number = 0
  ngOnInit() {
    this.socketService.getCount().subscribe((data) => {
      console.log(data)
      this.count = data.count
      if(data.user != '') {
        this.showToast(data.user)
      }
    })

    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if(localStorage.getItem('role')) {
        this.isAdmin = localStorage.getItem('role') === 'admin'
      }
      if(!localStorage.getItem('token')) {
        this.isLogin = false
      } else {
        this.isLogin = event.urlAfterRedirects !== '/login'
      }
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  showToast(message: string) {
    // Clear previous toasts if needed
    this.toastContainer.clear();

    // Dynamically create the toast component
    const toastComponentRef = this.toastContainer.createComponent(ToastComponent);
    toastComponentRef.instance.message = message;
  }
}
