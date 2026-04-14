'use stricted'
import {rellenarTablero,pintarTableroConDOM,escribirPalabrasConDOM} from "./crearTablero.js";
import {ActualizarPuntuacion,comprobarPuntuacion,guardarPuntuaciones,escribirPuntuaciones} from "./puntuaciones.js";
import {puntuaciones} from "./SopaDeLetras.js";
import {tratamientoDePalabras} from "./Apis.js";
var dificultad,palabras;
function escribirFooter(){
    const cuerpo=document.getElementById("Cuerpo");
    const footer=document.createElement("footer");
    let div,span;
    div=document.createElement("div");
    div.setAttribute("id","Copyright");
    div.innerHTML='2025-26 IES LOS SAUCES.&#169;Todos los derechos reservados.<a href="../../../index.html" id="Nombre">Óscar Pozuelo Villamandos</a> y fue modificado por ultima vez el <time datetime="2025-12-02">02-12-2025.</time>';
    span=document.createElement("span");
    span.setAttribute("id","span");
    footer.setAttribute("id","FooterJuego");
    footer.appendChild(span);
    footer.appendChild(div);
    cuerpo.appendChild(footer);
    setInterval(()=>{
        const span=document.getElementById("span");
        if(span!=undefined){
            var texto="";
            texto=horaActual();
            span.textContent=texto;
        }
    },1000);
}
function horaActual(){
    let reloj=new Date();
    let horas=reloj.getHours();
    let minutos=reloj.getMinutes();
    let segundos=reloj.getSeconds();
    if(horas<10){
        horas="0"+horas;
    }
    if(minutos<10){
        minutos="0"+minutos;
    }
    if(segundos<10){
        segundos="0"+segundos;
    }
    return horas+":"+minutos+":"+segundos;
}
function crearCabecera(){
    const cuerpo=document.getElementById("Cuerpo");
    const header=document.createElement("header");
    const contenido=document.createElement("div");
    const identidad=document.createElement("div");
    const curso=document.createElement("div");
    const logo=document.createElement("div");
    const h1=document.createElement("h1");
    header.setAttribute("class","cabecera-principal");
    header.appendChild(contenido);
    contenido.setAttribute("class","contenido-cabecera");
    contenido.appendChild(identidad);
    contenido.appendChild(curso);
    identidad.setAttribute("class","identidad");
    identidad.appendChild(logo);
    identidad.appendChild(h1);
    logo.setAttribute("class","logo-iniciales");
    logo.textContent="ÓS";
    h1.textContent="Óscar Pozuelo Villamandos";
    curso.setAttribute("class","curso-badge");
    curso.textContent="SOPA DE LETRAS";
    cuerpo.appendChild(header);
}
function crearPieDePagina(){
    const cuerpo=document.getElementById("Cuerpo");
    const footer=document.createElement("footer");
    const contenido=document.createElement("div");
    const iconos=document.createElement("div");
    const texto=document.createElement("div");
    var i,a,p;
    cuerpo.appendChild(footer);
    footer.setAttribute("class","pie-pagina");
    footer.appendChild(contenido);
    contenido.setAttribute("class","contenido-footer");
    contenido.appendChild(texto);
    contenido.appendChild(iconos);
    texto.setAttribute("class","texto-legal");
    p=document.createElement("p");
    p.textContent="2025-26 IES LOS SAUCES. ©Todos los derechos reservados.";
    texto.appendChild(p);
    p=document.createElement("p");
    p.setAttribute("class","autor");
    a=document.createElement("a");
    a.setAttribute("href","https://oscarpozvil.ieslossauces.es");
    a.textContent("Óscar Pozuelo Villamandos.");
    p.appendChild(a);
    p.textContent="Fecha de Actualización: 14-04-2026";
    texto.appendChild(p);
}
export function generarInicio(){
    const cuerpo=document.getElementById("Cuerpo");
    const input=document.createElement("input");
    const footer=document.createElement("footer");
    var div;
    crearCabecera();
    div=document.createElement("div");
    div.setAttribute("id","Iniciar");
    div.textContent="¡BIENVENIDO A LA SOPA DE LETRAS!";
    input.setAttribute("type","button");
    input.setAttribute("name","Boton");
    input.setAttribute("value","COMENZAR A JUGAR");
    input.setAttribute("id","Comenzar");
    // input.setAttribute("onclick","seleccionDeDificultad()");
    input.addEventListener("click",()=>{
        seleccionDeDificultad(false);
    });
    footer.setAttribute("id","FooterInicio");
    footer.innerHTML='2025-26 IES LOS SAUCES.&#169;Todos los derechos reservados.<a href="../../../index.html" id="Nombre">Óscar Pozuelo Villamandos</a> y fue modificado por ultima vez el <time datetime="2025-12-02">02-12-2025.</time>'
    cuerpo.appendChild(div);
    cuerpo.appendChild(input);
    cuerpo.appendChild(footer);
}
function seleccionDeDificultad(eliminar){
    const cuerpo=document.getElementById("Cuerpo");
    const div=document.createElement("div");
    const p=document.createElement("p");
    const nombreBoton=["FÁCIL","NORMAL","DIFÍCIL"];
    const dific=[0,1,2];
    let button;
    p.textContent="ELIGA LA DIFICULTAD:";
    div.appendChild(p);
    div.setAttribute("id","SeleccionDeDificultad");
    for(let i=0;i<3;i++){
        button=document.createElement("button");
        button.textContent=nombreBoton[i];
        button.addEventListener("click",()=>{
            dificultad=dific[i];
            document.getElementById("Cuerpo").removeChild(document.getElementById("SeleccionDeDificultad"));
            if(eliminar){
                cuerpo.removeChild(document.getElementsByTagName("header")[0]);
                cuerpo.removeChild(document.getElementById("Dificultad"));
                cuerpo.removeChild(document.getElementById("tabla3"));
                cuerpo.removeChild(document.getElementById("Opciones"));
                cuerpo.removeChild(document.getElementById("FooterInicio"));
            }
            IniciarSopaDeLetras();
        });
        div.appendChild(button);
    }
    cuerpo.appendChild(div);
    document.getElementById("Iniciar").style.marginTop="200px";
    document.getElementById("Iniciar").style.marginBottom="50px";
}
async function cargarPalabras(cantidad,idioma){
    const datos=await tratamientoDePalabras(cantidad,idioma);
    return datos;
}
async function IniciarSopaDeLetras(){
    const cuerpo=document.getElementById("Cuerpo");
    let input=document.getElementById("Comenzar");
    let span,div1,div=document.getElementById("Iniciar"),boton,info;
    const header=document.getElementsByTagName("header")[0];
    const footer=document.getElementsByTagName("footer")[0];
    let estilosFooter,estilosPalabras,estilosCronometro,estilosAviso;                                   //OBJETOS
    let segundos=0,minutos=0,horas=0,seg,min,hor,altoTablero,altoCronometro,altoFooter,altoAviso="0px"; //ENTEROS
    let palHor,palMin,palSeg,nombre;                                                                    //STRINGS
    let I1,I2,I3,I4;                                                                                    //INTERVALOS
    if(document.getElementsByTagName("header")[0]!=null){
        cuerpo.removeChild(header);
        cuerpo.removeChild(div);
        cuerpo.removeChild(input);
        cuerpo.removeChild(footer);
    }
    cuerpo.style.backgroundColor="white";
    if(!navigator.onLine){
        div1=document.createElement("div");
        div1.setAttribute("id","offline");
        div1.textContent="NO HAY CONEXIÓN A INTERNET.";
        document.getElementById("Cuerpo").appendChild(div1);
        switch(dificultad){
            case 0:
                palabras=["teclado","pantalla","raton","altavoz","cascos","portatil"];
            break;
            case 1:
                palabras=["arbol","bosque","camino","descansar","caminar","almendro","setas","hongos"];
            break;
            case 2:
                palabras=["futbol","baloncesto","tenis","badminton","padel","atletismo","ciclismo","waterpolo","esgrima","pinpon","ajedrez","natacion","boxeo","maraton"];
            break;
        }
        estilosAviso=window.getComputedStyle(document.getElementById("offline"));
        altoAviso=estilosAviso.height;
    }
    else{
        div1=document.createElement("div");
        div1.setAttribute("id","PantallaDeCarga");
        span=document.createElement("span");
        span.textContent="Cargando sopa de letras";
        div1.appendChild(span);
        for(let i=1;i<=3;i++){
            span=document.createElement("span");
            span.textContent=".";
            span.setAttribute("id","span"+i);
            div1.appendChild(span);
        }
        I4=setInterval(()=>{
            const span1=document.getElementById("span1");
            const span2=document.getElementById("span2");
            const span3=document.getElementById("span3");
            span1.style.display="none";
            span2.style.display="none";
            span3.style.display="none";
            setTimeout(()=>{span1.style.display="block"},1000);
            setTimeout(()=>{span2.style.display="block"},2000);
            setTimeout(()=>{span3.style.display="block"},3000);
        },4000);
        cuerpo.appendChild(div1);
        try{
            switch(dificultad){
                case 0:
                    palabras=await cargarPalabras("6","es");
                break;
                case 1:
                    palabras=await cargarPalabras("8","es");
                break;
                case 2:
                    palabras=await cargarPalabras("14","es");
                break;
            }
        }
        catch(error){
            console.warn("No va la API, por lo tanto, se cargaran las palabras por defecto.");
            switch(dificultad){
                case 0:
                    palabras=["teclado","pantalla","raton","altavoz","cascos","portatil"];
                break;
                case 1:
                    palabras=["arbol","bosque","camino","descansar","caminar","almendro","setas","hongos"];
                break;
                case 2:
                    palabras=["futbol","baloncesto","tenis","badminton","padel","atletismo","ciclismo","waterpolo","esgrima","pinpon","ajedrez","natacion","boxeo","maraton"];
                break;
            }
        }
        clearInterval(I4);
        cuerpo.removeChild(div1);
    }
    console.log("Palabras="+palabras);
    for(const lis in palabras){
        palabras[lis]=palabras[lis].toUpperCase();
    }
    palabras.sort((a,b)=>a.length-b.length);
    escribirPalabrasConDOM(palabras);
    palabras.sort((a,b)=>b.length-a.length);
    pintarTableroConDOM(rellenarTablero(palabras),palabras);
    div=document.createElement("div");
    div.setAttribute("id","titulo");
    div.textContent="PUNTUACIONES:"
    document.getElementById("Cuerpo").appendChild(div);
    escribirPuntuaciones(dificultad,puntuaciones,"Jue");
    div=document.createElement("div");
    div.setAttribute("id","Cronometro");
    div.textContent="TIEMPO TRANSCURRIDO: 00:00:00";
    document.getElementById("Cuerpo").appendChild(div);
    escribirFooter();
    I3=setInterval(()=>{
        estilosPalabras=window.getComputedStyle(document.getElementById("tabla1"));
        estilosCronometro=window.getComputedStyle(document.getElementById("Cronometro"));
        estilosFooter=window.getComputedStyle(document.getElementById("FooterJuego"));
        altoTablero=estilosPalabras.height;
        altoCronometro=estilosCronometro.height;
        altoFooter=estilosFooter.height;
        if(altoAviso!="0px"){
            estilosAviso=window.getComputedStyle(document.getElementById("offline"));
            altoAviso=estilosAviso.height;
        }
        document.getElementById("tabla2").style.height="calc(100dvh - "+altoTablero+" - "+altoCronometro+" - "+altoFooter+" - "+altoAviso+")";
        document.getElementById("tabla2").style.width="calc(100dvh - "+altoTablero+" - "+altoCronometro+" - "+altoFooter+" - "+altoAviso+")";

    },1);
    I2=setInterval(()=>{
        const palabras=document.getElementById("tabla1").getElementsByTagName("p");
        var finalizar=true;
        for(const palabra of palabras){
            if(palabra.getAttribute("class")!="Tachado"){
                finalizar=false;
            }
        }
        if(finalizar){
            console.log("SE TERMINOOOOOOOOOOOOOO.")
            clearInterval(I1);
            div.textContent="TIEMPO TRANSCURRIDO: "+hor+":"+min+":"+seg;
            clearInterval(I2);
            console.log("POSICIÓN = "+comprobarPuntuacion(dificultad,hor,min,seg));
            div=document.createElement("div");
            div.setAttribute("id","NombreJugador");
            boton=document.createElement("button");
            boton.textContent="CONTINUAR";
            if(comprobarPuntuacion(dificultad,hor,min,seg)!=-1){   
                input=document.createElement("input");
                input.setAttribute("type","text");
                input.setAttribute("placeholder","Introduzca un nombre");
                div.appendChild(input);
                boton.setAttribute("id","conNombre");
                boton.addEventListener("click",()=>{
                    if(document.getElementById("Error")!=null){
                        document.getElementById("NombreJugador").removeChild(document.getElementById("Error"));
                    }
                    nombre=input.value;
                    console.log("NOMBRE="+nombre);
                    if(nombre!=null&&nombre!=""){
                        if(nombre.includes(",",undefined)){
                            div=document.createElement("div");
                            div.setAttribute("id","Error");
                            div.textContent="El campo 'Nombre' no puede contener el caracter ','.";
                            document.getElementById("NombreJugador").appendChild(div);
                        }
                        else{
                            cuerpo.removeChild(document.getElementById("NombreJugador"));
                            ActualizarPuntuacion(dificultad,hor,min,seg,nombre);
                            guardarPuntuaciones(dificultad);
                            clearInterval(I3);
                            FinalizarSopaDeLetras();
                        }
                    }
                    else{
                        div=document.createElement("div");
                        div.setAttribute("id","Error");
                        div.textContent="No puedes dejar el campo 'Nombre' vacio.";
                        document.getElementById("NombreJugador").appendChild(div);
                    }
                });
            }
            else{
                info=document.createElement("div");
                info.setAttribute("id","Info");
                horas==1 ? palHor="hora" : palHor="horas";
                minutos==1 ? palMin="minuto" : palMin="minutos";
                segundos==1 ? palSeg="segundo" : palSeg="segundos";
                info.textContent="Felicidades, completaste la sopa de letras en "+horas+" "+palHor+", "+minutos+" "+palMin+" y "+segundos+" "+palSeg+".";
                div.appendChild(info);
                boton.setAttribute("id","sinNombre");
                boton.addEventListener("click",()=>{
                    cuerpo.removeChild(document.getElementById("NombreJugador"));
                    clearInterval(I3);
                    FinalizarSopaDeLetras();
                });
            }
            div.appendChild(boton);
            cuerpo.appendChild(div);
        }
    },1500);
    I1=setInterval(()=>{
        segundos=Number(segundos)+1;
        if(segundos==60){
            segundos=0;
            seg="00";
            minutos=Number(minutos)+1;
        }
        else{
            if(segundos<10){
                seg="0"+segundos;
            }
            else{
                seg=segundos;
            }
        }
        if(minutos==60){
            minutos=0;
            min="00";
            horas=Number(horas)+1;
        }
        else{
            if(minutos<10){
                min="0"+minutos;
            }
            else{
                min=minutos;
            }
        }
        if(horas<10){
            hor="0"+horas;
        }
        else{
            hor=horas;
        }
        div.textContent="TIEMPO TRANSCURRIDO: "+hor+":"+min+":"+seg;
    },1000);
}
function FinalizarSopaDeLetras(){
    const cuerpo=document.getElementById("Cuerpo");
    const h1=document.createElement("h1");
    const footer=document.createElement("footer");
    var div,input,span;
    cuerpo.removeChild(document.getElementById("tabla1"));
    cuerpo.removeChild(document.getElementById("tabla2"));
    cuerpo.removeChild(document.getElementById("tabla3"));
    cuerpo.removeChild(document.getElementById("Cronometro"));
    cuerpo.removeChild(document.getElementById("FooterJuego"));
    cuerpo.removeChild(document.getElementById("titulo"));
    crearCabecera();
    footer.innerHTML='2025-26 IES LOS SAUCES.&#169;Todos los derechos reservados.<a href="../../../index.html" id="Nombre">Óscar Pozuelo Villamandos</a> y fue modificado por ultima vez el <time datetime="2025-12-02">02-12-2025.</time>'
    footer.setAttribute("id","FooterInicio");
    div=document.createElement("div");
    div.setAttribute("id","Dificultad");
    div.textContent="DIFICULTAD:";
    span=document.createElement("span");
    switch(dificultad){
        case 0:
            span.textContent="FÁCIL";
            span.style.color="lime";
        break;
        case 1:
            span.textContent="NORMAL";
            span.style.color="yellow";
        break;
        case 2:
            span.textContent="DIFÍCIL";
            span.style.color="red";
        break;
    }
    div.appendChild(span);
    cuerpo.appendChild(div);
    escribirPuntuaciones(dificultad,puntuaciones,"Fin");
    div=document.createElement("div");
    div.setAttribute("id","Opciones");
    input=document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("value","VOLVER A JUGAR");
    input.addEventListener("click",()=>{
        seleccionDeDificultad(true);
    });
    div.appendChild(input);
    input=document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("value","SALIR");
    input.addEventListener("click",()=>{
        cuerpo.removeChild(document.getElementsByTagName("header")[0]);
        cuerpo.removeChild(document.getElementById("Dificultad"));
        cuerpo.removeChild(document.getElementById("tabla3"));
        cuerpo.removeChild(document.getElementById("Opciones"));
        cuerpo.removeChild(document.getElementById("FooterInicio"));
        generarInicio();
    });
    div.appendChild(input);
    cuerpo.appendChild(div);
    cuerpo.appendChild(footer);
}