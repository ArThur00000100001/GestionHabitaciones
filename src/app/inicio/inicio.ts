import { Component, signal } from "@angular/core";

export type habitacion = {
  id: number;
  tipo_habitacion: string;
  piso: number;
};

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
        const lista = await fetch('https://hotel.caffeedev.com/habitaciones');
        const dat = await lista.json();
        if (dat != null && Array.isArray(dat)) {
          this.habitaciones.set(dat as habitacion[]);
        }
    }

    async guardar(clase: string, piso: string){

        /*this.habitaciones.update(item => [
            ...item,
            {
                id: this.habitaciones().length + 1,
                tipo_habitacion: clase,
                piso: +piso
            }
        ])*/

        const response = await fetch('https://hotel.caffeedev.com/habitaciones', {
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
            this.cargarDatos()
        }
        const data = await response.json();
        if(data != null && Array.isArray(this.habitaciones())){
            
        }

    }


    // dato:[] = []
      
      /*constructor() {
        
        //fetch await
        fetch('http://192.168.0.113:3000/habitaciones').then(async (x) => {
            this.dato = await x.json()
            
            console.log(this.dato)
        });
      }*/
    
    
      async eliminar(id: number){
        const response = await fetch(`https://hotel.caffeedev.com/habitaciones/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    
        if(!response.ok){
            console.log('Error')
        }else{
            console.log('Funciona')
    
            this.cargarDatos()
    
        }
    
      }

      async editar(clase:string, piso:string, id:number){
    const response = await fetch(`https://hotel.caffeedev.com/habitaciones/${id}`,{
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
        this.cargarDatos()
    }

  }

}