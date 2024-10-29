class Tablero {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tablero = [[], [], [], [], [], [], [], []];
    this.startGame();
  }

  startGame() {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < 8; j++) {
        this.tablero[i][j] = new Ficha('base', i);
      }
    }
    this.dibujar();
  }

  dibujar() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    // Ajustamos el ancho y alto del rectángulo al 50% y 80% del tamaño del canvas, respectivamente
    const rectWidth = 0.5 * canvasWidth;
    const rectHeight = 0.8 * canvasHeight;

    // Calculamos el padding para centrar el rectángulo
    const paddingX = (canvasWidth - rectWidth) / 2;
    const paddingY = (canvasHeight - rectHeight) / 2;

    this.ctx.fillStyle = "rgb(54, 54, 54)";
    this.ctx.fillRect(paddingX, paddingY, rectWidth, rectHeight);

    const numColumns = this.tablero.length;
    const numRows = 8;

    // Calculamos el ancho y alto de cada celda
    const cellWidth = rectWidth / numColumns;
    const cellHeight = rectHeight / numRows;

    for (let i = 0; i < numColumns; i++) {
      for (let j = 0; j < numRows; j++) {
        // Calculamos la posición de cada celda, centrando cada ficha dentro de su celda
        const x = paddingX + (cellWidth * i) + (cellWidth / 2);
        const y = paddingY + rectHeight - (cellHeight * j) - (cellHeight / 2);
        
        this.tablero[i][j].dibujar(this.ctx, x, y, cellWidth, cellHeight);
      }
    }
  }
  add(x,ficha){

    // const rectWidth = 0.5 * canvasWidth;
    // const rectHeight = 0.8 * canvasHeight;

    var columna;
    if (x>640 && x<=690) { // seguro hay alguna manera mejor, pero
      columna = 0;
    }else if(x>690 && x<=740){
      columna = 1;
    }else if(x>740 && x<=790){
      columna = 2;
    }else if(x>790 && x<=840){
      columna = 3;
    }else if(x>840 && x<=890){
      columna = 4;
    }else if(x>890 && x<=940){
      columna = 5;
    }else if(x>940 && x<=990){
      columna = 6;
    }else if(x>990 && x<=1040){
      columna = 7;
    }else{
      return false;
    }

    for (var i = 0; i < this.tablero.length; i++) {
      if (this.tablero[columna][i].getNombre() == 'base') {
        this.tablero[columna][i] = ficha;
        return true;
      }
    }
    return false;
  }
  gane(ultimo){
    var fichasGanadoras = [];
    var actual;
    var verticalActual;
    var horizontalActual;

    for (var i = 0; i < this.tablero.length; i++) {
      for (var j = 0; j < 8; j++) {
        if (ultimo.getNombre() == this.tablero[i][j].getNombre()) { // si estoy parado en una ficha del tipo q quiero buscar
          //--Validacion vertical --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          verticalActual = j;

          if ((verticalActual+1) < 7) {
            while(actual.getNombre()==this.tablero[i][verticalActual+1].getNombre()){
              verticalActual++;
              fichasGanadoras.push(this.tablero[i][verticalActual]);
              if (fichasGanadoras.length == 4) {
                return fichasGanadoras;
              }
              actual = this.tablero[i][verticalActual];
            }
          }
          fichasGanadoras = [];
          //no encontro nada verticalmente

          //--Validacion Horizontal --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;

          while(((horizontalActual+1) < 8) && actual.getNombre()==this.tablero[horizontalActual+1][j].getNombre()){
            horizontalActual++;
            fichasGanadoras.push(this.tablero[horizontalActual][j]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][j];
          }
          fichasGanadoras = [];
          //no encontro nada horizontalmente


          //--Validacion diagonal arriba --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;

          while((((horizontalActual+1) < 8) && ((verticalActual+1) < 8))&&actual.getNombre()==this.tablero[horizontalActual+1][verticalActual+1].getNombre()){
            horizontalActual++;
            verticalActual++;
            fichasGanadoras.push(this.tablero[horizontalActual][verticalActual]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][verticalActual];
          }
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

          //--Validacion diagonal abajo --//
          actual = this.tablero[i][j];
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;

          while((((horizontalActual+1) < 8) && ((verticalActual-1) > -1)) && actual.getNombre()==this.tablero[horizontalActual+1][verticalActual-1].getNombre()){
            horizontalActual++;
            verticalActual--;
            fichasGanadoras.push(this.tablero[horizontalActual][verticalActual]);
            if (fichasGanadoras.length == 4) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][verticalActual];
          }
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

        }
      }
    }
    return fichasGanadoras;
  }
}
