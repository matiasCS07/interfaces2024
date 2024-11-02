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
let indiceJugador=0;
let jugadorActual;
let fichaActual;
let containerMenu=document.getElementById("menu-container");
let controlesJuego=document.querySelectorAll(".control-juego");
let temporizadorUi=document.getElementById("temporizador");
let tiempoInicial=120;
let tiempo = tiempoInicial;
let temporizador;



document.querySelectorAll(".btn-jugar").forEach(e=> {
  if(e.innerText=="Jugar"){
    e.addEventListener("click", function(){
      containerMenu.style.opacity="0";
      setTimeout(() => {
        containerMenu.style.display="none";
        containerMenu.style.visibility="hidden";
      }, 400);

      ocultarMenu("inicio");

      let j1Avatar=document.querySelector(".jugador1.selected").src;
      let j2Avatar=document.querySelector(".jugador2.selected").src;
      let modo= document.querySelector(".opcion-tablero.selected").id;
      if(modo=="4enlinea"){
        tiempoInicial=120;
        iniciarJuego(6,7,4, j1Avatar, j2Avatar, 4);
      } else if(modo=="5enlinea"){
        tiempoInicial=180;
        iniciarJuego(7,8,5, j1Avatar, j2Avatar, 5);
      } else if(modo=="6enlinea"){
        tiempoInicial=240;
        iniciarJuego(8, 9, 5, j1Avatar, j2Avatar, 6);
      }
      
      document.getElementById("replay").addEventListener("click", function(){
        if(temporizador){
          clearInterval(temporizador);
        }
        if(modo=="4enlinea"){
          tiempoInicial=120;
          iniciarJuego(6,7,4, j1Avatar, j2Avatar, 4);
        } else if(modo=="5enlinea"){
          tiempoInicial=180;
          iniciarJuego(7,8,5, j1Avatar, j2Avatar, 5);
        } else if(modo="6enlinea"){
          tiempoInicial=240;
          iniciarJuego(8, 9, 6, j1Avatar, j2Avatar, 6);
        }
        
      })
    })

  }else if(e.innerText=="Jugar de nuevo"){
    e.addEventListener("click", function(){
      
      setTimeout(()=>{
        mostrarMenu("inicio");
  
        ocultarMenu("final");
        ocultarMenu("empate");
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
    tablero.dibujarPila(j1, j2, cantFichasGan);
    fichaActual.dibujar(ctx,x,y);

    mostrarGuia();
    pintarJugadores();
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
  let y = 0;
  let dy = 8;

  function animar() {
      let alturaLlegada = (tablero.rectHeight + (ficha.radio/2)) - (filaLlegada * (ficha.radio*2))-(tablero.cellHeight-ficha.radio);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tablero.dibujar();

      if (y < alturaLlegada) {
          ficha.dibujar(ctx, x, y); 
          y += dy;
          requestAnimationFrame(animar);
      } else {
          ficha.dibujar(ctx, x, alturaLlegada);
      }

      tablero.dibujarPila(j1, j2, cantFichasGan);
      pintarJugadores();
  }

  animar();
}

canvas.onmouseup = function(e){
  
  if(clicked){
    let filaLlegada=tablero.obtenerFilaDeLlegada(e.clientX-canvas.getBoundingClientRect().left);
    if(filaLlegada!=-1){
      caidaDeFicha(fichaActual,  e.clientX-canvas.getBoundingClientRect().left, filaLlegada);
    }else{
      fichaActual.borrar(ctx, (e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top));
    }
    setTimeout(() => {
      if (tablero.add((e.clientX - canvas.getBoundingClientRect().left), (e.clientY-canvas.getBoundingClientRect().top), fichaActual)) {   
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pintarJugadores();
        clicked = false;
        let ganador = tablero.gane(fichaActual,e.clientX - canvas.getBoundingClientRect().left );
        if (ganador.length == cantFichasGan){// retorna un arreglo con las fichas ganadoras, o uno vacio
          for (let i = 0; i < ganador.length; i++) {
            ganador[i].ganadora();
          }

          mostrarGanador(fichaActual.jugador);
          setTimeout(() => {          
            ocultarControles();
          }, 2000);
        }
        fichaActual = null;
        indiceJugador = (indiceJugador + 1) % 2;
        jugadorActual = indiceJugador === 0 ? j1 : j2;
        console.log(jugadorActual.getNombre());
        document.querySelectorAll(".jugador").forEach(e=> {
          if(e.innerText==jugadorActual.getNombre()){
            e.classList.add("selected");
          }
          if(e.innerText!=jugadorActual.getNombre()&&e.classList.contains("selected")){
            e.classList.remove("selected");
          }
        })
      }
    }, 2000-(2000/tablero.filas)*filaLlegada);
    setTimeout(()=>{
       ctx.clearRect(0, 0, canvas.width, canvas.height);
      tablero.dibujar();
      pintarJugadores();
      tablero.dibujarPila(j1, j2, cantFichasGan);
    }, 2000-(2000/tablero.filas)*filaLlegada);
    clicked=false;
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
    document.getElementById("ganador").innerText=ganador;
    mostrarMenu("final");
    containerMenu.style.opacity="1";
    containerMenu.style.display="flex";
    containerMenu.style.visibility="visible";
  }, 1000);
}

function iniciarJuego(filas, columnas, tipo, avatar1, avatar2){
  clicked = false;
  filas = filas;
  columnas = columnas;
  cantFichasGan=tipo;
  tablero= new Tablero(canvas,ctx,filas,columnas, cantFichasGan);
  j1 = new Jugador('Jugador 1', avatar1, cantFichasGan);
  j2 = new Jugador('Jugador 2', avatar2, cantFichasGan);
  jugadorActual = j1;
  fichaActual="";

  tablero.dibujarPila(j1, j2, tipo);

  controlesJuego.forEach(e=> {
    e.style.display="flex";
    e.style.opacity="1";
    e.style.visibility="visible";
  })

  setTimeout(function(){ pintarJugadores(); }, 400);

  document.getElementById("jugador1").classList.add("selected");

  tiempo=tiempoInicial;
  console.log(tiempo);
  temporizador = setInterval(() => {
    if (tiempo == 0) {
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
  containerMenu.style.visibility="visible";

  mostrarMenu("empate");
}

function ocultarControles(){
  controlesJuego.forEach(e=> {
    e.style.display="none";
    e.style.opacity="0";
    e.style.visibility="hidden";
  })
}

function mostrarMenu(menu){
  menu=document.getElementById(menu);
  menu.style.opacity="1";
  menu.style.display="flex";
  menu.style.visibility="visible";
}

function ocultarMenu(menu){
  menu=document.getElementById(menu);
  menu.style.opacity="0";
  menu.style.display="none";
  menu.style.visibility="hidden";
}

function pintarJugadores(){
  j1.pintar(jugadorActual.getNombre());
  j2.pintar(jugadorActual.getNombre());
}

function mostrarGuia(){
  tablero.mostrarGuia();
}
