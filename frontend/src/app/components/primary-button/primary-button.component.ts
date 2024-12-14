import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styles: ``
})
export class PrimaryButtonComponent {
  label = input('')

  btnClicked = output()
}