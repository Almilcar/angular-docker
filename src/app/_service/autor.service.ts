import { Autor } from './../_model/autor';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AutorService {
  autorCambio = new Subject<Autor[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HTTPS}/autor`;
  constructor(private http : HttpClient) { }

 listar(){
  return this.http.get<Autor[]>(this.url);
}

listarPorId(id_autor: number){
return this.http.get<Autor>(`${this.url}/${id_autor}`);
}

registrar(autor: Autor) {
  return this.http.post(this.url, autor);

}
modificar(autor: Autor) {
  return this.http.put(this.url, autor);
}
}
