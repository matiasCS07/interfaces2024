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
  }, numeros.length * 1000 + 1000);
});

//INCISO 4
//const wrapper = getElementById("wrapper");



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
    personaje.style.transform=`translateY(${desplazamiento * 0.1}px)`;
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