const RESTClient = function(endpoint){ 


function crearPeticion(url,metodo= 'GET', cuerpo = ''){
    return async function(compleatado){
        let res;
        if(metodo == 'GET')
            res = await fetch(url)
            else
             res = await fetch(url, {method: metodo, body:cuerpo})
       
       let data = await res.json();
       compleatado(data)
           }
       }


return {
   // getAll: loadAPI
   get: crearPeticion(endpoint),
   post: (cuerpo, callback)=> crearPeticion(endpoint, 'POST', cuerpo)(callback),
   put:(id,cuerpo, callback)=> crearPeticion(endpoint+'/'+id, 'PUT', cuerpo)(callback),
   delete:(id,cuerpo, callback)=> crearPeticion(endpoint+'/'+id, 'DELETE', cuerpo)(callback),
//esto es como se manipula una api, con distintos pedidos http, mas complejo
    }
    
};