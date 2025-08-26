import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { NoticiaI } from '../../models/noticia.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { InfografiaI } from '../../models/infografia.interface';
import { VideoI } from '../../models/video.interface';
import { AliadosComponent } from "../../components/aliados/aliados.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MatTabsModule, CommonModule, AliadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  //styleUrl: 'css/style.css'

})
export class HomeComponent {
  noticias: NoticiaI[] = [];  // Cambié 'noticia' a 'noticias', ahora es un arreglo
  infografias: InfografiaI[] = [];  // Cambié 'noticia' a 'noticias', ahora es un arreglo

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cargarNoticias();
    this.cargarInfografias();
  }

  cargarNoticias() {
    this.api.getAllNoticias(1).subscribe({
      next: (data) => {
        this.noticias = data;
        console.log('Noticias cargadas:', this.noticias);
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
      }
    });
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) {
      // Si no hay imagen, devuelve una imagen por defecto
      return 'assets/img/no-image.jpg';
    }
    
    // Si la ruta ya contiene la URL completa
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Construir URL completa
    // IMPORTANTE: Asegúrate de que esta URL sea la correcta para acceder a tus imágenes
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }


  //para infografias
  cargarInfografias() {
    this.api.getAllInfografias(1).subscribe({
      next: (data) => {
        this.infografias = data;
        console.log('Noticias cargadas:', this.infografias);
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
      }
    });
  }

  getImageUrlInfografia(relativePath: string): string {
    if (!relativePath) {
      // Si no hay imagen, devuelve una imagen por defecto
      return 'assets/img/no-image.jpg';
    }
    
    // Si la ruta ya contiene la URL completa
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Construir URL completa
    // IMPORTANTE: Asegúrate de que esta URL sea la correcta para acceder a tus imágenes
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }

  //para direcciones

  redirect(){
    this.router.navigate(['/about']); // Redirige a 'captacion'

  }
  redirectToNoticias(){
    this.router.navigate(['/noticias']); // '
  }
  
}
