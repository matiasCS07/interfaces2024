document.querySelectorAll('.btns-desplazamiento button').forEach(button => {
    button.addEventListener('click', function(e) {
        let carruselId = this.getAttribute('data-carrusel');
        let carrusel = document.getElementById(`${carruselId}`);
        
        if (this.classList.contains('next')) {
            desplazarCarrusel(carrusel, 'next');
        } else {
            desplazarCarrusel(carrusel, 'prev');
        }
    });
});

function desplazarCarrusel(carrusel, direccion) {
    let carruselPos = carrusel.getBoundingClientRect().left;
    let desplazamiento=250;
    if (direccion == 'next') {
        carrusel.style.transform=`translate(${carruselPos-desplazamiento}px, 0px)`;
    } else {
        carrusel.style.transform=`translate(${carruselPos+desplazamiento}px, 0px)`;
    }
}