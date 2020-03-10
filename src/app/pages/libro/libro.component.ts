import { LibroDialogoComponent } from './libro-dialogo/libro-dialogo.component';
import { Libro } from './../../_model/libro';
import { LibroService } from './../../_service/libro.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  cantidad: number;

  dataSource: MatTableDataSource<Libro>;
   displayedColumns = ['id_libro', 'categoria','descripcion' ,'editorial', 'fech_lanzamiento', 'idioma', 'paginas', 'titulo', 'autor','acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private libroService: LibroService, private snack: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.libroService.libroCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.libroService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });
    this.libroService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
}

filter(x: string) {
  this.dataSource.filter = x.trim().toLowerCase();
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}
openDialog(libro?: Libro) {
  let lib = libro != null ? libro : new Libro();
  this.dialog.open(LibroDialogoComponent, {
    width: '250px',
    data: lib
  });
}

}
