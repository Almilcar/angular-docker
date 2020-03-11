import { Libro } from './../_model/libro';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LibroService {
  libroCambio = new Subject<Libro[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HTTPS}/api/libro`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Libro[]>(this.url+'/listar');
  }

  listarPorId(id_libro: number) {
    return this.http.get(`${this.url}/listar/${id_libro}`, {
      responseType: 'blob'
    });
  }
  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/listar/pageable?page=${p}&size=${s}`);
  }
  registrar(libro: Libro, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const libroBlob = new Blob([JSON.stringify(libro)], { type: 'application/json' });
    formdata.append('libro', libroBlob);

    return this.http.post(`${this.url+'/registrar'}`, formdata);
}
modificar(libro: any, file?: File) {
  let formdata: FormData = new FormData();
  formdata.append('file', file);

  const libroBlob = new Blob([JSON.stringify(libro)], { type: 'application/json' });
  formdata.append('libro', libroBlob);

  return this.http.put(`${this.url+'/modificar'}`, formdata);
}

}
