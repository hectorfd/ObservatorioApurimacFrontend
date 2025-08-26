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
import { NoticiaI } from '../../models/noticia.interface';
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-noticias',
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
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  // Variables para las listas
  infografias: InfografiaI[] = [];
  noticias: NoticiaI[] = [];
  
  // Variables para almacenar las listas completas (sin filtrar)
  allInfografias: InfografiaI[] = [];
  allNoticias: NoticiaI[] = [];
  
  // Variables para el buscador
  busquedaTitulo: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';
  
  constructor(private router: Router, private api: ApiService) {}

  //manejo de redirecciones
  redireccionarDetalleNoticia(id: any) {
    this.router.navigate(['/detalle-noticia', id]);
  }

  ngOnInit(): void {
    this.cargarInfografias();
    this.cargarNoticias();
  }

  //para las noticias
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
      // Si no hay imagen, devuelve una imagen por defecto
      return 'assets/img/no-image.jpg';
    }
    
    // Si la ruta ya contiene la URL completa
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Construir URL completa
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }

  //para infografias
  cargarInfografias() {
    this.api.getAllInfografias(1).subscribe({
      next: (data) => {
        this.infografias = data;
        this.allInfografias = data; // Guardamos una copia de todas las infografías
        console.log('Infografías cargadas:', this.infografias);
      },
      error: (error) => {
        console.error('Error al cargar infografías:', error);
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
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
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
  
  // Función para buscar infografías (similar a buscarNoticias)
  buscarInfografias(event: Event) {
    event.preventDefault();
    
    let infografiasFiltradas = [...this.allInfografias];
    
    if (this.busquedaTitulo && this.busquedaTitulo.trim() !== '') {
      const terminoBusqueda = this.busquedaTitulo.toLowerCase().trim();
      infografiasFiltradas = infografiasFiltradas.filter(infografia => 
        infografia.titulo.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    if (this.fechaDesde) {
      const fechaDesdeObj = new Date(this.fechaDesde);
      fechaDesdeObj.setHours(0, 0, 0, 0);
      
      infografiasFiltradas = infografiasFiltradas.filter(infografia => {
        const fechaInfografia = new Date(infografia.fecha);
        return fechaInfografia >= fechaDesdeObj;
      });
    }
    
    if (this.fechaHasta) {
      const fechaHastaObj = new Date(this.fechaHasta);
      fechaHastaObj.setHours(23, 59, 59, 999);
      
      infografiasFiltradas = infografiasFiltradas.filter(infografia => {
        const fechaInfografia = new Date(infografia.fecha);
        return fechaInfografia <= fechaHastaObj;
      });
    }
    
    this.infografias = infografiasFiltradas;
    
    console.log('Búsqueda de infografías realizada:', {
      titulo: this.busquedaTitulo,
      desde: this.fechaDesde,
      hasta: this.fechaHasta,
      resultados: this.infografias.length
    });
  }
  
  // Función para reiniciar la búsqueda
  limpiarFiltros() {
    this.busquedaTitulo = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.noticias = [...this.allNoticias];
    this.infografias = [...this.allInfografias];
  }
}