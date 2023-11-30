import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, MIS_VALIDADORES } from '@my/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessagePipe, MIS_VALIDADORES],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  modo: 'add' | 'edit' = 'add'
  elemento: any = {}

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit() {
    this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pgrillo@example.com', nif: '12345678Z', fnacimiento: '2000-01-01', edad: 44 }
    this.modo = 'edit'
  }
  cancel() {

  }
  send() {
    switch(this.modo) {
      case 'add':
        alert(`POST: ${JSON.stringify(this.elemento)}`)
        break;
      case 'edit':
        alert(`PUT ${this.elemento.id}: ${JSON.stringify(this.elemento)}`)
        break;
    }
  }
}
