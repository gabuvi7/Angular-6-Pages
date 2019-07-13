import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

// Creacion de interfaces.

/*
Los tipos de datos Interfaces de TypScript, son muy parecidos a una clase, en la que se definen 
propiedades internas que pueden ser de cualquiera de los otros tipos.
 Estas propiedades internas pueden definirse como obligatorias u opcionales usando el símbolo “”?"". 
 Las interfaces definen en cierto modo estructuras personalizadas de datos en las que lo principal es 
 que al ser implementadas usando ciertas IDEs (como Webstorm), muestran mensajes de control y validación 
 para asegurar el uso adecuado de dicha interface, en tiempo real durante el desarrollo.

La forma de declarar una interface se puede ver en el siguiente ejemplo:

export interface User {
  nick: string,
  subnick?: string,
  age?: number,
  email: string,
  friend: boolean,
  uid: any
}
*/

export interface User {
    nick: string;
    subnick?: string; // El signo de ? es para que no sea obligatorio asignarle un dato al subnick o a la edad.
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
    status?: string;
}