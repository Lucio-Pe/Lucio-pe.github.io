/**aca primero hay que registrar el service worker, verificando en el objeto navigation asi
 * que se trabaja con esas propiedades.
 * y tambien trabjar con los eventos del serviceworker que dentro esta el install, el activate y el fetch.
 * 
 * 
 * 
 */

//proceso
//fetch: se ejecuta alinterceptar una peticion saliente, es el primero es en donde va la mayor cantidad de logica
//manda todo al cache.
//palabra reservada que hace referencia a un objeto seria como un this pero dentro de un worker se usa self
self.addEventListener('fetch', e =>{

}); //esto seria la parte de proceso luego sigue la de preparacion


//preparacion:
//install: se ejecuta una vez al principio, aca lo que hace es un copiado de archivos a la cache
self.addEventListener('install', e=>{

});

//activate: este evento se ejecuta al haber un cambio en este archivo, esto realiza una actualizacion de los archivos de la cache
self.addEventListener('activate', e=>{

});
//resumen: hacer instalable una aplicacion

// 1 indicar al browser que este sitio es un sitio instalable
/**
 * -indicar el nombre de la aplicacion
 * -indicar el incono
 * -defifinir la forma que se visualiza el sitio
 * -manifest.json
 * 
 * 2-programar la logica necesaria para efectuar la instalacion
 * -crear el proceso de copiado de archivos a la cache
 * -serviceworker/cache
 */



/**calse 5:
 * trabajamos lo que son service worker que es un componente para que trabaje de manera offline,
 * es una especie de proxy que se trabaja en segudno plano:
 * por un lado se ejecuta el window donde los proceso internos esta la carga del dom, fetch, ect
 * por otro lado hay otra linea donde se ejecuta el worker que son tambien script que programamos,
 */







