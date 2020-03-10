import { Autor } from './_model/autor';
import { LibroService } from 'src/app/_service/libro.service';
import { AutorService } from './_service/autor.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  autor: Autor[] = [];
  constructor(private autorService : AutorService, public libroService : LibroService){
  }
  ngOnInit(){
    this.autorService.autorCambio.subscribe(data => {
      this.autor = data;
    });
  }
}
