import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar';
import { HomeComponent } from '../pages/home/home';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('campus-exchange');
}
