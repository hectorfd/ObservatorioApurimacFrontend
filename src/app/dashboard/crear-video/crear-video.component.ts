import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-video',
  standalone: true,
  imports: [ SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-video.component.html',
  styleUrls: ['./crear-video.component.css']
})
export class CrearVideoComponent {

  videoURL: string | ArrayBuffer | null = null;
  videoFile!: File;

  videoForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    lugar: new FormControl('', Validators.required),

    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    portada: new FormControl('', Validators.required)
  });

  constructor(private api: ApiService, private router: Router) {}

  mostrarVideo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const archivo = input.files[0];
      this.videoFile = archivo;
      const lector = new FileReader();
      lector.onload = () => {
        this.videoURL = lector.result;
        this.videoForm.patchValue({ portada: archivo.name });
      };
      lector.readAsDataURL(archivo); // Convierte el video a base64 para previsualizar
    }
  }

  registrarVideo() {
    if (this.videoForm.valid && this.videoFile) {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
  
      const formData = new FormData();
  
      // Agregamos los campos del formulario
      formData.append('titulo', this.videoForm.controls.titulo.value || '');
      formData.append('descripcion', this.videoForm.controls.descripcion.value || '');
      formData.append('fecha', this.videoForm.controls.fecha.value || '');
      formData.append('lugar', this.videoForm.controls.lugar.value || '');
  
  
      // Agregamos el archivo de video
      formData.append('portada', this.videoFile, this.videoFile.name);
  
      // Agregamos el token
      formData.append('token', token);
  
      this.api.postVideo(formData).subscribe(() => {
        this.router.navigate(['/lista-video']);
      }, error => {
        console.error('Error al registrar el video', error);
      });
    }
  }
}
