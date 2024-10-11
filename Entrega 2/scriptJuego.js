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

let like= document.getElementById("like");

 like.addEventListener("click", function() {
    if(like.classList.contains('spinLike')){
        like.classList.remove('spinLike');
    } else {
        like.classList.add('spinLike');
    }
    
})