import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { InfografiaI } from '../../models/infografia.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-entidad-aliada',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-entidad-aliada.component.html',
  styleUrl: './crear-entidad-aliada.component.css'
})
export class CrearEntidadAliadaComponent {
  
  imagenURL: string | ArrayBuffer | null = null;
  imagenFile!: File;
  
  entidadAliadaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    portada: new FormControl('', Validators.required),
    fecha_registro: new FormControl('', Validators.required),
  });
  
  constructor(private api: ApiService, private router: Router) {}
  
  mostrarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.imagenFile = archivo;
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenURL = lector.result;
        this.entidadAliadaForm.patchValue({ portada: archivo.name });
      };
      lector.readAsDataURL(archivo);
    }
  }
  
  registrarEntidadAliada() {
    if (this.entidadAliadaForm.valid && this.imagenFile) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
      
      // Opción 1: enviar como FormData (para archivos)
      const formData = new FormData();
      
      // Agregamos los campos del formulario
      formData.append('nombre', this.entidadAliadaForm.controls.nombre.value || '');
      formData.append('descripcion', this.entidadAliadaForm.controls.descripcion.value || '');
      formData.append('fecha_registro', this.entidadAliadaForm.controls.fecha_registro.value || '');
      
      // Agregamos la imagen
      formData.append('portada', this.imagenFile, this.imagenFile.name);
      
      // Agregamos el token
      formData.append('token', token);
      
      this.api.postEntidadAliada(formData).subscribe(() => {
        this.router.navigate(['/lista-entidad-aliada']);
      }, error => {
        console.error('Error al registrar la entidad aliada', error);
      });
      
    }
  }

}
