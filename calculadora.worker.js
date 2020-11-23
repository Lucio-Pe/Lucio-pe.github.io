//worker nos da metodos para poder trabajar por ejemplo postMessaje
//aca se programa el worker q se esta ejecutando, lo que ahce aca es recibi el mensaje y envia el mensaje
//es el mssaje event de este lado es el hijo, el mssaje event del lado de index es el padre
//de ambos lado tiene su propia propiedad data. y de alguna manera lo podemos utilizar.


//recibi mensaje
self.addEventListener('message', e=>{
    // console.log(e);
//envia un mensaje
// self.postMessage('he recibido el mensaje')  esto fue para mostrar como funciona

/**
 * const numero1 = e.data.numero1
 * const numero2 = e.data.numero2
 */

const {numero1, numero2} = e.data;
const suma = numero1 + numero2;
//envio el mensaje
self.postMessage(suma);
//lo que vemos es que nuestro index es el proceso pricipal y  se comunica con en segundo plano se ejecuta nuestro worker
//a traves del postmessage y del addEvenlistener.
});