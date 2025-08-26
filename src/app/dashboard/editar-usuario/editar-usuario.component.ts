import { Component } from '@angular/core';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

    formulario = new FormGroup({
      id_usuario: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      nombre_usuario: new FormControl(''),
      contrasena: new FormControl(''),
      estado: new FormControl(''),
      fecha_registro: new FormControl(''),
      token: new FormControl(''),
    });
    
  
    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}
  
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('ID recibido:', id);
      this.getDetalleUsuario(id);
    }
    
    getDetalleUsuario(id: any) {
      this.api.getDetalleUsuario(id).subscribe({
        next: (data: any) => {
          console.log('Detalles de la usuario:', data);
    
          const usuario = data[0];
          let token = this.getToken();
  
          this.formulario.patchValue({
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            nombre_usuario: usuario.nombre_usuario,
            contrasena: usuario.contrasena,
            estado: usuario.estado,
            fecha_registro: usuario.fecha_registro,
            token: token
          });
    
          // Usamos la función getImageUrl para construir la URL correcta
        },
        error: (error) => {
          console.error('Error al cargar detalles del usuario:', error);
        }
      });
  
            console.log(this.formulario.value.id_usuario);
  
    }
    
    getToken() {
      // Verifica si localStorage está disponible antes de acceder a él
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('token');
      }
      return null; // Si no está disponible, retorna null o un valor predeterminado
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
  
    putForm(form: any) {
      // Crear una copia del formulario sin el campo de contraseña si está vacío
      const formData = { ...form };
  
      this.api.putUsuario(formData).subscribe(data => {
          this.router.navigate(['/lista-usuario']);
      });
  }
  

}
