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
    'L' : {
        '-S': {
            'draw' : ['0#0','0#1','0#2','1#2'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['1#1','0#1','-1#1','-1#2'],
            'blocking' : {
                'd' : ['-2#1', '-2#2'], 'r' : ['1#2', '0#2', '-1#3'], 'l' : ['1#0', '0#0', '-1#0']
            },
            'largeRight' : 3,
            'largeLeft' : -1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '-D': {
            'draw' : ['0#0','0#1','0#2','-1#0'],
            'blocking' : {
                'd' : ['-2#0', '-1#1', '-1#2'], 'r' : ['0#3', '-1#1'], 'l' : ['0#-1', '-1#-1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '|S' : {
            'draw' : ['1#0','1#1','0#1','-1#1'],
            'blocking' : {
                'd' : ['0#0', '-2#1'], 'r' : ['1#2', '0#2', '-1#2'], 'l' : ['1#-1', '0#0', '-1#0']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        'start' : "-S",
        'color' : '#FFD700'
    },
    'J' : {
        '-S': {
            'draw' : ['0#0','0#1','0#2','1#0'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#1'], 'l' : ['0#-1', '1#-1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['1#1','1#2','0#1','-1#1'],
            'blocking' : {
                'd' : ['-2#1', '0#2'], 'r' : ['1#3', '0#2', '-1#2'], 'l' : ['1#0', '0#0', '-1#0']
            },
            'largeRight' : 3,
            'largeLeft' : -1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '-D': {
            'draw' : ['0#0','0#1','0#2','-1#2'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-2#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '-1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '|S' : {
            'draw' : ['-1#1','0#1','1#1','-1#0'],
            'blocking' : {
                'd' : ['-2#0', '-2#1'], 'r' : ['-1#2', '0#2', '-1#2'], 'l' : ['-1#-1', '0#0', '-1#0']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1},
            'start' : "-S",
            'color' : '#0000CD'
        },
    'O' : {
        '-S': {
            'draw' : ['0#0','0#1','1#0','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['0#0','0#1','1#0','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '-D': {
            'draw' : ['0#0','0#1','1#0','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|S' : {
            'draw' : ['0#0','0#1','1#0','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        'start' : "-S",
        'color' : '#FFFF00'
    },
    'I' : {
        '-S': {
            'draw' : ['0#0','0#1','0#2','0#3'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 4,
            'largeLeft' : 0,
            'shiftStartRow' : 0,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['1#2','0#2','-1#2','-2#2'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : -2,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 2
        },
        '-D': {
            'draw' : ['-1#0','-1#1','-1#2','-1#3'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 4,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '|S' : {
            'draw' : ['1#1','0#1','-1#1','-2#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : -1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 2
        },
        'start' : "-S",
        'color' : '#00BFFF'
    },
    'T' : {
        '-S': {
            'draw' : ['0#0','0#1','0#2','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['0#1','0#2','1#1','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : -1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '-D': {
            'draw' : ['0#0','0#1','0#2','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '|S' : {
            'draw' : ['0#0','0#1','1#1','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        'start' : "-S",
        'color' : '#FF00FF'
    },
    'S' : {
        '-S': {
            'draw' : ['0#0','0#1','1#1','1#2'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['-1#1','0#1','0#2','1#2'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : -1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '-D': {
            'draw' : ['0#1','0#2','-1#0','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 3,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|S' : {
            'draw' : ['1#0','0#0','0#1','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        'start' : "-S",
        'color' : '#32CD32'
    },
    'Z' : {
        '-S': {
            'draw' : ['0#0','0#1','1#0','1#-1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 0
        },
        '|G' : {
            'draw' : ['-1#-0','0#0','0#1','1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 0,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '-D': {
            'draw' : ['0#-1','0#0','-1#0','-1#1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 2,
            'largeLeft' : 1,
            'shiftStartRow' : 1,
            'shiftEndtRow' : 1
        },
        '|S' : {
            'draw' : ['0#0','1#0','0#-1','-1#-1'],
            'blocking' : {
                'd' : ['-1#0', '-1#1', '-1#2'], 'r' : ['0#3', '1#3'], 'l' : ['0#-1', '1#1']
            },
            'largeRight' : 1,
            'largeLeft' : 1,
            'shiftStartRow' : 2,
            'shiftEndtRow' : 1
        },
        'start' : "-S",
        'color' : '#FF6347'
    }
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
createBlock("J");
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
    block['blocking'] = (direction) => {
        if(direction!='d' && direction!='r' && direction!='l'){
            throw('ERROR: direction '+direction+' is not supported');
        }
       
        let ar =celsBlock[block.type][block.willing]['blocking'][direction];
        let stop=false;
        ar.forEach(e=>{
            e=e.split('#');

            const r = parseInt(block.row)+parseInt(e[0]);
            const c = parseInt(block.column)+parseInt(e[1]);
            const myDiv = document.getElementById('c'+r+'-'+c);

            if(myDiv==null){
                stop = true;
            }else{
                if(myDiv.style.backgroundColor!='white'){
                    stop=true;
                }
            }


        })
        return stop;
    }
}

function gameLoop() {
    if(block){
        if(block.blocking('d') && block.notFlash){
            block.notFlash=false;
            block.flash();
            timeoutIDs.push(setTimeout(() => {
                if(block.blocking('d')){
                    block=null;
                } else{
                    block.notFlash=true;
                }
            },700));
        }
        if(!block.blocking('d') && block.goingDown){
            block.goingDown=false;
            timeoutIDs.push(setTimeout(() => {
                if(!block.blocking('d')){
                    block.paint(true);
                    block.row--;
                    block.paint(false);
                }
                block.goingDown=true;
            },200));
        } else{
            if (rightPressed && block.right && !block.blocking('r')) {
                block.right=false;
                timeoutIDs.push(setTimeout(() => {
                    if(!block.blocking('r')){
                        block.paint(true);
                        block.column++
                        block.paint(false);
                    }
                    block.right=true;
                },150));
            }else{
                if (leftPressed && block.left && !block.blocking('l')) {
                    block.left=false;
                    timeoutIDs.push(setTimeout(() => {
                        if(!block.blocking('l')){
                            block.paint(true);
                            block.column--
                            block.paint(false);
                        }
                        block.left=true;
                    },150));
                }else{
                    if (jumpDownPressed && block.down && block.row-block.shiftEndtRow>0) {
                        block.down=false;
                        timeoutIDs.push(setTimeout(() => {
                            if(!block.blocking('d')){
                                block.paint(true);
                                block.row--;
                                if(!block.blocking('d')){
                                    block.row--;
                                }
                                block.paint(false);
                            }
                            block.down=true;
                        },50));
                    }else{
                        if (jumpUpPressed && block.up) {
                            block.up=false;
                            timeoutIDs.push(setTimeout(() => {
                                block.paint(true);
                                let oldWilling=block.willing;
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
        //createBlock(generateRandomBlock());
        createBlock('J');
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
            strGame+="<div class=\"cell\" id=\"c"+i+'-'+j+"\" style=\"background-color:white\"></div>";
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