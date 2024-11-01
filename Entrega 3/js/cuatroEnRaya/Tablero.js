class Tablero {

  crearMatriz(filas, columnas, radio) {
    let matriz = [];
    for (let i = 0; i < filas+1; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] ={
              "ficha": new Ficha('base', i, radio),
              "x":0,
              "y":0
            };
        }
    }
    return matriz;
  }

  constructor(canvas, ctx, filas, columnas, cantFichasGan, radio) {
    this.cantFichasGan=cantFichasGan;
    this.canvas=canvas;
    this.ctx=ctx;
    this.tablero =  this.crearMatriz(filas, columnas, radio);;
    this.filas=filas;
    this.columnas=columnas;
    //radio de las fichas
    this.radio=radio;
    //Alto y ancho del canvas
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    
    // Ajustamos el ancho y alto del rectángulo al 50% y 80% del tamaño del canvas, respectivamente
    this.rectWidth = 0.5 * this.canvasWidth;
    this.rectHeight = 0.8 *this.canvasHeight;
    
    // Calculamos el padding para centrar el rectángulo
    this.paddingX = (this.canvasWidth - this.rectWidth) / 2;
    this.paddingY = (this.canvasHeight - this.rectHeight) / 2;
    
    // Calculamos el ancho y alto de cada celda
    this.cellWidth = this.rectWidth / this.filas;
    this.cellHeight = this.rectHeight / this.columnas;
    
    this.fondoCargado=false;
    this.fondo=new Image();
    this.fondo.src = "./assets/img/fondo-tablero.png";
    this.fondo.onload=()=>{
      this.fondoCargado=true;
      this.dibujar();
    }

    this.startGame();
  }

  startGame() {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.tablero[i][j].ficha = new Ficha('base', i, this.radio);
      }
    }
    this.dibujar();
  }

  dibujar() {

    //dibujamos el tablero
    this.ctx.fillStyle = "rgb(54, 54, 54)";
    this.ctx.fillRect(this.paddingX, this.paddingY, this.rectWidth, this.rectHeight);

    if(this.fondo.complete){
      this.ctx.drawImage(this.fondo,this.paddingX,this.paddingY,this.rectWidth,this.rectHeight);
    }

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        // Calculamos la posición de cada celda, centrando cada ficha dentro de su celda
        const x = this.paddingX + (this.cellWidth * i) + (this.cellWidth / 2);
        const y = this.paddingY + this.rectHeight - (this.cellHeight * j) - (this.cellHeight / 2);
        
        //dibujamos los espacios para las fichas
        this.tablero[i][j].ficha.dibujar(this.ctx, x, y);
      }
    }
  }
 
  //la funcion add se fija que la posicion donde queres soltar la ficha corresponda a una columna y a cual
  add(x, y,ficha){

    let columna=0;
    let j=0;
    while(columna<this.columnas-1 && !(x>this.paddingX+j*this.cellWidth && x<=this.paddingX+(j+1)*this.cellWidth)){
      columna++;
      j++;
    }
    
    
    for (let i = 0; i < this.tablero.length; i++) {
      if(columna==this.columnas-1){
        this.tablero[i][j].ficha.borrar(this.ctx, x, y);
      }else{
        if (this.tablero[columna][i].ficha.getNombre() == 'base') {
          this.tablero[columna][i].ficha = ficha;
          return true;
        }
      }
    }
    return false;
  }

  // la funcion gane se encarga de la verificacion una vez que la ficha está posicionada
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

  obtenerFilaDeLlegada(x){

    let columna=0;
    let j=0;
    while(columna<this.columnas-1 && !(x>this.paddingX+j*this.cellWidth && x<=this.paddingX+(j+1)*this.cellWidth)){
      columna++;
      j++;
    }
    
    if(columna!=this.columnas-1){
      for (let u = 0; u < this.tablero.length; u++) {
        if (this.tablero[columna][u].ficha.getNombre() == 'base') {
          return u;
        }
      }
    }
    return -1;
  }

}
