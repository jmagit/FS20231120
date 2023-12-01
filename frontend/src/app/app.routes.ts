import { Routes, UrlSegment } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { DemosComponent } from './demos/demos.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContactosAddComponent, ContactosEditComponent, ContactosListComponent, ContactosViewComponent } from './contactos';
import { ActoresComponent } from './actores';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';
import { LoginFormComponent, RegisterUserComponent } from './security';

export function svgFiles(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.endsWith('.svg') ? ({consumed: url}) : null;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'demos', component: DemosComponent, title: 'Demos' },
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent, title: 'Calculadora' },
  { path: 'contactos', component: ContactosListComponent },
  { path: 'contactos/add', component: ContactosAddComponent },
  { path: 'contactos/:id/edit', component: ContactosEditComponent },
  { path: 'contactos/:id', component: ContactosViewComponent },
  { path: 'contactos/:id/:kk', component: ContactosViewComponent },
  { path: 'alysia/baxendale', redirectTo: '/contactos/43' },
  { path: 'actores', children: [
    { path: '', component: ActoresComponent },
    { path: 'add', component: ActoresComponent },
    { path: ':id/edit', component: ActoresComponent },
    { path: ':id', component: ActoresComponent },
    { path: ':id/:kk', component: ActoresComponent },
  ] },
  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: RegisterUserComponent },
  { path: 'config', loadChildren: () => import('./config/config.module')},
  { matcher: svgFiles, component: GraficoSvgComponent },
  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404.html' },
];
