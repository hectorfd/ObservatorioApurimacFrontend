import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { NoticiaI } from '../../models/noticia.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-noticia.component.html',
  styleUrl: './crear-noticia.component.css'
})
export class CrearNoticiaComponent {

  imagenURL: string | ArrayBuffer | null = null;
  imagenFile!: File;

  noticiaForm = new FormGroup({
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
        this.noticiaForm.patchValue({ portada: archivo.name });
      };
      lector.readAsDataURL(archivo);
    }
  }

  registrarNoticia() {
    if (this.noticiaForm.valid && this.imagenFile) {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
  
      const formData = new FormData();
  
      // Agregamos los campos del formulario
      formData.append('titulo', this.noticiaForm.controls.titulo.value || '');
      formData.append('descripcion', this.noticiaForm.controls.descripcion.value || '');
      formData.append('fecha', this.noticiaForm.controls.fecha.value || '');
      formData.append('lugar', this.noticiaForm.controls.lugar.value || '');
  
      // Agregamos la imagen
      formData.append('portada', this.imagenFile, this.imagenFile.name);
  
      // Agregamos el token
      formData.append('token', token);
  
      this.api.postNoticia(formData).subscribe(() => {
        this.router.navigate(['/lista-noticia']);
      }, error => {
        console.error('Error al registrar la noticia', error);
      });
    }
  }
  
}
