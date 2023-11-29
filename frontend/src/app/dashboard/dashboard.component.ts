import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, NotificationComponent, NotificationModalComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'demos', icono: '', componente: DemosComponent},
    { texto: 'inicio', icono: '', componente: HomeComponent},
    { texto: 'calculadora', icono: '', componente: CalculadoraComponent},
    { texto: 'gráfico', icono: '', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
