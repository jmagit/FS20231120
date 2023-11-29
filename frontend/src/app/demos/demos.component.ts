import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../common-services';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe, ElipsisPipe, SizerComponent } from '@my/core';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, FormsModule, ElipsisPipe, CapitalizePipe, SizerComponent, GraficoSvgComponent],
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.css'
})
export class DemosComponent implements OnInit, OnDestroy {
  private suscriptor?: Unsubscribable;
  private nombre: string = 'mundo'
  fecha = '2023-11-28'
  fontSize = 24
  listado = [
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'barcelona' },
    { id: 3, nombre: 'VALENCIA' },
    { id: 4, nombre: 'ciudad Real' },
  ]
  idProvincia = 2

  resultado?: string
  visible = true
  estetica = { importante: true, error: false, urgente: true }

  constructor(public vm: NotificationService) { }

  public get Nombre(): string { return this.nombre; }
  public set Nombre(valor: string) {
    if (valor === this.nombre) return
    this.nombre = valor
  }

  public saluda(): void {
    this.resultado = `Hola ${this.Nombre}`
  }
  public despide() {
    this.resultado = `Adios ${this.Nombre}`
  }
  public di(algo: string) {
    this.resultado = `Dice ${algo}`
  }

  cambia() {
    this.visible = !this.visible
    this.estetica.importante = !this.estetica.importante
    this.estetica.error = !this.estetica.error
  }

  calcula(a: number, b: number): number { return a + b }

  add(provincia: string) {
    const id = this.listado[this.listado.length - 1].id + 1
    this.listado.push({id, nombre: provincia})
    this.idProvincia = id
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.suscriptor = this.vm.Notificacion.subscribe(n => {
    //   if (n.Type !== NotificationType.error) { return; }
    //   window.alert(`Suscripcion: ${n.Message}`);
    //   this.vm.remove(this.vm.Listado.length - 1);
    // });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }

}
