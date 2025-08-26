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
import { NoticiaI } from '../../models/noticia.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-noticia',
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
  templateUrl: './lista-noticia.component.html',
  styleUrls: ['./lista-noticia.component.css']
})
export class ListaNoticiaComponent {

  noticias: NoticiaI[] = [];
  allNoticias: NoticiaI[] = []; // Almacena todas las noticias para filtrar
  
  // Variables para el buscador
  busquedaTitulo: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';

  constructor(private router: Router, private api: ApiService) {}

  redireccionarEditarNoticia(id: any) {
    this.router.navigate(['/editar-noticia', id]);
  }
  
  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.api.getAllNoticias(1).subscribe({
      next: (data) => {
        this.noticias = data;
        this.allNoticias = data; // Guardamos una copia de todas las noticias
        console.log('Noticias cargadas:', this.noticias);
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
      }
    });
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) {
      return 'assets/img/no-image.jpg';
    }
    
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }
  
  eliminarNoticia(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.api.deleteNoticia(id).subscribe({
        next: (response) => {
          console.log('Noticia eliminada correctamente');
          this.cargarNoticias();
        },
        error: (error) => {
          console.error('Error al eliminar la noticia:', error);
        }
      });
    }
  }

  // Función para buscar noticias
  buscarNoticias(event: Event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Comenzamos con todas las noticias
    let noticiasFiltradas = [...this.allNoticias];
    
    // Filtrar por título si hay algo escrito
    if (this.busquedaTitulo && this.busquedaTitulo.trim() !== '') {
      const terminoBusqueda = this.busquedaTitulo.toLowerCase().trim();
      noticiasFiltradas = noticiasFiltradas.filter(noticia => 
        noticia.titulo.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    // Filtrar por fecha desde
    if (this.fechaDesde) {
      const fechaDesdeObj = new Date(this.fechaDesde);
      fechaDesdeObj.setHours(0, 0, 0, 0);
      
      noticiasFiltradas = noticiasFiltradas.filter(noticia => {
        const fechaNoticia = new Date(noticia.fecha);
        return fechaNoticia >= fechaDesdeObj;
      });
    }
    
    // Filtrar por fecha hasta
    if (this.fechaHasta) {
      const fechaHastaObj = new Date(this.fechaHasta);
      fechaHastaObj.setHours(23, 59, 59, 999);
      
      noticiasFiltradas = noticiasFiltradas.filter(noticia => {
        const fechaNoticia = new Date(noticia.fecha);
        return fechaNoticia <= fechaHastaObj;
      });
    }
    
    // Actualizar la lista de noticias mostradas
    this.noticias = noticiasFiltradas;
    
    console.log('Búsqueda realizada:', {
      titulo: this.busquedaTitulo,
      desde: this.fechaDesde,
      hasta: this.fechaHasta,
      resultados: this.noticias.length
    });
  }
  
  // Función para reiniciar la búsqueda
  limpiarFiltros() {
    this.busquedaTitulo = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.noticias = [...this.allNoticias];
  }
}