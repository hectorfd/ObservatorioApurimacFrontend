import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Agregamos FormsModule para ngModel
import { InfografiaI } from '../../models/infografia.interface';
import { VideoI } from '../../models/video.interface';
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    MatTabsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatPaginatorModule,
    CommonModule, 
    AliadosComponent,
    FormsModule // Agregamos FormsModule para el funcionamiento de ngModel
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  // Variables para el manejo de datos
  infografias: InfografiaI[] = [];
  videos: VideoI[] = [];
  
  // Variables para mantener copias completas para filtrado
  allVideos: VideoI[] = [];
  
  // Variables para el buscador
  busquedaTitulo: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';
  
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cargarVideos();
    this.cargarInfografias(); // ¿Es necesario cargar infografías en el componente de videos?
  }

  // Manejo de redirecciones
  redireccionarDetalleVideo(id: any) {
    this.router.navigate(['/detalle-video', id]);
  }

  // Cargar videos
  cargarVideos() {
    this.api.getAllVideos(1).subscribe({
      next: (data) => {
        this.videos = data;
        this.allVideos = data; // Guardamos una copia de todos los videos
        console.log('Videos cargados:', this.videos);
      },
      error: (error) => {
        console.error('Error al cargar videos:', error);
      }
    });
  }

  // Función para obtener URL de imagen/video
  getImageUrl(relativePath: string): string {
    if (!relativePath) {
      // Si no hay imagen/video, devuelve una imagen por defecto
      return 'assets/img/no-image.jpg';
    }
    
    // Si la ruta ya contiene la URL completa
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Construir URL completa
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }

  // Cargar infografías (¿Es necesario este método en el componente de videos?)
  cargarInfografias() {
    this.api.getAllInfografias(1).subscribe({
      next: (data) => {
        this.infografias = data;
        console.log('Infografías cargadas:', this.infografias);
      },
      error: (error) => {
        console.error('Error al cargar infografías:', error);
      }
    });
  }

  // Función para buscar videos
  buscarVideos(event: Event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Comenzamos con todos los videos
    let videosFiltrados = [...this.allVideos];
    
    // Filtrar por título si hay algo escrito
    if (this.busquedaTitulo && this.busquedaTitulo.trim() !== '') {
      const terminoBusqueda = this.busquedaTitulo.toLowerCase().trim();
      videosFiltrados = videosFiltrados.filter(video => 
        video.titulo.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    // Filtrar por fecha desde
    if (this.fechaDesde) {
      const fechaDesdeObj = new Date(this.fechaDesde);
      fechaDesdeObj.setHours(0, 0, 0, 0);
      
      videosFiltrados = videosFiltrados.filter(video => {
        const fechaVideo = new Date(video.fecha);
        return fechaVideo >= fechaDesdeObj;
      });
    }
    
    // Filtrar por fecha hasta
    if (this.fechaHasta) {
      const fechaHastaObj = new Date(this.fechaHasta);
      fechaHastaObj.setHours(23, 59, 59, 999);
      
      videosFiltrados = videosFiltrados.filter(video => {
        const fechaVideo = new Date(video.fecha);
        return fechaVideo <= fechaHastaObj;
      });
    }
    
    // Actualizar la lista de videos mostrados
    this.videos = videosFiltrados;
    
    console.log('Búsqueda de videos realizada:', {
      titulo: this.busquedaTitulo,
      desde: this.fechaDesde,
      hasta: this.fechaHasta,
      resultados: this.videos.length
    });
  }
  
  // Función para reiniciar la búsqueda
  limpiarFiltros() {
    this.busquedaTitulo = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.videos = [...this.allVideos];
  }
}