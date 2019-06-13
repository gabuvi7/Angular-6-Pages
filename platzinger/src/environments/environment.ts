// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* Este archivo lo puedo utilizar para desarrollo, entonces si tengo 2 DB distintas (1 prod y otra desa), 
aca voy a poner la configuracion de la base de desarrollo y en environment.prod.ts coloco los datos de la
base productiva.*/

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBJ0IXQORHVVumZYovrq5w3unks_r0ZV_I',
    authDomain: 'platzinger-324fc.firebaseapp.com',
    databaseURL: 'https://platzinger-324fc.firebaseio.com',
    projectId: 'platzinger-324fc',
    storageBucket: 'platzinger-324fc.appspot.com',
    messagingSenderId: '476070506800'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
