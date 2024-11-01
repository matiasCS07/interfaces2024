class Ficha {
  constructor(jugador,id, imagen) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.radio = 40;
    this.id = id;
    if(imagen){
      this.ruta=imagen;
    }else{
      this.ruta="";
    }
    //if (jugador == 'Jugador 1') {
    //  this.ruta = "././assets/img/ficha-spider.png";
    //}else if (jugador == 'Jugador 2') {
    //  this.ruta = "././assets/img/ficha-duende.png";
    //}
    this.color = "rgb(29, 29, 29)";
    // this.pintar(document.getElementById('canvasMain').getContext('2d'),50,50
  }

  //dibuja las fichas 
  dibujar(ctx,posX,posY){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    if (this.ruta!="") {
      var img = new Image();
      img.src = this.ruta;
      // img.onload = function() { //tilda todo
      ctx.drawImage(img,posX-this.radio,posY-this.radio,80,80);
      // }
    }
  }

  borrar(ctx, posX, posY){
    ctx.clearRect(posX - this.radio, posY - this.radio, this.radio * 2, this.radio * 2);
  }

  getNombre(){
    return this.jugador;
  }

  ganadora(){
    this.ruta="";
    this.color = "rgb(204, 215, 4)";
  }

  // start(ctx,posX,posY){
  //   var img = new Image();
  //   img.src = this.ruta;
  //   img.onload = function() {
  //     ctx.drawImage(img,posX-this.radio,posY-this.radio,60,60);
  //   }
  // }
}
