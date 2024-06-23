import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoachService } from '../../services/coach.service';


@Component({
  selector: 'app-update-coach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-coach.component.html',
  styleUrl: './update-coach.component.css'
})
export class UpdateCoachComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: CoachService) {}
    id: String = ''
    formData: any = {
      id:'',
      firstname: '',
      lastname: '',
      email: '',
      image: null,
      speciality: String,
      currentImage:'',
      phone: String
    };
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.service.getOnecoach(this.id).subscribe(
        {
          next: response => {
            if(!!response._id) {
              console.log(response)
             this.formData.id = response._id
             this.formData.firstname = response.firstname
             this.formData.lastname = response.lastname
             this.formData.email = response.email
             this.formData.speciality = response.speciality
             this.formData.currentImage = response.photo
             this.formData.phone = response.phone

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
        this.service.editcoach(this.formData.id, this.formData.firstname, this.formData.lastname,this.formData.phone, 
          this.formData.email, this.formData.speciality,this.formData.currentImage, this.formData.image).subscribe(
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
