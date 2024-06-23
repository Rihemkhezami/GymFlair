import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-add-coach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.css'
})
export class AddCoachComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: CoachService) {}

  formData: any = {
    firstname: '',
    lastname: '',
    email: '',
    image: null,
    speciality: '',
    phone: ''
  };

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.formData.image = event.target.files[0];
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      this.service.addcoach( this.formData.firstname, this.formData.lastname,this.formData.phone, 
        this.formData.email, this.formData.speciality, this.formData.image).subscribe(
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
