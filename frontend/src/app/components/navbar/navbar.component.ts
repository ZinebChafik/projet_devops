import { Component } from '@angular/core';
import {RouterModule } from "@angular/router"
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

ngOnInit(){
  let element:any|null  = document.querySelector('#search_but');
  element.addEventListener("click",
    function(){
var search:any|null = document.querySelector('#search');
let value:any|null = search.value;
console.log(value)
window.open("/search/"+value+'/','_self');
});

}
}
