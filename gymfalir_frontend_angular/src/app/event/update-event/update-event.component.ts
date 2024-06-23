import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: EventService) {}
    id: String = ''
    formData: any = {
      id: '', 
      nom: '', 
      desc: '', 
      date: '', 
      start: '', 
      photo: '', 
      image: null
    };
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.service.getOneevent(this.id).subscribe(
        {
          next: response => {
            if(!!response._id) {
             this.formData.id = response._id
             this.formData.nom = response.nom
             this.formData.desc = response.desc
             this.formData.date = response.date
             this.formData.start = response.start+""
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
        this.service.editevent(this.formData.id, this.formData.nom, this.formData.desc, this.formData.date,
          this.formData.start, this.formData.photo, this.formData.image
        ).subscribe(
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
