const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let clicked = false;
const filas = 6;
const columnas = 7;
const anchoTablero=747;
const altoTablero=714;
const margen=0;
tablero= new Tablero(canvas,ctx,filas,columnas,margen,anchoTablero,altoTablero);
var j1 = new Jugador('j1');
var j2 = new Jugador('j2');
var jugadorActual = j1;
var fichaActual;

setTimeout(function(){ j1.pintar(jugadorActual.getNombre()); }, 2000);// cargarn la primera ficha, por un bug del onload
setTimeout(function(){ j2.pintar(jugadorActual.getNombre()); }, 2000);// cargarn la primera ficha, por un bug del onload

canvas.onmousemove = function (e){
  // console.log('X: '+(e.clientX-canvas.getBoundingClientRect().left)+"| Y: "+(e.clientY-canvas.getBoundingClientRect().top));
  if (clicked) {
    var x = e.clientX - canvas.getBoundingClientRect().left;
    var y = e.clientY - canvas.getBoundingClientRect().top;


    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujar();
    fichaActual.dibujar(ctx,x,y);
    j1.pintar(jugadorActual.getNombre());
    j2.pintar(jugadorActual.getNombre());
  }
}
canvas.onmousedown = function(e){
  //console.log(e.clientX);
  if (canGetFicha(jugadorActual.getNombre(),(e.clientX-canvas.getBoundingClientRect().left),(e.clientY - canvas.getBoundingClientRect().top))) {
    // console.log(jugadorActual.getCantFichas());
    clicked = true;
    fichaActual = jugadorActual.getFicha();
  }
}
canvas.onmouseup = function(e){
  if(clicked){
    if (tablero.add((e.clientX - canvas.getBoundingClientRect().left),fichaActual)) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      j1.pintar(jugadorActual.getNombre());
      j2.pintar(jugadorActual.getNombre());
      clicked = false;
      var ganador = tablero.gane(fichaActual);
      if (ganador.length == 4){// retorna un arreglo con las fichas ganadoras, o uno vacio
        for (var i = 0; i < ganador.length; i++) {
          ganador[i].ganadora();
        }
        // var ganador = document.getElementById("ganador");
        // ganador.innerHTML += (jugadorActual.getNombre() == "j1" ? 1 : 2);
        // ganador.style.display = "block"; deje estas lineas comentadas para hacer pruebas mientras no tengamos un elemento html de id ganador
        setTimeout(function(){ location.reload() }, 3000);
      }
      fichaActual = null;
      j1 = [j2, j2=j1][0];//toggle entre jugadores
      jugadorActual = j1;
      //jugadorActual.setTitulo();
    }
    tablero.dibujar();
  }
}

function canGetFicha(jugador,x,y){
  if (jugador == 'j1') {
    if (x<200&&y<200) {
      return true;
    }else{
      return false;
    }
  }else if (jugador == 'j2') {
    if (x>800&&y<200) {
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
