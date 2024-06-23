import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from '../../services/equipments.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-equipment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-equipment.component.html',
  styleUrl: './update-equipment.component.css'
})
export class UpdateEquipmentComponent implements OnInit{
 constructor(private route: ActivatedRoute, private location: Location,
  private router: Router, private service: EquipmentsService) {}
  id: String = ''
  formData: any = {
    id:'',
    nom: '',
    description: '',
    prix: '',
    image: null,
    currentImage:''
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.service.getOneEquipment(this.id).subscribe(
      {
        next: response => {
          if(!!response) {
            console.log(response)
           this.formData.id = response.id
           this.formData.nom = response.nom
           this.formData.description = response.description
           this.formData.prix = response.prix + ""
           this.formData.currentImage = response.image
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
      this.service.editEquipment(this.formData.id, this.formData.nom, this.formData.prix,this.formData.description, 
        this.formData.currentImage, this.formData.image).subscribe(
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
