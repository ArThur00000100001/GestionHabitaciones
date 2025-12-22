import { Component, signal } from "@angular/core";
import { habitacion } from "../listado/listado";


@Component({
    selector: 'inicio-view',
    templateUrl: './inicio.html',
    styleUrl: './inicio.scss'
})

export class inicio{
    
    habitaciones = signal<habitacion[]>([]);

    constructor(){
        this.cargarDatos()
    }

    async cargarDatos(){
        const lista = await fetch('http://192.168.0.113:3000/habitaciones');
        const dat = await lista.json();
        if (dat != null && Array.isArray(dat)) {
          this.habitaciones.set(dat as habitacion[]);
        }
    }

    async guardar(clase: string, piso: string){

        this.habitaciones.update(item => [
            ...item,
            {
                id: this.habitaciones().length + 1,
                tipo_habitacion: clase,
                piso: +piso
            }
        ])

        const response = await fetch('http://192.168.0.113:3000/habitaciones', {
            method: 'POST',
            body: JSON.stringify({
                tipo_habitacion: clase,
                piso: +piso
            }),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if(!response.ok){
            console.log('Error')
        }else{
            console.log('funciona')
        }
        const data = await response.json();
        if(data != null && Array.isArray(this.habitaciones())){
            
        }

    }

}