class Jugador {
  constructor(jugador, imagen) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.fichas = [];
    this.posPiloteY = 110;
    this.avatar=imagen;
    if (this.jugador == 'Jugador 1') {
      this.posPiloteX = 110;
    }else {
      this.posPiloteX = this.canvas.width-110;
    }
    this.startGame();
  }

  startGame(){
    for (var i = 0; i < 32; i++) {
      var ficha = new Ficha(this.jugador,this.jugador+i, this.avatar);
      this.fichas.push(ficha);
      ficha.dibujar(ctx,this.posPiloteX,this.posPiloteY, this.avatar);
    }
  }

  getCantFichas(){
    return this.fichas.length-1;
  }

  getFicha(){
    if (this.fichas.length>-1) {
      return this.fichas.pop();
    }
  }

  getNombre(){
    return this.jugador;
  }

  //dibuja las fichas que se usan para jugar
  pintar(jugadorActual){
    var cant = 0;
    if (this.jugador == jugadorActual) {
      cant = this.fichas.length-1;
    }else{
      cant = this.fichas.length;
    }

    for (var i = 0; i < cant; i++) {
      this.fichas[i].dibujar(this.ctx,this.posPiloteX,this.posPiloteY);
    }
  }

  
}
