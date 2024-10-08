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
    
    console.log(destacado, destacado=="carrusel destacado");

    if(destacado=="carrusel destacado"){
        if(screen.width>1000){
            limiteDer=10
        }else{
            limiteDer=14;
        }
        tamanioCard=document.querySelector(".carrusel.destacado .card").getBoundingClientRect().width;
    }else{
        if(screen.width>1000){
            limiteDer=4;
        }else{
            limiteDer=8;
        }
        tamanioCard=document.querySelector(".carrusel.normal .card").getBoundingClientRect().width;
    }

    console.log(tamanioCard)

    let desplazamiento=tamanioCard;
    let carruselPos=parseInt(carrusel.getAttribute("data-posicion"));

    if (direccion == 'next') {
        if(!(carruselPos>=limiteDer)){
            carruselPos+=1;
        }
    } else {
        if(!(carruselPos<=limiteIzq)){
            carruselPos-=1;
        }
    }
    
    carrusel.setAttribute('data-posicion',`${carruselPos}`);
    carrusel.style.transform=`translate(${(carruselPos*desplazamiento)*-1}px, 0px)`;
}