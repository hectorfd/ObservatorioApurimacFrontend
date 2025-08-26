import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import { OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AliadosComponent } from "../../components/aliados/aliados.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detalle-repositorio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatTabsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatPaginatorModule,
    MatTableModule, MatSortModule, AliadosComponent],
  templateUrl: './detalle-repositorio.component.html',
  styleUrl: './detalle-repositorio.component.css'
})
export class DetalleRepositorioComponent {

  displayedColumns: string[] = ['Nombre del Documento', 'Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getDetalleRepositoio(this.route.snapshot.paramMap.get('id'));
    
  }

   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}
  

  //para traer detalles de repositorio
  entidad: any;  
  imagenURL: string | ArrayBuffer | null = null;

  getDetalleRepositoio(id: any) {
    this.api.getDetalleEntidadAliada(id).subscribe({
      next: (data: any) => {
        console.log('Detalles de la entidad:', data);
  
        const entidad = data[0];
        this.entidad = entidad; // Cambié 'noticia' a 'noticias', ahora es un arreglo
        
        // Usamos la función getImageUrl para construir la URL correcta
        this.imagenURL = this.getImageUrlDetalle(entidad.portada);
      },
      error: (error) => {
        console.error('Error al cargar detalles de la entidad:', error);
      }
    });


  }

  

  getImageUrlDetalle(relativePath: string): string {
    if (!relativePath) {
      // Si no hay imagen, devuelve una imagen por defecto
      return 'assets/img/no-image.jpg';
    }
    
    // Si la ruta ya contiene la URL completa
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Construir URL completa
    // IMPORTANTE: Asegúrate de que esta URL sea la correcta para acceder a tus imágenes
    return `http://localhost:80/API OBSERVATORIO/${relativePath}`;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const ELEMENT_DATA = [
  { nombre: 'Activacion-de-la-alerta-de-emergencia-para-mujeres', ciudad: 'DESCARGAR' },
  { nombre: 'Diptico_Campaña-Corazon-Azul-Contra-la-Trata-de-personas',  ciudad: 'DESCARGAR' },
 // { nombre: 'DOCUMENTO XXXXXXXXXXXXXXXXXXXXXXX',  ciudad: 'DESCARGAR' },
 // { nombre: 'DOCUMENTO XXXXXXXXXXXXXXXXXXXXXXX', ciudad: 'DESCARGAR' },
 // { nombre: 'DOCUMENTO XXXXXXXXXXXXXXXXXXXXXXX',  ciudad: 'DESCARGAR' },
 // { nombre: 'DOCUMENTO XXXXXXXXXXXXXXXXXXXXXXX',  ciudad: 'DESCARGAR' },
 // { nombre: 'DOCUMENTO XXXXXXXXXXXXXXXXXXXXXXX',  ciudad: 'DESCARGAR' },
];



