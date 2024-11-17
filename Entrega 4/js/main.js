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


// //INCISO 9

const seccion_larga=document.getElementById('seccion-larga');
seccion_larga.addEventListener('scroll', ()=> {
  seccion_larga.classList.add('overflor-auto');
    const img= document.getElementById('seccion-larga-0');
    console.log('antes de el if');
    console.log(img.getBoundingClientRect().top);
    console.log(seccion_larga.innerHeight);
    console.log(contenedor.offsetHeight);
    console.log();

    if(img.getBoundingClientRect().top < seccion_larga.getBoundingClientRect().top && img.getBoundingClientRect().top > (contenedor.offsetHeight*(-1))){
      let desplazamientoRelativo = window.scrollY - seccion_larga.offsetTop;
      img.style.transform=`translateY(${desplazamientoRelativo * 1}px)`;
    }
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
let contenedor=document.querySelector(".ff4");
let video=document.querySelector(".recuadro-video");
let personaje=document.querySelector("#ff4-3");
let texto=document.querySelector("#ff4-titulo");

window.addEventListener("scroll", function(){
  let contenedorTop=contenedor.getBoundingClientRect().top;

  if (contenedorTop<window.innerHeight && contenedorTop > (contenedor.offsetHeight*(-1))) {
    let desplazamientoRelativo = window.scrollY - contenedor.offsetTop;
    texto.style.transform= 
    video.style.transform=`translateY(${desplazamientoRelativo * 0.25}px)`;
    personaje.style.transform=`translateY(${desplazamientoRelativo * 0.1}px)`;
  }
})