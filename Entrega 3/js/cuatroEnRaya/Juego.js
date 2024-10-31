const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let clicked;
let filas;
let columnas;
let cantFichasGan;
let tablero;
let j1;
let j2;
let jugadorActual;
let fichaActual;
let containerMenu=document.getElementById("menu-container");


document.querySelectorAll(".btn-jugar").forEach(e=> {
  let menu;
    console.log("inicio");
    menu=document.getElementById("inicio");
    e.addEventListener("click", function(){
      menu.style.opacity="0";
      containerMenu.style.opacity="0";
      setTimeout(() => {
        menu.style.display="none";
        containerMenu.style.display="none";
      }, 400);

      let j1Avatar=document.querySelector(".jugador1.selected").src;
      let j2Avatar=document.querySelector(".jugador2.selected").src;
      iniciarJuego(6,7,4, j1Avatar, j2Avatar);

      document.getElementById("final-menu").innerHTML="";
      document.getElementById("final-menu").innerHTML=`<div class="menu-juego" id="final">
      <h1>Juego terminado!</h1>
      <div class="info-ganador">
          <h2>Jugador ganador: </h2>
          <h2 id="ganador"></h2>
      </div>
      <h1 class="btn-jugar">Jugar de nuevo</h1>
      </div>`;
      document.getElementById("final").addEventListener("click", function(){
        console.log("se reinicio");
            iniciarJuego(6,7,4);
            
            setTimeout(()=>{
              menu=document.getElementById("inicio");
              menu.style.opacity="1";
              menu.style.display="flex";
               document.getElementById("final-menu").innerHTML="";
            }, 400)
      });
    })

  }
)

//onmousemove indica que sucede cuando el mouse está en movimiento
canvas.onmousemove = function (e){
  // console.log('X: '+(e.clientX-canvas.getBoundingClientRect().left)+"| Y: "+(e.clientY-canvas.getBoundingClientRect().top));
  if (clicked) {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujar();
    fichaActual.dibujar(ctx,x,y);
    j1.pintar(jugadorActual.getNombre());
    j2.pintar(jugadorActual.getNombre());
  }
}

//onmousedown indica que sucede una vez se presiona el click
canvas.onmousedown = function(e){
  //console.log(e.clientX);
  if (canGetFicha(jugadorActual.getNombre(),(e.clientX-canvas.getBoundingClientRect().left),(e.clientY - canvas.getBoundingClientRect().top))) {
    // console.log(jugadorActual.getCantFichas());
    clicked = true;
    fichaActual = jugadorActual.getFicha();
  }
  
}


function caidaDeFicha(ficha, x) {
  let y = 0;
  let dy = 2;
  function animar() {
      let rectHeight= 0.8 * this.canvas.height;
      //borro todo para que no se vea la ficha anterior
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       // dibujo el tablero nuevamente
      tablero.dibujar();
      // Dibujar la ficha en la nueva posición
      ficha.dibujar(ctx, x, y);
      //vuelvo a dibujar las fichas de los jugadores
      j1.pintar(jugadorActual.getNombre());
      j2.pintar(jugadorActual.getNombre());
      // Actualizar la posición
      y += dy;
      // Si la ficha no ha llegado al suelo, solicitar el siguiente frame
      if (y < rectHeight+40) {
          requestAnimationFrame(animar);
      } else {
        // si la ficha ya llego al final, borro el tablero y lo dibujo nuevamente
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // dibujo el tablero nuevamente
        tablero.dibujar();
        //vuelvo a dibujar las fichas de los jugadores
        j1.pintar(jugadorActual.getNombre());
        j2.pintar(jugadorActual.getNombre());
      } 
  }
 
  animar();
}
//onmouseup indica que sucede cuando levantamos el click
canvas.onmouseup = function(e){
  
  if(clicked){
    caidaDeFicha(fichaActual,  e.clientX-canvas.getBoundingClientRect().left);
    setTimeout(() => {
      if (tablero.add((e.clientX - canvas.getBoundingClientRect().left),fichaActual)) {  
     

        ctx.clearRect(0,0,canvas.width,canvas.height);
        j1.pintar(jugadorActual.getNombre());
        j2.pintar(jugadorActual.getNombre());
        clicked = false;
        let ganador = tablero.gane(fichaActual,e.clientX - canvas.getBoundingClientRect().left );
        if (ganador.length == cantFichasGan){// retorna un arreglo con las fichas ganadoras, o uno vacio
          for (let i = 0; i < ganador.length; i++) {
            ganador[i].ganadora();
          }
  
          mostrarGanador(fichaActual.jugador);
        }
        fichaActual = null;
        j1 = [j2, j2=j1][0];//toggle entre jugadores
        jugadorActual = j1;
        //jugadorActual.setTitulo();
      }
    }, 4500 );
    tablero.dibujar();
  }
}

function canGetFicha(jugador,x,y){
  if (jugador == 'Jugador 1') {
    if (x<200&&y<200) {
      return true;
    }else{
      return false;
    }
  }else if (jugador == 'Jugador 2') {
    if (x>800&&y<200) {
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
  
}

function mostrarGanador(ganador){
  setTimeout(() => {
    let menu=document.getElementById("final")
    document.getElementById("ganador").innerText=ganador;
    menu.style.display="flex";
    menu.style.opacity="1";
    containerMenu.style.opacity="1";
    containerMenu.style.display="flex";
  }, 1000);
}

function iniciarJuego(filas, columnas, tipo, avatar1, avatar2){
  clicked = false;
  filas = filas;
  columnas = columnas;
  cantFichasGan=tipo;
  tablero= new Tablero(canvas,ctx,filas,columnas, cantFichasGan);
  j1 = new Jugador('Jugador 1', avatar1);
  j2 = new Jugador('Jugador 2', avatar2);
  jugadorActual = j1;
  fichaActual="";

  setTimeout(function(){ j1.pintar(jugadorActual.getNombre()); }, 400);// cargarn la primera ficha, por un bug del onload
  setTimeout(function(){ j2.pintar(jugadorActual.getNombre()); }, 400);// cargarn la primera ficha, por un bug del onload
}
