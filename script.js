const codigo = [1, 3, 5, 7, 9];
const maxIntentos = 8;
var turnos = 0;

var input = document.getElementById("userNum");

input.addEventListener("keypress", function(event){
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("check").click();
  }
});

function generarCodigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
    console.log(codigo);
}
generarCodigoSecreto();


//He tenido que poner el final del juego dentro del if
//en vez de fuera en un else ya que al pedir primero el número
//y luego ejecutar la función comprobar, si lo dejaba como else
//me pedía el número aún habiendo acabado ya la partida y ese número
//no servía para nada, es decir, ni te lo printaba ni te decía
//que habías ganado si metías el código correcto.
//El hacer esto, hace que funcione pero causa un error que
//se puede ver en la consola.
function comprobar(){
    turnos++;
    if (turnos <= maxIntentos){
        document.getElementById("userNum").focus();
        let hasWin = comprobarResultado();

        if (hasWin == true){
            endGame(true);
        }
        if (turnos >= maxIntentos){
            endGame(false);
        }
    } 
}

function comprobarResultado(){
    var userNum = getUserNum();

    if (userNum.length != codigo.length){
        userNum = wrongInput(userNum);
    }

    //intenté hacer algo aquí para comprobar que no se metiese 
    //ninguna letra pero no se porque en el pc de classe al hacer
    //parseInt() de una letra no lo pasa a number y aquí en casa sí.
    /*
    for (let i = 0; i < 5; i++) {
        if (parseInt(userNum[i]) != "number"){
            userNum = wrongInput(userNum);
            break;
        }       
    }
    */

    let fraseInfo = document.getElementById("info");
    fraseInfo.innerHTML = "Intento número " + (turnos+1) + ".";

    const raiz = document.getElementById("Result");
    let rowResult = document.createElement("div");
    rowResult.setAttribute('class', 'rowResult w100 flex wrap');

    var totalCorrect = 0

    for(j = 0; j <= codigo.length-1; j++){

        let w20div = document.createElement("div");
        w20div.setAttribute('class', 'w20');
        
        let celResult = document.createElement("div");
        celResult.innerHTML = userNum[j];

        if(userNum[j] == codigo[j]){
            totalCorrect++;
            celResult.setAttribute('class', 'celResult flex correctCel');
        } else if(codigo.includes(parseInt(userNum[j])) && codigo[j] != userNum[j]){
            celResult.setAttribute('class', 'celResult flex existingCel');
        } else{
            celResult.setAttribute('class', 'celResult flex');
        }       

        rowResult.appendChild(w20div);
        w20div.appendChild(celResult);
    }
    raiz.appendChild(rowResult);
    document.getElementById('userNum').value = "";

    if (totalCorrect == codigo.length){
        return true;
    } else{
        return false;
    }
}

function getUserNum(){
    let userNum = document.getElementById("userNum").value;
    return userNum
}

function wrongInput(userNum){
    alert(userNum + ": No és válido. Por favor, introduce un número de "+ codigo.length + " cifras.");
    userNum = ["-", "-", "-", "-", "-"];
    turnos--;
    return userNum;
}

function endGame(hasWin){
    document.getElementById("comprobar").remove();
    const raiz = document.getElementsByClassName("cel");
    for (i = 0; i < codigo.length; i++){
        raiz[i].innerHTML = codigo[i];
    }
    
    let fraseInfo = document.getElementById("info");
    if (hasWin == true){
        let sectionInfo = document.getElementsByClassName("info");

        for (i = 0; i < sectionInfo.length; i++){
            sectionInfo[i].setAttribute('class', 'correctCel info');
        }
        fraseInfo.innerHTML = "Muy bien! Has acertado todas en " + turnos + " intentos!";
    } else{
        fraseInfo.innerHTML = "Lo siento, has perdido:(";
    }
}
