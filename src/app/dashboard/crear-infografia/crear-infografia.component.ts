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
  selector: 'app-crear-infografia',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-infografia.component.html',
  styleUrl: './crear-infografia.component.css'
})
export class CrearInfografiaComponent {
  
  imagenURL: string | ArrayBuffer | null = null;
  imagenFile!: File;
  
  infografiaForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    lugar: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    portada: new FormControl('', Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) {}
  
  mostrarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.imagenFile = archivo;
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenURL = lector.result;
        this.infografiaForm.patchValue({ portada: archivo.name });
      };
      lector.readAsDataURL(archivo);
    }
  }
  
  registrarInfografia() {
    if (this.infografiaForm.valid && this.imagenFile) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
      
      // Opción 1: enviar como FormData (para archivos)
      const formData = new FormData();
      
      // Agregamos los campos del formulario
      formData.append('titulo', this.infografiaForm.controls.titulo.value || '');
      formData.append('descripcion', this.infografiaForm.controls.descripcion.value || '');
      formData.append('fecha', this.infografiaForm.controls.fecha.value || '');
      formData.append('lugar', this.infografiaForm.controls.lugar.value || '');
      
      // Agregamos la imagen
      formData.append('portada', this.imagenFile, this.imagenFile.name);
      
      // Agregamos el token
      formData.append('token', token);
      
      this.api.postInfografia(formData).subscribe(() => {
        this.router.navigate(['/lista-infografia']);
      }, error => {
        console.error('Error al registrar la infografía', error);
      });
      
    }
  }
}