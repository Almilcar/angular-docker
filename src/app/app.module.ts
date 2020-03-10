
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material';

import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutorComponent } from './pages/autor/autor.component';
import { LibroComponent } from './pages/libro/libro.component';
import { LibroDialogoComponent } from './pages/libro/libro-dialogo/libro-dialogo.component';
import { AutorDialogoComponent } from './pages/autor/autor-dialogo/autor-dialogo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AutorComponent,
    LibroComponent,
    LibroDialogoComponent,
    AutorDialogoComponent,

  ],
  entryComponents: [AutorDialogoComponent, LibroDialogoComponent],

  imports: [
    MatSliderModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AppRoutingModule,

  ],
  providers: [
  {    provide: LocationStrategy, useClass: HashLocationStrategy  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
