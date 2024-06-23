import { Component } from '@angular/core';
import { EquipmentsService } from '../../services/equipments.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent {

  constructor(private service: EquipmentsService, private location: Location) {}

  formData: any = {
    nom: '',
    description: '',
    prix: '',
    image: null,
  };


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.formData.image = event.target.files[0];
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      this.service.addEquipment(this.formData.nom, this.formData.prix, this.formData.description, 
        this.formData.image).subscribe(
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
