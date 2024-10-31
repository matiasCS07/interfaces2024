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


    // Calculamos el ancho y alto de cada celda
    // Este calculo quedo al reves por motivos que no comprendemos
    const cellWidth = rectWidth / this.filas;
    const cellHeight = rectHeight / this.columnas;

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        // Calculamos la posición de cada celda, centrando cada ficha dentro de su celda
        const x = paddingX + (cellWidth * i) + (cellWidth / 2);
        const y = paddingY + rectHeight - (cellHeight * j) - (cellHeight / 2);
        
        this.tablero[i][j].ficha.dibujar(this.ctx, x, y, cellWidth, cellHeight);
      }
    }
  }
  getRectWidth(){
    return rectWidth;
  }
  getRectHei
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
      columna++;
      j++;
    }
    
    
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

          while((((horizontalActual+1) < this.columnas-1) && ((verticalActual-1) > -1)) && actual.getNombre()==this.tablero[horizontalActual+1][verticalActual-1].ficha.getNombre()){
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
    
    console.log(j);
    while(((horizontalActual+1) < this.columnas-1) && actual.getNombre()==this.tablero[horizontalActual+1][j].ficha.getNombre()){
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
    while((((horizontalActual+1) < this.columnas-1) && ((verticalActual+1) < this.filas))&& actual.getNombre()==this.tablero[horizontalActual+1][verticalActual+1].ficha.getNombre()){
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
//   caidaDeFicha(ficha, x){
  
//     let y=0;
//     let dy=2;
     
//      while(y <= this.canvas.height){
//        y += dy;
//        ficha.dibujar(ctx, x, y);
//      }
 
//  }

}
