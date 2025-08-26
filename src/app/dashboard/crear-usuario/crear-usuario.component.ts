import { Component } from '@angular/core';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, TopbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
//   fotoPerfilURL: string | ArrayBuffer | null = null;

// mostrarFotoPerfil(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//         const archivo = input.files[0];
//         const lector = new FileReader();
//         lector.onload = () => {
//             this.fotoPerfilURL = lector.result;
//         };
//         lector.readAsDataURL(archivo); // Convierte la imagen a base64 para previsualizarla
//     }
// }

nuevoForm = new FormGroup({
  nombre: new FormControl(''),
  apellido: new FormControl(''),
  nombre_usuario: new FormControl(''),
  contrasena: new FormControl(''),
  //confirmarContrasena: new FormControl('', Validators.required),
  estado: new FormControl(''),
  fecha_registro: new FormControl(''),
  token: new FormControl('')
});

constructor(
  private api: ApiService, 
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      token: token
    });
    console.log(token);
  }
}

registrarUsuario() {
  if (this.nuevoForm.valid) {
    this.api.postUsuario(this.nuevoForm.value).subscribe({
      next: (data) => {
        console.log('Usuario registrado exitosamente', data);
        this.router.navigate(['/lista-usuario']); // ← Cambia la ruta si quieres
      },
      error: (error) => {
        console.error('Error al registrar usuario', error);
      }
    });
  } else {
    console.warn('Formulario inválido');
  }
}




}
