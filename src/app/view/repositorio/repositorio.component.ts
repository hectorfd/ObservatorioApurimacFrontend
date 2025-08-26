import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Router} from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { InfografiaI } from '../../models/infografia.interface';
import { AliadosComponent } from "../../components/aliados/aliados.component";
import { Entidad_AliadaI } from '../../models/entidad_aliada.interface';

@Component({
  selector: 'app-repositorio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatTabsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatPaginatorModule, CommonModule, AliadosComponent],
  templateUrl: './repositorio.component.html',
  styleUrl: './repositorio.component.css'
})
export class RepositorioComponent {

  
  // Funciones para redirigir a otras rutas

  redirectToDetalleRepositorio(id: any){
    this.router.navigate(['/detalle-repositorio/', id]); // '
  }

      //para el manejo de datos de infografias
    
  infografias: InfografiaI[] = [];  
  constructor(private router: Router, private api: ApiService) {}


  ngOnInit(): void {
    this.cargarInfografias();
    this.cargarEntidades();
  }
    
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
  
  //para traer los aliados
  entidades: Entidad_AliadaI[] = [];  // Cambié 'noticia' a 'noticias', ahora es un arreglo

  cargarEntidades() {
    this.api.getAllEntidadAliada(1).subscribe({
      next: (data) => {
        this.entidades = data;
        console.log('entidades cargadas:', this.entidades);
      },
      error: (error) => {
        console.error('Error al cargar entidades:', error);
      }
    });
  }

  getImageUrlEntidad(relativePath: string): string {
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

}
