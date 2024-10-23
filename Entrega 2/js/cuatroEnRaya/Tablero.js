// Defino el canvas y el context
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Defino alto y ancho del canvas
canvas.width = 1300;
canvas.height = 800;



let canvas_width = canvas.width;
let canvas_height = canvas.height;

let shapes = [];

// Defino objeto círculo
let circulo = {
    x: 200, // Coordenada x del centro del círculo
    y: 200, // Coordenada y del centro del círculo
    r: 50,  // Radio del círculo
    s: 0,   // Ángulo de inicio en radianes
    e: 2 * Math.PI, // Ángulo final en radianes
    color: 'blue',
    isPointInside: function(x, y) {
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(_x * _x + _y * _y) < this.r;
    }
}

shapes.push(circulo);

// Función que dibuja
let draw = function() {
    // Limpia la pantalla
    context.clearRect(0, 0, canvas_width, canvas_height);
    for (let shape of shapes) {
        context.beginPath();
        context.arc(shape.x, shape.y, shape.r, shape.s, shape.e);
        context.fillStyle = shape.color;
        context.fill();
        context.closePath();
    }
}
draw();

// Variables para arrastrar
let isDragging = false;
let selectedShape = null;
let offsetX, offsetY;

// Función para manejar el evento de mouse down
let mouse_down = function(event) {
    event.preventDefault();
    selectedShape = findClickedFigure(event.layerX, event.layerY);
    if (selectedShape != null) {
        console.log('entra');
        // Calcula la diferencia entre la posición del mouse y el centro del círculo
        offsetX = event.layerX - selectedShape.x;
        offsetY = event.layerY - selectedShape.y;
        isDragging = true;
        canvas.onmousemove = mouse_move; // Activa el arrastre
    }
}

// Función para manejar el arrastre
let mouse_move = function(event) {
    if (isDragging && selectedShape != null) {
        // Actualiza la posición del círculo mientras arrastras
        selectedShape.x = event.layerX - offsetX;
        selectedShape.y = event.layerY - offsetY;
        draw(); // Vuelve a dibujar el canvas con el círculo en la nueva posición
    }
}

// Función para manejar el evento de mouse up (soltar)
let mouse_up = function(event) {
    isDragging = false;
    selectedShape = null;
    canvas.onmousemove = null; // Desactiva el arrastre
}

// Asigna los eventos al canvas
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;

// Función que verifica si el punto está dentro del círculo
function findClickedFigure(x, y) {
    for (let index = 0; index < shapes.length; index++) {
        let elem = shapes[index];
        if (elem.isPointInside(x, y)) {
            return elem;
        }
    }
    return null;
}
