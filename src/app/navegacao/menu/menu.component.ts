import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

}
