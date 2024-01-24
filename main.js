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

let row=24;
let col=7;

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
    'L' : {'|S' : {'draw' : ['0#0','1#0','2#0','2#-1'], 'largeRight' : 1, 'largeLeft' : 1, 'shiftStartRow' : 2}, '|G' : {'draw' : ['0#0','0#1','1#0','2#0'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 2}, '-S': {'draw' : ['0#0','0#1','0#2','1#2'], 'largeRight' : 3, 'largeLeft' : 0, 'shiftStartRow' : 1}, '-D': {'draw' : ['0#0','1#0','1#1','1#2'], 'largeRight' : 3, 'largeLeft' : 0, 'shiftStartRow' : 1}, 'partenza' : "-S"}
}

const rotate = {
    '|S' : '-S',
    '-S' : '|G',
    '|G' : '-D',
    '-D' : '|S'
}

function init() {
    disegnaGriglia();
    numeroCol.addEventListener("change", resetDisegnaGriglia);
}

let timeoutIDs = [];

let oggetto = {};
oggetto['tipo'] = "L";
oggetto['posizione'] = celleBlocchi[oggetto['tipo']]['partenza'];
oggetto['shiftStartRow'] = celleBlocchi[oggetto['tipo']][oggetto.posizione].shiftStartRow;
oggetto['row'] = row-oggetto['shiftStartRow'];
oggetto['col'] = 7;
oggetto['scendo'] = true;
oggetto['destra'] = true;
oggetto['sinistra'] = true;
oggetto['giu'] = true;
oggetto['su'] = true;
oggetto['largeRight']=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeRight'];
oggetto['largeLeft']=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeLeft'];

function gameLoop() {
    if(oggetto.row>0 && oggetto.scendo){
        oggetto.scendo=false;
        timeoutIDs.push(setTimeout(() => {
            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"white"); 
            oggetto.row--
            if(oggetto.row<0) oggetto.row=0; 
            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"red");
            oggetto.scendo=true;
        },1000));
    } else{
        if (rightPressed && oggetto.destra && oggetto.col<numeroCol.value-oggetto.largeRight) {
            oggetto.destra=false;
            timeoutIDs.push(setTimeout(() => {
                disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"white");
                oggetto.col++
                disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"red");
                oggetto.destra=true;
            },150));
        }else{
            if (leftPressed && oggetto.sinistra && oggetto.col-oggetto.largeLeft>0) {
                oggetto.sinistra=false;
                timeoutIDs.push(setTimeout(() => {
                    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"white");
                    oggetto.col--
                    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"red");
                    oggetto.sinistra=true;
                },150));
            }else{
                if (jumpDownPressed && oggetto.giu && oggetto.row>0) {
                    oggetto.giu=false;
                    timeoutIDs.push(setTimeout(() => {
                        disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"white");
                        oggetto.row-=2
                        if(oggetto.row<0) oggetto.row=0;
                        disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"red");
                        oggetto.giu=true;
                    },50));
                }else{
                    if (jumpUpPressed && oggetto.su) {
                        oggetto.su=false;
                        timeoutIDs.push(setTimeout(() => {
                            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"white");
                            oggetto.posizione=rotate[oggetto.posizione];
                            oggetto['shiftStartRow'] = celleBlocchi[oggetto['tipo']][oggetto.posizione].shiftStartRow;
                            oggetto.largeRight=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeRight'];
                            oggetto.largeLeft=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeLeft'];
                            if(oggetto.col-oggetto.largeLeft<0){
                                oggetto.col=oggetto.largeLeft;
                            } else if(oggetto.col>numeroCol.value-oggetto.largeRight){
                                oggetto.col=numeroCol.value-oggetto.largeRight;
                            }
                        
                            if(oggetto.row+oggetto.shiftStartRow>row){
                                oggetto.row=row-oggetto.shiftStartRow;
                            }
                        
                            disegnaOggetto(oggetto.tipo,oggetto.posizione,''+oggetto.row+"#"+oggetto.col,"red");
                            oggetto.su=true;
                        },200));
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
    timeoutIDs.forEach(id => clearTimeout(id));
    oggetto['tipo'] = "L";
    oggetto['posizione'] = celleBlocchi[oggetto['tipo']]['partenza'];
    oggetto['shiftStartRow'] = celleBlocchi[oggetto['tipo']][oggetto.posizione].shiftStartRow;
    oggetto['row'] = row-oggetto['shiftStartRow'];
    oggetto['col'] = 7;
    oggetto['scendo'] = true;
    oggetto['destra'] = true;
    oggetto['sinistra'] = true;
    oggetto['giu'] = true;
    oggetto['su'] = true;
    oggetto['largeRight']=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeRight'];
    oggetto['largeLeft']=celleBlocchi[oggetto.tipo][oggetto.posizione]['largeLeft'];
    disegnaGriglia();
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
    for(let i=row;i>=0;i--){
        strGame+="<span class=\"row"+i+"\">";
        for(let j=0;j<numeroCol.value;j++){
            strGame+="<div class=\"cell\" id=\"c"+i+'-'+j+"\"></div>";
        }
       strGame+="</span>";
    }
    gameContaine.innerHTML=strGame;

    const el = gameContaine.getElementsByTagName("span");
    Array.prototype.forEach.call(el, function(element) {
       element.style.gridTemplateColumns = "repeat("+numeroCol.value+", 25px)";
    });

    let rowPezzo = row-oggetto['shiftStartRow'];
    disegnaOggetto(oggetto.tipo,oggetto.posizione,''+rowPezzo+"#"+col,"red");

    gameLoop();
}