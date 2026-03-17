'use stricted'
function escribirTableroEnLaConsola(tablero){
    let filaTablero;
    console.log(tablero);
    for(let i=0;i<tablero.length;i++){
        filaTablero="";
        for(let j=0;j<tablero[i].length;j++){
            filaTablero=filaTablero.concat(tablero[i][j]+" ");
        }
        console.log(filaTablero);
    }
    console.log("--------------------------------------------------------------------------------------------------------------------------------------------------");
}
export function calcularDimensiones(palabras){
    var TAM_PALABRA_MAYOR=palabras[0].toString().length,TOTAL_LETRAS_PALABRAS=0;
    for(let pos=0;pos<palabras.length;pos++){
        if(palabras[pos].toString().length>TAM_PALABRA_MAYOR){
            TAM_PALABRA_MAYOR=palabras[pos].toString().length;
        }
        TOTAL_LETRAS_PALABRAS=TOTAL_LETRAS_PALABRAS+palabras[pos].toString().length;
    }
    for(let i=TAM_PALABRA_MAYOR;i<Infinity;i++){
        if((i*i)>=(TOTAL_LETRAS_PALABRAS*2)){
            return i;
        }
    }
}
export function rellenarTablero(palabras){
    let X,Y,colocado,dimension=calcularDimensiones(palabras),cont,aleatorio,diagonal;
    let tablero=new Array(dimension);
    let consonantes=["B","C","D","F","G","H","J","K","L","M","N","Ñ","P","Q","R","S","T","V","W","X","Y","Z"],vocales=["A","E","I","O","U"];
    const sumaX=[1,1,0,-1,-1,-1,+0,+1];
    const sumaY=[0,1,1,+1,+0,-1,-1,-1];
    for(let i=0;i<dimension;i++){
        tablero[i]=new Array(dimension);
        for(let j=0;j<dimension;j++){
            tablero[i][j]="0";
        }
    }
    escribirTableroEnLaConsola(tablero);
    for(const pos in palabras){
        X=parseInt(Math.random()*dimension);
        Y=parseInt(Math.random()*dimension);
        console.log(X+"|"+Y);
        cont=0;
        do{
            colocado=true;
            cont++;
            if(tablero[X][Y]=="0"||tablero[X][Y]==palabras[pos].charAt(0)){
                aleatorio=parseInt(Math.random()*8);
                diagonal=comprobarDiagonal(aleatorio,palabras[pos],X,Y,dimension,tablero,cont);
                if(diagonal==-1){
                    colocado=false;
                }
            }
            else{
                colocado=false;
            }
            if(!colocado){
                if(X==(dimension-1)&&Y==(dimension-1)){
                    X=0;
                    Y=0;
                }
                else{
                    if(Y<(dimension-1)){
                        Y=Y+1;
                    }
                    else{
                        Y=0;
                        X=X+1;
                    }
                }
            }
            else{
                for(let i=0;i<palabras[pos].length;i++){
                    console.log(palabras[pos].toString().charAt(i)+"|I="+i+"|X="+X+"|Y="+Y);
                    if(tablero[X][Y]=="0"){
                        tablero[X][Y]=palabras[pos].toString().charAt(i);
                    }
                    X=X+sumaX[diagonal];
                    Y=Y+sumaY[diagonal];
                }
            }
        }while(!colocado&&cont!=(dimension*dimension));
        if(!colocado){
            console.log(cont);
            console.error("La palabra "+palabras[pos]+" no pudo ser colocada en ningún sitio.");
        }
        else{
            console.log(cont);
            console.log("La palabra "+palabras[pos]+" pudo ser colocada con exito.");
        }
    }
    escribirTableroEnLaConsola(tablero);
    for(let i=0;i<dimension;i++){
        for(let j=0;j<dimension;j++){
            if(tablero[i][j]==0){
                aleatorio=parseInt(Math.random()*10+1);
                console.log("Aleatorio:"+aleatorio);
                if(aleatorio!=1&&aleatorio!=5&&aleatorio!=7){
                    aleatorio=parseInt(Math.random()*22);
                    console.log("Consonante:"+consonantes[aleatorio]);
                    tablero[i][j]=consonantes[aleatorio];
                }
                else{
                    aleatorio=parseInt(Math.random()*5);
                    console.log("Vocales:"+vocales[aleatorio]);
                    tablero[i][j]=vocales[aleatorio];
                }
            }
        }
    }
    return tablero;
}
function comprobarDiagonal(aleat,palabra,X,Y,dimension,tablero,cont){
    /*0 -> 1 \ 2| 3/ 4 <- 5\ 6| 7/ */
    console.log("------------------------------------------------------------------INTENTO "+cont+"--------------------------------------------------------------------");
    var entra,x=X,sumaX,y=Y,sumaY,condicion,aleatorio=aleat;
    sumaX=[1,1,0,-1,-1,-1,+0,+1];
    sumaY=[0,1,1,+1,+0,-1,-1,-1];
    entra=aleatorio;
    for(let j=0;j<=7;j++){
        console.log("----------------------------------------------ALEATORIO:"+aleatorio+"---------DIAGONAL "+(j+1)+"--------------------------------------------------------------------");
        entra=aleatorio;
        for(let i=0;i<palabra.length;i++){
            condicion=false;
            switch(aleatorio){
                case 0:
                    if(x==(dimension)){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 1:
                    if(x==(dimension)||y==(dimension)){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 2:
                    if(y==(dimension)){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 3:
                    if(x==0||y==(dimension)){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 4:
                    if(x==0){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 5:
                    if(x==0||y==0){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 6:
                    if(y==0){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                case 7:
                    if(x==(dimension)||y==0){
                        if(i!=(palabra.length-1)){
                            condicion=true;
                        }
                    }
                break;
                default:
                    console.error("[ERROR]-El valor aleatorio es incorecto (aleatorio="+aleatorio+").");
                break;
            }
            if(condicion){
                entra=-1;
                i=Infinity;
                console.log("(FUERA DE LOS LÍMITES CON CONDICIÓN) ENTRA="+entra);
            }
            else{
                console.log("X="+x+"|Y="+y)
                if(x<0||y<0||x>(tablero.length-1)||y>(tablero.length-1)){
                    entra=-1;
                    i=Infinity;
                    console.log("(FUERA DE LOS LÍMITES SIN CONDICIÓN) ENTRA="+entra);
                }
                else{
                    if(tablero[x][y]=="0"||tablero[x][y]==palabra.toString().charAt(i)){
                        x=x+sumaX[aleatorio];
                        y=y+sumaY[aleatorio];
                    }
                    else{
                        entra=-1;
                        i=Infinity;
                        console.log("(CARACTER ENCONTRADO) ENTRA="+entra);
                    }
                }
            }
        }
        if(entra!=-1){
            j=Infinity;
        }
        else{
            if(aleatorio==7){
                aleatorio=0;
            }
            else{
                aleatorio=aleatorio+1;
            }
            x=X;
            y=Y;
        }
    }
    return entra;
}
export function pintarTableroSinDOM(tablero){
    var dimension=tablero.length;
    document.writeln("<table id='tabla2'>");
        document.writeln("<tbody>");
        for(let i=0;i<dimension;i++){
            document.writeln("<tr>");
            for(let j=0;j<dimension;j++){
                if(i==(dimension-1)&&j==0){
                    document.writeln("<td class='borde'>"+tablero[i][j]+"</td>");
                }
                else{
                    document.writeln("<td>"+tablero[i][j]+"</td>");
                }
            }
            document.writeln("</tr>");
        }
        document.writeln("</tbody>");
    document.writeln("</table>");
    escribirTableroEnLaConsola(tablero);
}
export function pintarTableroConDOM(tablero,palabras){
    var dimension=tablero.length,alto=90/dimension,ancho=100/dimension;
    const cuerpo=document.getElementById("Cuerpo");
    const tabla=document.createElement("table");
    const tbody=document.createElement("tbody");
    var tr;
    var td;
    tabla.setAttribute("id","tabla2");
    cuerpo.appendChild(tabla);
    tabla.appendChild(tbody);
    for(let i=0;i<dimension;i++){
        tr=document.createElement("tr");
        tr.setAttribute("style","height:"+alto+"%;")
        tbody.appendChild(tr);
        for(let j=0;j<dimension;j++){
            td=document.createElement("td");
            if(i==(dimension-1)&&j==0){
                td.setAttribute("id","borde");
            }
            td.setAttribute("data","null");
            td.setAttribute("style","width:"+ancho+"%;height:"+alto+"%;line-height:"+alto+"%;");
            td.setAttribute("class","noClicado celda");
            td.setAttribute("value","null");
            td.addEventListener("click",(ev)=>{tdClick(ev,dimension,tablero,palabras)});
            td.addEventListener("mousemove",(ev)=>{tdMouseMove(ev,dimension)});
            td.textContent=tablero[i][j];
            tr.appendChild(td);
        }
    }
}
function tdClick(ev,dimension,tablero,palabras){
    var x1,y1,x2,y2,primero=true,X,Y,palabra="",encontrado,PalabraInvertida="";
    const celdas=document.getElementsByClassName("celda");
    const tabla1Celdas=document.getElementById("tabla1").getElementsByTagName("p");
    const sumaX=[1,1,0,-1,-1,-1,+0,+1];
    const sumaY=[0,1,1,+1,+0,-1,-1,-1];
    console.log("TTTTTTTTTTTTTTAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBLLLLLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAAA:"+tabla1Celdas.length);
    console.log("---------------------------");
    console.log("Nº DE CELDAS="+celdas.length);
    for(const celda of celdas){
        if(celda.getAttribute("class")=="noEncontrado celda"){
            celda.setAttribute("class","noClicado celda");
        }
    }
    ev.target.getAttribute("data")=="true" ? null:ev.target.setAttribute("data","false");
    ev.target.setAttribute("class","clicado celda");
    console.log("Nº DE CELDAS CLICADAS="+document.getElementsByClassName("clicado").length);
    if(document.getElementsByClassName("clicado").length==2){
        console.log("--------------------TDCLICK--------------------");
        for(let c=0;c<celdas.length;c++){
            console.log("CELDAS.CLASS="+celdas[c].getAttribute("class"));
            if(celdas[c].getAttribute("class")=="clicado celda"){
                if(primero){
                    x1=c/dimension;
                    if(x1<parseInt(x1)){
                        x1=Number(parseInt(x1))+1;
                    }
                    else{
                        x1=parseInt(x1);
                    }
                    y1=c-((x1)*dimension);
                    console.log("X1="+x1+"|Y1="+y1);
                    primero=false;
                }
                else{
                    x2=c/dimension;
                    if(x2<parseInt(x2)){
                        x2=Number(parseInt(x2))+1;
                    }
                    else{
                        x2=parseInt(x2);
                    }
                    y2=c-((x2)*dimension);
                    console.log("X2="+x2+"|Y2="+y2);
                    primero=true;
                }
            }
        }
        X=x1;
        Y=y1;
        if(mismaDiagonal(x1,x2,y1,y2)!=-1){
            console.log("ESTÁN EN LA MISMA DIAGONAL.");
            X=x1;
            Y=y1;
            palabra="";
            do{
                console.log(tablero[X][Y]);
                palabra=palabra.concat(tablero[X][Y]);
                X=X+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                Y=Y+sumaY[mismaDiagonal(x1,x2,y1,y2)];
            }while((X!=(x2+sumaX[mismaDiagonal(x1,x2,y1,y2)]))||(Y!=(y2+sumaY[mismaDiagonal(x1,x2,y1,y2)])));
            console.log("SELECCIÓN="+palabra);
            encontrado=false;
            for(let pal of palabras){
                for(let i=(pal.length-1);i>=0;i--){
                    PalabraInvertida=PalabraInvertida.concat(pal.charAt(i));
                }
                console.log(PalabraInvertida);
                if(pal==palabra||PalabraInvertida==palabra){
                    encontrado=true;
                    pal=Infinity;
                }
                PalabraInvertida="";
            }
            if(encontrado){
                X=x1;
                Y=y1;
                do{
                    celdas[(X*dimension+Y)].setAttribute("class","Encontrado celda");
                    celdas[(X*dimension+Y)].setAttribute("data","true");
                    X=X+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                    Y=Y+sumaY[mismaDiagonal(x1,x2,y1,y2)];
                }while((X!=(x2+sumaX[mismaDiagonal(x1,x2,y1,y2)]))||(Y!=(y2+sumaY[mismaDiagonal(x1,x2,y1,y2)])));
                palabras.sort((a,b)=>a.length-b.length);
                for(const pala in palabras){
                    for(let i=(palabras[pala].length-1);i>=0;i--){
                        PalabraInvertida=PalabraInvertida.concat(palabras[pala].charAt(i));
                    }
                    if(palabra==palabras[pala]||palabra==PalabraInvertida){
                        tabla1Celdas[pala].setAttribute("class","Tachado");
                    }
                    PalabraInvertida="";
                }
            }
            else{
                X=x1;
                Y=y1;
                do{
                    if(celdas[(X*dimension+Y)].getAttribute("class")!="clicado celda"){
                        if(celdas[(X*dimension+Y)].getAttribute("data")!="true"){
                            celdas[(X*dimension+Y)].setAttribute("data","false");
                        }
                    }
                    celdas[(X*dimension+Y)].setAttribute("class","noEncontrado celda");
                    X=X+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                    Y=Y+sumaY[mismaDiagonal(x1,x2,y1,y2)];
                }while((X!=(x2+sumaX[mismaDiagonal(x1,x2,y1,y2)]))||(Y!=(y2+sumaY[mismaDiagonal(x1,x2,y1,y2)])));
                setTimeout(()=>{
                    X=x1;
                    Y=y1;
                    do{
                        if(celdas[(X*dimension+Y)].getAttribute("data")=="true"){
                            celdas[(X*dimension+Y)].setAttribute("class","Encontrado celda");
                            console.log("TRUE");
                        }
                        else{
                            if(celdas[(X*dimension+Y)].getAttribute("data")=="false"){
                                celdas[(X*dimension+Y)].setAttribute("class","noClicado celda");
                                celdas[(X*dimension+Y)].setAttribute("data","null");
                            }
                        }
                        X=X+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                        Y=Y+sumaY[mismaDiagonal(x1,x2,y1,y2)];
                    }while((X!=(x2+sumaX[mismaDiagonal(x1,x2,y1,y2)]))||(Y!=(y2+sumaY[mismaDiagonal(x1,x2,y1,y2)])));
                },2000);
            }
        }
        else{
            console.log("NO ESTÁN EN LA MISMA DIAGONAL.");
            celdas[(x1*dimension+y1)].setAttribute("class","noEncontrado celda");
            celdas[(x2*dimension+y2)].setAttribute("class","noEncontrado celda");
        }
        setTimeout(()=>{
            if(celdas[(x1*dimension+y1)].getAttribute("data")=="true"){
                celdas[(x1*dimension+y1)].setAttribute("class","Encontrado celda");
            }
            else{
                if(celdas[(x1*dimension+y1)].getAttribute("data")=="false"){
                    celdas[(x1*dimension+y1)].setAttribute("class","noClicado celda");
                    celdas[(x1*dimension+y1)].setAttribute("data","null");
                }
            }
            if(celdas[(x2*dimension+y2)].getAttribute("data")=="true"){
                celdas[(x2*dimension+y2)].setAttribute("class","Encontrado celda");
            }
            else{
                if(celdas[(x2*dimension+y2)].getAttribute("data")=="false"){
                    celdas[(x2*dimension+y2)].setAttribute("class","noClicado celda");
                    celdas[(x2*dimension+y2)].setAttribute("data","null");
                }
            }
        },2000);
    }
}
function tdMouseMove(ev,dimension){
    var x1,y1,x2,y2,X,Y,coincide=false;
    const celdas=document.getElementsByClassName("celda");
    const sumaX=[1,1,0,-1,-1,-1,+0,+1];
    const sumaY=[0,1,1,+1,+0,-1,-1,-1];
    if(document.getElementsByClassName("clicado").length==1){
        console.log("--------------------TDMOUSEMOVE--------------------");
        X=x1;
        Y=y1;
        ev.target.setAttribute("value","PosActual");
        for(let c=0;c<celdas.length;c++){
            console.log("CELDAS.CLASS="+celdas[c].getAttribute("class"));
            if(celdas[c].getAttribute("class")=="clicado celda"){
                x1=c/dimension;
                if(x1<parseInt(x1)){
                    x1=Number(parseInt(x1))+1;
                }
                else{
                    x1=parseInt(x1);
                }
                y1=c-((x1)*dimension);
                console.log("X1="+x1+"|Y1="+y1);
            }
            else{
                if((celdas[c].getAttribute("class")!="clicado celda")){
                    if(celdas[c].getAttribute("data")=="true"){
                        celdas[c].setAttribute("class","Encontrado celda");
                    }
                    else{
                        celdas[c].setAttribute("class","noClicado celda");
                    }
                }
            }
            if(celdas[c].getAttribute("value")=="PosActual"){
                x2=c/dimension;
                if(x2<parseInt(x2)){
                    x2=Number(parseInt(x2))+1;
                }
                else{
                    x2=parseInt(x2);
                }
                y2=c-((x2)*dimension);
                console.log("X2="+x2+"|Y2="+y2);
                ev.target.setAttribute("value","null");
            }
        }
        if(!((x1==x2)&&(y1==y2))){
            if(mismaDiagonal(x1,x2,y1,y2)!=-1){
                X=x1+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                Y=y1+sumaY[mismaDiagonal(x1,x2,y1,y2)];
                coincide=false;
                if(celdas[(x1*dimension+y1)].getAttribute("data")=="true"){
                    coincide=true;
                    console.warn("1º-TRUE");
                }
                do{
                    if(celdas[(X*dimension+Y)].getAttribute("data")=="true"){
                        coincide=true;
                        console.warn("2º-TRUE");
                    }
                    celdas[(X*dimension+Y)].setAttribute("class","Marcar celda");
                    X=X+sumaX[mismaDiagonal(x1,x2,y1,y2)];
                    Y=Y+sumaY[mismaDiagonal(x1,x2,y1,y2)];
                }while((X!=(x2+sumaX[mismaDiagonal(x1,x2,y1,y2)]))||(Y!=(y2+sumaY[mismaDiagonal(x1,x2,y1,y2)])));
            }
            else{
                ev.target.setAttribute("class","Marcar celda");
            }
        }
        /*if(!coincide){
            for(let c=0;c<celdas.length;c++){
                if((celdas[c].getAttribute("data")=="true")&&(celdas[c].getAttribute("class")!="clicado celda")){
                    celdas[c].setAttribute("class","Encontrado celda");
                }
            }
        }*/
    }
}
function mismaDiagonal(x1,x2,y1,y2){
    const sumaX=[1,1,0,-1,-1,-1,+0,+1];
    const sumaY=[0,1,1,+1,+0,-1,-1,-1];
    const DIMENSION=Math.sqrt(document.getElementById("tabla2").getElementsByClassName("celda").length);
    var X,Y;
    for(let i=0;i<8;i++){
        X=x1;
        Y=y1;
        do{
            console.log("X="+X+"|X1="+x1+"|Y="+Y+"|Y1="+y1);
            if((X==x2)&&(Y==y2)){
                console.log("----------SALIDA V----------");
                return i;
            }
            X=X+sumaX[i];
            Y=Y+sumaY[i];
        }while((X>=0&&X<=(DIMENSION-1))&&(Y>=0&&Y<=(DIMENSION-1)));
    }
    console.log("----------SALIDA F----------");
    return -1;
}
export function escribirEstilos(dimension){
    var ancho=100/dimension;
    var alto=90/(dimension*3);
    document.writeln("<style>");
        document.writeln("*{");
            document.writeln("margin:0;");
            document.writeln("padding:0;");
        document.writeln("}");
        document.writeln("#tabla2{");
            document.writeln("width:100%;");
            document.writeln("height:90vh;");
            document.writeln("border-collapse:collapse;");
            document.writeln("& tr{");
                document.writeln("width:100%;");
                document.writeln("height:"+alto+"%;");
            document.writeln("}");
            document.writeln("& td{");
                document.writeln("width:"+ancho+"%;");
                document.writeln("height:"+alto+"%;");
                document.writeln("background-color:cornflowerblue;");
                document.writeln("border:1px solid black;");
                document.writeln("line-height:"+alto+";");
                document.writeln("text-align:center;");
                document.writeln("font-size:1.5rem;")
            document.writeln("}");
            document.writeln("& .borde{");
                document.writeln("border-bottom-left-radius:0px;");
            document.writeln("}");
        document.writeln("}");
        document.writeln("#tabla1{");
            document.writeln("width:100%;");
            document.writeln("height:10vh;");
            document.writeln("border-collapse:collapse;");
            document.writeln("& tr{");
                document.writeln("width:100%");
            document.writeln("}");
            document.writeln("& td{");
                document.writeln("width:25%;");
                document.writeln("background-color:aliceblue;");
                document.writeln("border:1px solid black;");
                document.writeln("text-align:center;");
                document.writeln("padding-top:10px;");
                document.writeln("padding-bottom:10px;");
            document.writeln("}");
        document.writeln("}");
    document.writeln("</style>");        
}
export function escribirPalabrasSinDOM(palabras){
    var pos2,cont,cuenta=1;
    document.writeln("<table id='tabla1'>");
        document.writeln("<tbody>");
            document.writeln("<tr>")
                document.writeln("<td class='Longuitud"+palabras[0].length+"'>");
                    document.writeln("<p class='Numero'>PALABRAS DE "+palabras[0].length+" LETRAS.</p>");
                    document.writeln("<p>"+cuenta+"-"+palabras[0]+"</p>");
                    cuenta=Number(cuenta)+1;
                    cont=1;
                for(const pos1 in palabras){
                    if(pos1!=(palabras.length-1)){
                        pos2=Number(pos1)+1;
                        if(palabras[pos2].length!=palabras[pos1].length){
                            cuenta=1;
                            document.writeln("</td>");
                            document.writeln("<td class='Longuitud"+palabras[pos2].length+"'>");
                                document.writeln("<p class='Numero'>PALABRAS DE "+palabras[pos2].length+" LETRAS.</p>");
                                document.writeln("<p>"+cuenta+"-"+palabras[pos2]+"</p>");
                            cont=Number(cont)+1;
                            cuenta=Number(cuenta)+1;
                        }
                        else{
                            document.writeln("<p>"+cuenta+"-"+palabras[pos2]+"</p>");
                            cuenta=Number(cuenta)+1;
                        }
                    }
                    if(cont==4){
                        document.writeln("</tr>");
                        document.writeln("<tr>")
                    }
                }
                document.writeln("</td>");
            document.writeln("</tr>");
        document.writeln("</tbody>");
    document.writeln("</table>");
}
export function escribirPalabrasConDOM(palabras){
    var pos2,cont,cuenta=1;
    const cuerpo=document.getElementById("Cuerpo");
    const tabla=document.createElement("table");
    tabla.setAttribute("id","tabla1");
    const tbody=document.createElement("tbody");
    var tr,td,p,span;
    cuerpo.appendChild(tabla);
    tabla.appendChild(tbody);
    tr=document.createElement("tr");
    tbody.appendChild(tr);
    td=document.createElement("td")
    td.setAttribute("class","Longitud"+palabras[0].length);
    tr.appendChild(td);
    span=document.createElement("span");
    span.setAttribute("class","Numero");
    span.textContent="PALABRAS DE "+palabras[0].length+" LETRAS.";
    td.appendChild(span);
    p=document.createElement("p");
    p.textContent=cuenta+"-"+palabras[0];
    td.appendChild(p);
    cuenta=Number(cuenta)+1;
    cont=1;
    for(const pos1 in palabras){
        if(pos1!=(palabras.length-1)){
            console.log("P-->"+palabras[pos1]);
            pos2=Number(pos1)+1;
            if(palabras[pos2].length!=palabras[pos1].length){
                cuenta=1;
                td=document.createElement("td");
                td.setAttribute("class","Longitud"+palabras[pos2].length);
                span=document.createElement("span");
                span.setAttribute("class","Numero");
                span.textContent="PALABRAS DE "+palabras[pos2].length+" LETRAS.";
                td.appendChild(span);
                cont=Number(cont)+1;
            }
            if(cont==5){
                tbody.appendChild(tr);
                tr=document.createElement("tr");
                cont=1;
            }
            p=document.createElement("p");
            p.textContent=cuenta+"-"+palabras[pos2];
            td.appendChild(p);
            tr.appendChild(td);
            cuenta=cuenta+1;
        }
    }
    tbody.appendChild(tr);
}