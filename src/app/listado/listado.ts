import { Component, signal } from '@angular/core';

export type habitacion = {
  id: number;
  tipo_habitacion: string;
  piso: number;
};

@Component({
  selector: 'listado-view',
  templateUrl: './listado.html',
  styleUrl: './listado.scss',
})
export class listado {
  // dato:[] = []
  habitaciones = signal<habitacion[]>([]);
  /*constructor() {
    
    //fetch await
    fetch('http://192.168.0.113:3000/habitaciones').then(async (x) => {
        this.dato = await x.json()
        
        console.log(this.dato)
    });
  }*/

  constructor() {
    this.cargarDato();
  }

  async cargarDato() {
    // fetch('http://192.168.0.113:3000/habitaciones')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data != null && Array.isArray(data)) {
    //       this.habitaciones.set(data as habitacion[]);
    //     }
    //   });

    const response = await fetch('http://192.168.0.113:3000/habitaciones');
    const data = await response.json();
    if (data != null && Array.isArray(data)) {
      this.habitaciones.set(data as habitacion[]);
    }
  }

  async eliminar(id: number){
    const response = await fetch(`http://192.168.0.113:3000/habitaciones/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type' : 'application/json'
        }
    })

    if(!response.ok){
        console.log('Error')
    }else{
        console.log('Funciona')

        this.cargarDato()

    }

  }

  async editar(clase:string, piso:string, id:number){
    const response = await fetch(`http://192.168.0.113:3000/habitaciones/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            tipo_habitacion: clase,
            piso: piso
        })
    })

    if(!response.ok){
        console.log('Error')
    }else{
        console.log('funciona')
        this.cargarDato()
    }

  }

  

}
