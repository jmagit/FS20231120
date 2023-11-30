import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, NotificationComponent, NotificationModalComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'formulario', icono: 'fa-solid fa-rectangle-list', componente: FormularioComponent},
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent},
    { texto: 'demos', icono: 'fa-solid fa-chalkboard-user', componente: DemosComponent},
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: CalculadoraComponent},
    { texto: 'gráfico', icono: 'fa-solid fa-image', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
