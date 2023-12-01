import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AjaxWaitComponent, HeaderComponent, NotificationComponent, NotificationModalComponent } from './main';
import { NavigationService } from './common-services';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NotificationComponent, NotificationModalComponent, AjaxWaitComponent, HeaderComponent ]
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(navega: NavigationService) {}
}
