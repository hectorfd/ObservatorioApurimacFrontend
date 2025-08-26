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
import { FormsModule } from '@angular/forms';  // Agregamos FormsModule para ngModel
import { UsuarioI } from '../../models/usuario.interface';

@Component({
  selector: 'app-lista-usuario',
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
    FormsModule  // Agregamos FormsModule para el funcionamiento de ngModel
  ],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent {
  // Variables para el buscador
  busquedaNombre: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';

  usuarios: UsuarioI[] = [];
  allUsuarios: UsuarioI[] = []; // Almacena todos los usuarios para filtrar

  constructor(private router: Router, private api: ApiService) {}

  redireccionarEditarUusario(id: any) {
    this.router.navigate(['/editar-usuario', id]);
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.api.getAllUsuarios(1).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.allUsuarios = data; // Guardamos una copia de todos los usuarios
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  eliminarUsuario(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.api.deleteUsuario(id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado correctamente');
          // Actualizar la lista de usuarios después de eliminar
          this.getUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }

  // Función para buscar usuarios
  buscarUsuarios(event: Event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Comenzamos con todos los usuarios
    let usuariosFiltrados = [...this.allUsuarios];
    
    // Filtrar por nombre/apellido si hay algo escrito
    if (this.busquedaNombre && this.busquedaNombre.trim() !== '') {
      const terminoBusqueda = this.busquedaNombre.toLowerCase().trim();
      usuariosFiltrados = usuariosFiltrados.filter(usuario => 
        usuario.nombre.toLowerCase().includes(terminoBusqueda) || 
        usuario.apellido.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    // Filtrar por fecha desde
    if (this.fechaDesde) {
      const fechaDesdeObj = new Date(this.fechaDesde);
      fechaDesdeObj.setHours(0, 0, 0, 0);
      
      usuariosFiltrados = usuariosFiltrados.filter(usuario => {
        const fechaUsuario = new Date(usuario.fecha_registro);
        return fechaUsuario >= fechaDesdeObj;
      });
    }
    
    // Filtrar por fecha hasta
    if (this.fechaHasta) {
      const fechaHastaObj = new Date(this.fechaHasta);
      fechaHastaObj.setHours(23, 59, 59, 999);
      
      usuariosFiltrados = usuariosFiltrados.filter(usuario => {
        const fechaUsuario = new Date(usuario.fecha_registro);
        return fechaUsuario <= fechaHastaObj;
      });
    }
    
    // Actualizar la lista de usuarios mostrados
    this.usuarios = usuariosFiltrados;
    
    console.log('Búsqueda realizada:', {
      nombre: this.busquedaNombre,
      desde: this.fechaDesde,
      hasta: this.fechaHasta,
      resultados: this.usuarios.length
    });
  }
  
  // Función para reiniciar la búsqueda
  limpiarFiltros() {
    this.busquedaNombre = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.usuarios = [...this.allUsuarios];
  }
}