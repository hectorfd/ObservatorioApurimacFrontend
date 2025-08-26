import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: '../../componentes dashboard/css/sb-admin-2.min.css'
})
export class TopbarComponent {


    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
  
    // ngOnInit() {
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.cargarScripts();
    //   }
    // }
  
    // cargarScripts() {
    //   this.loadScript('assets/vendor/jquery/jquery.min.js')
    //     .then(() => {
    //       console.log('jQuery cargado');
    //       return this.loadScript('assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    //     })
    //     .then(() => {
    //       console.log('Bootstrap cargado');
    //       return this.loadScript('assets/vendor/jquery-easing/jquery.easing.min.js');  // Script adicional 1
    //     })
    //     .then(() => {
    //       console.log('Script1 cargado');
    //       return this.loadScript('assets/js-sb-admin/sb-admin-2.min.js');  // Script adicional 2
    //     })
    //     .then(() => {
    //       console.log('Script2 cargado');
    //       return this.loadScript('assets/vendor/chart.js/Chart.min.js');  // Script adicional 3
    //     })
    //     .then(() => {
    //       console.log('Script3 cargado');
    //     })
    //     .catch(err => {
    //       console.error('Error al cargar scripts', err);
    //     });
    // }
  
    // loadScript(src: string): Promise<void> {
    //   return new Promise((resolve, reject) => {
    //     const script = document.createElement('script');
    //     script.src = src;
    //     script.type = 'text/javascript';
    //     script.onload = () => resolve();
    //     script.onerror = () => reject(new Error(`Script load error for ${src}`));
    //     document.body.appendChild(script);
    //   });
    // }

  closeSession(){
    if (confirm('¿Estás seguro de que deseas cerrar sesion?')){
      this.deleteToken();
    }
  }

  deleteToken(): void {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    if (!localStorage.getItem('token')) {
      // Si el token no está presente, redirige al usuario al inicio de sesión
      this.router.navigate(['login']);
    }    
  }


}
