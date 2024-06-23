import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CourService } from '../../services/cour.service';
import { CoachItems } from '../../types';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-add-cour',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-cour.component.html',
  styleUrl: './add-cour.component.css'
})
export class AddCourComponent {
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private service: CourService, private coachService: CoachService) {}
    coachs: CoachItems[] = []
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
        this.service.addcour(this.formData.id, this.formData.nom, this.formData.capacite ,this.formData.date, 
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
