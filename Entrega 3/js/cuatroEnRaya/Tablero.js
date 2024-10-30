class Tablero {

  crearMatriz(filas, columnas) {
    let matriz = [];
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] ={
              "ficha": new Ficha('base', i),
              "x":0,
              "y":0
            };
        }
    }
    return matriz;
}

  constructor(canvas, ctx, filas, columnas, margen, anchoTablero, altoTablero, cantFichasGan) {
    this.cantFichasGan=cantFichasGan;
    this.canvas=canvas;
    this.ctx=ctx;
    this.tablero =  this.crearMatriz(filas, columnas);;
    this.filas=filas;
    this.columnas=columnas;
    this.altoTablero=altoTablero;
    this.anchoTablero=anchoTablero;
    this.anchoCelda=this.anchoTablero/this.filas;
    //console.log(this.anchoCelda);
    this.altoCelda=this.altoTablero/this.columnas;
    //console.log(this.altoCelda);
    this.areaFicha=this.anchoCelda*this.altoCelda;
    this.margen= margen;
    // Centrar el tablero
    this.xOffset = this.anchoTablero-this.anchoCelda*this.columnas;
    this.yOffset = this.altoTablero-this.altoCelda*this.filas;
    //console.log(this.xOffset);
    //console.log(this.yOffset);
    console.log(this.tablero);
    this.startGame();
  }

  startGame() {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.tablero[i][j].ficha = new Ficha('base', i);
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

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        // Calculamos la posición de cada celda, centrando cada ficha dentro de su celda
        const x = paddingX + (cellWidth * i) + (cellWidth / 2);
        const y = paddingY + rectHeight - (cellHeight * j) - (cellHeight / 2);
        
        this.tablero[i][j].ficha.dibujar(this.ctx, x, y, cellWidth, cellHeight);
      }
    }
  }
  add(x,ficha){

    const canvasWidth = this.canvas.width;
    const rectWidth = 0.5 * canvasWidth;
    //const rectHeight = 0.8 * canvasHeight;

    //donde comienza el tablero o col 0
    const paddingX = (canvasWidth - rectWidth) / 2;

    const numColumns = this.tablero.length;
    const cellWidth = rectWidth / numColumns;

    let columna=0;
    let j=0;
    while(columna<this.columnas-1 && !(x>paddingX+j*cellWidth && x<=paddingX+(j+1)*cellWidth)){
      //console.log("aca");
      columna++;
      j++;
    }
    
    // if (x>paddingX && x<=paddingX+cellWidth) { // seguro hay alguna manera mejor, pero
    //   columna = 0;
    // }else if(x>paddingX+cellWidth && x<=paddingX+2*cellWidth){
    //   columna = 1;
    // }else if(x>paddingX+2*cellWidth && x<=paddingX+3*cellWidth){
    //   columna = 2;
    // }else if(x>paddingX+3*cellWidth && x<=paddingX+4*cellWidth){
    //   columna = 3;
    // }else if(x>paddingX+4*cellWidth && x<=paddingX+5*cellWidth){
    //   columna = 4;
    // }else if(x>paddingX+5*cellWidth && x<=paddingX+6*cellWidth){
    //   columna = 5;
    // }else if(x>paddingX+6*cellWidth && x<=paddingX+7*cellWidth){
    //   columna = 6;
    // }else if(x>paddingX+8*cellWidth && x<=paddingX+9*cellWidth){
    //   columna = 7;
    // }else{
    //   return false;
    // }

    for (let i = 0; i < this.tablero.length; i++) {
      if (this.tablero[columna][i].ficha.getNombre() == 'base') {
        this.tablero[columna][i].ficha = ficha;
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

    for (var i = 0; i < this.filas; i++) {
      for (var j = 0; j < this.columnas; j++) {
        if (ultimo.getNombre() == this.tablero[i][j].ficha.getNombre()) { // si estoy parado en una ficha del tipo q quiero buscar
          //--Validacion vertical --//
          actual = this.tablero[i][j].ficha;
          fichasGanadoras.push(actual);
          verticalActual = j;

          if ((verticalActual+1) < this.filas) {
            while(actual.getNombre()==this.tablero[i][verticalActual+1].ficha.getNombre()){
              verticalActual++;
              fichasGanadoras.push(this.tablero[i][verticalActual].ficha);
              if (fichasGanadoras.length == this.cantFichasGan) {
                return fichasGanadoras;
              }
              actual = this.tablero[i][verticalActual].ficha;
            }
          }
          fichasGanadoras = [];
          //no encontro nada verticalmente

          //--Validacion Horizontal --//
          actual = this.tablero[i][j].ficha;
          fichasGanadoras.push(actual);
          horizontalActual = i;
          fichasGanadoras=this.validacionHorizontal(horizontalActual, actual, j, fichasGanadoras);
          if(fichasGanadoras.length==this.cantFichasGan){
            return fichasGanadoras;
          }
       
          fichasGanadoras = [];
          //no encontro nada horizontalmente


          //--Validacion diagonal arriba --//
          actual = this.tablero[i][j].ficha;
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;
          fichasGanadoras=this.validacionDiagonalArriba(horizontalActual, verticalActual, actual, fichasGanadoras);
          if(fichasGanadoras.length==this.cantFichasGan){
            return fichasGanadoras;
          }
       
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

          //--Validacion diagonal abajo --//
          actual = this.tablero[i][j].ficha;
          fichasGanadoras.push(actual);
          horizontalActual = i;
          verticalActual = j;

          while((((horizontalActual+1) < this.columnas) && ((verticalActual-1) > -1)) && actual.getNombre()==this.tablero[horizontalActual+1][verticalActual-1].ficha.getNombre()){
            horizontalActual++;
            verticalActual--;
            fichasGanadoras.push(this.tablero[horizontalActual][verticalActual].ficha);
            if (fichasGanadoras.length == this.cantFichasGan) {
              return fichasGanadoras;
            }
            actual = this.tablero[horizontalActual][verticalActual].ficha;
          }
          fichasGanadoras = [];
          //no encontro nada en diagonal arriba

        }
      }
    }
    return fichasGanadoras;
  }
  validacionHorizontal(horizontalActual, actual, j, fichasGanadoras){
    
  
    while(((horizontalActual+1) < this.columnas) && actual.getNombre()==this.tablero[horizontalActual+1][j].ficha.getNombre()){
      horizontalActual++;
      fichasGanadoras.push(this.tablero[horizontalActual][j].ficha);
      if (fichasGanadoras.length == this.cantFichasGan) {
        return fichasGanadoras;
      }
      actual = this.tablero[horizontalActual][j].ficha; 
    }
    return fichasGanadoras;
  }

  validacionDiagonalArriba(horizontalActual, verticalActual, actual, fichasGanadoras){
    while((((horizontalActual+1) < this.columnas) && ((verticalActual+1) < this.filas))&& actual.getNombre()==this.tablero[horizontalActual+1][verticalActual+1].ficha.getNombre()){
      horizontalActual++;
      verticalActual++;
      fichasGanadoras.push(this.tablero[horizontalActual][verticalActual].ficha);
      if (fichasGanadoras.length == this.cantFichasGan) {
        return fichasGanadoras;
      }
      actual = this.tablero[horizontalActual][verticalActual].ficha;
    }
    return fichasGanadoras;
  }

}
