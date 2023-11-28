import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '@my/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AIRBUS';

  constructor(@Optional() out?: LoggerService) {
    if(!out) return
    out.error(`Es un error`)
    out.warn(`Es un warn`)
    out.info(`Es un info`)
    out.log(`Es un log`)
  }
}
