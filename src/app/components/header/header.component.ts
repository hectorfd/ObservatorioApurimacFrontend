import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  
  constructor(private router: Router){

  }

  //funciones para redireccionar
  redirectToabout(){
    this.router.navigate(['/about']); // '

  }
  redirectToContact(){
    this.router.navigate(['/contact']); // '

  }
  redirectToInicio(){
    this.router.navigate(['/home']); // '
  }
  redirectToInfografias(){
    this.router.navigate(['/infografias']); // '
  }
  
  redirectToMarcoConceptual(){
    this.router.navigate(['/marco-conceptual']); // '
  }
  
  
  redirectToNoticias(){
    this.router.navigate(['/noticias']); // '
  }
  
  redirectToSistemaRegional(){
    this.router.navigate(['/sistema-regional']); // '
  }
  redirectToVideos(){
    this.router.navigate(['/videos']); // '
  }
  redirectToRepositorio(){
    this.router.navigate(['/repositorio']); // '
  }
  // redirectToDashboard() {
  //   window.open('/dashboard', '_blank');
  // }
  
  redirectToDashboard() {
    //window.open('/login', '_blank');
     this.router.navigate(['/login']);
  }
  

  menuAbierto = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  

}
