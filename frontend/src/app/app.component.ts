import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DemosComponent } from './demos/demos.component';
import { NotificationComponent, NotificationModalComponent } from './main';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NotificationComponent, DemosComponent, NotificationModalComponent]
})
export class AppComponent {
}
