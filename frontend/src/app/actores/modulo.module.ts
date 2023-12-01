import { NgModule } from '@angular/core';
import { ACTORES_COMPONENTES, ActoresComponent } from './componente.component';



@NgModule({
  declarations: [],
  imports: [ ActoresComponent, ACTORES_COMPONENTES, ],
  exports: [ ActoresComponent ]
})
export class ActoresModule { }
