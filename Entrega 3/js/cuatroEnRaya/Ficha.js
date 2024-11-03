class Ficha {
  constructor(jugador, modoJuego, imagen) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.radio=this.setRadio(modoJuego);

    if(imagen){
      this.ruta=imagen;
    }else{
      this.ruta="";
    }

    this.color = "#A8D8B9";
  }

  //dibuja las fichas 
  dibujar(ctx,posX,posY){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#003366';
    ctx.stroke();
    if (this.ruta!="") {
      var img = new Image();
      img.src = this.ruta;
      ctx.drawImage(img,posX-this.radio,posY-this.radio,this.radio*2,this.radio*2);
    }
  }

  borrar(ctx, posX, posY){
    console.log("entre en borrar")
    ctx.clearRect(posX - this.radio, posY - this.radio, this.radio * 2, this.radio * 2);
  }

  getNombre(){
    return this.jugador;
  }

  ganadora(){
    this.ruta="";
    this.color = "rgb(204, 215, 4)";
  }

  setRadio(modoJuego){
    let radio;
    switch(modoJuego){
      case 4:
        radio=40;
        break;
      case 5:
        radio=35;
        break;
      case 6:
        radio=30;
        break;
      default: radio=40;
    }
    return radio;
  }

  // start(ctx,posX,posY){
  //   var img = new Image();
  //   img.src = this.ruta;
  //   img.onload = function() {
  //     ctx.drawImage(img,posX-this.radio,posY-this.radio,60,60);
  //   }
  // }
}
