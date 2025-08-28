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

  // Variables para el modal
  modalVisible = false;
  personaSeleccionada: any = null;
  
  // Variables para el modal de miembros
  modalMiembrosVisible = false;
  
  // Variables para el modal de instrumentos
  modalInstrumentosVisible = false;
  
  // Variables para el carousel de prensa y modal
  articulosPrensa: any[] = [];
  currentPrensaSlide = 0;
  prensaItemsPerView = 3;
  prensaAutoplayInterval: any;
  modalPrensaVisible = false;
  articuloSeleccionado: any = null;

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
    this.cargarArticulosPrensa();
    if (this.isBrowser) {
      this.startAutoplay();
      this.startInfografiasAutoplay();
      this.startMissingPersonsAutoplay();
      this.startPrensaAutoplay();
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
    if (this.prensaAutoplayInterval) {
      clearInterval(this.prensaAutoplayInterval);
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
  onImageError(event: any) {
    console.log('Error cargando:', event.target.src);
    event.target.src = 'assets/img/User.png';
  }

  getImagenModal(nombreImagen: string): string {
    return `assets/img/${nombreImagen}`;
  }
  // Funciones para personas desaparecidas
  cargarPersonasDesaparecidas() {
    // Datos de ejemplo para personas desaparecidas usando iconos genéricos
    this.personasDesaparecidas = [
      {
        id: 1,
        nombre: 'RODRIGUEZ ARAUCO, CARLOS ALBERTO',
        edad: 57,
        fechaDesaparicion: '20 de Agosto, 2025',
        ultimoLugar: 'Abancay, Apurímac',
        descripcion: 'Tez mestiza, 1.59m, contextura delgada, ojos negros, cabello negro, cara ovalada.',
        contacto: 'PNP: 987 822 900 (S1 PNP Altamirano Cárdenas)',
        foto: 'buscado1.png',
        // Datos adicionales para el modal
        datosCompletos: {
          dependencia: 'REGPOL - APURIMAC - DIVINCRI AREINTRAT ABANCAY',
          numeroDenuncia: '33160020',
          fechaDenuncia: '26/08/2025',
          fechaNacimiento: '05/01/1968',
          denunciante: 'RODRIGUEZ ARAUCO EDITH INES',
          caracteristicas: {
            tez: 'Mestiza',
            cara: 'Ovalada', 
            ojos: 'Negro',
            nariz: 'Cóncavo',
            boca: 'Mediana',
            cabellos: 'Negro',
            estatura: '1.59 metros',
            contextura: 'Delgada'
          },
          circunstancias: 'Se desconoce, pero sucedió cuando se encontraba en la ciudad de Abancay.',
          instructorPolicial: 'S1 PNP ALTAMIRANO CARDENAS CRISTIAN',
          telefonoInstructor: '987 822 900'
        }
      },
      // {
      //   id: 2,
      //   nombre: 'Carlos Mendoza Vargas',
      //   edad: 17,
      //   fechaDesaparicion: '8 de Enero, 2025',
      //   ultimoLugar: 'I.E. Nuestra Señora del Rosario - Andahuaylas',
      //   descripcion: 'Estatura 1.70m, cabello corto negro, tiene cicatriz pequeña en la mano derecha. Usaba uniforme escolar.',
      //   contacto: 'PNP Andahuaylas: (083) 321094 / Familia: 975 123 456',
      //   foto: 'User.png'
      // },
      // {
      //   id: 3,
      //   nombre: 'Rosa Mamani Condori',
      //   edad: 45,
      //   fechaDesaparicion: '3 de Enero, 2025',
      //   ultimoLugar: 'Comunidad de Pampachiri - Chincheros',
      //   descripcion: 'Estatura 1.55m, cabello canoso recogido en trenza, vestía pollera tradicional color azul y chompa beige.',
      //   contacto: 'PNP Chincheros: (083) 321094 / Familia: 967 890 123',
      //   foto: 'User.png'
      // }
    ];
    console.log('📋 Personas desaparecidas cargadas:', this.personasDesaparecidas.length);
    console.log('👤 Datos completos:', this.personasDesaparecidas);
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
    
    console.log(`🎠 Antes de mover - Slide actual: ${this.currentMissingPersonsSlide}, MaxSlides: ${maxSlides}, Total personas: ${this.personasDesaparecidas.length}`);
    
    if (direction === 'next') {
      this.currentMissingPersonsSlide = this.currentMissingPersonsSlide >= maxSlides ? 0 : this.currentMissingPersonsSlide + 1;
    } else {
      this.currentMissingPersonsSlide = this.currentMissingPersonsSlide <= 0 ? maxSlides : this.currentMissingPersonsSlide - 1;
    }
    
    console.log(`🎠 Después de mover - Nuevo slide: ${this.currentMissingPersonsSlide}, Dirección: ${direction}`);
    
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
    const wrapper = document.querySelector('.missing-persons-carousel-wrapper') as HTMLElement;
    
    if (track && wrapper) {
      // Usar el ancho real del wrapper para calcular el movimiento
      const slideWidth = wrapper.offsetWidth;
      const translateX = -(this.currentMissingPersonsSlide * slideWidth);
      track.style.transform = `translateX(${translateX}px)`;
      console.log(`🎯 Wrapper width: ${slideWidth}px, Moving to slide ${this.currentMissingPersonsSlide}, translateX: ${translateX}px`);
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

  // Funciones para el modal
  verDetalles(persona: any): void {
    this.personaSeleccionada = persona;
    this.modalVisible = true;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
  }

  cerrarModal(event?: Event): void {
  if (event && event.target !== event.currentTarget) {
    return; // No cerrar si se hace clic dentro del modal
  }
  this.modalVisible = false;
  this.personaSeleccionada = null;
  if (this.isBrowser) {
    document.body.style.overflow = 'auto';
  }
}

// Funciones para el modal de miembros
abrirModalMiembros(): void {
  this.modalMiembrosVisible = true;
  if (this.isBrowser) {
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
  }
}

cerrarModalMiembros(event?: Event): void {
  if (event && event.target !== event.currentTarget) {
    return; // No cerrar si se hace clic dentro del modal
  }
  this.modalMiembrosVisible = false;
  if (this.isBrowser) {
    document.body.style.overflow = 'auto';
  }
}

// Funciones para el modal de instrumentos de gestión
abrirModalInstrumentos(): void {
  this.modalInstrumentosVisible = true;
  if (this.isBrowser) {
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
  }
}

cerrarModalInstrumentos(event?: Event): void {
  if (event && event.target !== event.currentTarget) {
    return; // No cerrar si se hace clic dentro del modal
  }
  this.modalInstrumentosVisible = false;
  if (this.isBrowser) {
    document.body.style.overflow = 'auto';
  }
}

// Función para abrir PDFs en nueva ventana
abrirPDF(rutaPDF: string): void {
  if (rutaPDF === '#') {
    console.log('PDF no disponible aún - enlace temporal');
    return;
  }
  
  if (this.isBrowser) {
    // Abrir el PDF en una nueva pestaña
    window.open(rutaPDF, '_blank');
  }
}

// Funciones para el carousel de prensa
cargarArticulosPrensa() {
  // Datos de prueba - después se puede conectar a una API
  this.articulosPrensa = [
    {
      id: 1,
      titulo: 'Informe Especial Situación de la Libertad de Expresión en Perú. por Pedro Vaca Villarreal',
      fecha: '23 de diciembre del 2023',
      resumen: 'La Comisión Interamericana de Derechos Humanos (CIDH), a través de su Relatoría Especial para la Libertad de Expresión (RELE), publicó en diciembre de 2023 un informe que retrata la situación actual del periodismo y la libertad de expresión en el Perú.',
      fuente: 'CIDH',
      imagen: 'assets/img/prensa3.png',
      contenido: `
        <p>La Comisión Interamericana de Derechos Humanos (CIDH), a través de su Relatoría Especial para la Libertad de Expresión (RELE), publicó en diciembre de 2023 un informe que retrata la situación actual del periodismo y la libertad de expresión en el Perú. El documento reconoce avances, pero alerta sobre un contexto complejo que amenaza directamente la labor periodística y el debate democrático.</p>
        
        <h4>Violencia y hostigamiento a periodistas</h4>
        <p>Si bien en los últimos años no se han registrado asesinatos de periodistas en el país, la RELE advierte que la violencia contra comunicadores sigue siendo recurrente. Entre 2021 y 2022 se documentaron más de 280 agresiones, incluyendo amenazas, ataques físicos, hostigamiento judicial y campañas de desprestigio. Casos emblemáticos, como el secuestro de un equipo de América TV en Cajamarca en 2022, muestran la vulnerabilidad de la prensa frente a actores estatales y civiles.</p>
        
        <h4>Grupos organizados y discursos estigmatizantes</h4>
        <p>El informe denuncia el accionar de colectivos violentos como "La Resistencia", responsables de agresiones, acoso digital y ataques a periodistas y medios como IDL-Reporteros. Estos grupos han hostigado incluso en librerías y espacios culturales, creando un clima de permisividad frente a la violencia. A esto se suman discursos estigmatizantes desde autoridades públicas, que debilitan la confianza ciudadana en la prensa.</p>
        
        <h4>Obstáculos legales y judiciales</h4>
        <p>Otro de los patrones señalados es el uso de procesos judiciales (por difamación, calumnias o querellas) como mecanismos para intimidar a periodistas que investigan corrupción o temas de interés público. La RELE advierte que este tipo de acciones, sumadas a la falta de protección efectiva, generan un entorno de autocensura.</p>
        
        <h4>Desafíos en el acceso a la información</h4>
        <p>El informe resalta además las limitaciones para acceder a información pública y fuentes estatales, así como la presión política sobre líneas editoriales en contextos electorales y de crisis institucional. Estos factores, junto con la desinformación digital y la violencia en línea, deterioran la calidad del debate público.</p>
        
        <h4>Balance</h4>
        <p>Para la RELE, la libertad de expresión en el Perú atraviesa un momento crítico: la polarización política, la inestabilidad institucional y la falta de respuesta adecuada del Estado frente a las agresiones han debilitado el espacio democrático. La Relatoría subraya que el periodismo libre, plural y seguro es indispensable para garantizar los derechos humanos y la vida democrática del país.</p>
      `,
      link: 'https://www.oas.org/es/cidh/expresion/publicaciones/Informe%20Libex%20Peru%20(7).pdf'
    },
    {
      id: 2,
      titulo: 'Culmina ciclo de talleres "Periodistas contra la violencia de género"',
      fecha: '21 de septiembre de 2022',
      resumen: 'La violencia de género sigue siendo una de las problemáticas más graves del país. En 2022, el Programa Nacional Aurora reportó más de 130 mil casos de violencia contra mujeres en sus distintas modalidades.',
      fuente: 'Calandria',
      imagen: 'assets/img/prensa2.png',
      contenido: `
        <p>La violencia de género sigue siendo una de las problemáticas más graves del país. En 2022, el Programa Nacional Aurora reportó más de 130 mil casos de violencia contra mujeres en sus distintas modalidades.</p>
        
        <p>Frente a esta realidad, la Asociación de Comunicadores Sociales Calandria desarrolló el ciclo de talleres macroregionales "Periodistas contra la violencia de género", en el marco del VI Concurso Nacional de Periodismo "Periodismo que llega sin violencia".</p>
        
        <p>Las capacitaciones se realizaron de manera virtual y reunieron a periodistas de todas las macroregiones del Perú, incluida Apurímac. En cada sesión se brindaron herramientas para que la prensa pueda incorporar un enfoque de género, combatir estereotipos y orientar a la ciudadanía sobre la problemática de la violencia.</p>
        
        <p>El ciclo contó con la participación de especialistas del Programa Nacional Aurora, del CONCORTV y de Calandria, quienes compartieron experiencias, criterios y recomendaciones para un periodismo responsable que contribuya a prevenir la violencia contra mujeres y niñas.</p>
      `,
      link: 'https://www.observatoriodemedios.pe/buenas-practicas/formacion-de-periodistas/culmina-satisfactoreamente-el-ciclo-de-talleres-macroregionales-periodistas-contra-la-violencia-de-genero/#:~:text=sesi%C3%B3n%20por%20macroregi%C3%B3n%2C%20realiz%C3%A1ndose%20as%C3%AD,a%20periodistas%20a%20nivel%20nacional'
    },
    {
      id: 3,
      titulo: 'Comunicadoras/es de Abancay recibieron capacitación del MIMP en tratamiento de la información sobre violencia contra las mujeres',
      fecha: '4 de diciembre de 2023 - 3:38 p. m.',
      resumen: 'El taller "Comunicación con igualdad que contribuya a la prevención de la violencia contra las mujeres y las niñas" reunió a representantes de medios regionales...',
      fuente: 'MIMP',
      imagen: 'assets/img/prensa1.png',
      contenido: `
        <p>El taller "Comunicación con igualdad que contribuya a la prevención de la violencia contra las mujeres y las niñas" reunió a representantes de medios regionales de Abancay con el objetivo de fortalecer el rol de la prensa en la prevención de la violencia de género. Se brindaron pautas para un tratamiento informativo responsable y la promoción de mensajes que contribuyan a la igualdad de género.</p>
        
        <p>La actividad se desarrolló en el marco de la Estrategia Nacional "Mujeres libres de violencia", que impulsa acciones integrales y articuladas de prevención. Además, se presentó el material del MIMP "Pautas para una comunicación que contribuya a la prevención de la violencia y discriminación contra las mujeres", como guía para que los medios se consoliden en su papel de agentes transformadores.</p>
      `,
      link: 'https://www.gob.pe/institucion/mimp/noticias/877234-comunicadoras-es-de-abancay-recibieron-capacitacion-del-mimp-en-tratamiento-de-la-informacion-sobre-violencia-contra-las-mujeres'
    }
  ];
}

startPrensaAutoplay(): void {
  this.prensaAutoplayInterval = setInterval(() => {
    this.movePrensaCarousel('next');
  }, 5000);
}

movePrensaCarousel(direction: 'prev' | 'next'): void {
  const maxSlides = Math.ceil(this.articulosPrensa.length / this.prensaItemsPerView);
  
  if (direction === 'next') {
    this.currentPrensaSlide = (this.currentPrensaSlide + 1) % maxSlides;
  } else {
    this.currentPrensaSlide = this.currentPrensaSlide === 0 ? maxSlides - 1 : this.currentPrensaSlide - 1;
  }
  this.updatePrensaCarouselPosition();
}

updatePrensaCarouselPosition(): void {
  if (this.isBrowser) {
    const track = document.querySelector('.prensa-carousel-track') as HTMLElement;
    if (track) {
      const translateX = -(this.currentPrensaSlide * (100 / this.prensaItemsPerView)) * this.prensaItemsPerView;
      track.style.transform = `translateX(${translateX}%)`;
    }
  }
}

goToPrensaSlide(index: number): void {
  this.currentPrensaSlide = index;
  this.updatePrensaCarouselPosition();
}

getPrensaCarouselDots(): number[] {
  const maxSlides = Math.ceil(this.articulosPrensa.length / this.prensaItemsPerView);
  return Array(maxSlides).fill(0).map((_, i) => i);
}

redirectToViolenciaMedias(): void {
  // Aquí se puede implementar la redirección a la página de artículos
  console.log('Redirigir a todos los artículos de prensa');
}

// Funciones para el modal de prensa
abrirModalPrensa(articulo: any): void {
  this.articuloSeleccionado = articulo;
  this.modalPrensaVisible = true;
  if (this.isBrowser) {
    document.body.style.overflow = 'hidden';
  }
}

cerrarModalPrensa(event?: Event): void {
  if (event && event.target !== event.currentTarget) {
    return;
  }
  this.modalPrensaVisible = false;
  this.articuloSeleccionado = null;
  if (this.isBrowser) {
    document.body.style.overflow = 'auto';
  }
}
}