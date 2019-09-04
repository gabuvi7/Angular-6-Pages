import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search' //nombre de nuestro Pipe.
})

export class SearchPipe implements PipeTransform    {
    public transform(value, args: string){
        if(!value){
            return;
        }
        if(!args){
            return value; // Esto sirve para cuando damos a buscar sin ningun dato, nos devuelva todos los valores.
        }
        args = args.toLowerCase(); // pone en minuscula para poder hacer las comparaciones y no sean diferentes los valores.
        return value.filter( (item) => {
            return JSON.stringify(item).toLowerCase().includes(args); // si yo le paso un obj de js me lo convierte a txt. Include toma un string y checkea si incluye la palabra que le pasamos en args.
        });
    }
}