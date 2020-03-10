import { AutorService } from './../../../_service/autor.service';
import { Autor } from './../../../_model/autor';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AutorComponent } from '../autor.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-autor-dialogo',
  templateUrl: './autor-dialogo.component.html',
  styleUrls: ['./autor-dialogo.component.css']
})
export class AutorDialogoComponent implements OnInit {
  form: FormGroup;
   autor: Autor;
  nuevo: boolean;
  constructor(private dialogRef: MatDialogRef<AutorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Autor, private autorService: AutorService, private router: Router,  private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      id_autor: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      dni: new FormControl(''),
      fecha_nac: new Date(),
    });

    this.nuevo = this.data.id_autor > 0 ? true : false;
    if (this.nuevo) {
      this.autorService.listarPorId(this.data.id_autor).subscribe(data => {
        this.form = this.fb.group({
          id_autor: new FormControl(this.data.id_autor),
          nombres: new FormControl(this.data.nombres),
          apellidos: new FormControl(this.data.apellidos),
          dni: new FormControl(this.data.dni),
          fecha_nac: new Date(this.data.fecha_nac)
       });
      }
      );
        this.autorService.listarPorId(this.data.id_autor).subscribe(data => {

           });
          } }
  operar() {

    const autor = new Autor();
    autor.id_autor = this.data.id_autor;
    autor.nombres = this.form.value['nombres'];
    autor.apellidos = this.form.value['apellidos'];
    autor.dni = this.form.value['dni'];
    autor.fecha_nac = this.form.value['fecha_nac'];

    if (autor.id_autor > 0) {
      this.autorService.registrar(autor).pipe(switchMap(() => {
        return this.autorService.listar();
      })).subscribe(data => {
        this.autorService.autorCambio.next(data);
        this.autorService.mensajeCambio.next('SE MODIFICO');
      });

    } else {
      this.autorService.modificar(autor).subscribe(() => {
        this.autorService.listar().subscribe(data => {
          this.autorService.autorCambio.next(data);
          this.autorService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['autor']);
    this.dialogRef.close();
  }

}


