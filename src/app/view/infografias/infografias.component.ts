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
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-infografias',
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
  templateUrl: './infografias.component.html',
  styleUrl: './infografias.component.css'
})
export class InfografiasComponent {
  //para el manejo de datos de infografias
  infografias: InfografiaI[] = [];
  allInfografias: InfografiaI[] = []; // Para almacenar todas las infografías sin filtrar
  
  // Variables para el buscador
  busquedaTitulo: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';
  
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cargarInfografias();
  }

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
  
  //manejo de redirecciones
  redireccionarDetalleInfografia(id: any) {
    this.router.navigate(['/detalle-infografia', id]);
  }
  
  // Función para buscar infografías
  buscarInfografias(event: Event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Comenzamos con todas las infografías
    let infografiasFiltradas = [...this.allInfografias];
    
    // Filtrar por título si hay algo escrito
    if (this.busquedaTitulo && this.busquedaTitulo.trim() !== '') {
      const terminoBusqueda = this.busquedaTitulo.toLowerCase().trim();
      infografiasFiltradas = infografiasFiltradas.filter(infografia => 
        infografia.titulo.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    // Filtrar por fecha desde
    if (this.fechaDesde) {
      const fechaDesdeObj = new Date(this.fechaDesde);
      fechaDesdeObj.setHours(0, 0, 0, 0);
      
      infografiasFiltradas = infografiasFiltradas.filter(infografia => {
        const fechaInfografia = new Date(infografia.fecha);
        return fechaInfografia >= fechaDesdeObj;
      });
    }
    
    // Filtrar por fecha hasta
    if (this.fechaHasta) {
      const fechaHastaObj = new Date(this.fechaHasta);
      fechaHastaObj.setHours(23, 59, 59, 999);
      
      infografiasFiltradas = infografiasFiltradas.filter(infografia => {
        const fechaInfografia = new Date(infografia.fecha);
        return fechaInfografia <= fechaHastaObj;
      });
    }
    
    // Actualizar la lista de infografías mostradas
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
    this.infografias = [...this.allInfografias];
  }
  redirectToDatos() {
  this.router.navigate(['/datos-estadisticos']);
}

redirectToNormas() {
  this.router.navigate(['/normas-legales']);
}

redirectToServicios() {
  this.router.navigate(['/red-servicios']);
}
}