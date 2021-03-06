//se comenzo a hacer el script en la clase 2:

let datos = [
             {titulo:'carne', cantidad:12, precio:2500},
             {titulo:'jabon', cantidad:15, precio:3000}
            ];


let datosPrevios = [];

const rest = RESTClient('https://5fb828892f145f0016c3c2e6.mockapi.io/items'
);

const btnAgregar = document.querySelector('#btnAgregar');
const inpBusqueda = document.querySelector('#inpBusqueda');
const btnDeshacer = document.querySelector('#btnDeshacer');
const inpAgregar = document.querySelector('#inpAgregar');
const galeria = document.querySelector('#galeria');
const linkLimpiarLista = document.querySelector('#linkLimpiarLista');


//workers ---clase 5 1.53hs
let busquedaWorker = false;

if(window.Worker){
//se le asigna la instanciacion del nuevo worker
    busquedaWorker = new Worker('workers/busqueda.worker.js')
}

//funciones que necesito

const template = ({titulo,cantidad,precio})=> 
`<div class="item">
<div class="titulo">
  ${titulo}
</div>
<div class="controles">
<span>${cantidad}</span>
<span>${precio}</span>
</div>
<div class="borrar">
  <a href="#" class="borrar">eliminar</a>
</div>
</div>`;
 //es un template string
function render(lista = [{titulo:'',cantidad:0, precio:0}]){
    galeria.innerHTML = '';
    lista.forEach(item =>{
        galeria.innerHTML += template(item);
    });
}

//clase4
            // async function loadAPI(completado){
            //     const endpoint ='https://5fb828892f145f0016c3c2e6.mockapi.io/items';
            //     const res = await fetch(endpoint);
            //     const json = await res.json();

            //     datos = json;

            //     completado(datos);
            // }

//esto es lo que se agrega al html.

//eventos, hacer click en los botones que tengo: agregar item, deshacer, busqueda
//limpiar lista, guardaar lista, cargar lista

//cargar la pagina:


// document.addEventListener('DOMContentloaded', ()=>{
//     // render(datos);
//     loadAPI(function(){//agregamos esto para el evento y sacamos solo el render.
//         render(datos);
//     });    queda comentado xq se agrega todo abajo linea 200
// });

document.addEventListener('DOMContentloaded', ()=>{
    res.get(function(json){
        datos = json;
        render(json);
    });
});    //otra forma de recuperar la informacion

btnAgregar.addEventListener("click", ()=>{
    datosPrevios = datos.slice(0);
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 0,
        precio:0
    });
    render(datos);
    inpAgregar.value ='';
    
});

btnDeshacer.addEventListener('click', ()=>{
    datos = datosPrevios;
    render(datos);
})

inpBusqueda.addEventListener('input', e=>{
    // let vista = datos.filter( (val) =>{
    //     if(val.titulo.includes(e.target.value)){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });    queda comentado de la clase 5 1.50hs
        //esta logica debe ejecutarse en caso de que no tengamos worker
        if(!busquedaWorker){ 
    let vista = datos.filter(val => val.titulo.includes(e.target.value));
    //es parecido al codigo de la linea 97 al 99
    render(vista)
}else{
    //uso del worker para filtrar los datos
    //hay que tener dos versiones una que soporte el worker y otra que no la soporte
    console.log('busqueda worker registrado');
    busquedaWorker.postMessage({
        datos,
        filtro: e.target.value
    });
busquedaWorker.addEventListener('message', (e)=>{
    console.log(e);
    render(e.data);
})
}
})

//limpiar lista
linkLimpiarLista.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0);
    datos = [];
    render(datos)
})

/*
vamos dividiendo en partes lo que necesitams para el scrip y darle funcionalidad
primero agarrar los botones, y luego agrearles eventos a los botones, (click), creamos un objeto
despues se le va agregando funciones, con parametros
se crea una funcion template para hcer un template string asi se incerta todo con codigo html
despues una funcion que tiene todo lo que tiene que insertar en el html, y tambien un forEach(para cada uno) 
que es un bucle que ejecuta para cada elemento del array.

tambien hicimos un una funcion para renderizar, que fuimos agreagando a alguno de los eventos.

**/




//clase 3:
// en comienzo comenzo resuemiendo los codigos que se hicieron la clase2
//en esta clase se hace que la app sea instalable y trabjar con alguna api.
//a partir del minuto 17, comienza a explicar sobre al archivo del manifiesto
//que toda api que utilice una web de extension tiene que tenr este archivo para que sea instalable
//el manifiesto de aplicaciones web es un tipo jason(manifest.json), donde tiene las propiedades de nuestra aplicacion
//tiene, un nombre, una descripcion, iconos, los tamaños que se adapta, coloes de fondo, etc.
//la clase comenzo a trabajr luego de la explicacion a partir del min 35.


//manifiesto:
//creamos un manifest, pero lo buscamos en la web, como developer manifest.
//en la pagina de mozilla hay cosas a tener en cuenta para la creacion del manifiesto.
//hay un posteo de que se llama entiendo el manifiesto de lasaplicaciones web progresivas que
//explica bien como hay que hacer.(desarrolloweb.com/artiulos/manifest-pregressive-web-apps.html)
//despues tambien con un generador de manifiestos, web app manifest generator: que se pueden agregar colores, imagenes y lo que por defecto tiene que tener el manifiesto
//el estart url, se puede pasar por query string, se usa mucho en la parte de service worker(averiguar mas),
//la diferencia de start ur. y escope, es que start url especifia la url que se carga cuando el usuario lanza la app, y el scope
//define el ambito de navegacion en el contexto de la aplicacion, el escope restringe que paginas se pueden ver cuando se aplica el manifiesto
//

//en la consola comenzamos a trabajar con lighthouse, que tiene una informacion que es como un reporte
//que se pide la pagina, que dice generate report, y perfomance, accessibility, buenas practicas
//y si es una AWP, nos centralizamos en la parte de instalable(usamos como referencia a airhorner.com)

//instalacion:
/**1- prepara la instalacion, decir que voy a instalar (commit)
 * 2-efectuar la instalacion, realizar el copiado de los archivos (push).
 * equivalencia de una AWP
 * 1-indicar al browser que esta ante una sitio instalable
 * agregar el "añadir a la pantalla de inicio"
 * 2-copiar los archivos estaticos a la cache(clase6)
 * 
 * --------------creacione del manifest.json
 * 1-definir las propiedades generales(name,short_name, display,scope,statr_url, theme_color, background_color)
 * 2-crear los iconos(512x512 y 192x192)
 * 
 * 
 * la primera vez que tiramos el reporte tira dos errores uno del display
 * ,por que tenemos browser, lo cambiamos por standalone, y otra que no registra ningun service worker.
 * 
 * 
 * en el segundo reporte salta que falta el servie worker, que el service worker, es una secuencia de comandps
 * que se ejecuta en segundo plano, pueden haber varios service woker, esta bueno xq se ejecuta en segundo plano y mejora
 * la interaccion y la perfomance de la pagina,
 * por un lado tenemos los preceso principales, que esta la carga de la pagina y la ejecucion de algun script, en paralelos
 * proceso asincronicos como ajax o promises
 * y por otro lado estan los service worker en paralelo fuera del proceso principal totalemnte independiente.
 * 
 * en la clase 5 se ve mas profundo sobre los service worker que son como un filtro
 * ahora hacemos un worker vacio para pder hacer la app instalable, 
 * asi que creamos otro archivo (sw.js) y ahi codificamos el service worker
 * 
 *  */


/**
 *------- clase 4: usamos la pagina mockAPI y entramos con gmail, es un api endpoint donde tenemos recursos, y creamos un proyecto free
 * y vamos agregando los recursos que necesitamos hacemos click en nuestro proyecto
 * y vamos sumando los recursos, con new recurso, ahi le ponemos el nombre que queremos, y donde dice create art, faker son datos que vamos cambiando
 * nos da unos de ejemplos que vamos modificando depende lo que querramos, despues mas abajo nos manda los endpoints y si le ponemos create y nos crea
 * si pasamos la manito seleccionamos la cantidad y nos crea la cantidad con los datos random y nos da una api edpoint que copiamos
 * y pegamos en otra pestaña con la palabra items al final y aparece todos los datos en texto plano.
 * ahora vamos a trabajar con promesas en la linea 43.
 * 
 * 
 * 
 * 
 * 
 */

 //objetos
// const rest = (function(){
    // async function loadAPI(completado){
    //     const endpoint ='https://5fb828892f145f0016c3c2e6.mockapi.io/items';
    //     const res = await fetch(endpoint);
    //     const json = await res.json();
    
    //     datos = json;
    
    //     completado(datos);}

    //otra forma:
    //  const endpoint = 'https://5fb828892f145f0016c3c2e6.mockapi.io/items'
//      function crearPeticion(url,metodo= 'GET', cuerpo = ''){
//          return async function(compleatado){
//              let res;
//              if(metodo == 'GET')
//                  res = await fetch(url)
//                  else
//                   res = await fetch(url, {method: metodo, body:cuerpo})
            
//             let data = await res.json();
//             compleatado(data)
//                 }
//             }
     
    
//     return {
//         // getAll: loadAPI
//         get: crearPeticion(endpoint),
//         post: (cuerpo, callback)=> crearPeticion(endpoint, 'POST', cuerpo)(callback),
//         put:(id,cuerpo, callback)=> crearPeticion(endpoint+'/'+id, 'PUT', cuerpo)(callback),
//         delete:(id,cuerpo, callback)=> crearPeticion(endpoint+'/'+id, 'DELETE', cuerpo)(callback),
// //esto es como se manipula una api, con distintos pedidos http, mas complejo
//     }
 