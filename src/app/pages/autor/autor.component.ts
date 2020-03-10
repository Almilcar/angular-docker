import { AutorDialogoComponent } from './autor-dialogo/autor-dialogo.component';
import { AutorService } from './../../_service/autor.service';
import { Autor } from './../../_model/autor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  dataSource: MatTableDataSource<Autor>;
  displayedColumns = ['id_autor', 'apellidos', 'dni', 'fecha_nac', 'nombres', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private autorService: AutorService,
    private snack: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.autorService.autorCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.autorService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });
    this.autorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

    openDialog(autor?: Autor) {
      let clie = autor != null ? autor : new Autor();
      this.dialog.open(AutorDialogoComponent, {
        width: '250px',
        data: clie
      });
    }

  }


