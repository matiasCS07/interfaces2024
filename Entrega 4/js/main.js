//INCISO 1 (OPCIONAL)
window.addEventListener("load", ()=> {
  const numeros = document.querySelectorAll(".numero");
  const siluetas = document.querySelectorAll(".silueta");
  const textoCarga = document.getElementById("texto-carga");
  const body = document.querySelector("body");
  //espera un segundo antes de empezar con el loader
  setTimeout(() => {
    //muestra cada numero gradualmente
    numeros.forEach((numero, index)=>{
      setTimeout(() => {
        siluetas.forEach((silueta,i)=>{
          setTimeout(() => {
            silueta.style.opacity = 0;
          }, i*1000);
        });
        numero.style.opacity = 1;
        numero.style.transform = `scale(1.1)`
        textoCarga.innerHTML = `${index + 1}`;
      }, index*1000);
    });

  }, 1000);

  //oculta el loader y muestra la pagina
  setTimeout(()=>{
    document.getElementById("pantalla-carga").style.display = "none";
    const pagina = document.getElementById("container");
    body.style.overflowY = "scroll";
    pagina.style.display = "flex";
    pagina.style.opacity = 1;
  }, numeros.length * 1000 + 2000);
});

//INCISO 4
const hero = [
  {
    //elementos parallax hero
    contenedor: document.getElementById("primerCara"),
    elementos: [
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
    const contenedorTop = contenedor.getBoundingClientRect().top;
    const visible =
      contenedorTop < window.innerHeight &&
      contenedorTop > -contenedor.offsetHeight;

    if (visible) {
      const desplazamientoRelativo = window.scrollY - contenedor.offsetTop;

      elementos.forEach(({ elem, factor, inicioFuera }) => {
        const entradaCompleta = desplazamientoRelativo >= inicioFuera;
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

// Evento scroll
window.addEventListener("scroll", () => aplicarParallaxConEntrada(hero));


//INCISO 9
const gruposParallax = [
  {
    //elementos parallax del inciso 9
    contenedor: document.querySelector(".ff4"),
    elementos: [
      { elem: document.querySelector(".recuadro-video"), factor: 0.25 },
      { elem: document.querySelector("#ff4-3"), factor: 0.2 },
      { elem: document.querySelector("#ff4-titulo"), factor: 0.15 },
    ],
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

// Evento scroll para aplicar la lógica a todos los grupos
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

grupoNumeros.addEventListener("mouseleave", () => {
    grupoNumeros.style.transform = `translate(0, 0)`;
});


// //INCISO 9

const seccionLarga = document.querySelector('.sticky-slider');
const seccionesTexto = document.querySelectorAll(".contenedor-dato");
const seccionesTextoLimits=document.querySelector(".contenedor-datos").getBoundingClientRect();
let imagen=document.querySelector(".seccion-larga-0");
let seccionActual;


window.addEventListener('scroll', () => {
    const seccionLargaPos = seccionLarga.getBoundingClientRect();
    const centroVentana=window.innerHeight/2;

    seccionesTexto.forEach((seccion) => {
      const seccionLimites = seccion.getBoundingClientRect();
      const centroSeccion=seccionLimites.top+(seccionLimites.height/2);
      const distancia=Math.abs(centroVentana-centroSeccion); //distancia entre el centro de la seccion y el de la ventana
      
      if (distancia<(seccionLimites.height)) {
        if(seccionActual!=seccion.getAttribute("data-imagen")){
          seccionActual=seccion.getAttribute("data-imagen");
          imagen.classList.add("reveal");
          imagen.classList.add("fixed");
        }else{
          imagen.classList.remove("reveal");
          imagen.classList.remove("fixed");
        }
        imagen.src=`assets/images/scroll-personajes/${seccionActual}.png`;
      }
    });
});


//slider de fotos
let carrusel = document.querySelector(".slider");
let index = 1;
let imagenes = document.querySelectorAll(".slider img");
setInterval(() => {
  let traslado = index*-100;
  carrusel.style.transform = "translateX("+traslado+"%)";
  if(index < imagenes.length - 1){
    index ++;
  }else{
    index = 0;
  }
}, 3000);

//animacion menu hamburguesa
let menu = document.getElementById("menu-hamburguesa");
menu.addEventListener("click", function(){
  console.log('aca')
  menu.classList.toggle("open");
  menu.classList.toggle("close");
  let desplegable=document.querySelector(".menu-desplegable");
  if(menu.classList.contains("open")){
    desplegable.style.transform="translateX(0px)";
    desplegable.style.opacity="1";
    desplegarItems();
  }else{
    desplegable.style.transform="translateX(-1000px)";
    desplegable.style.opacity="0";
    ocultarItems();
  }
})

function desplegarItems(){
  document.querySelectorAll(".desplegable-item").forEach((item, index) =>{
    setTimeout(()=>{
      item.style.transform="translateX(0px)";
      item.style.opacity="1";
    }, 500*index)
  })
}

function ocultarItems(){
  document.querySelectorAll(".desplegable-item").forEach(item =>{
    item.style.transform="translateX(-1000px)";
    item.style.opacity="0";
  })
}


// animacion cards, INCISO 7

let cards=document.querySelectorAll(".card-app");
let contenedorCara2=document.querySelector(".app-mas-divertida")

window.addEventListener("scroll", function(){
  let contenedorCara2Top=contenedorCara2.getBoundingClientRect().top+window.scrollY;
  let desplazamiento=window.scrollY-contenedorCara2Top;
  let appear=Math.abs((contenedorCara2.getBoundingClientRect().top+contenedorCara2.getBoundingClientRect().bottom)/2)

  if(desplazamiento<appear||desplazamiento>contenedorCara2.getBoundingClientRect().bottom+window.scrollY){
    document.querySelectorAll(".card-app").forEach((card, index)=>{
      if(card.classList.contains("appear")){
        setTimeout(()=>{
          card.classList.remove("appear");
        }, 300*index)
      }
    })
  }else if(desplazamiento>=appear) {
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
  let i=0;
  window.addEventListener('scroll', ()=>{
  let estado=document.getElementById("container").style.display;
  let limite=document.getElementById("primerCara").getBoundingClientRect().top+100;
  if(estado=="flex"){
    let logo= document.getElementById("logo");
    let nav=  document.getElementById("nav");
    let menu= document.getElementById("menu-hamburguesa");
    let boton= document.getElementById("boton-comprar"); 
  
    if(window.scrollY>limite){
      boton.classList.add("boton-comprar-2");
      if(i==0){// este if es para que la animacion del boton comprar no se añada cada vez que se hace un scroll
        boton.classList.add("boton-comprar-2-animacion");
        setTimeout(()=>{ // este timer esta para que no se colapsen la animacion de el hover con el movimiento
          boton.classList.remove("boton-comprar-2-animacion");
          } , 1020);
          i=1;
      }
      logo.classList.remove("entrada");
      logo.classList.add("logo-sticky");
      nav.classList.add("nav");
      nav.classList.add("nav-color");
      menu.classList.add("menu-2"); 
    }else{
      boton.classList.remove("boton-comprar-2");
      logo.classList.add("entrada");
      logo.classList.remove("logo-sticky");
      nav.classList.remove("nav");
      menu.classList.remove("menu-2");
      i=0;
    }

  }
});