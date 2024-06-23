import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: EventService) {}
 
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
     
      
    }
  
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.formData.image = event.target.files[0];
      }
    }
  
    onSubmit(form: any) {
      if (form.valid) {
        console.log('Form Data:', this.formData);
        this.service.addevent(this.formData.id, this.formData.nom, this.formData.desc, this.formData.date,
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
