import { switchMap } from 'rxjs/operators';
import { AutorService } from './../../../_service/autor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Autor } from './../../../_model/autor';
import { Libro } from './../../../_model/libro';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LibroService } from './../../../_service/libro.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-libro-dialogo',
  templateUrl: './libro-dialogo.component.html',
  styleUrls: ['./libro-dialogo.component.css']
})
export class LibroDialogoComponent implements OnInit {
  form: FormGroup;
  id: number;
  dialogo: boolean;
  libro: Libro;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  idautorSeleccionado: number;
  autor: Autor[];
  constructor(private dialogRef: MatDialogRef<LibroDialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Libro,
              private libroService: LibroService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitization: DomSanitizer,
              private autorService: AutorService) { }

  ngOnInit() {
    this.libro = new Libro();

    if (this.data.id_libro > 0) {

      this.libro.id_libro = this.data.id_libro;
      this.libro.categoria = this.data.categoria;
      this.libro.descripcion = this.data.descripcion;
      this.libro.editorial = this.data.editorial;
      this.libro.fech_lanzamiento = this.data.fech_lanzamiento;
      this.libro.idioma = this.data.idioma;
      this.libro.paginas = this.data.paginas;
      this.libro.titulo = this.data.titulo;
      this.libro.autor = this.data.autor;

      this.libroService.listarPorId(this.data.id_libro).subscribe(data => {
        if (data.size > 0) {
          this.convertir(data);
        }
      });

    }

    this.route.params.subscribe((params: Params) => {
      this.id = params.id_libro;
      this.dialogo = this.id != null;
    //this.initForm();
    });

    this.listarautores();
  }
  get f() { return this.form.controls; }


listarautores() {
  this.autorService.listar().subscribe(data => {
    this.autor = data;
  });
}
convertir(data: any) {
  let reader = new FileReader();
  reader.readAsDataURL(data);
  reader.onloadend = () => {
  let base64 = reader.result;
   this.setear(base64);
  }

}
setear(x: any) {
  this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
  this.imagenEstado = true;
}
operar() {
  let autor = new Autor();
  autor.id_autor = this.idautorSeleccionado;
  this.libro.autor = autor;

  if (this.selectedFiles != null) {
    this.currentFileUpload = this.selectedFiles.item(0);
  } else {
    this.currentFileUpload = new File([""], "blanco");
  }

  if (this.libro != null && this.libro.id_libro > 0) {
    this.libroService.modificar(this.libro, this.currentFileUpload).subscribe(data => {
      this.libroService.listar().subscribe(libro  => {
        this.libroService.libroCambio.next(libro );
        this.libroService.mensajeCambio.next("Se modifico");
      });
    });
  } else {
    this.libroService.registrar(this.libro , this.currentFileUpload).subscribe(data => {
      this.libroService.listar().subscribe(libro  => {
        this.libroService.libroCambio.next(libro );
        this.libroService.mensajeCambio.next("Se registro");
      });
    });

  }
   this.router.navigate(['libro']);
  this.dialogRef.close();

}


selectFile(e: any) {
  this.labelFile = e.target.files[0].name;
  this.selectedFiles = e.target.files;
}
cancelar() {
  this.dialogRef.close();
}
}
