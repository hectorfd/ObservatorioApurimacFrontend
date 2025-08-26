import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';
import { LoginI } from '../models/login.interface';
import { VideoI } from '../models/video.interface';
import { InfografiaI } from '../models/infografia.interface';
import { NoticiaI } from '../models/noticia.interface';
import { UsuarioI } from '../models/usuario.interface';
import { Entidad_AliadaI } from '../models/entidad_aliada.interface';
import { Archivo_Entidad_AliadaI } from '../models/archivo_entidad_aliada.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Detecta dev vs prod
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    // Ver qué URL está usando
    console.log('API Service initialized');
    console.log('Environment:', environment.production ? 'PRODUCTION' : 'DEVELOPMENT');
    console.log('API URL:', this.url);
  }

  //para la autenticacion
  loginByEmail(form: LoginI): Observable<ResponseI> {
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion, form);
  }

  //para todo lo relacionado con noticias
  getAllNoticias(page: number): Observable<NoticiaI[]> {
    let direccion = this.url + "tnoticia?page=" + page;
    return this.http.get<NoticiaI[]>(direccion);
  }

  getDetalleNoticia(id: any): Observable<NoticiaI> {
    let direccion = this.url + "tnoticia?id=" + id;
    return this.http.get<NoticiaI>(direccion);
  }

  postNoticia(formData: any): Observable<ResponseI> {
    let direccion = this.url + "tnoticia";
    return this.http.post<ResponseI>(direccion, formData);
  }

  putNoticia(id: any, formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "tnoticia?id=" + id;
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteNoticia(id: number): Observable<any> {
    let direccion = this.url + "tnoticia?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }

  //para las infografias
  getAllInfografias(page: number): Observable<InfografiaI[]> {
    let direccion = this.url + "infografia?page=" + page;
    return this.http.get<InfografiaI[]>(direccion);
  }

  getDetalleInfografia(id: any): Observable<InfografiaI> {
    let direccion = this.url + "infografia?id=" + id;
    return this.http.get<InfografiaI>(direccion);
  }

  postInfografia(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "infografia";
    return this.http.post<ResponseI>(direccion, formData);
  }

  putInfografia(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "infografia"
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteInfografia(id: any): Observable<any> {
    let direccion = this.url + "infografia?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }
  
  //para los videos
  getAllVideos(page: number): Observable<VideoI[]> {
    let direccion = this.url + "video?page=" + page;
    return this.http.get<VideoI[]>(direccion);
  }

  getDetalleVideo(id: any): Observable<VideoI> {
    let direccion = this.url + "video?id=" + id;
    return this.http.get<VideoI>(direccion);
  }

  postVideo(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "video";
    return this.http.post<ResponseI>(direccion, formData);
  }

  putVideo(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "video"
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteVideo(id: any): Observable<any> {
    let direccion = this.url + "video?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }

  //para los usuarios
  getAllUsuarios(page: number): Observable<UsuarioI[]> {
    let direccion = this.url + "tusuario?page=" + page;
    return this.http.get<UsuarioI[]>(direccion);
  }

  getDetalleUsuario(id: any): Observable<UsuarioI> {
    let direccion = this.url + "tusuario?id=" + id;
    return this.http.get<UsuarioI>(direccion);
  }

  postUsuario(form: any): Observable<ResponseI> {
    let direccion = this.url + "tusuario";
    return this.http.post<ResponseI>(direccion, form);
  }

  putUsuario(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "tusuario"
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteUsuario(id: any): Observable<any> {
    let direccion = this.url + "tusuario?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }

  //para entidad aliada
  getAllEntidadAliada(page: number): Observable<Entidad_AliadaI[]> {
    let direccion = this.url + "entidad_aliada?page=" + page;
    return this.http.get<Entidad_AliadaI[]>(direccion);
  }

  getDetalleEntidadAliada(id: any): Observable<Entidad_AliadaI> {
    let direccion = this.url + "entidad_aliada?id=" + id;
    return this.http.get<Entidad_AliadaI>(direccion);
  }

  postEntidadAliada(form: any): Observable<ResponseI> {
    let direccion = this.url + "entidad_aliada";
    return this.http.post<ResponseI>(direccion, form);
  }

  putEntidadAliada(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "entidad_aliada"
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteEntidadAliada(id: any): Observable<any> {
    let direccion = this.url + "entidad_aliada?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }

  //para archivo entidad aliada
  getAllArchivoEntidadAliada(page: number, id: any): Observable<Archivo_Entidad_AliadaI[]> {
    let direccion = `${this.url}archivo_entidad_aliada?page=${page}&id_entidad_aliada=${id}`;
    return this.http.get<Archivo_Entidad_AliadaI[]>(direccion);
  }

  getDetalleArchivoEntidadAliada(id: any): Observable<Archivo_Entidad_AliadaI> {
    let direccion = this.url + "archivo_entidad_aliada?id=" + id;
    return this.http.get<Archivo_Entidad_AliadaI>(direccion);
  }

  postArchivoEntidadAliada(form: any): Observable<ResponseI> {
    let direccion = this.url + "archivo_entidad_aliada";
    return this.http.post<ResponseI>(direccion, form);
  }

  putArchivoEntidadAliada(formData: FormData): Observable<ResponseI> {
    let direccion = this.url + "archivo_entidad_aliada"
    return this.http.put<ResponseI>(direccion, formData);
  }

  deleteArchivoEntidadAliada(id: any): Observable<any> {
    let direccion = this.url + "archivo_entidad_aliada?id=" + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any>(direccion, { headers });
  }
}