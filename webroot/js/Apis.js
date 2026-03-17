'use stricted'
async function hacerPeticion(cantidad,idioma){
    let respuesta;
    if(typeof(cantidad)!="string"){
        throw new Error("El parametro cantidad tiene que ser de tipo String.");
    }
    if(typeof(idioma)!="string"){
        throw new Error("El parametro idioma tiene que ser de tipo String.");
    }
    if(isNaN(Number(cantidad))||cantidad.includes(",",undefined)||cantidad==""){
        throw new Error("La cantidad tiene que ser un String que contenga un numero entero.");
    }
    if(idioma.length!=2){
        throw new Error("El idioma tiene que tener dos caracteres.");
    }
    try{
        const dat=await fetch("https://random-word-api.herokuapp.com/word?number="+cantidad+"&lang="+idioma);
        if(dat.status==200){
            const palabras=await dat.json();
            respuesta=palabras;
            // console.log(respuesta);
            return respuesta;
        }
        else{
            throw new Error("Ocurrio un error inesperado.");
        }
    }
    catch(Error){
        console.error(Error);
    }
}
export async function tratamientoDePalabras(cantidad,idioma){
    let palabras,datos=await hacerPeticion(cantidad,idioma),correcto;
    let caracteres=[" ","#","?","¿","!","¡","Á","á","É","é","Í","í","Ó","ó","Ú","ú","."];
    console.log(datos);
    do{
        correcto=true;
        for(let palabra of datos){
            if(correcto){
                for(const carac of caracteres){
                    if(palabra.includes(carac,undefined)){
                        datos=await hacerPeticion(cantidad,idioma);
                        correcto=false;
                    }
                }
            }
        }
    }while(!correcto);
    return datos;
}
//https://rae-api.com/api/random