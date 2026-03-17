function crearLogo(dimension){
    try{
        if(isNaN(Number(dimension))){
            throw new Error("El parametro dimensión tiene que ser un número o un String que contenga únicamente caracteres numéricos.");
        }
        const cuerpo=document.getElementById("Cuerpo");
        const canvas=document.createElement("canvas");
        const ctx=canvas.getContext("2d");
        canvas.width=dimension;
        canvas.height=dimension;
        canvas.style.border="1px solid black";
        ctx.beginPath();
            ctx.arc((dimension/2),((dimension*3)/5),(dimension/4),0,2*Math.PI,true);
            ctx.fillStyle="lightgray";
            ctx.fill();
        ctx.closePath();
        ctx.beginPath();
            ctx.arc((dimension/2),((dimension*3)/5),((dimension/4)*0.75),0,2*Math.PI,true);
            ctx.fillStyle="orange";
            ctx.fill();
        ctx.closePath();
        ctx.beginPath();
            ctx.moveTo((9*(dimension/10)),(3*(dimension/10)));
            ctx.lineTo((9*(dimension/10)),(dimension/10));
            ctx.lineTo((dimension/2),(3*(dimension/20)));
            ctx.lineTo((dimension/2),(dimension/4));
            ctx.lineTo((9*(dimension/10)),(3*(dimension/10)));
            ctx.fillStyle="lightgray";
            ctx.strokeStyle="lightgray";
            ctx.fill();
        ctx.closePath();
        ctx.moveTo(100,40);
        dibujarOvoide(ctx,dimension,dimension,150,200,"lightgray");
        // ctx.ellipse(50,40,80,50,90,0,180,true);
        ctx.fill();
        cuerpo.appendChild(canvas);
    }
    catch(Error){
        console.error(Error);
    }
}
function dibujarOvoide(ctx,X,Y,ancho,alto,color){
    ctx.beginPath();
    ctx.moveTo(X,(Y+alto));
    ctx.bezierCurveTo((X-(ancho/2)),(Y+(alto/2)),(X-(ancho/4)),Y,X,Y);
    ctx.bezierCurveTo(((X+ancho)/4),Y,(X+(ancho/2)),(Y+(alto/2)),X,Y+alto);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.stroke();
}
crearLogo(600);