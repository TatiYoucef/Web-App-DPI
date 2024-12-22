import { NgModule } from '@angular/core';  // Importing the NgModule decorator
import { BrowserModule } from '@angular/platform-browser';  // Importing BrowserModule for browser-related functionalities
import { FormsModule } from '@angular/forms';  // Importing FormsModule for using ngModel in forms
import { HttpClientModule } from '@angular/common/http';  // Importing HttpClientModule to make HTTP requests

import { AppComponent } from './app.component';  // Importing the root component

@NgModule({
  declarations: [
    AppComponent  // Declare the root component in the module
  ],
  imports: [
    BrowserModule,  // Importing the BrowserModule
    FormsModule,    // Importing FormsModule for template-driven forms
    HttpClientModule  // Importing HttpClientModule for making HTTP requests
  ],
  providers: [],  // Add services here if necessary
  bootstrap: [AppComponent]  // Specify the root component to bootstrap
})
export class AppModule { }
