/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, MIS_VALIDADORES } from '@my/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService, NotificationType } from '../common-services';
import { AUTH_REQUIRED, AuthService } from '../security';

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  protected http = inject(HttpClient)

  constructor(entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(extras = {}): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.baseUrl, Object.assign({}, this.option, extras));
  }
  get(id: K, extras = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
  add(item: T, extras = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, Object.assign({}, this.option, extras));
  }
  change(id: K, item: T, extras = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, Object.assign({}, this.option, extras));
  }
  remove(id: K, extras = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
}

@Injectable({ providedIn: 'root' })
export class PersonasDaoService extends RESTDAOService<any, number> {
  constructor() {
    super('personas')
  }
}

@Injectable({ providedIn: 'root' })
export class ActoresDaoService extends RESTDAOService<any, any> {
  constructor() {
    super('actores/v1', { context: new HttpContext().set(AUTH_REQUIRED, true),
    })
  }
  // "listado": [
  //   {
  //     "actorId": 1,
  //     "firstName": "PENELOPE",
  //     "lastName": "GUINESS"
  //   },

}

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
  listado: any = {}

  constructor(private dao: PersonasDaoService, private daoActores: ActoresDaoService,
    private notify: NotificationService, public auth: AuthService) { }

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit() {
    this.dao.get(this.elemento.id).subscribe({
      next: data => {
        this.elemento = data
        this.modo = 'edit'
      },
      error: err => this.notify.add(`ERROR ${err.status}: ${err.message}`)
    })
    // this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pgrillo@example.com', nif: '12345678Z', fnacimiento: '2000-01-01', edad: 44 }
    // this.modo = 'edit'
  }
  cancel() {

  }
  send() {
    switch (this.modo) {
      case 'add':
        // alert(`POST: ${JSON.stringify(this.elemento)}`)
        this.dao.add(this.elemento).subscribe({
          next: () => this.notify.add('Creado', NotificationType.info),
          error: err => this.notify.add(`ERROR ${err.status}: ${err.message}`)
        })
        break;
      case 'edit':
        this.dao.change(this.elemento.id, this.elemento).subscribe({
          next: () => this.notify.add('Modificado', NotificationType.info),
          error: err => this.notify.add(`ERROR ${err.status}: ${err.message}`)
        })
        // alert(`PUT ${this.elemento.id}: ${JSON.stringify(this.elemento)}`)
        break;
    }
  }
  list() {
    this.daoActores.query().subscribe({
      next: data => {
        this.listado = data
      },
      error: err => this.notify.add(`ERROR ${err.status}: ${err.message}`)
    })
  }
}
