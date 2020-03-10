import { LibroComponent } from './pages/libro/libro.component';
import { AutorComponent } from './pages/autor/autor.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'autor', component: AutorComponent},
  { path: '', component: AutorComponent},
  { path: 'libro', component: LibroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
