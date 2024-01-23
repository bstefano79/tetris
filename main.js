let row=22;
let col=7;
let scendo = true;
let destra = true;
let sinistra = true;
let giu=true;
let su=true;

let rightPressed = false;
let leftPressed = false;
let jumpUpPressed = false;
let jumpDownPressed = false;

const gameContaine = document.getElementById('game-container');
const numeroCol = document.getElementById("numeroCol");

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "ArrowUp") {
        jumpUpPressed = true;
    } else if (e.key === "ArrowDown") {
        jumpDownPressed = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "ArrowUp") {
        jumpUpPressed = false;
    } else if (e.key === "ArrowDown") {
        jumpDownPressed = false;
    }
});

const celleBlocchi = {
    'L' : {'|S' : {'draw' : ['0#0','1#0','2#0','2#-1'], 'largeRight' : 1, 'largeLeft' : 1}, '|G' : {'draw' : ['0#0','0#1','1#0','2#0'], 'largeRight' : 2, 'largeLeft' : 0}, '-S': {'draw' : ['0#0','0#1','0#2','1#2'], 'largeRight' : 3, 'largeLeft' : 0}, '-D': {'draw' : ['0#0','1#0','1#1','1#2'], 'largeRight' : 3, 'largeLeft' : 0}}
}

const rotate = {
    '|S' : '-D',
    '-D' : '|G',
    '|G' : '-S',
    '-S' : '|S'
}

function init() {
    disegnaGriglia();
    numeroCol.addEventListener("change", resetDisegnaGriglia);
}

let oggetto = {};
oggetto['tipo']="L";
oggetto['posizione']="|G";

function gameLoop() {
    
    let largeRight=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeRight'];
    let largeLeft=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeLeft'];

    if(row>0 && scendo){
        scendo=false;
        setTimeout(() => {
            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"white"); 
            row--
            if(row<0) row=0; 
            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");
            scendo=true;
        },1000);
    } else{
        if (rightPressed && destra && col<numeroCol.value-largeRight) {
            destra=false;
            setTimeout(() => {
                disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"white");
                col++
                disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");
                destra=true;
            },150);
        }else{
            if (leftPressed && sinistra && col-largeLeft>0) {
                sinistra=false;
                setTimeout(() => {
                    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"white");
                    col--
                    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");
                    sinistra=true;
                },150);
            }else{
                if (jumpDownPressed && giu && row>0) {
                    giu=false;
                    setTimeout(() => {
                        disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"white");
                        row-=2
                        if(row<0) row=0;
                        disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");
                        giu=true;
                    },50);
                }else{
                    if (jumpUpPressed && su) {
                        su=false;
                        setTimeout(() => {
                            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"white");
                            oggetto['posizione']=rotate[oggetto['posizione']];
                            largeRight=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeRight'];
                            largeLeft=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeLeft'];
                            if(col-largeLeft<0){
                                col=largeLeft;
                            }
                            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");
                            su=true;
                        },200);
                    }
                }
            }
        }
    }
    requestAnimationFrame(gameLoop);
}

window.onload = function () {
    init();
};

function stampaOra(){
    const dataAttuale = new Date();

    let ore = dataAttuale.getHours();
    let minuti = dataAttuale.getMinutes();
    let secondi = dataAttuale.getSeconds();
    let millisecondi = dataAttuale.getMilliseconds();
 
    if (ore < 10) ore = '0' + ore;
    if (minuti < 10) minuti = '0' + minuti;
    if (secondi < 10) secondi = '0' + secondi;
    if (millisecondi < 10) millisecondi = '00' + millisecondi;
    else if (millisecondi < 100) millisecondi = '0' + millisecondi;

    const oraAttuale = ore + ':' + minuti + ':' + secondi + '.' + millisecondi;

    console.log(oraAttuale);
}

function disegnaOggetto(tipo, disposizione, cellaDiPartenza, colore){
    let ar = celleBlocchi[tipo][disposizione]['draw'];
    cella = cellaDiPartenza.split('#');
    ar.forEach(e=>{
        e=e.split('#');
        r=parseInt(cella[0])+parseInt(e[0]);
        c=parseInt(cella[1])+parseInt(e[1]);
        document.getElementById("c"+r+"-"+c).style.backgroundColor=colore;
    })
}

function resetDisegnaGriglia(){
    row=22;
    col=7;
    disegnaGriglia()
}

function disegnaGriglia(){
    if(!numeroCol.value){
        numeroCol.value=20;
    }else if(numeroCol.value<10){
        numeroCol.value=10;
    }else if(numeroCol.value>30){
        numeroCol.value=30;
    }

    let strGame="";
    for(let i=24;i>=0;i--){
        strGame+="<span class=\"row"+i+"\">";
        for(let j=0;j<numeroCol.value;j++){
            strGame+="<div class=\"cell\" id=\"c"+i+'-'+j+"\"></div>";
        }
       strGame+="</span>";
    }
    gameContaine.innerHTML=strGame;

    const el = gameContaine.getElementsByTagName("span");
    Array.prototype.forEach.call(el, function(element) {
       element.style.gridTemplateColumns = "repeat("+numeroCol.value+", 30px)";
    });

    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+row+"#"+col,"red");

    gameLoop();
}