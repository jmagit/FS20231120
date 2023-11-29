import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, NotificationComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';

@Component({
  selector: 'app-daskboard',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './daskboard.component.html',
  styleUrl: './daskboard.component.css'
})
export class DaskboardComponent {
  menu = [
    { texto: 'inicio', icono: '', componente: HomeComponent},
    { texto: 'demos', icono: '', componente: DemosComponent},
    { texto: 'gráfico', icono: '', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
