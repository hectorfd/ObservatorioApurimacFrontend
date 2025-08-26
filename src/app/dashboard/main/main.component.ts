import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { TopbarComponent } from "../components/topbar/topbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: '../componentes dashboard/css/sb-admin-2.min.css'
})
export class MainComponent {

    // constructor(private router: Router) {}
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
  
    ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        this.cargarScripts();
      }
    }
  
    cargarScripts() {
      this.loadScript('assets/vendor/jquery/jquery.min.js')
        .then(() => {
          console.log('jQuery cargado');
          return this.loadScript('assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
        })
        .then(() => {
          console.log('Bootstrap cargado');
          return this.loadScript('assets/vendor/jquery-easing/jquery.easing.min.js');  // Script adicional 1
        })
        .then(() => {
          console.log('Script1 cargado');
          return this.loadScript('assets/js-sb-admin/sb-admin-2.min.js');  // Script adicional 2
        })
        .then(() => {
          console.log('Script2 cargado');
          return this.loadScript('assets/vendor/chart.js/Chart.min.js');  // Script adicional 3
        })
        .then(() => {
          console.log('Script3 cargado');
        })
        .catch(err => {
          console.error('Error al cargar scripts', err);
        });
    }
  
    loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    }

  redireccionarCrearNoticia(){
    this.router.navigate(['/crear-noticia']); // '
  }

  redireccionarCrearInfografia(){
    this.router.navigate(['/crear-infografia']); // '
  }
  redireccionarCrearVideo(){
    this.router.navigate(['/crear-video']); // '
  }
  redireccionarCrearUsuario(){
    this.router.navigate(['/crear-usuario']); // '
  }

  redireccionarListaUsuario(){
    this.router.navigate(['/lista-usuario']); // '
  }
  redireccionarListaVideo(){
    this.router.navigate(['/lista-video']); // '
  }
  redireccionarListaNoticia(){
    this.router.navigate(['/lista-noticia']); // '
  }
  redireccionarListaInfografia(){
    this.router.navigate(['/lista-infografia']); // '
  }
  redireccionarInicio(){
    window.open('/home', '_blank');

  }
  redireccionarEntidadAliada(){
    window.open('/entidad-aliada');

  }
  redireccionarCrearEntidadAliada(){
    window.open('/crear-entidad-aliada');

  }

}
