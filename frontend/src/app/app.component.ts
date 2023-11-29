import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent, NotificationModalComponent } from './main';
import { DaskboardComponent } from './daskboard/daskboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NotificationComponent, DaskboardComponent, NotificationModalComponent]
})
export class AppComponent {
}
