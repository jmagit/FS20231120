import { NgModule } from '@angular/core';
import { CONTACTOS_COMPONENTES, ContactosComponent } from './componente.component';



@NgModule({
  declarations: [],
  imports: [ ContactosComponent, CONTACTOS_COMPONENTES, ],
  exports: [ ContactosComponent ]
})
export class ContactosModule { }
