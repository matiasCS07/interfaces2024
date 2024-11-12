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