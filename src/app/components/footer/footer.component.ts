import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  emailNewsletter = '';

  socialLinks = [
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-facebook-f', url: '#' },
    { icon: 'fab fa-linkedin-in', url: '#' },
    { icon: 'fab fa-instagram', url: '#' }
  ];

  servicios = [
    'Sobre Nosotros',
    'Conceptos y Definiciones', 
    'Noticias',
    'Eventos',
    'Videos',
    'Sistema Regional',
    'Políticas'
  ];

  enlaces = [
    'Instrumentos de Gestión',
    'Mecanismos de Coordinación',
    'Instancia de Concentración', 
    'Protocolo Base de Acción',
    'Centro de Altos Estudios'
  ];

  onNewsletterSubmit() {
    if (this.emailNewsletter.trim()) {
      console.log('Newsletter:', this.emailNewsletter);
      this.emailNewsletter = '';
      alert('¡Suscripción exitosa!');
    }
  }
}