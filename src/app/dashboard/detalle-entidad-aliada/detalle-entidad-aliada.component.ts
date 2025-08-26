import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TopbarComponent } from "../components/topbar/topbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Archivo_Entidad_AliadaI } from '../../models/archivo_entidad_aliada.interface';


@Component({
  selector: 'app-detalle-entidad-aliada',
  standalone: true,
  imports: [
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './detalle-entidad-aliada.component.html',
  styleUrl: './detalle-entidad-aliada.component.css'
})
export class DetalleEntidadAliadaComponent implements OnInit, AfterViewInit {
  // Referencia al elemento input file
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  // Configuración para la tabla
  displayedColumns: string[] = ['nombre_archivo', 'fecha_registro', 'acciones'];
  dataSource = new MatTableDataSource<Archivo_Entidad_AliadaI>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  imagenURL: string | ArrayBuffer | null = null;
  id_entidad_aliada: any;
  entidad_aliada: any = {
    nombre: '',
    descripcion: '',
    fecha_registro: '',
    portada: ''
  };

  // Variable para almacenar el archivo seleccionado
  archivoFile: File | null = null;

  ArchivoEntidadAliadaForm = new FormGroup({
    nombre_archivo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha_registro: new FormControl('', Validators.required),
    // No incluimos ruta_archivo en el FormGroup ya que se manejará por separado
  });

  archivo_entidad_aliada: Archivo_Entidad_AliadaI[] = [];
  
  mostrarFormulario: boolean = false; // Variable para controlar la visibilidad
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario; // Cambia el estado de visibilidad
  }

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_entidad_aliada = id;
    console.log('ID recibido:', id);
    this.getDetalleEntidadAliada(id); 
    this.getAllArchivoEntidadAliada(id); // Cargar archivos al iniciar
  }

  getDetalleEntidadAliada(id: any) {
    this.api.getDetalleEntidadAliada(id).subscribe({
      next: (data: any) => {
        const entidad = data[0];
        this.entidad_aliada = entidad;
        this.imagenURL = this.getImageUrl(entidad.portada);
        // console.log('Detalles cargados:', this.entidad_aliada);
      },
      error: (error) => {
        console.error('Error al cargar los detalles:', error);
      }
    });
  }

  getAllArchivoEntidadAliada(id: any) {
    this.api.getAllArchivoEntidadAliada(1, id).subscribe({
      next: (data: any) => {
        this.archivo_entidad_aliada = data;
        this.dataSource.data = data; // Actualizar la fuente de datos
        console.log('Archivos cargados:', this.archivo_entidad_aliada);
      },
      error: (error) => {
        console.error('Error al cargar los archivos:', error);
        alert('Error al cargar los archivos. Por favor verifica la consola para más información.');
      }
    });
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) {
      return 'assets/img/no-image.jpg';
    }

    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    return encodeURI(`http://localhost:80/API OBSERVATORIO/${relativePath}`);
  }
  
  onFileSelected(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoFile = archivo;
      console.log('Archivo seleccionado:', this.archivoFile ? this.archivoFile.name : 'No se seleccionó archivo');
    }
  }

  // Método para aplicar filtro de búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para descargar archivo
  descargarArchivo(archivo: Archivo_Entidad_AliadaI) {
    // Obtener la URL completa del archivo
    const fileUrl = this.getFileUrl(archivo.ruta_archivo);
    
    // Crear un elemento <a> temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = archivo.nombre_archivo; // Nombre que tendrá el archivo descargado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Método para construir la URL del archivo
  getFileUrl(relativePath: string): string {
    if (!relativePath) {
      return '';
    }

    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    return encodeURI(`http://localhost:80/API OBSERVATORIO/${relativePath}`);
  }

  // Método para eliminar archivo


  eliminarArchivo(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      this.api.deleteArchivoEntidadAliada(id).subscribe({
        next: (response) => {
          console.log('archivo eliminado correctamente');
          // Actualizar la lista de infografías después de eliminar
          this.getAllArchivoEntidadAliada(this.id_entidad_aliada);
        },
        error: (error) => {
          console.error('Error al eliminar la entidad :', error);
        }
      });
    }
  }

  // Método para limpiar el input file
  resetFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
      console.log('Input file reseteado');
    } else {
      console.log('No se pudo resetear el input file (referencia no disponible)');
    }
  }

  registrarEntidadAliada() {
    console.log('Método registrarEntidadAliada ejecutado');
    
    if (this.ArchivoEntidadAliadaForm.valid && this.archivoFile) {
      console.log('Formulario válido y archivo seleccionado');
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
      
      // Crear FormData para enviar al servidor
      const formData = new FormData();
      
      // Agregamos los campos del formulario
      formData.append('nombre_archivo', this.ArchivoEntidadAliadaForm.get('nombre_archivo')?.value || '');
      formData.append('descripcion', this.ArchivoEntidadAliadaForm.get('descripcion')?.value || '');
      formData.append('fecha_registro', this.ArchivoEntidadAliadaForm.get('fecha_registro')?.value || '');
      
      // Agregamos el archivo con su nombre original
      formData.append('ruta_archivo', this.archivoFile, this.archivoFile.name);
      
      // Agregamos el id de la entidad aliada
      formData.append('id_entidad_aliada', this.id_entidad_aliada || '');
      
      // Agregamos el token
      formData.append('token', token);

      console.log('Enviando datos al servidor...');
      
      this.api.postArchivoEntidadAliada(formData).subscribe({
        next: (response) => {
          console.log('Archivo registrado con éxito', response);
          alert('Archivo subido correctamente');
          
          // Resetear el formulario después de un envío exitoso
          this.ArchivoEntidadAliadaForm.reset();
          this.archivoFile = null;
          
          // Resetear el valor del input file para limpiar el nombre visible
          this.resetFileInput();
          
          // Recargar la lista de archivos para actualizar la tabla
          this.getAllArchivoEntidadAliada(this.id_entidad_aliada);
        }, 
        error: (error) => {
          console.error('Error al registrar el archivo', error);
          alert('Error al subir el archivo');
        }
      });
    } else {
      console.log('Formulario inválido o no se ha seleccionado un archivo');
      console.log('Estado del formulario:', this.ArchivoEntidadAliadaForm.valid);
      console.log('Archivo seleccionado:', !!this.archivoFile);
      
      // Mostrar errores específicos
      if (!this.ArchivoEntidadAliadaForm.valid) {
        Object.keys(this.ArchivoEntidadAliadaForm.controls).forEach(key => {
          const control = this.ArchivoEntidadAliadaForm.get(key);
          if (control?.invalid) {
            console.log(`Campo ${key} inválido:`, control.errors);
          }
        });
      }
      
      alert('Por favor complete todos los campos requeridos y seleccione un archivo');
    }
  }
}