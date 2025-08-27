import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { NoticiaI } from '../../models/noticia.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { InfografiaI } from '../../models/infografia.interface';
import { VideoI } from '../../models/video.interface';
import { AliadosComponent } from "../../components/aliados/aliados.component";
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MatTabsModule, CommonModule, AliadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  noticias: NoticiaI[] = [];
  infografias: InfografiaI[] = [];
  personasDesaparecidas: any[] = [];
  
  // Variables para el carousel de noticias
  currentSlide = 0;
  itemsPerView = 3;
  autoplayInterval: any;
  
  // Variables para el carousel de infografías
  currentInfografiasSlide = 0;
  infografiasItemsPerView = 2;
  infografiasAutoplayInterval: any;

  // Variables para el carousel de personas desaparecidas
  currentMissingPersonsSlide = 0;
  missingPersonsItemsPerView = 1;
  missingPersonsAutoplayInterval: any;

  private isBrowser: boolean;

  constructor(
    private router: Router, 
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.cargarNoticias();
    this.cargarInfografias();
    this.cargarPersonasDesaparecidas();
    if (this.isBrowser) {
      this.startAutoplay();
      this.startInfografiasAutoplay();
      this.startMissingPersonsAutoplay();
    }
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    if (this.infografiasAutoplayInterval) {
      clearInterval(this.infografiasAutoplayInterval);
    }
    if (this.missingPersonsAutoplayInterval) {
      clearInterval(this.missingPersonsAutoplayInterval);
    }
  }

  cargarNoticias() {
    this.api.getAllNoticias(1).subscribe({
      next: (response: NoticiaI[]) => {
        this.noticias = response;
        console.log('Noticias cargadas desde API:', this.noticias);
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        // En caso de error, usar algunos datos de respaldo
        this.noticias = [];
      }
    });
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) {
      return 'assets/img/User.png';
    }
    
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Si la imagen viene de la API y tiene la ruta completa desde assets
    if (relativePath.startsWith('assets/')) {
      // Convertir a ruta del servidor API
      return environment.apiUrl + relativePath;
    }
    
    // Si la imagen viene de la API, podría tener una ruta completa o relativa
    if (relativePath.includes('uploads/') || relativePath.includes('storage/')) {
      return relativePath;
    }
    
    return `assets/img/${relativePath}`;
  }

  cargarInfografias() {
    this.api.getAllInfografias(1).subscribe({
      next: (response: InfografiaI[]) => {
        this.infografias = response;
        console.log('Infografías cargadas desde API:', this.infografias);
      },
      error: (error) => {
        console.error('Error al cargar infografías:', error);
        // En caso de error, usar algunos datos de respaldo
        this.infografias = [];
      }
    });
  }

  getImageUrlInfografia(relativePath: string): string {
    if (!relativePath) {
      return 'assets/img/User.png';
    }
    
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Si la imagen viene de la API y tiene la ruta completa desde assets
    if (relativePath.startsWith('assets/')) {
      // Convertir a ruta del servidor API
      return environment.apiUrl + relativePath;
    }
    
    // Si la imagen viene de la API, podría tener una ruta completa o relativa
    if (relativePath.includes('uploads/') || relativePath.includes('storage/')) {
      return relativePath;
    }
    
    return `assets/img/${relativePath}`;
  }

  redirect(){
    this.router.navigate(['/about']).then(() => {
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }
  
  redirectToNoticias(){
    this.router.navigate(['/noticias']).then(() => {
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }

  redirectToInfografias(){
  this.router.navigate(['/infografias']).then(() => {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  });
}

  // Función para manejar el acordeón
  toggleAccordion(accordionId: string): void {
    if (!this.isBrowser) return;
    
    const content = document.getElementById(accordionId);
    const arrow = content?.parentElement?.querySelector('.accordion-arrow') as HTMLElement;
    
    if (content) {
      if (content.classList.contains('active')) {
        content.classList.remove('active');
        content.style.maxHeight = '0';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        // Cerrar otros acordeones
        const allAccordions = document.querySelectorAll('.accordion-content');
        const allArrows = document.querySelectorAll('.accordion-arrow');
        
        allAccordions.forEach(acc => {
          acc.classList.remove('active');
          (acc as HTMLElement).style.maxHeight = '0';
        });
        
        allArrows.forEach(arr => {
          (arr as HTMLElement).style.transform = 'rotate(0deg)';
        });
        
        // Abrir el acordeón seleccionado
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }
  }

  // Funciones para el carousel de noticias
  startAutoplay(): void {
    if (this.isBrowser) {
      this.autoplayInterval = setInterval(() => {
        this.moveCarousel('next');
      }, 4000);
    }
  }

  moveCarousel(direction: 'prev' | 'next'): void {
    const maxSlides = Math.max(0, this.noticias.length - this.itemsPerView);
    
    if (direction === 'next') {
      this.currentSlide = this.currentSlide >= maxSlides ? 0 : this.currentSlide + 1;
    } else {
      this.currentSlide = this.currentSlide <= 0 ? maxSlides : this.currentSlide - 1;
    }
    
    this.updateCarouselPosition();
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarouselPosition();
    this.resetAutoplay();
  }

  updateCarouselPosition(): void {
    if (!this.isBrowser) return;
    
    const track = document.querySelector('.news-carousel-track') as HTMLElement;
    if (track) {
      const translateX = -(this.currentSlide * (100 / this.itemsPerView));
      track.style.transform = `translateX(${translateX}%)`;
    }
  }

  getCarouselDots(): number[] {
    const maxSlides = Math.max(0, this.noticias.length - this.itemsPerView);
    return Array(maxSlides + 1).fill(0).map((_, i) => i);
  }

  resetAutoplay(): void {
    if (this.isBrowser) {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
      this.startAutoplay();
    }
  }

  // Funciones para el carousel de infografías
  startInfografiasAutoplay(): void {
    if (this.isBrowser) {
      this.infografiasAutoplayInterval = setInterval(() => {
        this.moveInfografiasCarousel('next');
      }, 5000);
    }
  }

  moveInfografiasCarousel(direction: 'prev' | 'next'): void {
    const maxSlides = Math.max(0, this.infografias.length - this.infografiasItemsPerView);
    
    if (direction === 'next') {
      this.currentInfografiasSlide = this.currentInfografiasSlide >= maxSlides ? 0 : this.currentInfografiasSlide + 1;
    } else {
      this.currentInfografiasSlide = this.currentInfografiasSlide <= 0 ? maxSlides : this.currentInfografiasSlide - 1;
    }
    
    this.updateInfografiasCarouselPosition();
    this.resetInfografiasAutoplay();
  }

  goToInfografiasSlide(index: number): void {
    this.currentInfografiasSlide = index;
    this.updateInfografiasCarouselPosition();
    this.resetInfografiasAutoplay();
  }

  updateInfografiasCarouselPosition(): void {
    if (!this.isBrowser) return;
    
    const track = document.querySelector('#infografias-section .news-carousel-track') as HTMLElement;
    if (track) {
      const translateX = -(this.currentInfografiasSlide * (100 / this.infografiasItemsPerView));
      track.style.transform = `translateX(${translateX}%)`;
    }
  }

  getInfografiasCarouselDots(): number[] {
    const maxSlides = Math.max(0, this.infografias.length - this.infografiasItemsPerView);
    return Array(maxSlides + 1).fill(0).map((_, i) => i);
  }

  resetInfografiasAutoplay(): void {
    if (this.isBrowser) {
      if (this.infografiasAutoplayInterval) {
        clearInterval(this.infografiasAutoplayInterval);
      }
      this.startInfografiasAutoplay();
    }
  }

  // Funciones para personas desaparecidas
  cargarPersonasDesaparecidas() {
    // Datos de ejemplo para personas desaparecidas usando iconos genéricos
    this.personasDesaparecidas = [
      {
        id: 1,
        nombre: 'María Elena Quispe Huamán',
        edad: 24,
        fechaDesaparicion: '15 de Enero, 2025',
        ultimoLugar: 'Mercado Central de Abancay',
        descripcion: 'Estatura 1.60m, cabello negro largo, vestía polo azul y jean negro. Tiene lunar en la mejilla izquierda.',
        contacto: 'PNP Abancay: (083) 321094 / Familia: 983 456 789',
        foto: 'User.png'
      },
      {
        id: 2,
        nombre: 'Carlos Mendoza Vargas',
        edad: 17,
        fechaDesaparicion: '8 de Enero, 2025',
        ultimoLugar: 'I.E. Nuestra Señora del Rosario - Andahuaylas',
        descripcion: 'Estatura 1.70m, cabello corto negro, tiene cicatriz pequeña en la mano derecha. Usaba uniforme escolar.',
        contacto: 'PNP Andahuaylas: (083) 321094 / Familia: 975 123 456',
        foto: 'User.png'
      },
      {
        id: 3,
        nombre: 'Rosa Mamani Condori',
        edad: 45,
        fechaDesaparicion: '3 de Enero, 2025',
        ultimoLugar: 'Comunidad de Pampachiri - Chincheros',
        descripcion: 'Estatura 1.55m, cabello canoso recogido en trenza, vestía pollera tradicional color azul y chompa beige.',
        contacto: 'PNP Chincheros: (083) 321094 / Familia: 967 890 123',
        foto: 'User.png'
      }
    ];
  }

  getMissingPersonImageUrl(imageName: string): string {
    if (!imageName) {
      return 'assets/img/User.png';
    }
    
    // Si es una URL completa (de Unsplash u otra), devolverla tal como está
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }
    
    // Si es una imagen local, usar la carpeta assets/img
    return `assets/img/${imageName}`;
  }

  // Funciones para el carousel de personas desaparecidas
  startMissingPersonsAutoplay(): void {
    if (this.isBrowser) {
      this.missingPersonsAutoplayInterval = setInterval(() => {
        this.moveMissingPersonsCarousel('next');
      }, 6000);
    }
  }

  moveMissingPersonsCarousel(direction: 'prev' | 'next'): void {
    const maxSlides = Math.max(0, this.personasDesaparecidas.length - this.missingPersonsItemsPerView);
    
    if (direction === 'next') {
      this.currentMissingPersonsSlide = this.currentMissingPersonsSlide >= maxSlides ? 0 : this.currentMissingPersonsSlide + 1;
    } else {
      this.currentMissingPersonsSlide = this.currentMissingPersonsSlide <= 0 ? maxSlides : this.currentMissingPersonsSlide - 1;
    }
    
    this.updateMissingPersonsCarouselPosition();
    this.resetMissingPersonsAutoplay();
  }

  goToMissingPersonsSlide(index: number): void {
    this.currentMissingPersonsSlide = index;
    this.updateMissingPersonsCarouselPosition();
    this.resetMissingPersonsAutoplay();
  }

  updateMissingPersonsCarouselPosition(): void {
    if (!this.isBrowser) return;
    
    const track = document.querySelector('.missing-persons-carousel-track') as HTMLElement;
    if (track) {
      const translateX = -(this.currentMissingPersonsSlide * (100 / this.missingPersonsItemsPerView));
      track.style.transform = `translateX(${translateX}%)`;
    }
  }

  getMissingPersonsCarouselDots(): number[] {
    const maxSlides = Math.max(0, this.personasDesaparecidas.length - this.missingPersonsItemsPerView);
    return Array(maxSlides + 1).fill(0).map((_, i) => i);
  }

  resetMissingPersonsAutoplay(): void {
    if (this.isBrowser) {
      if (this.missingPersonsAutoplayInterval) {
        clearInterval(this.missingPersonsAutoplayInterval);
      }
      this.startMissingPersonsAutoplay();
    }
  }

  // Funciones adicionales para personas desaparecidas
  redirectToPersonasDesaparecidas(): void {
    this.router.navigate(['/personas-desaparecidas']).then(() => {
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }

  reportarPersonaDesaparecida(): void {
    this.router.navigate(['/reportar-desaparecido']).then(() => {
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }

  reportarAvistamiento(personaId: number): void {
    if (this.isBrowser) {
      alert(`Reportar avistamiento de persona ID: ${personaId}. En una implementación real, esto abriría un formulario o contactaría directamente a las autoridades.`);
    }
  }

  compartirInfo(personaId: number): void {
    if (this.isBrowser) {
      const persona = this.personasDesaparecidas.find(p => p.id === personaId);
      if (persona && navigator.share) {
        navigator.share({
          title: `SE BUSCA: ${persona.nombre}`,
          text: `Ayúdanos a encontrar a ${persona.nombre}, desaparecido desde ${persona.fechaDesaparicion}`,
          url: window.location.href
        }).catch(console.error);
      } else if (persona) {
        // Fallback para navegadores que no soportan Web Share API
        const texto = `SE BUSCA: ${persona.nombre} - Desaparecido desde ${persona.fechaDesaparicion}. Si lo has visto, contacta: ${persona.contacto}`;
        navigator.clipboard.writeText(texto).then(() => {
          alert('Información copiada al portapapeles. ¡Compártela para ayudar!');
        }).catch(() => {
          alert('No se pudo copiar la información. Por favor, comparte manualmente.');
        });
      }
    }
  }
}