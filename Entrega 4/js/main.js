
//INCISO 1 (OPCIONAL)
window.addEventListener("load", ()=> {
  //numeros tiene una opacidad de 0 y está por delante de siluetas
  const numeros = document.querySelectorAll(".numero");
  const siluetas = document.querySelectorAll(".silueta");
  const body = document.querySelector("body");
  //espera un segundo antes de empezar con el loader
  setTimeout(() => {
    //muestra cada numero gradualmente
    numeros.forEach((numero, index)=>{
      setTimeout(() => {
        siluetas.forEach((silueta,i)=>{
          setTimeout(() => {
            //las siluetas se vuelven invisibles
            silueta.style.opacity = 0;
          }, i*1000);
        });
        //los numeros se vuelven visibles y se vuelven un poco mas grandes
        numero.style.opacity = 1;
        numero.style.transform = `scale(1.1)`
      }, index*1000);
    });

  }, 1000);

  //oculta el loader y muestra la pagina
  setTimeout(()=>{
    document.getElementById("pantalla-carga").style.display = "none";
    const pagina = document.getElementById("container");
    body.style.overflowY = "scroll";
    //vuelve al inicio al recargar
    window.scrollTo(0, 0);
    pagina.style.display = "flex";
    pagina.style.opacity = 1;
  }, numeros.length * 1000 + 2000);
});

//INCISO 4
const hero = [
  {
    //elementos parallax hero
    contenedor: document.getElementById("primerCara"),
    elementos: [                                                        // velocidad   punto de partida antes de ser visibles
      { elem: document.getElementById("arbusto-corto-izquierda"),       factor: 0.325, inicioFuera: 50 },
      { elem: document.getElementById("roca-izquierda"),                factor: 0.3,  inicioFuera: 70 },
      { elem: document.getElementById("arbol-izquierda"),               factor: 0.225, inicioFuera: 60 },
      { elem: document.getElementById("arbusto-largo-izquierda"),       factor: 0.25,  inicioFuera: 65 },
      { elem: document.getElementById("roca-grande-derecha"),           factor: 0.25,  inicioFuera: 75 },
      { elem: document.getElementById("roca-chica-derecha-1"),          factor: 0.25,  inicioFuera: 70 },
      { elem: document.getElementById("roca-chica-derecha-2"),          factor: 0.25,  inicioFuera: 75 },
      { elem: document.getElementById("arbol-derecha-delante"),         factor: 0.24, inicioFuera: 80 },
      { elem: document.getElementById("arbusto-largo-derecha-delante"), factor: 0.2,  inicioFuera: 70 },
      { elem: document.getElementById("arbol-derecha-detras"),          factor: 0.2,  inicioFuera: 55 },
      { elem: document.getElementById("arbusto-largo-derecha-detras"),  factor: 0.154, inicioFuera: 25 },
      { elem: document.getElementById("ff-2"),                          factor: 0.15,  inicioFuera: 75},
      { elem: document.getElementById("ff-3"),                          factor: 0.235, inicioFuera: 75 },
      { elem: document.getElementById("ff-1"),                          factor: 0.27, inicioFuera: 75 },
    ],
  },
];



function aplicarParallaxConEntrada(grupos) {

  grupos.forEach(({ contenedor, elementos }) => {
    //recorre el array grupos, este tiene 2 propiedades, contenedor y elementos
    const contenedorTop = contenedor.getBoundingClientRect().top;
    const visible =
      contenedorTop < window.innerHeight &&
      contenedorTop > -contenedor.offsetHeight;

    //si está dentro de lo visible en pantalla
    if (visible) {
      // lo que el usuario lleva scrolleado
      const desplazamientoRelativo = window.scrollY - contenedor.offsetTop;

      //ahora recorremos elementos para acceder a elem, facotr e InicioFuera
      elementos.forEach(({ elem, factor, inicioFuera }) => {
        const entradaCompleta = desplazamientoRelativo >= inicioFuera;
        //en caso de que inicioFuera - desplazamientoRelativo sea negativo devuelve 0
        const posicionEntrada = Math.max(inicioFuera - desplazamientoRelativo, 0);
        const posicionParallax = desplazamientoRelativo * factor;

        if (!entradaCompleta) {
          // Fase 1: Animación de entrada
          elem.style.transform = `translateY(${posicionEntrada}px)`;
          elem.style.opacity = Math.min(1, 1 - posicionEntrada / inicioFuera); // Gradualmente opaco
        } else {
          // Fase 2: Movimiento parallax
          elem.style.transform = `translateY(${posicionParallax}px)`;
          elem.style.opacity = 1; // Totalmente visible
        }
      });
    }
  });
}

// Inicializamos los elementos fuera de pantalla
hero.forEach(({ elementos }) => {
  elementos.forEach(({ elem, inicioFuera }) => {
    elem.style.transform = `translateY(${inicioFuera}px)`;
    elem.style.opacity = 0; // Ocultamos inicialmente
  });
});

window.addEventListener("scroll", () => aplicarParallaxConEntrada(hero));


//INCISO 10
const gruposParallax = [
  {
    //elementos parallax del inciso 10
    contenedor: document.querySelector(".ff4"),
    elementos: [
      { elem: document.querySelector(".recuadro-video"), factor: 0.25 },
      { elem: document.querySelector("#ff4-3"), factor: 0.2 },
      { elem: document.querySelector("#ff4-titulo"), factor: 0.15 },
    ],
    contenedor: document.querySelector(".app-mas-divertida"),
    elementos: [
      { elem: document.querySelector("#ff2-456"), factor:  0.2},
      { elem: document.querySelector("#ff2-5"), factor: 0.3 }
    ] 
  },
];

// Función para aplicar parallax
function aplicarParallax(grupos) {
  //recorre el array grupos, este tiene 2 propiedades, contenedor y elementos
  grupos.forEach(({ contenedor, elementos }) => {
    const contenedorTop = contenedor.getBoundingClientRect().top;
    const visible =
      contenedorTop < window.innerHeight &&
      contenedorTop > -contenedor.offsetHeight;

    //si está dentro de lo visible en pantalla
    if (visible) {
      const desplazamientoRelativo = window.scrollY - contenedor.offsetTop;

      //ahora recorremos elementos para acceder a elem y a facotr
      elementos.forEach(({ elem, factor }) => {
        elem.style.transform = `translateY(${desplazamientoRelativo * factor}px)`;
      });
    }
  });
}
window.addEventListener("scroll", () => aplicarParallax(gruposParallax));


//INCISO 8
const idGrupoNumero = "ff3-grupo-numeros";
let grupoNumeros = document.getElementById(idGrupoNumero);

//funcion para mover la imagen del grupo de numeros en el sentido contrario al del cursor
grupoNumeros.addEventListener("mousemove", (e)=>{
    let rect = grupoNumeros.getBoundingClientRect();
    
    //valores x e y del cursor
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;


    const moveX = (x - rect.width / 2) * -0.05;
    const moveY = (y - rect.height / 2) * -0.05;

    //agregamos una transformacion a la imagen modificando el css desde js
    grupoNumeros.style.transform = `translate(${moveX}px, ${moveY}px)
                                    scale(1.05)`;
});

//la imagen vuelve a su posicion inicial al sacar el mouse
grupoNumeros.addEventListener("mouseleave", () => {
    grupoNumeros.style.transform = `translate(0, 0)`;
});


// //INCISO 9

const seccionLarga = document.querySelector('.sticky-slider');
const seccionesTexto = document.querySelectorAll(".contenedor-dato");
const seccionesTextoLimits=document.querySelector(".contenedor-datos").getBoundingClientRect();
let imagen=document.querySelector(".seccion-larga-0");
let seccionActual="0";


window.addEventListener('scroll', () => {
    const seccionLargaPos = seccionLarga.getBoundingClientRect();
    const centroVentana=window.innerHeight/2;

    //forEach que toma cada seccion de texto por separado
    seccionesTexto.forEach((seccion) => {
      const seccionLimites = seccion.getBoundingClientRect();
      const centroSeccion=seccionLimites.top+(seccionLimites.height/2);
      const distancia=Math.abs(centroVentana-centroSeccion); //distancia entre el centro de la seccion y el de la ventana
      
      //si está dentro de la seccion de texto
      if (distancia < (seccionLimites.height)) {
  
        //si la seccion actual es diferente a la del elemento
        if(seccionActual!=seccion.getAttribute("data-imagen")){
          //actualizamos seccionActual
          seccionActual=seccion.getAttribute("data-imagen");
          //agregamos la clase reveal con su correspondiente animacion y la clase fixed
          imagen.classList.add("reveal");
          imagen.classList.add("fixed");
        }else{
          //removemos las clases
          imagen.classList.remove("reveal");
          imagen.classList.remove("fixed");
        }
        //actualizamos el source de la imagen (si es necesario)
        imagen.src=`assets/images/scroll-personajes/${seccionActual}.png`;

      } 
    });
});


//slider de fotos
let carrusel = document.querySelector(".slider");
let index = 1;
let imagenes = document.querySelectorAll(".slider img");
//establecemos un intervalo de 3 sefundos
setInterval(() => {
  // cuanto se mueve carrusel a partir de su posicion original  
  let traslado = index*-100;
  carrusel.style.transform = "translateX("+traslado+"%)";
  //index aumenta por cada imagen contenida en el arreglo imagenes
  if(index < imagenes.length - 1){
    index ++;

    //index se vuelve 0 si sobrepasa la cant de imgs
  }else{
    index = 0;
  }
}, 3000);


//animacion menu hamburguesa
let menu = document.getElementById("menu-hamburguesa");
menu.addEventListener("click", function(){
  menu.classList.toggle("open");
  menu.classList.toggle("close");
  let desplegable=document.querySelector(".menu-desplegable");
  //si el menu está abierto
  if(menu.classList.contains("open")){
    //desplegable vuelve a su posicion 
    desplegable.style.transform="translateX(0px)";
    desplegable.style.opacity="1";
    desplegarItems();
  }else{
    //desplegable se va de pantalla
    desplegable.style.transform="translateX(-1000px)";
    desplegable.style.opacity="0";
    ocultarItems();
  }
})

function desplegarItems(){
  document.querySelectorAll(".desplegable-item").forEach((item, index) =>{
    setTimeout(()=>{
      //uno por uno los items entran en pantalla
      item.style.transform="translateX(0px)";
      item.style.opacity="1";
    }, 500*index)
  })
}

function ocultarItems(){
  document.querySelectorAll(".desplegable-item").forEach(item =>{
    //todos los items salen al mismo tiempo
    item.style.transform="translateX(-1000px)";
    item.style.opacity="0";
  })
}


// animacion cards, INCISO 7

let cards=document.querySelectorAll(".card-app");
let contenedorCara2=document.querySelector(".app-mas-divertida")

window.addEventListener("scroll", function(){
  let contenedorCara2Top=contenedorCara2.getBoundingClientRect().top+window.scrollY; // se define el limite de la segunda cara
  let desplazamiento=window.scrollY-contenedorCara2Top; //desplazamiento es la diferencia entre el scroll vertical y tope del contenedor
  let appear=Math.abs((contenedorCara2.getBoundingClientRect().top+contenedorCara2.getBoundingClientRect().bottom)/2) //se obtiene la mitad de la pantalla

  //si 
  if(desplazamiento<appear||desplazamiento>contenedorCara2.getBoundingClientRect().bottom+window.scrollY){
    document.querySelectorAll(".card-app").forEach((card, index)=>{
      if(card.classList.contains("appear")){
        setTimeout(()=>{
          card.classList.remove("appear");
        }, 300*index) //se define el delay entre las cards
      }
    })
  }else if(desplazamiento>=appear) { //si el usuario se desplazo fuera de los limites de la cara, se ocultan las cards
    document.querySelectorAll(".card-app").forEach((card, index)=>{
      if(!card.classList.contains("appear")){
        setTimeout(()=>{
          card.classList.add("appear");
        }, 300*index)
      }
    })
  }
});





  //inciso 3
  let i=0;// establecemos una variable auxiliar
  window.addEventListener('scroll', ()=>{
  let estado=document.getElementById("container").style.display;
  // establecemos un limite con un margen de cien pixeles
  let limite=document.getElementById("primerCara").getBoundingClientRect().top+100;
  if(estado=="flex"){ // si el display es flex entramos
    let logo= document.getElementById("logo");
    let nav=  document.getElementById("nav");
    let menu= document.getElementById("menu-hamburguesa");
    let boton= document.getElementById("boton-comprar"); 
  
    if(window.scrollY>limite){ // si el scroll del usuario supera el limite
      boton.classList.add("boton-comprar-2");
      if(i==0){// este if es para que la animacion del boton comprar no se añada cada vez que se hace un scroll
        boton.classList.add("boton-comprar-2-animacion");
        setTimeout(()=>{ // este timer esta para que no se colapsen la animacion de el hover con el movimiento
          boton.classList.remove("boton-comprar-2-animacion");
          } , 1020);
          i=1;// devolvemos el indice a 1 para que no vuelva a entrar al if
      }
      //se añaden las animaciones y clases de los elementos del nav y se quitan las obsoletas
      logo.classList.remove("entrada");
      logo.classList.add("logo-sticky");
      nav.classList.add("nav");
      menu.classList.add("menu-2"); 
    }else{
      //en caso de que vuelva a la posicion original devolvemos los elementos a su ubicacion original al inciar la pagina
      boton.classList.remove("boton-comprar-2");
      logo.classList.add("entrada");
      logo.classList.remove("logo-sticky");
      nav.classList.remove("nav");
      menu.classList.remove("menu-2");
      i=0; // el indice se hace cero para que se vuelva a mover el boton al bajar
    }

  }
});