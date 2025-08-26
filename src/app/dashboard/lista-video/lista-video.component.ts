import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoI } from '../../models/video.interface';

@Component({
  selector: 'app-lista-video',
  standalone: true,
  imports: [
    FooterComponent, 
    TopbarComponent, 
    SidebarComponent, 
    MatTabsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatPaginatorModule, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './lista-video.component.html',
  styleUrl: './lista-video.component.css'
})
export class ListaVideoComponent {
  // Variables para el buscador
  busquedaTitulo: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';

  videos: VideoI[] = [];
  allVideos: VideoI[] = []; // Almacena todos los videos para filtrar

  constructor(private router: Router, private api: ApiService) {}

  redireccionarEditarVideo(id: any) {
    this.router.navigate(['/editar-video', id]);
  }

  ngOnInit(): void {
    this.cargarVideos();
  }

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
  
  eliminarvideos(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
      this.api.deleteVideo(id).subscribe({
        next: (response) => {
          console.log('Video eliminado correctamente');
          // Actualizar la lista de videos después de eliminar
          this.cargarVideos();
        },
        error: (error) => {
          console.error('Error al eliminar el video:', error);
        }
      });
    }
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
    
    console.log('Búsqueda realizada:', {
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