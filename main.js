

function init() {
    disegnaGriglia();
   numeroCol.addEventListener("change", disegnaGriglia);
}

// Logica di gioco (movimento, rotazione, collisioni, ecc.)
function gameLoop() {
    // Gestisci gli input utente
    // Aggiorna la posizione dei blocchi
    // Controlla le collisioni
    // Aggiorna l'interfaccia utente
}

// Funzione di avvio del gioco
function startGame() {
    // Inizia il loop di gioco
    // Gestisci gli eventi del gioco (ad es. tasti freccia)
}

// Inizializza il gioco quando la pagina è completamente caricata
window.onload = function () {
    init();
    startGame();
};


function disegnaGriglia(){
    const gameContaine = document.getElementById('game-container');
    const numeroCol = document.getElementById("numeroCol");
    if(!numeroCol.value){
        numeroCol.value=20;
    }
    gameContaine.style.gridTemplateColumns = "repeat("+numeroCol.value+", 30px)";
   
}
