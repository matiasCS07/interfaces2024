const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let clicked;
let filas;
let columnas;
const anchoTablero=747;
const altoTablero=714;
const margen=0;
let cantFichasGan;
let tablero;
let j1;
let j2;
let jugadorActual;
let fichaActual;
let containerMenu=document.getElementById("menu-container");
let controlesJuego=document.querySelectorAll(".control-juego");
let temporizadorUi=document.getElementById("temporizador")
let tiempoInicial=120;
let tiempo = tiempoInicial;

document.querySelectorAll(".btn-jugar").forEach(e=> {
  let menu;
  if(e.innerText=="Jugar"){
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
      document.getElementById("replay").addEventListener("click", function(){
        iniciarJuego(6,7,4, j1Avatar, j2Avatar);
      })
    })

  }else if(e.innerText=="Jugar de nuevo"){
    e.addEventListener("click", function(){
      console.log("se reinicio");
      
      setTimeout(()=>{
        menu=document.getElementById("inicio");
        menu.style.opacity="1";
        menu.style.display="flex";
  
        menu=document.getElementById("final");
        menu.style.opacity="0";
        menu.style.display="none";

        menu=document.getElementById("empate");
        menu.style.opacity="0";
        menu.style.display="none";
      }, 400)
    })
  }

})

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

canvas.onmousedown = function(e){
  //console.log(e.clientX);
  if (canGetFicha(jugadorActual.getNombre(),(e.clientX-canvas.getBoundingClientRect().left),(e.clientY - canvas.getBoundingClientRect().top))) {
    // console.log(jugadorActual.getCantFichas());
    clicked = true;
    fichaActual = jugadorActual.getFicha();
  }
  
}


function caidaDeFicha(ficha, x, filaLlegada) {

  let y = 0;//multiplico por el diametro de la ficha
  let dy = 4;
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
      console.log(filaLlegada);
      let alturaLlegada=rectHeight+40-filaLlegada*80;
      if (y < alturaLlegada) {
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

canvas.onmouseup = function(e){
  
  if(clicked){
    let filaLlegada=tablero.obtenerFilaDeLlegada(e.clientX-canvas.getBoundingClientRect().left);
    console.log(filaLlegada);
    if(filaLlegada!=-1){
      caidaDeFicha(fichaActual,  e.clientX-canvas.getBoundingClientRect().left, filaLlegada);
    }else{
      fichaActual.borrar(ctx, (e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top));
    }
    setTimeout(() => {
      if (tablero.add((e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top), fichaActual)) {   
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
          setTimeout(() => {          
            ocultarControles();
          }, 1000);
        }
        fichaActual = null;
        j1 = [j2, j2=j1][0];//toggle entre jugadores
        jugadorActual = j1;
        //jugadorActual.setTitulo();
      }
    }, 2250-(2250/8)*filaLlegada);
    setTimeout(()=>{
     
      //borro todo para que no se vea la ficha anterior
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       // dibujo el tablero nuevamente
      tablero.dibujar();
      //vuelvo a dibujar las fichas de los jugadores
      j1.pintar(jugadorActual.getNombre());
      j2.pintar(jugadorActual.getNombre());}, 2250);
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

  controlesJuego.forEach(e=> {
    e.style.display="flex";
    e.style.opacity="1";
  })

  setTimeout(function(){ j1.pintar(jugadorActual.getNombre()); }, 400);// cargarn la primera ficha, por un bug del onload
  setTimeout(function(){ j2.pintar(jugadorActual.getNombre()); }, 400);// cargarn la primera ficha, por un bug del onload

  tiempo=tiempoInicial;
  const temporizador = setInterval(() => {
    if (tiempo === 0) {
      clearInterval(temporizador);
      setTimeout(() => {
        empate();
        temporizadorUi.innerText = tiempoInicial + "s";
      }, 1000);
    }
    temporizadorUi.innerText = tiempo + "s";
    tiempo--;
  }, 1000);
}

function empate(){
  ocultarControles();
  containerMenu.style.opacity="1";
  containerMenu.style.display="flex";
  let menu=document.getElementById("empate");
  menu.style.opacity="1";
  menu.style.display="flex";
}

function ocultarControles(){
  controlesJuego.forEach(e=> {
    e.style.display="none";
    e.style.opacity="0";
  })
}
