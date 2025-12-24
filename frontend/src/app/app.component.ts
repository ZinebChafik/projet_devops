import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component'
import {GlobeComponent} from './components/globe/globe.component'
import {CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
  continents:any;
  async fetching(){
    
  let json= await fetch("http://localhost:8000/country_listing/");
  this.continents=await json.json();
  console.log(this.continents)
  }
  
}
