"use strict"
/* animaciones de pantalla de carga */
    let pantallaCarga=document.querySelector(".pantalla-carga");
    
    pantallaCarga.classList.remove("pantalla-carga");
    void pantallaCarga.offsetWidth;
    pantallaCarga.classList.add("pantalla-carga");

    let porcentaje=document.getElementById("porcentaje");
    cambioPorcentaje(porcentaje, 25);

    function cambioPorcentaje(elemento, porcentaje){
        setTimeout(() => {
            elemento.innerText=''+porcentaje+'%';
            if(porcentaje!=100){
                cambioPorcentaje(elemento, porcentaje+25);
            }else{
                setTimeout(() => {
                    elemento.innerText=''+0+'%';
                }, 1000);
            }
        }, 750);
    }
//*/

/* animaciones del desplazamiento del carrusel home */
    document.querySelectorAll('.btns-desplazamiento button').forEach(button => {
        button.addEventListener('click', function() {
            let carruselId = this.getAttribute('data-carrusel');
            let carrusel = document.getElementById(`${carruselId}`);
            let isDestacado=carrusel.className;
            
            if (this.classList.contains('next')) {
                desplazarCarrusel(carrusel, 'next', isDestacado);
            } else {
                desplazarCarrusel(carrusel, 'prev', isDestacado);
            }
        });
    });
    
    function desplazarCarrusel(carrusel, direccion, destacado) {
        let limiteIzq=0;
        let limiteDer;
        let tamanioCard;
        
        
        if(destacado=="carrusel destacado"){
            if(screen.width>1000){
                limiteDer=4;
            }else{
                limiteDer=7;
            }
            tamanioCard=document.querySelector(".carrusel.destacado .card").getBoundingClientRect().width;
        }else{
            if(screen.width>1000){
                limiteDer=2;
            }else{
                limiteDer=4;
            }
            tamanioCard=document.querySelector(".carrusel.normal .card").getBoundingClientRect().width;
        }
        
        let desplazamiento=tamanioCard*2;
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
       
       /* animacion de scale */
            carrusel.style.transform=`scaleX(1.15) scaleY(1.05) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;

            setTimeout(() => {
            carrusel.style.transform=`scaleX(1.10) scaleY(1.025) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
            }, 10);

            setTimeout(() => {
                carrusel.style.transform=`scaleX(1.05) scaleY(1.01) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
            }, 200);

            setTimeout(() => {
                carrusel.style.transform=`scaleX(1.02) scaleY(1.005) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
            }, 300);
            
            setTimeout(() => {
                carrusel.style.transform=`scaleX(1) scaleY(1) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
            }, 400);
        //*/
    }
//*/

/* redireccionamiento de botones */

    let button=document.getElementById("cuatro-en-raya");
    button.addEventListener("click", function () {
        window.location.href="juego.html";
    });

//*/

/*  animacion boton de carrito */

    document.querySelectorAll('button.cart').forEach(button => {
        button.addEventListener('click', function() {
            let buttonImg=this.querySelector("img");
            let buttonText=this.querySelector("p.cart-text");
            let hasText=buttonText!=null;

            if(button.getAttribute("data-estado")=="add"){
                button.setAttribute("data-estado","remove");

                if(button.classList.contains("removed")){
                    button.classList.remove("removed");
                }
                setTimeout(() => {
                    button.classList.add("added");
                }, 10);

                buttonImg.src="assets/svg/remove_shopping_cart.svg";
                if(hasText){
                    buttonText.innerText="Sacar del carro";
                }

            }else if(button.getAttribute("data-estado")=="remove"){
                button.setAttribute("data-estado","add");

                button.classList.remove("added");
                setTimeout(() => {
                    button.classList.add("removed");
                }, 10);

                buttonImg.src="assets/svg/carrito.svg";
                if(hasText){
                    buttonText.innerText="Añadir al carro";
                }
            }
        });
    });

//*/