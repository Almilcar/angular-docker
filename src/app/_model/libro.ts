import { Autor } from './autor';


export class Libro{


  id_libro: number;
  categoria : string
  descripcion : string;
  editorial: string;
  fech_lanzamiento: Date;
  idioma: string;
  paginas: number;
  titulo:string
  autor: Autor;
  foto: any;
  isFoto: boolean;





}
