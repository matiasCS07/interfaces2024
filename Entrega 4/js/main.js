
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
                                    scale(1.02)`;
});

grupoNumeros.addEventListener("mouseleave", () => {
    grupoNumeros.style.transform = `translate(0, 0)`;
});


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