import { Component } from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

}
