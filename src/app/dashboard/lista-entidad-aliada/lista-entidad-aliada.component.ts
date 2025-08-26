import { Component } from '@angular/core';
import { TopbarComponent } from "../components/topbar/topbar.component";
import { FooterComponent } from "../components/footer/footer.component";
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
import { Entidad_AliadaI } from '../../models/entidad_aliada.interface';
@Component({
  selector: 'app-lista-entidad-aliada',
  standalone: true,
  imports: [
    TopbarComponent, 
    FooterComponent, 
    SidebarComponent, 
    MatTabsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatPaginatorModule, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './lista-entidad-aliada.component.html',
  styleUrl: './lista-entidad-aliada.component.css'
})
export class ListaEntidadAliadaComponent {

    // Variables para el buscador
    busquedaTitulo: string = '';
    fechaDesde: string = '';
    fechaHasta: string = '';
  
    entidad_aliada: Entidad_AliadaI[] = [];
    allentidad_aliada: Entidad_AliadaI[] = []; // Almacena todas las infografías para filtrar
  
    constructor(private router: Router, private api: ApiService) {}
  
    // Manejo de redirecciones
    redireccionarEditarEntidadAliada(id: any) {
      this.router.navigate(['/editar-entidad-aliada', id]);
    }
    redireccionarDetallesEntidadAliada(id: any) {
      this.router.navigate(['/detalle-entidad-aliada', id]);
    }
  
    ngOnInit(): void {
      this.cargarentidad_aliada();
    }
  
    cargarentidad_aliada() {
      this.api.getAllEntidadAliada(1).subscribe({
        next: (data) => {
          this.entidad_aliada = data;
          this.allentidad_aliada = data; // Guardamos una copia de todas las infografías
          console.log('entidades cargadas:', this.entidad_aliada);
          
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
        // console.log('URL completa:', relativePath);

        return relativePath;
      }
      
      // Construir URL completa
      // console.log('URL completa:', "http://localhost:80/API OBSERVATORIO/" + relativePath);

      // return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
      return encodeURI(`http://localhost:80/API OBSERVATORIO/${relativePath}`);

    }
    
    eliminarentidad_aliada(id: any) {
      if (confirm('¿Estás seguro de que deseas eliminar esta entidaad aliada?')) {
        this.api.deleteEntidadAliada(id).subscribe({
          next: (response) => {
            console.log('entidaad aliada eliminada correctamente');
            // Actualizar la lista de infografías después de eliminar
            this.cargarentidad_aliada();
          },
          error: (error) => {
            console.error('Error al eliminar la entidad :', error);
          }
        });
      }
    }
  
    // Función para buscar infografías
    buscarentidad_aliada(event: Event) {
      event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
      
      // Comenzamos con todas las infografías
      let entidad_aliadaFiltradas = [...this.allentidad_aliada];
      
      // Filtrar por título si hay algo escrito
      if (this.busquedaTitulo && this.busquedaTitulo.trim() !== '') {
        const terminoBusqueda = this.busquedaTitulo.toLowerCase().trim();
        entidad_aliadaFiltradas = entidad_aliadaFiltradas.filter(entidad_aliada => 
          entidad_aliada.nombre.toLowerCase().includes(terminoBusqueda)
        );
      }
      
      // Filtrar por fecha desde
      if (this.fechaDesde) {
        const fechaDesdeObj = new Date(this.fechaDesde);
        fechaDesdeObj.setHours(0, 0, 0, 0);
        
        entidad_aliadaFiltradas = entidad_aliadaFiltradas.filter(entidad_aliada => {
          const fechaentidad_aliada = new Date(entidad_aliada.fecha_registro);
          return fechaentidad_aliada >= fechaDesdeObj;
        });
      }
      
      // Filtrar por fecha hasta
      if (this.fechaHasta) {
        const fechaHastaObj = new Date(this.fechaHasta);
        fechaHastaObj.setHours(23, 59, 59, 999);
        
        entidad_aliadaFiltradas = entidad_aliadaFiltradas.filter(entidad_aliada => {
          const fechaentidad_aliada = new Date(entidad_aliada.fecha_registro);
          return fechaentidad_aliada <= fechaHastaObj;
        });
      }
      
      // Actualizar la lista de infografías mostradas
      this.entidad_aliada = entidad_aliadaFiltradas;
      
      // console.log('Búsqueda realizada:', {
      //   titulo: this.busquedaTitulo,
      //   desde: this.fechaDesde,
      //   hasta: this.fechaHasta,
      //   resultados: this.entidad_aliada.length
      // });
    }
    
    // Función para reiniciar la búsqueda
    limpiarFiltros() {
      this.busquedaTitulo = '';
      this.fechaDesde = '';
      this.fechaHasta = '';
      this.entidad_aliada = [...this.allentidad_aliada];
    }
  

}
