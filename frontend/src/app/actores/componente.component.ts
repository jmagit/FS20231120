/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ErrorMessagePipe, TypeValidator } from '@my/core';
import { ActoresViewModelService } from './servicios.service';

@Component({
  selector: 'app-actores',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css'],
  // providers: [ActoresViewModelService]
  standalone: true,
  imports: [
    forwardRef(() => ActoresAddComponent),
    forwardRef(() => ActoresEditComponent),
    forwardRef(() => ActoresViewComponent),
    forwardRef(() => ActoresListComponent),
  ],
})
export class ActoresComponent implements OnInit, OnDestroy {
  constructor(protected vm: ActoresViewModelService, private route: ActivatedRoute) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit() {
      const id = this.route.snapshot.params['id'];
      if (id) {
        if (this.route.snapshot.url.slice(-1)[0]?.path === 'edit') {
          this.vm.edit(+id);
        } else {
          this.vm.view(+id);
        }
      } else if (this.route.snapshot.url.slice(-1)[0]?.path === 'add') {
        this.vm.add();
      } else {
        this.vm.load();
      }
    }
    ngOnDestroy(): void { this.vm.clear(); }
}

@Component({
  selector: 'app-actores-list',
  templateUrl: './tmpl-list.con-rutas.component.html',
  // templateUrl: './tmpl-list.sin-rutas.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [PaginatorModule, RouterLink]
})
export class ActoresListComponent implements OnInit, OnDestroy {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
@Component({
  selector: 'app-actores-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class ActoresAddComponent implements OnInit {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void { }
}
@Component({
  selector: 'app-actores-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class ActoresEditComponent implements OnInit, OnDestroy {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
@Component({
  selector: 'app-actores-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [DatePipe, RouterLink]
})
export class ActoresViewComponent implements OnInit, OnDestroy {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}

/*
@Component({
    selector: 'app-actores-list',
    templateUrl: './tmpl-list.con-rutas.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [RouterLink, PaginatorModule]
})
export class ActoresListComponent implements OnChanges, OnDestroy {
  @Input() page = 0

  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  // ngOnInit(): void {
  //   // this.vm.list();
  //   this.vm.load()
  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.vm.load(this.page)
  }
  ngOnDestroy(): void { this.vm.clear(); }
}
@Component({
    selector: 'app-actores-add',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class ActoresAddComponent implements OnInit {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}
@Component({
    selector: 'app-actores-edit',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class ActoresEditComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(protected vm: ActoresViewModelService,
    protected route: ActivatedRoute, protected router: Router) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = parseInt(params?.get('id') ?? '');
        if (id) {
          this.vm.edit(id);
        } else {
          this.router.navigate(['/404.html']);
        }
      });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
@Component({
    selector: 'app-actores-view',
    templateUrl: './tmpl-view.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [DatePipe]
})
export class ActoresViewComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: ActoresViewModelService, protected router: Router) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.view(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}
*/

export const ACTORES_COMPONENTES = [
  // ActoresComponent,
  ActoresListComponent, ActoresAddComponent, ActoresEditComponent, ActoresViewComponent,
];
