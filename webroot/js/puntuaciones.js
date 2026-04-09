'use stricted'
import {puntuaciones} from "./SopaDeLetras.js";
/*------------------------------------------------------------------PUNTUACIONES------------------------------------------------------------------*/
export function cargarPuntuaciones(dificultad){
    let z,nombre,cadenaPorDefecto="------,"+Infinity+":"+Infinity+":"+Infinity+",------,"+Infinity+":"+Infinity+":"+Infinity+",------,"+Infinity+":"+Infinity+":"+Infinity;
    switch(dificultad){
        case 0:
            nombre="Fácil";
        break;
        case 1:
            nombre="Normal";
        break;
        case 2:
            nombre="Difícil";
        break;
    }
    console.log(puntuaciones);
    if(dificultad>puntuaciones.length){
        console.error("La puntuación Nº "+dificultad+" no es posible cargarla.");
    }
    else{
        if(localStorage.getItem(nombre)==null){
            localStorage.setItem(nombre,cadenaPorDefecto);
        }
        for(let j=0;j<puntuaciones[dificultad].length;j++){
            z=j*puntuaciones[dificultad][j].length;
            for(let t=0;t<puntuaciones[dificultad][j].length;t++){
                console.log("Dificultad="+dificultad+"|J="+j+"|T="+t+"|Z="+z);
                puntuaciones[dificultad][j][t]=localStorage.getItem(nombre).split(",")[(z+t)];
            }
        }
        console.log(puntuaciones);
    }
}
export function ActualizarPuntuacion(dificultad,horas,minutos,segundos,nombre){
    const LONGITUD=3;
    let pos=comprobarPuntuacion(dificultad,horas,minutos,segundos);
    if(pos<=(LONGITUD-1)&&pos>=0){
        for(let j=(LONGITUD-1);j>=pos;j--){
            if(j==pos){
                puntuaciones[dificultad][j][0]=nombre;
                puntuaciones[dificultad][j][1]=horas+":"+minutos+":"+segundos;
            }
            else{
                puntuaciones[dificultad][j][0]=puntuaciones[dificultad][(j-1)][0];
                puntuaciones[dificultad][j][1]=puntuaciones[dificultad][(j-1)][1];
            }
        }
    }
}
export function comprobarPuntuacion(dificultad,horas,minutos,segundos){
    const LONGITUD=3;
    let pos=-1,limite=2,pts=new Array(3);
    console.log(puntuaciones);
    for(let j=0;j<LONGITUD;j++){
        if(puntuaciones[dificultad][j][1]==(Infinity+":"+Infinity+":"+Infinity)){
            limite=j-1;
            limite<0 ? limite=0 : null;
            j=LONGITUD;
        }
    }
    for(let j=0;j<=limite;j++){
        for(let i=0;i<3;i++){
            pts[i]=puntuaciones[dificultad][j][1].split(":")[i];
        }
        if(horas==pts[0]){
            if(minutos==pts[1]){
                if(segundos==pts[2]){
                    pos=(Number(j)+1);
                }
                else{
                    segundos<pts[2] ? pos=j:null;
                }
            }
            else{
                minutos<pts[1] ? pos=j:null;
            }
        }
        else{
            horas<pts[0] ? pos=j:null;
        }
        pos==-1 ? null : j=LONGITUD;
    }
    if(pos==-1){
        for(let j=0;j<LONGITUD;j++){
            if(puntuaciones[dificultad][j][1]==(Infinity+":"+Infinity+":"+Infinity)){
                pos=j;
                j=LONGITUD;
            }
        }
    }
    console.log("POS = "+pos);
    return pos;
}
export function guardarPuntuaciones(dificultad){
    let nombre;
    switch(dificultad){
        case 0:
            nombre="Fácil";
        break;
        case 1:
            nombre="Normal";
        break;
        case 2:
            nombre="Difícil";
        break;
    }
    localStorage.setItem(nombre,puntuaciones[dificultad]);
}
export function escribirPuntuaciones(dificultad,puntuaciones,clase){
    const cuerpo=document.getElementById("Cuerpo");
    const tabla=document.createElement("table");
    const tbody=document.createElement("tbody");
    const thead=document.createElement("thead");
    const LONGITUD=3;
    var td,tr,tds=["POSICIÓN","NOMBRE","TIEMPO"];
    tabla.setAttribute("id","tabla3");
    tabla.setAttribute("class",clase);
    cuerpo.appendChild(tabla);
        tabla.appendChild(thead);
            tr=document.createElement("tr");
            for(let i=0;i<3;i++){
                td=document.createElement("td");
                td.textContent=tds[i];
                tr.appendChild(td);
            }
            thead.appendChild(tr);
        tabla.appendChild(tbody);
            for(let i=0;i<LONGITUD;i++){
                tr=document.createElement("tr");
                tbody.appendChild(tr);
                    td=document.createElement("td");
                    td.textContent=(Number(i)+1)+"º";
                    tr.appendChild(td);
                    for(let j=0;j<2;j++){
                        console.log(i+"|"+j);
                        td=document.createElement("td");
                        if(j==1){
                            if(puntuaciones[dificultad][i][1]=="Infinity:Infinity:Infinity"){
                                td.textContent="--:--:--";
                            }
                            else{
                                td.textContent=puntuaciones[dificultad][i][j];
                            }
                        }
                        else{
                            td.textContent=puntuaciones[dificultad][i][j];
                        }
                        tr.appendChild(td);
                    }
            }
}