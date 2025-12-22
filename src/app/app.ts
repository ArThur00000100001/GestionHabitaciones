import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inicio } from './inicio/inicio'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  constructor(){
    //fetch await
    fetch('http://192.168.0.113:3000/habitaciones').then( async x=> console.log(await x.json()))
  }

}
