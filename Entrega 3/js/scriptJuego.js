document.querySelectorAll(".opciones-juego div img").forEach(e=> {
    e.addEventListener('click', function(){
        let tipo;

        if(e.classList.contains("opcion-ficha")){
            if(e.classList.contains("jugador1")){
                tipo="jugador1";
            }else if(e.classList.contains("jugador2")){
                tipo="jugador2";
            }
        }else if(e.classList.contains("opcion-tablero")){
            tipo="opcion-tablero";
        }

        document.querySelectorAll(".opciones-juego div img").forEach(e=> {
            if(e.classList.contains(tipo)){
                e.classList.remove("selected");
            }
        })
        e.classList.add("selected");
    })
});

/* animacion de carrusel */
    document.querySelectorAll('.btns-desplazamiento button').forEach(button => {
        button.addEventListener('click', function() {
            let carrusel=document.querySelector(".carrusel-capturas");
            
            if (this.classList.contains('next')) {
                desplazarCarrusel(carrusel, 'next');
            } else {
                desplazarCarrusel(carrusel, 'prev');
            }
        });
    });

    function desplazarCarrusel(carrusel, direccion) {
        let limiteIzq=0;
        let limiteDer=3;
        let tamanioCard;
        
        tamanioCard=document.querySelector(".carrusel-capturas img").getBoundingClientRect().width;
        
        let desplazamiento=tamanioCard/1.25;
        let carruselPos=parseInt(carrusel.getAttribute("data-posicion"));
        
        if (direccion == 'next') {
            if(!(carruselPos>=limiteDer)){
                carruselPos+=1;
                carrusel.style.transformOrigin='left';
            }
        } else {
            if(!(carruselPos<=limiteIzq)){
                carruselPos-=1;
                carrusel.style.transformOrigin='right';
            }
        }

        carrusel.setAttribute('data-posicion',`${carruselPos}`);
        carrusel.style.transform=`translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    }
//*/

/* animacion de boton de me gusta */
    let like=document.getElementById("like");
    let likeImg=document.querySelector("#like img");

    like.addEventListener("click", function() {
        if(like.getAttribute("data-liked")=="false"){
            like.classList.add("liked");
            likeImg.src="assets/svg/thumb_up-relleno.svg";
            like.setAttribute("data-liked", "true");
        }else{
            like.classList.remove("liked");
            likeImg.src="assets/svg/thumb_up.svg";
            like.setAttribute("data-liked", "false");
        }

    });
//*/