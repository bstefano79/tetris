
const celleBlocchi = {
    'L' : {'|S' : {}, '|G' : [{'r' : 0, 'c' : 0}], '-S': {}, '-D': {}}
}



function init() {
    disegnaGriglia();
    numeroCol.addEventListener("change", disegnaGriglia);
}


function gameLoop() {
    
}


function startGame() {
    
}


window.onload = function () {
    init();
    startGame();
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


function disegnaGriglia(){
   // console.log("inizio");
   // stampaOra();
    const gameContaine = document.getElementById('game-container');
    const numeroCol = document.getElementById("numeroCol");
    if(!numeroCol.value){
        numeroCol.value=20;
    }else if(numeroCol.value<10){
        numeroCol.value=10;
    }else if(numeroCol.value>30){
        numeroCol.value=30;
    }
   
    //gameContaine.style.gridTemplateColumns = "repeat("+numeroCol.value+", 30px)";

    let strGame="";
    for(let i=0;i<25;i++){
        strGame+="<span class=\"row"+i+"\">";
        for(let j=0;j<numeroCol.value;j++){
            strGame+="<div class=\"cell\" id=\"c"+i+''+j+"\"></div>";
        }
       strGame+="</span>";
    }
    gameContaine.innerHTML=strGame;

    const el = gameContaine.getElementsByTagName("span");
    Array.prototype.forEach.call(el, function(element) {
       element.style.gridTemplateColumns = "repeat("+numeroCol.value+", 30px)";
    });

    //console.log("fine");
    //stampaOra();
   
}
