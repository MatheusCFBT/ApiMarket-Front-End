import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { MenuComponent } from './navegacao/menu/menu.component';  
import { HomeComponent } from './navegacao/home/home.component';  
import { FooterComponent } from './navegacao/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, MenuComponent, HomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ApiMarkeet';
}
