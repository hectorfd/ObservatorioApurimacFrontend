import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = getToken();
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  
};

function getToken() {
  // Verifica si localStorage está disponible antes de acceder a él
  if (typeof window !== 'undefined' && window.localStorage) {
    //token = localStorage.getItem('token');
    return localStorage.getItem('token');
  }
  return null; // Si no está disponible, retorna null o un valor predeterminado
}
