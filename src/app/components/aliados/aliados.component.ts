import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-aliados',
  standalone: true,
  imports: [],
  templateUrl: './aliados.component.html',
  styleUrl: './aliados.component.css'
})
export class AliadosComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    if (isPlatformBrowser(this.platformId)) {
      const cards = document.querySelectorAll('.card-moderna');
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
          cardElement.style.transition = 'all 0.6s ease-out';
          cardElement.style.opacity = '1';
          cardElement.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  }
}