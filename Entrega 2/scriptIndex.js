document.querySelectorAll('.btns-desplazamiento button').forEach(button => {
    button.addEventListener('click', function(e) {
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
    let limiteDer=0;
    let tamanioCard;


    if(destacado=="carrusel destacado"){
        if(screen.width>1000){
            limiteDer=5
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

    /* animacion con deformacion de rombo skew
        carrusel.style.transform=`skewX(25deg) scaleY(1.15) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
        setTimeout(() => {
            carrusel.style.transform=`skewX(15deg) scaleY(1.075) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
        }, 10);
        setTimeout(() => {
            carrusel.style.transform=`skewX(10deg) scaleY(1.05) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
        }, 200);
        setTimeout(() => {
            carrusel.style.transform=`skewX(5deg) scaleY(1.005) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
        }, 300);
        setTimeout(() => {
            carrusel.style.transform=`skewX(0deg) scaleY(1) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
        }, 400);
    */

    /* animacion de scale */


    carrusel.style.transform=`skewX(10deg) scaleX(1.15) scaleY(1.075) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    setTimeout(() => {
        carrusel.style.transform=`skewX(5deg) scaleX(1.10) scaleY(1.05) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    }, 10);
    setTimeout(() => {
        carrusel.style.transform=`skewX(2.5deg) scaleX(1.05) scaleY(1.025) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    }, 200);
    setTimeout(() => {
        carrusel.style.transform=`skewX(1deg) scaleX(1.02) scaleY(1.01) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    }, 300);
    setTimeout(() => {
        carrusel.style.transform=`skewX(0deg) scaleX(1) scaleY(1) translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
    }, 400);
}