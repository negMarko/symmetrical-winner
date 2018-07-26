var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var protagonista;

var enemigo = [];

var imagenAntorcha;

var tileMap;

var musica, sonido1, sonido2, sonido3;

var nivel = 1;

musica = new Howl({
  src: ['music/8bits.mp3'],
  loop: true,
  volume: 0.5
});
sonido1 = new Howl({
  src: ['sound/die.mp3'],
  loop: false
});
sonido2 = new Howl({
  src: ['sound/key.mp3'],
  loop: false
});
sonido3 = new Howl({
  src: ['sound/win.mp3'],
  loop: false
});


var escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 1, 0, 2, 2, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var escenario2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0],
  [0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0],
  [0, 3, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var escenario3 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 2, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 1],
  [0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0],
  [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 2, 0, 0, 2, 2, 3, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario4 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 0],
  [0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 1],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario5 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0],
  [0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 3, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario6 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 2, 3, 0, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario7 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 0],
  [0, 0, 2, 3, 0, 0, 2, 0, 1, 2, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario8 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 0],
  [0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
  [0, 2, 0, 1, 2, 2, 2, 2, 2, 2, 0, 2, 2, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario9 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 1, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 3, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var escenario10 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 0, 2, 2, 1, 0, 3, 2, 2, 0, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function dibujaEscenario() {
  switch (nivel) {
    case 1:
      escenario = escenario1;
      document.getElementById('log').innerHTML = "NIVEL: 1";
      break;
    case 2:
      escenario = escenario2;
      document.getElementById('log').innerHTML = "NIVEL: 2";
      break;
    case 3:
      escenario = escenario3;
      document.getElementById('log').innerHTML = "NIVEL: 3";
      break;
    case 4:
      escenario = escenario4;
      document.getElementById('log').innerHTML = "NIVEL: 4";
      break;
    case 5:
      escenario = escenario5;
      document.getElementById('log').innerHTML = "NIVEL: 5";
      break;
    case 6:
      escenario = escenario6;
      document.getElementById('log').innerHTML = "NIVEL: 6";
      break;
    case 7:
      escenario = escenario7;
      document.getElementById('log').innerHTML = "NIVEL: 7";
      break;
    case 8:
      escenario = escenario8;
      document.getElementById('log').innerHTML = "NIVEL: 8";
      break;
    case 9:
      escenario = escenario9;
      document.getElementById('log').innerHTML = "NIVEL: 9";
      break;
    case 10:
      escenario = escenario10;
      document.getElementById('log').innerHTML = "NIVEL: 10";
      break;
  }
  console.log(nivel);
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {

      var tile = escenario[y][x];
      ctx.drawImage(tileMap, tile * 32, 0, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
    }
  }

}


var antorcha = function (x, y) {
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; //0-3


  this.cambiaFotograma = function () {
    if (this.fotograma < 3) {
      this.fotograma++;
    } else {
      this.fotograma = 0;
    }

  }


  this.dibuja = function () {

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap, this.fotograma * 32, 64, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
  }

}




//CLASE ENEMIGO
var malo = function (x, y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random() * 4);

  this.retraso = 50;
  this.fotograma = 0;


  this.dibuja = function () {
    switch (nivel) {
      case 1:
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 2:
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 3:
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 4:

        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 5:
        ctx.drawImage(tileMap, 64, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);


        break;
      case 6:
        ctx.drawImage(tileMap, 64, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);


        break;
      case 7:
        ctx.drawImage(tileMap, 64, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);


        break;
      case 8:
        ctx.drawImage(tileMap, 96, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);


        break;
      case 9:
        ctx.drawImage(tileMap, 96, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;
      case 10:
        ctx.drawImage(tileMap, 96, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);

        break;

      default:
        break;
    }


    /* if (nivel == 1) {
      ctx.drawImage(tileMap, 96, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
    }
    if (nivel == 2) {
      ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
    } else {
      ctx.drawImage(tileMap, 64, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
    } */
  }


  this.compruebaColision = function (x, y) {
    var colisiona = false;

    if (escenario[y][x] == 0) {
      colisiona = true;
    }
    return colisiona;
  }


  this.mueve = function () {

    protagonista.colisionEnemigo(this.x, this.y);


    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      //ARRIBA
      if (this.direccion == 0) {
        if (this.compruebaColision(this.x, this.y - 1) == false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }


      //ABAJO
      if (this.direccion == 1) {
        if (this.compruebaColision(this.x, this.y + 1) == false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 2) {
        if (this.compruebaColision(this.x - 1, this.y) == false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }

      //IZQUIERDA
      if (this.direccion == 3) {
        if (this.compruebaColision(this.x + 1, this.y) == false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }

  }

}


//OBJETO JUGADOR
var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;


  this.dibuja = function () {
    ctx.drawImage(tileMap, 32, 32, 32, 32, this.x * anchoF, this.y * altoF, anchoF, altoF);
  }


  this.colisionEnemigo = function (x, y) {
    if (this.x == x && this.y == y) {
      this.muerte();
    }

  }


  this.margenes = function (x, y) {
    var colision = false;

    if (escenario[y][x] == 0) {
      colision = true;
    }

    return (colision);
  }



  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) {
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
      this.logicaObjetos();
    }
  }


  this.victoria = function () {
    console.log('Has ganado!');

    this.x = 1;
    this.y = 1;

    this.llave = false; //el jugador ya no tiene la llave
    nivel++;
  }


  this.muerte = function () {
    setTimeout("sonido1.play();", 0.1 * 1000);
    setTimeout("location.reload();", 0.6 * 1000);
    if (nivel > recuperar()) {
      guardar(nivel);
    }
    //sonido1.play();
    console.log("Mueres");
    //location.reload();

  }




  this.logicaObjetos = function () {
    var objeto = escenario[this.y][this.x];

    //OBTIENE llave
    if (objeto == 3) {

      sonido2.play();

      this.llave = true;
      escenario[this.y][this.x] = 2;

      console.log('Has obtenido la llave!!');
    }



    //ABRIMOS LA PUERTA
    if (objeto == 1) {


      if (this.llave == true) {
        this.victoria();
        sonido3.play();

      } else {
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

}
//-----------------------------------------------------------------------------
function inicializa() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  musica.play();
  tileMap = new Image();
  tileMap.src = 'img/tilemap2.png';
  document.getElementById('max').innerHTML = "MAX: " + recuperar();

  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  //CREAMOS LA antorcha
  imagenAntorcha = new antorcha(0, 0);
  imagenAntorcha2 = new antorcha(14, 0);
  imagenAntorcha3 = new antorcha(0, 9);
  imagenAntorcha4 = new antorcha(14, 9);

  //CREAMOS LOS ENEMIGOS
  enemigo.push(new malo(2, 6));
  enemigo.push(new malo(7, 6));
  enemigo.push(new malo(13, 8));
  enemigo.push(new malo(13, 1));
  /* enemigo.push(new malo(Math.floor(Math.random() * 12), Math.floor(Math.random() * 8)));
  enemigo.push(new malo(Math.floor(Math.random() * 12), Math.floor(Math.random() * 8)));
  enemigo.push(new malo(Math.floor(Math.random() * 12), Math.floor(Math.random() * 8))); */


  //LECTURA DEL TECLADO
  document.addEventListener('keydown', function (tecla) {

    if (tecla.keyCode == 38) {
      protagonista.arriba();
    }

    if (tecla.keyCode == 40) {
      protagonista.abajo();
    }

    if (tecla.keyCode == 37) {
      protagonista.izquierda();
    }

    if (tecla.keyCode == 39) {
      protagonista.derecha();
    }

  });

  setInterval(function () {
    principal();
  }, 1000 / FPS);
}

function guardar(nivel){
	localStorage.setItem("max", nivel);
}

function recuperar(){
	return(localStorage.getItem("max"));
}



function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}


function principal() {
  borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  imagenAntorcha2.dibuja();
  imagenAntorcha3.dibuja();
  imagenAntorcha4.dibuja();
  protagonista.dibuja();


  for (c = 0; c < enemigo.length; c++) {
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }

}