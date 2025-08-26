import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./view/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'about',
      loadComponent: () => import('./view/about/about.component').then((m) => m.AboutComponent),
    },
    {
      path: 'contact',
      loadComponent: () => import('./view/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
      path: 'infografias',
      loadComponent: () => import('./view/infografias/infografias.component').then((m) => m.InfografiasComponent),
    },
    {
      path: 'marco-conceptual',
      loadComponent: () => import('./view/marco-conceptual/marco-conceptual.component').then((m) => m.MarcoConceptualComponent),
    },
    {
      path: 'noticias',
      loadComponent: () => import('./view/noticias/noticias.component').then((m) => m.NoticiasComponent),
    },
    {
      path: 'sistema-regional',
      loadComponent: () => import('./view/sistema-regional/sistema-regional.component').then((m) => m.SistemaRegionalComponent),
    },
    {
      path: 'videos',
      loadComponent: () => import('./view/videos/videos.component').then((m) => m.VideosComponent),
    },
    {
      path: 'repositorio',
      loadComponent: () => import('./view/repositorio/repositorio.component').then((m) => m.RepositorioComponent),
    },
    // {
    //   path: 'detalle-repositorio/:id',
    //   loadComponent: () => import('./view/detalle-repositorio/detalle-repositorio.component').then((m) => m.DetalleRepositorioComponent),
    // },
    {
      path: 'detalle-repositorio/:id',
      loadComponent: () => import('./view/detalle-repositorio/detalle-repositorio.component').then((m) => m.DetalleRepositorioComponent),
    },
    // Rutas para el dashboard
    {
      path: 'dashboard',
      canActivate: [authGuard],
      loadComponent: () => import('./dashboard/main/main.component').then((m) => m.MainComponent),
    },
    {
      path: 'crear-noticia',
      loadComponent: () => import('./dashboard/crear-noticia/crear-noticia.component').then((m) => m.CrearNoticiaComponent),
    },
    {
      path: 'crear-infografia',
      loadComponent: () => import('./dashboard/crear-infografia/crear-infografia.component').then((m) => m.CrearInfografiaComponent),
    },
    {
      path: 'crear-video',
      loadComponent: () => import('./dashboard/crear-video/crear-video.component').then((m) => m.CrearVideoComponent),
    },
    {
      path: 'crear-usuario',
      loadComponent: () => import('./dashboard/crear-usuario/crear-usuario.component').then((m) => m.CrearUsuarioComponent),
    },
    {
      path: 'lista-infografia',
      loadComponent: () => import('./dashboard/lista-infografia/lista-infografia.component').then((m) => m.ListaInfografiaComponent),
    },
    {
      path: 'lista-noticia',
      loadComponent: () => import('./dashboard/lista-noticia/lista-noticia.component').then((m) => m.ListaNoticiaComponent),
    },
    {
      path: 'lista-video',
      loadComponent: () => import('./dashboard/lista-video/lista-video.component').then((m) => m.ListaVideoComponent),
    },
    {
      path: 'lista-usuario',
      loadComponent: () => import('./dashboard/lista-usuario/lista-usuario.component').then((m) => m.ListaUsuarioComponent),
    },
    {
      path: 'editar-infografia/:id',
      loadComponent: () => import('./dashboard/editar-infografia/editar-infografia.component').then((m) => m.EditarInfografiaComponent),
    },
    {
      path: 'editar-noticia/:id',
      loadComponent: () => import('./dashboard/editar-noticia/editar-noticia.component').then((m) => m.EditarNoticiaComponent),
    },
    {
      path: 'editar-usuario/:id',
      loadComponent: () => import('./dashboard/editar-usuario/editar-usuario.component').then((m) => m.EditarUsuarioComponent),
    },
    {
      path: 'editar-video/:id',
      loadComponent: () => import('./dashboard/editar-video/editar-video.component').then((m) => m.EditarVideoComponent),
    },
    {
      path: 'login',
      loadComponent: () => import('./dashboard/login/login.component').then((m) => m.LoginComponent),
    },
    {
      path: 'detalle-infografia/:id',
      loadComponent: () => import('./view/detalle-infografia/detalle-infografia.component').then((m) => m.DetalleInfografiaComponent),
    },
    {
      path: 'detalle-noticia/:id',
      loadComponent: () => import('./view/detalle-noticia/detalle-noticia.component').then((m) => m.DetalleNoticiaComponent),
    },
    {
      path: 'detalle-video/:id',
      loadComponent: () => import('./view/detalle-video/detalle-video.component').then((m) => m.DetalleVideoComponent),
    },
    {
      path: 'crear-entidad-aliada',
      loadComponent: () => import('./dashboard/crear-entidad-aliada/crear-entidad-aliada.component').then((m) => m.CrearEntidadAliadaComponent),
    },
    {
      path: 'editar-entidad-aliada/:id',
      loadComponent: () => import('./dashboard/editar-entidad-aliada/editar-entidad-aliada.component').then((m) => m.EditarEntidadAliadaComponent),
    },
    {
      path: 'detalle-entidad-aliada/:id',
      loadComponent: () => import('./dashboard/detalle-entidad-aliada/detalle-entidad-aliada.component').then((m) => m.DetalleEntidadAliadaComponent),
    },
    {
      path: 'lista-entidad-aliada',
      loadComponent: () => import('./dashboard/lista-entidad-aliada/lista-entidad-aliada.component').then((m) => m.ListaEntidadAliadaComponent),
    },
];
