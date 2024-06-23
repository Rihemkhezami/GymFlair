import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: UserService) {}
    id: String = ''
    formData: any = {
      id:'',
      username: '',
      birth: '',
      email: '',
      image: null,
      photo:'',
      role:''
    };
  roles = ['admin', 'employe', 'adherant']
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.service.getOneuser(this.id).subscribe(
        {
          next: response => {
            if(!!response._id) {
              console.log(response)
             this.formData.id = response._id
             this.formData.username = response.username
             this.formData.birth = response.birth
             this.formData.email = response.email
             this.formData.role = response.role
             this.formData.photo = response.photo

            }
          },
          error: error => {
            console.log(error)
          }
        }
      )
      
    }
  
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.formData.image = event.target.files[0];
      }
    }
  
    onSubmit(form: any) {
      if (form.valid) {
        console.log('Form Data:', this.formData);
        this.service.edituser(this.formData.id, this.formData.username, this.formData.email, 
          this.formData.photo, this.formData.birth,this.formData.role, this.formData.image ).subscribe(
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
