import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: UserService) {}
    formData: any = {
      id:'',
      username: '',
      birth: '',
      email: '',
      image: null,
      password: '',
      role:'',
    };
  roles = ['admin', 'employe', 'adherant']
    ngOnInit(): void {
      
      
    }
  
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.formData.image = event.target.files[0];
      }
    }
  
    onSubmit(form: any) {
      if (form.valid) {
        console.log('Form Data:', this.formData);
        this.service.adduser(this.formData.id, this.formData.username, this.formData.email, 
           this.formData.password, this.formData.birth,this.formData.role, this.formData.image ).subscribe(
            {
              next: response => {
                if(!!response) {
                  this.location.back()
                }
              },
              error: error => {
                console.log(error)
              }
            }
          )
      }
    }

}
