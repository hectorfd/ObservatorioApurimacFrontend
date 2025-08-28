import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-personas-desaparecidas',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './personas-desaparecidas.component.html',
  styleUrl: './personas-desaparecidas.component.css'
})
export class PersonasDesaparecidasComponent implements OnInit {
  
  personasDesaparecidas: any[] = [];
  personasFiltradas: any[] = [];
  
  // Variables para filtros
  filtroEdad: string = '';
  busquedaNombre: string = '';
  
  // Variables para modal
  modalVisible = false;
  personaSeleccionada: any = null;

  constructor() { }

  ngOnInit(): void {
    this.cargarPersonasDesaparecidas();
    this.personasFiltradas = [...this.personasDesaparecidas];
  }

  cargarPersonasDesaparecidas() {
    // Los mismos datos que tienes en home
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
      
    ];
    
    this.personasFiltradas = [...this.personasDesaparecidas];
  }

  // Métodos para imágenes
  getImagenModal(foto: string): string {
    return `assets/img/${foto}`;
  }

  onImageError(event: any) {
    event.target.src = 'assets/img/User.png';
  }

  // Métodos de filtrado
  aplicarFiltros() {
    this.personasFiltradas = this.personasDesaparecidas.filter(persona => {
      
      // Filtro por edad
      if (this.filtroEdad) {
        const edad = persona.edad;
        if (this.filtroEdad === 'menor' && edad >= 18) return false;
        if (this.filtroEdad === 'adulto' && (edad < 18 || edad > 60)) return false;
        if (this.filtroEdad === 'mayor' && edad <= 60) return false;
      }
      
      // Filtro por nombre
      if (this.busquedaNombre) {
        const nombre = persona.nombre.toLowerCase();
        const busqueda = this.busquedaNombre.toLowerCase();
        if (!nombre.includes(busqueda)) return false;
      }
      
      return true;
    });
  }

  limpiarFiltros() {
    this.filtroEdad = '';
    this.busquedaNombre = '';
    this.personasFiltradas = [...this.personasDesaparecidas];
  }

  // Métodos para modal
  verDetalles(persona: any) {
    this.personaSeleccionada = persona;
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.modalVisible = false;
    this.personaSeleccionada = null;
    document.body.style.overflow = 'auto';
  }

  // Métodos de acción
  compartirInfo(personaId: number) {
    const persona = this.personasDesaparecidas.find(p => p.id === personaId);
    if (persona && navigator.share) {
      navigator.share({
        title: `SE BUSCA: ${persona.nombre}`,
        text: `Ayúdanos a encontrar a ${persona.nombre}, desaparecido desde ${persona.fechaDesaparicion}`,
        url: window.location.href
      }).catch(console.error);
    } else if (persona) {
      const texto = `SE BUSCA: ${persona.nombre} - Desaparecido desde ${persona.fechaDesaparicion}. Si lo has visto, contacta: ${persona.contacto}`;
      navigator.clipboard.writeText(texto).then(() => {
        alert('Información copiada al portapapeles');
      });
    }
  }

  reportarAvistamiento() {
    alert('Para reportar un avistamiento, contacta inmediatamente al 105 o a los números indicados en cada caso.');
  }
}