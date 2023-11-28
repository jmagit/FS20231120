import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../common-services';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.css'
})
export class DemosComponent implements OnInit, OnDestroy {
  private suscriptor?: Unsubscribable;
  constructor(public vm: NotificationService) { }

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
