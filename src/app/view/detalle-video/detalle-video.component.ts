import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { InfografiaI } from '../../models/infografia.interface';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-detalle-video',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, MatTabsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, AliadosComponent],
  templateUrl: './detalle-video.component.html',
  styleUrl: './detalle-video.component.css'
})
export class DetalleVideoComponent {
 //para el manejo de datos de infografias
  
 infografias: InfografiaI[] = [];  // Cambié 'noticia' a 'noticias', ahora es un arreglo
 infografia: any;  // Cambié 'noticia' a 'noticias', ahora es un arreglo
 constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}


 ngOnInit(): void {
   this.cargarInfografias();
   const id = this.route.snapshot.paramMap.get('id');
 console.log('ID recibido:', id);
 this.getDetalleVideo(id);
   //this.getDetalleInfografia(id);

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

   imagenURL: string | ArrayBuffer | null = null;
 
   mostrarImagen(event: any): void {
     const archivo = event.target.files[0];
     if (archivo) {
       const lector = new FileReader();
       lector.onload = () => {
         this.imagenURL = lector.result;
       };
       lector.readAsDataURL(archivo);
     }
   }
 
 
   
   getDetalleVideo(id: any) {
     this.api.getDetalleVideo(id).subscribe({
       next: (data: any) => {
         console.log('Detalles de la infografia:', data);
   
         const infografia = data[0];
         this.infografia = infografia; // Cambié 'noticia' a 'noticias', ahora es un arreglo
         
         // Usamos la función getImageUrl para construir la URL correcta
         this.imagenURL = this.getImageUrlDetalle(infografia.portada);
       },
       error: (error) => {
         console.error('Error al cargar detalles de la infografia:', error);
       }
     });
 
 
   }

   
 
   getImageUrlDetalle(relativePath: string): string {
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
