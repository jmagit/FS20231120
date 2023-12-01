import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxWaitComponent, HomeComponent, NotificationComponent, NotificationModalComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { LoginComponent } from '../security';
import { ContactosComponent } from '../contactos';
import { ActoresComponent } from '../actores';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationModalComponent, AjaxWaitComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'actores', icono: 'fa-solid fa-book', componente: ActoresComponent },
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent},
    { texto: 'demos', icono: 'fa-solid fa-chalkboard-user', componente: DemosComponent},
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: CalculadoraComponent},
    { texto: 'formulario', icono: 'fa-solid fa-rectangle-list', componente: FormularioComponent},
    { texto: 'contactos', icono: 'fa-solid fa-address-book', componente: ContactosComponent},
    { texto: 'gráfico', icono: 'fa-solid fa-image', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
