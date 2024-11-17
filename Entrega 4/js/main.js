//INCISO 1 (OPCIONAL)
window.addEventListener("load", ()=> {
  const numeros = document.querySelectorAll(".numero");
  const textoCarga = document.getElementById("texto-carga");
  
  //espera un segundo antes de empezar con el loader
  setTimeout(() => {
    //muestra cada numero gradualmente
    numeros.forEach((numero, index)=>{
      setTimeout(() => {
        numero.style.opacity = 1;
        textoCarga.innerHTML = `${index + 1}`;
      }, index*1000);
    });

  }, 1000);

  //oculta el loader y muestra la pagina
  setTimeout(()=>{
    document.getElementById("pantalla-carga").style.display = "none";
    const pagina = document.getElementById("container");
    pagina.style.display = "flex";
    pagina.style.opacity = 1;
    entrarHero();
  }, numeros.length * 1000 + 1000);
});

//INCISO 4
const wrapper = document.getElementById("primerCara");//
const arbustoCorto1 = document.getElementById("ff-arbusto-corto-1");//
const rocaGrande1 = document.getElementById("ff-roca-grande1");//
const arbol1 = document.getElementById("ff-arbol-1");//
const arbustoLargo1 = document.getElementById("ff-arbusto-largo-1");//
const rocaGrande3 = document.getElementById("ff-roca-grande3");
const rocaGrande4 = document.getElementById("ff-roca-grande4");
const rocaGrande2 = document.getElementById("ff-roca-grande2");//
const arbol3 = document.getElementById("ff-arbol-3");
const arbustoLargo3 = document.getElementById("ff-arbusto-largo-3");
const arbol2 = document.getElementById("ff-arbol-2");
const arbustoLargo2 = document.getElementById("ff-arbusto-largo-2");
const numero1 = document.getElementById("ff-1");
const numero2 = document.getElementById("ff-2");
const numero3 = document.getElementById("ff-3");

//funcion parallax
window.addEventListener("scroll", function(){
  let contenedorTop=wrapper.getBoundingClientRect().top;

  if (contenedorTop<window.innerHeight && contenedorTop > (wrapper.offsetHeight*(-1))) {
    let desplazamientoRelativo = window.scrollY - wrapper.offsetTop;
    
    //lado izquierdo
    arbustoCorto1.style.transform=`translateY(${desplazamientoRelativo * 0.65}px)`;
    rocaGrande1.style.transform=`translateY(${desplazamientoRelativo * 0.6}px)`;
    arbol1.style.transform=`translateY(${desplazamientoRelativo * 0.55}px)`;
    arbustoLargo1.style.transform=`translateY(${desplazamientoRelativo * 0.5}px)`;

    //lado derecho
    rocaGrande3.style.transform=`translateY(${desplazamientoRelativo * 0.5}px)`;
    rocaGrande4.style.transform=`translateY(${desplazamientoRelativo * 0.5}px)`;
    rocaGrande2.style.transform=`translateY(${desplazamientoRelativo * 0.5}px)`;
    arbol3.style.transform=`translateY(${desplazamientoRelativo * 0.48}px)`;
    arbustoLargo3.style.transform=`translateY(${desplazamientoRelativo * 0.4}px)`;
    arbol2.style.transform=`translateY(${desplazamientoRelativo * 0.4}px)`;
    arbustoLargo2.style.transform=`translateY(${desplazamientoRelativo * 0.38}px)`;

    //personajes
    numero1.style.transform=`translateY(${desplazamientoRelativo * 0.54}px)`;
    numero2.style.transform=`translateY(${desplazamientoRelativo * 0.3}px)`;
    numero3.style.transform=`translateY(${desplazamientoRelativo * 0.47}px)`;
  }
})

function entrarHero(){
  document.querySelectorAll(".entrada").forEach((item, index) =>{
    setTimeout(()=>{
      item.style.transform="translateX(0px)";
    }, 500*index)
  })
}


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
let imagen=document.querySelector(".seccion-larga-0");

window.addEventListener('scroll', () => {
    const seccionLargaPos = seccionLarga.getBoundingClientRect();
    const centroVentana=window.innerHeight/2;
    let seccionTop=seccionLargaPos.top+window.scrollY;
    imagen.style.opacity="0";
    
    seccionesTexto.forEach((seccion) => {
      const seccionLimites = seccion.getBoundingClientRect();
      const centroSeccion=seccionLimites.top+(seccionLimites.height/2);
      const distancia=Math.abs(centroVentana-centroSeccion); //distancia entre el centro de la seccion y el de la ventana
      
      if (distancia<seccionLimites.height) {
        imagen.style.opacity="1";
        imagen.src=`assets/images/${seccion.getAttribute("data-imagen")}.png`;
        
        let desplazamiento=(window.scrollY-seccionTop)+(seccionLimites.height*1.5);
        imagen.style.transform=`translateY(${desplazamiento}px)`;
      }
    });
});


//slider de fotos
let carrusel=document.querySelector(".slider");
let index=1;
let imagenes=document.querySelectorAll(".slider img");
setInterval(() => {
  let traslado=index*-100;
  carrusel.style.transform="translateX("+traslado+"%)";
  if(index<imagenes.length-1){
    index++;
  }else{
    index=0;
  }
}, 3000);

//animacion menu hamburguesa
let menu=document.getElementById("menu-hamburguesa");
menu.addEventListener("click", function(){
  menu.classList.toggle("open");
  menu.classList.toggle("close");
  let desplegable=document.querySelector(".menu-desplegable");
  if(menu.classList.contains("open")){
    desplegable.style.transform="translateX(0px)";
    desplegarItems();
  }else{
    desplegable.style.transform="translateX(-800px)";
    ocultarItems();
  }
})

function desplegarItems(){
  document.querySelectorAll(".desplegable-item").forEach((item, index) =>{
    setTimeout(()=>{
      item.style.transform="translateX(0px)";
    }, 500*index)
  })
}

function ocultarItems(){
  document.querySelectorAll(".desplegable-item").forEach(item =>{
    item.style.transform="translateX(-400px)";
  })
}

//parallax de video y personaje INCISO 10
let contenedorCara4=document.querySelector(".ff4");
let video=document.querySelector(".recuadro-video");
let personaje=document.querySelector("#ff4-3");
let texto=document.querySelector("#ff4-titulo");

window.addEventListener("scroll", function(){
  let contenedorCara4Top=contenedorCara4.getBoundingClientRect().top;

  if (contenedorCara4Top<window.innerHeight && contenedorCara4Top > (contenedorCara4.offsetHeight*(-1))) {
    let desplazamiento = window.scrollY - contenedorCara4.offsetTop;
    texto.style.transform= `translateY(${desplazamiento * 0.25}px)`;
    video.style.transform=`translateY(${desplazamiento * 0.25}px)`;
    personaje.style.transform=`translateY(${desplazamiento * 0.15}px)`;
  }
})

// animacion cards, INCISO 7

let cards=document.querySelectorAll(".card-app");
let contenedorCara2=document.querySelector(".app-mas-divertida")

window.addEventListener("scroll", function(){
  let contenedorCara2Top=contenedorCara2.getBoundingClientRect().top+window.scrollY;
  let desplazamiento=window.scrollY-contenedorCara2Top;

  if(desplazamiento<100||desplazamiento>contenedorCara2.getBoundingClientRect().bottom){
    document.querySelectorAll(".card-app").forEach((card, index)=>{
      if(card.classList.contains("appear")){
        setTimeout(()=>{
          card.classList.remove("appear");
        }, 300*index)
      }
    })
  }else if(desplazamiento>=100) {
    document.querySelectorAll(".card-app").forEach((card, index)=>{
      if(!card.classList.contains("appear")){
        setTimeout(()=>{
          card.classList.add("appear");
        }, 300*index)
      }
    })
  }
})