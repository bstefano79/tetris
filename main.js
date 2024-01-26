let rightPressed = false;
let leftPressed = false;
let jumpUpPressed = false;
let jumpDownPressed = false;

const gameContaine = document.getElementById('game-container');
const numeroCol = document.getElementById("numeroCol");

let row=24;

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

const celsBlock = {
    'L' : {'-S': {'draw' : ['0#-1','0#0','0#1','1#1'], 'largeRight' : 2, 'largeLeft' : 1, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|G' : {'draw' : ['1#0','0#0','-1#0','-1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 1}, '-D': {'draw' : ['-1#-1','0#-1','0#0','0#1'], 'largeRight' : 2, 'largeLeft' : 1, 'shiftStartRow' : 1, 'shiftEndtRow' : 1}, '|S' : {'draw' : ['-1#0','0#0','1#0','1#-1'], 'largeRight' : 1, 'largeLeft' : 1, 'shiftStartRow' : 1, 'shiftEndtRow' : 1}, 'start' : "-S", 'color' : '#FFD700'},
    'O' : {'-S': {'draw' : ['0#0','0#1','1#0','1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|G' : {'draw' : ['0#0','0#1','1#0','1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '-D': {'draw' : ['0#0','0#1','1#0','1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|S' : {'draw' : ['0#0','0#1','1#0','1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, 'start' : "-S", 'color' : '#FFFF00'},
    'S' : {'-S': {'draw' : ['0#0','0#1','1#1','1#2'], 'largeRight' : 3, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|G' : {'draw' : ['-1#2','0#2','0#1','1#1'], 'largeRight' : 3, 'largeLeft' : -1, 'shiftStartRow' : 2, 'shiftEndtRow' : 1}, '-D': {'draw' : ['0#0','0#1','1#1','1#2'], 'largeRight' : 3, 'largeLeft' : 0, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|S' : {'draw' : ['-1#1','0#1','0#0','1#0'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 2, 'shiftEndtRow' : 1}, 'start' : "-S", 'color' : '#32CD32'},
    'Z' : {'-S': {'draw' : ['0#0','0#1','1#0','1#-1'], 'largeRight' : 2, 'largeLeft' : 1, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|G' : {'draw' : ['-1#-1','0#-1','0#0','1#0'], 'largeRight' : 1, 'largeLeft' : 1, 'shiftStartRow' : 2, 'shiftEndtRow' : 1}, '-D': {'draw' : ['0#0','0#1','1#0','1#-1'], 'largeRight' : 2, 'largeLeft' : 1, 'shiftStartRow' : 1, 'shiftEndtRow' : 0}, '|S' : {'draw' : ['-1#0','0#0','0#1','1#1'], 'largeRight' : 2, 'largeLeft' : 0, 'shiftStartRow' : 2, 'shiftEndtRow' : 1}, 'start' : "-S", 'color' : '#FF6347'}
}

const rotate = {
    '-S' : '|G',
    '|G' : '-D',
    '-D' : '|S',
    '|S' : '-S'
}

function init() {
    disegnaGriglia();
    numeroCol.addEventListener("change", resetDisegnaGriglia);
}

let timeoutIDs = [];

let block = {};
createBlock("L");
function createBlock(type){
    block = {};
    block['type'] = type;
    block['willing'] = celsBlock[block['type']]['start'];
    block['shiftStartRow'] = celsBlock[block['type']][block.willing].shiftStartRow;
    block['shiftEndtRow'] = celsBlock[block['type']][block.willing].shiftEndtRow;
    block['row'] = row-block['shiftStartRow'];
    block['column'] = 7;
    block['goingDown'] = true;
    block['right'] = true;
    block['left'] = true;
    block['down'] = true;
    block['up'] = true;
    block['notFlash']=true;
    block['color'] = celsBlock[block['type']].color;
    block['largeRight']=celsBlock[block.type][block.willing]['largeRight'];
    block['largeLeft']=celsBlock[block.type][block.willing]['largeLeft'];
    block['flash'] = () => {
        let ar = celsBlock[block.type][block.willing]['draw'];
        cella = [block.row,block.column]
        ar.forEach(e=>{
            e=e.split('#');
            
            const r = parseInt(block.row)+parseInt(e[0]);
            const c = parseInt(block.column)+parseInt(e[1]);
            const myDiv = document.getElementById('c'+r+'-'+c);
            myDiv.classList.add('flash-div');
            myDiv.style.animation = 'flash 0.5s ease-in-out';

            var styleSheet = document.styleSheets[0];
            styleSheet.insertRule('@keyframes flash { 0%, 100% { background-color: initial; } 50% { background-color: '+block.color+'; } }', styleSheet.cssRules.length);   
        })
    }
    block['paint'] = (del) => {
        let ar = celsBlock[block.type][block.willing]['draw'];
        const color = del?'white':block.color;
        ar.forEach(e=>{
            e=e.split('#');
            r=parseInt(block.row)+parseInt(e[0]);
            c=parseInt(block.column)+parseInt(e[1]);
            document.getElementById("c"+r+"-"+c).style.backgroundColor=color;
        })
    }
}

function gameLoop() {
    if(block){
        if(block.row-block.shiftEndtRow<=0 && block.notFlash){
            block.notFlash=false;
            block.flash();
            timeoutIDs.push(setTimeout(() => {
                block=null;
            },700));
        }
        if(block.row-block.shiftEndtRow>0 && block.goingDown){
            block.goingDown=false;
            timeoutIDs.push(setTimeout(() => {
                block.paint(true);
                block.row--
                if(block.row-block.shiftEndtRow<0) block.row=block.shiftEndtRow;
                block.paint(false);
                block.goingDown=true;
            },10000));
        } else{
            if (rightPressed && block.right && block.column<numeroCol.value-block.largeRight) {
                block.right=false;
                timeoutIDs.push(setTimeout(() => {
                    block.paint(true);
                    block.column++
                    block.paint(false);
                    block.right=true;
                },150));
            }else{
                if (leftPressed && block.left && block.column-block.largeLeft>0) {
                    block.left=false;
                    timeoutIDs.push(setTimeout(() => {
                        block.paint(true);
                        block.column--
                        block.paint(false);
                        block.left=true;
                    },150));
                }else{
                    if (jumpDownPressed && block.down && block.row-block.shiftEndtRow>0) {
                        block.down=false;
                        timeoutIDs.push(setTimeout(() => {
                            block.paint(true);
                            block.row-=2
                            if(block.row-block.shiftEndtRow<0) block.row=block.shiftEndtRow;
                            block.paint(false);
                            block.down=true;
                        },50));
                    }else{
                        if (jumpUpPressed && block.up) {
                            block.up=false;
                            timeoutIDs.push(setTimeout(() => {
                                block.paint(true);
                                block.willing=rotate[block.willing];
                                block['shiftStartRow'] = celsBlock[block['type']][block.willing].shiftStartRow;
                                block['shiftEndtRow'] = celsBlock[block['type']][block.willing].shiftEndtRow;
                                block.largeRight=celsBlock[block.type][block.willing]['largeRight'];
                                block.largeLeft=celsBlock[block.type][block.willing]['largeLeft'];
                                if(block.column-block.largeLeft<0){
                                    block.column=block.largeLeft;
                                } else if(block.column>numeroCol.value-block.largeRight){
                                    block.column=numeroCol.value-block.largeRight;
                                }
                            
                                if(block.row+block.shiftStartRow>row){
                                    block.row=row-block.shiftStartRow;
                                }

                                block.paint(false);
                                block.up=true;
                            },200));
                        }
                    }
                }
            }
        }
    }else{
        timeoutIDs.forEach(id => clearTimeout(id));
        createBlock(generateRandomBlock());
        block.paint(false);
    }
    requestAnimationFrame(gameLoop);
}

function generateRandomBlock(){
    const keys = Object.keys(celsBlock);
    return keys[Math.floor(Math.random() * keys.length)];
}

window.onload = function () {
    init();
};

function printDate(){
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ms = now.getMilliseconds();
 
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '00' + ms;
    else if (ms < 100) ms = '0' + ms;

    const nowHr = h + ':' + m + ':' + s + '.' + ms;

    console.log(nowHr);
}

function resetDisegnaGriglia(){
    timeoutIDs.forEach(id => clearTimeout(id));
    createBlock(generateRandomBlock());
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

    block.paint(false);

    gameLoop();
}