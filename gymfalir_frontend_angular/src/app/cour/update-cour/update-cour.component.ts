import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CourService } from '../../services/cour.service';
import { CoachItems } from '../../types';
import { CoachService } from '../../services/coach.service';
@Component({
  selector: 'app-update-cour',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-cour.component.html',
  styleUrl: './update-cour.component.css'
})

export class UpdateCourComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: CourService, private coachService: CoachService) {}
    coachs: CoachItems[] = []
    id: String = ''
    formData: any = {
     id: '', 
     nom: '', 
     capacite: '', 
     date: '',
     start: '', 
     end: '', 
     coach: ''
    };
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.service.getOnecour(this.id).subscribe(
        {
          next: response => {
            if(!!response._id) {
              console.log(response)
             this.formData.id = response._id
             this.formData.nom = response.nom
             this.formData.capacite = response.capacite+""
             this.formData.date = response.date
             this.formData.end = response.end+""
             this.formData.start = response.start+""
             this.formData.coach = response.coach._id
            }
          },
          error: error => {
            console.log(error)
          }
        }
      )

      this.coachService.getAllcoachs().subscribe(
        {
          next: response => {
            if(!!response) {
             this.coachs = response
            }
          },
          error: error => {
            console.log(error)
          }
        }
      )
      
    }
  
  
    onSubmit(form: any) {
      if (form.valid) {
        console.log('Form Data:', this.formData);
        this.service.editcour(this.formData.id, this.formData.nom, this.formData.capacite ,this.formData.date, 
          this.formData.start, this.formData.end,this.formData.coach).subscribe(
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
