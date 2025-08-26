import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./view/home/home.component";
import {MatIconModule} from '@angular/material/icon';
import { HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule,RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'observatorio';
  token : any
  constructor(private router: Router) {
    
  }


  ngOnInit(): void {
    // Comprobar si el token está presente al cargar la aplicación
    // if (!this.token) {
    //   // Si el token no está presente, redirige al usuario al inicio de sesión
    //   this.router.navigate(['/login']);
    // }
  }


  getToken() {
    // Verifica si localStorage está disponible antes de acceder a él
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('token');
      return localStorage.getItem('token');
    }
    return null; // Si no está disponible, retorna null o un valor predeterminado
  }
  

}
