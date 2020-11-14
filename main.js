let datos = [
             {id:1, titulo:'carne', cantidad:12, precio:2500},
             {id:2, titulo:'jabon', cantidad:15, precio:3000}
            ];


let datosPrevios = [];

const btnAgregar = document.querySelector('#btnAgregar');
const inpBusqueda = document.querySelector('#inpBusqueda');
const btnDeshacer = document.querySelector('#btnDeshacer');
const inpAgregar = document.querySelector('#inpAgregar');
const galeria = document.querySelector('#galeria');
const linkLimpiarLista = document.querySelector('#linkLimpiarLista');


//funciones que necesito

const template = ({titulo,cantidad,precio})=> {
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
} //es un template string
function render(lista = [{titulo:'',cantidad:0, precio:0}]){
    galeria.innerHTML = '';
    lista.forEach(item =>{
        galeria.innerHTML += template(item);
    });
}



//eventos, hacer click en los botones que tengo: agregar item, deshacer, busqueda
//limpiar lista, guardaar lista, cargar lista

//cargar la pagina:
document.addEventListener('DOMContentloaded', ()=>{
    render(datos);
})

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
    let vista = datos.filter( (val) =>{
        if(val.titulo.includes(e.target.value)){
            return true;
        } else {
            return false;
        }
    });

    render(vista)
})

//limpiar lista
linkLimpiarLista.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0);
    datos = [];
    render(datos)
})

//objetos


/*
vamos dividiendo en partes lo que necesitams para el scrip y darle funcionalidad
primero agarrar los botones, y luego agrearles eventos a los botones, (click), creamos un objeto
despues se le va agregando funciones, con parametros
se crea una funcion template para hcer un template string asi se incerta todo con codigo html
despues una funcion que tiene todo lo que tiene que insertar en el html, y tambien un forEach(para cada uno) 
que es un bucle que ejecuta para cada elemento del array.

tambien hicimos un una funcion para renderizar, que fuimos agreagando a alguno de los eventos.

**/