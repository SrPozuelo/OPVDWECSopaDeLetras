'use stricted'
import {calcularDimensiones,rellenarTablero,pintarTableroSinDOM,escribirEstilos,escribirPalabrasSinDOM} from "./crearTablero.js";
import {cargarPuntuaciones} from "./puntuaciones.js";
import {generarInicio} from "./Eventos.js";
var dificultad=0,div1;
const DOM="Con";
export var palabras;
var DIFICULTADES=3,LONGITUD=3;
export var puntuaciones=new Array(DIFICULTADES);
console.log("PRINCIPIO");
for(let i=0;i<puntuaciones.length;i++){
    puntuaciones[i]=new Array(LONGITUD);
    for(let j=0;j<puntuaciones[i].length;j++){
        puntuaciones[i][j]=new Array(2);
        for(let z=0;z<puntuaciones[i][j].length;z++){
            puntuaciones[i][j][z]="NADA";
        }
    }
}
for(let i=0;i<puntuaciones.length;i++){
    cargarPuntuaciones(i);
}
console.log("FINAL");
if(!navigator.cookieEnabled){
    alert("No se pueden guardar las puntuaciones porque están desabilitadas las cookies.");
}
switch(DOM){
    case "Sin":
        palabras=["arbol","bosque","hongos","setas","descansar","almendro","caminar","camino"];
        for(const lis in palabras){
            palabras[lis]=palabras[lis].toUpperCase();
        }
        document.open("../../indexSopaDeLetras.html");
        escribirEstilos(calcularDimensiones(palabras));
        palabras.sort((a,b)=>a.length-b.length);
        escribirPalabrasSinDOM(palabras);
        palabras.sort((a,b)=>b.length-a.length);
        pintarTableroSinDOM(rellenarTablero(palabras));
        document.close();
    break;
    case "Con":
        generarInicio();
    break;
    default:
        console.error("La opción "+DOM+" no es valida.")
    break;
}