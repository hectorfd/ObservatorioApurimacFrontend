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
  selector: 'app-editar-video',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-video.component.html',
  styleUrl: './editar-video.component.css'
})
export class EditarVideoComponent {
  imagenURL: string | ArrayBuffer | null = null;

  mostrarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenURL = lector.result;
      };
      lector.readAsDataURL(archivo);
    }
  }

  formulario = new FormGroup({
    id_video: new FormControl(''),
    fecha: new FormControl(''),
    lugar: new FormControl(''),
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    portada: new FormControl(''),
    token: new FormControl(''),
  });
  

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    this.getDetalleVideo(id);
  }
  
  getDetalleVideo(id: any) {
    this.api.getDetalleVideo(id).subscribe({
      next: (data: any) => {
        console.log('Detalles de la video:', data);
  
        const video = data[0];
        let token = this.getToken();

        this.formulario.patchValue({
          id_video: video.id_video,
          fecha: video.fecha,
          lugar: video.lugar,
          titulo: video.titulo,
          descripcion: video.descripcion,
          portada: video.portada,
          token: token
        });
  
        // Usamos la función getImageUrl para construir la URL correcta
        this.imagenURL = this.getImageUrl(video.portada);
      },
      error: (error) => {
        console.error('Error al cargar detalles del video:', error);
      }
    });

          console.log(this.formulario.value.id_video);

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

    this.api.putVideo(formData).subscribe(data => {
        this.router.navigate(['/lista-video']);
    });
}


}
