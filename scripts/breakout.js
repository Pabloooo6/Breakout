///////////////////////////////////    Objecte game
function Game(playerName, selectedLevel){
      this.AMPLADA_TOTXO=50; this.ALÇADA_TOTXO=25; // MIDES DEL TOTXO EN PÍXELS
      this.canvas,  this.context;       // context per poder dibuixar en el Canvas
    this.width, this.height;          // mides del canvas

      this.paddle;   // la raqueta
    this.ball;     // la pilota
    this.mur;	   // el mur

    this.display;
    this.player = playerName;
    this.level = selectedLevel;
    this.score=0;
    this.audio = true;
    $("#audioIcon").click(function(){
        game.audio = !game.audio;
        $("#audioIcon").attr('src', (game.audio) ? "imatges/audioOn.gif" : "imatges/audioOff.gif");
    });

    this.t=0;      // el temps

    // Events del teclat
    this.key={
        RIGHT:{code: 39, pressed:false},
        LEFT :{code: 37, pressed:false}
    };
}

Game.prototype.inicialitzar = function(){
        this.canvas = document.getElementById("game");
    this.width = this.AMPLADA_TOTXO*15;  // files de 15 totxos com a màxim
        this.canvas.width = this.width;
    this.height = this.ALÇADA_TOTXO*25;
        this.canvas.height =this.height;
    this.context = this.canvas.getContext("2d");

    this.lives = 4;
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.ball.x = this.paddle.x + this.paddle.width / 2;
    this.ball.y = this.paddle.y - this.ball.radi;
    this.display = new Display();
    this.mur = new Mur();

    //Per moure la raqueta, amb jQuery
    $(document).on("keydown", {game:this},function(e) {
        if(e.keyCode==e.data.game.key.RIGHT.code){
            e.data.game.key.RIGHT.pressed = true;
        }
        else if(e.keyCode==e.data.game.key.LEFT.code){
            e.data.game.key.LEFT.pressed = true;
        }
    });

    $(document).on("keyup", {game:this},function(e) {
        if(e.keyCode==e.data.game.key.RIGHT.code){
            e.data.game.key.RIGHT.pressed = false;
        }
        else if(e.keyCode==e.data.game.key.LEFT.code){
            e.data.game.key.LEFT.pressed = false;
        }
    });
        this.t=new Date().getTime();     // inicialitzem temps
    requestAnimationFrame(mainLoop);
}

Game.prototype.update = function(){
    var dt=Math.min((new Date().getTime() -this.t)/1000, 1); // temps, en segons, que ha passat des del darrer update
      this.t=new Date().getTime();

      this.paddle.update();    // Moviment raqueta
      this.ball.update(dt);    // moviment bola, depenent del temps
};

Game.prototype.draw = function(){
    this.context.clearRect(0, 0, this.width, this.height);

        this.mur.draw(this.context);
    this.paddle.draw(this.context);
    this.ball.draw(this.context);
};

Game.prototype.llegirNivells = function(){
    this.NIVELLS = [
        {
            colors: {
                b: "#FFF", // blanc
                t: "#F77", // taronja
                c: "#4CF", // blue cel
                v: "#8D1", // verd
                e: "#D30", // vermell
                l: "#00D", // blau
                r: "#8f00ff", // lila
                g: "#F93", // groc
                p: "#BBB", // plata
                d: "#FB4", // dorat
                n: "#000000", // negre    ADDICIONAL
                x: "#ff42dc" // rosa       ADDICIONAL
            },
            totxos: [
                "",
                "",
                "       p       ",
                "     ttttt     ",
                "    ccccccc    ",
                "   vvnvvvnvv   ",
                "   eeeeeeeee   ",
                "   llxlllxll   ",
                "   r r n r r   "
            ]
        },
        {
            colors: {
                b: "#FFF", // blanc
                t: "#F77", // taronja
                c: "#4CF", // blue cel
                v: "#8D1", // verd
                e: "#D30", // vermell
                l: "#00D", // blau
                r: "#8f00ff", // lila
                g: "#F93", // groc
                p: "#BBB", // plata
                d: "#FB4", // dorat
                n: "#000000", // negre    ADDICIONAL
                x: "#ff42dc" // rosa       ADDICIONAL
            },
            totxos: [
                "       n       ",
                "               ",
                "  ppp     pxp  ",
                "  tt       tt  ",
                "  cc   n   cc  ",
                "  vv       vv  ",
                "  eeeeeeeeeee  ",
                "  llxllllllll  ",
                "   r r r r r   ",
                "      gng      "
            ]
        },
        {
            colors: {
                b: "#FFF", // blanc
                t: "#F77", // taronja
                c: "#4CF", // blue cel
                v: "#8D1", // verd
                e: "#D30", // vermell
                l: "#00D", // blau
                r: "#8f00ff", // lila
                g: "#F93", // groc
                p: "#BBB", // plata
                d: "#FB4", // dorat
                n: "#000000", // negre       ADDICIONAL
                x: "#ff42dc" // rosa       ADDICIONAL
            },
            totxos: [
                " n           n ",
                " ddd           ",
                " pppp          ",
                " ttttt         ",
                " cccccc        ",
                " vvvvxvv       ",
                " eeeeeeee      ",
                " lllllllll     ",
                " rrrrrrrrrr    ",
                " ggxgggggggg   ",
                " bbbbbbbnbbbb  ",
                " dddddddddddxd "
            ]
        },
        {
            colors: {
                r: "#D40000", // vermell
                g: "#6D8902", // verd
                y: "#EBAD00", // groc
                n: "#000000", // negre    ADDICIONAL
                x: "#ff42dc" // rosa       ADDICIONAL
            },
            totxos: [
                "",
                "     rrrrrr    ",
                "    rrrrrrrrr  ",
                "    gggyyny    ",
                "   gygyyynyyy  ",
                "   gyggyyygyyy ",
                "   ggyyyygggg  ",
                "     yyyyyyy   ",
                "    ggrggr     ",
                "   gggrggrggg  ",
                "  ggggrrrrgggg ",
                "  yygryrryrgyy ",
                "  yyyrrrrrryyy ",
                "    rrr  rrr   ",
                "   gxg    gxg  ",
                "  gggg    gggg "
            ]
        }
    ];
}




//////////////////////////////////////////////////////////////////////
// Comença el programa

var game;                // l'única variable global és el joc
$(document).ready(function(){
    $("#startButton").click(function(){
        document.getElementById('mainScreen').style.visibility='hidden';
        document.getElementById('principal').style.visibility='visible';
        document.getElementById("sound").loop = false;
        game = new Game(document.getElementById("playerName").value, document.getElementById("levelSelect").selectedIndex);
        game.inicialitzar();   //inici del joc
    });

    $("#increaseLevelButton").click(function(){
        document.getElementById("sound").loop = false;
        game = new Game(game.player, (game.level+1)%4);
        game.inicialitzar();   //inici del joc
    });

    $("#decreaseLevelButton").click(function(){
        if (game.level == 0) game.level = 4;
        document.getElementById("sound").loop = false;
        game = new Game(game.player, game.level-1);
        game.inicialitzar();   //inici del joc
    });

    $("#audioIcon1").click(function() {
        var sound = document.getElementById('sound');
        var soundSource = document.getElementById('soundSource');
        if (document.getElementById("audioIcon1").src.lastIndexOf("imatges/audioOff.gif")!=-1) {
            sound.loop = true;
            sound.load();
            sound.play();
            $("#audioIcon1").attr('src',"imatges/audioOn.gif");
        } else {
            sound.pause();
            $("#audioIcon1").attr('src', "imatges/audioOff.gif");
        }
    });
});

function mainLoop(){
    if (game.lives > 0 && game.level < 4) {
        game.update();
        game.draw();
            requestAnimationFrame(mainLoop);
    }
}

///////////////////////////////////    Mur
function Mur() {
    this.totxo = [];
    for (var i=0;i<20;i++) {
        this.totxo[i] = [];
    }
    this.numTotxos = 0;

    game.llegirNivells();

    for (var i=0; i<game.NIVELLS[game.level].totxos.length; i++) {
        totxo_pos_y = game.ALÇADA_TOTXO * (i+1);
        for (var j=0; j<game.NIVELLS[game.level].totxos[i].length; j++) {
            totxo_pos_x = game.AMPLADA_TOTXO * j;
            if (game.NIVELLS[game.level].totxos[i][j] == ' ') continue;
            color = game.NIVELLS[game.level].colors[game.NIVELLS[game.level].totxos[i][j]];
            this.totxo[i][j] = new Totxo(totxo_pos_x, totxo_pos_y, game.AMPLADA_TOTXO, game.ALÇADA_TOTXO, color);
            this.numTotxos++;
        }
    }
}

Mur.prototype.draw = function(ctx) {
    for (var i=0; i<this.totxo.length; i++) {
        for (var j=0; j<this.totxo[i].length; j++) {
            if (this.totxo[i][j] == null) continue;
            this.totxo[i][j].draw(ctx);
        }
    }
}


///////////////////////////////////    Raqueta
function Paddle(){
    this.width = 300; this.height = 20;                               // mides
        this.x = game.width/2 - this.width/2; this.y = game.height-50;    // posició inicial
        this.vx = 10;                                                     // velocitat = 10 píxels per fotograma
        this.color = "#ff0511";    // vermell
}

Paddle.prototype.update = function(){
          if (game.key.RIGHT.pressed) {
        this.x = Math.min(game.width - this.width, this.x + this.vx);
    }
          else if (game.key.LEFT.pressed) {
        this.x = Math.max(0, this.x - this.vx);
    }
}

Paddle.prototype.draw = function(ctx){
      ctx.save();
        ctx.fillStyle=this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
};


///////////////////////////////////    Pilota
function Ball(){
    this.x = 0; this.y = 0;         // posició del centre de la pilota
    this.vx = 300;  this.vy = 310;  // velocitat = 300 píxels per segon, cal evitar els 45 graus en el check!!
      this.radi = 10;                 // radi de la pilota
      this.color = "#333";  // gris fosc
}

Ball.prototype.update = function(dt){
      var dtXoc;      // temps empleat fins al xoc
        var xoc=false;  // si hi ha xoc en aquest dt
        var k;          // proporció de la trajectoria que supera al xoc
        var trajectoria={};
        trajectoria.p1={x:this.x, y:this.y};
        trajectoria.p2={x:this.x + this.vx*dt, y:this.y + this.vy*dt};  // nova posició de la bola

        // mirem tots els possibles xocs de la bola
    // Xoc amb la vora de sota de la pista
    if (trajectoria.p2.y + this.radi > game.height){
        game.lives--;
        game.display.updateLives();
        k=(trajectoria.p2.y+this.radi - game.height)/this.vy;
        trajectoria.p2.x=game.paddle.x + game.paddle.width / 2;
        trajectoria.p2.y=game.paddle.y - this.radi;
    }

        // Xoc amb la vora de dalt de la pista
    else if (trajectoria.p2.y - this.radi < 0){
        k=(trajectoria.p2.y-this.radi)/this.vy;  // k sempre positiu
          // ens col·loquem just tocant la vora de dalt
            this.x=trajectoria.p2.x-k*this.vx;
            this.y=this.radi;
        this.vy = -this.vy;
            dtXoc=k*dt;  // temps que queda
            xoc=true;
    }

    // Xoc amb la vora dreta de la pista
    else if (trajectoria.p2.x + this.radi > game.width){
        k=(trajectoria.p2.x+this.radi - game.width)/this.vx;
        // ens col·loquem just tocant la vora de la dreta
          this.x=game.width-this.radi;
          this.y=trajectoria.p2.y-k*this.vy;
        this.vx = -this.vx;
          dtXoc=k*dt;  // temps que queda
          xoc=true;
    }

    // Xoc amb la vora esquerra de la pista
    else if (trajectoria.p2.x - this.radi< 0){
        k=(trajectoria.p2.x-this.radi)/this.vx;  // k sempre positiu
          // ens col·loquem just tocant la vora de l'esquerra
            this.x=this.radi;
            this.y=trajectoria.p2.y-k*this.vy;
        this.vx = -this.vx;
            dtXoc=k*dt;  // temps que queda
            xoc=true;
    }

    // Xoc amb la raqueta
    else if (trajectoria.p2.y + this.radi >= game.paddle.y && trajectoria.p2.y +
		this.radi < game.paddle.y + game.paddle.height && trajectoria.p2.x + this.radi >= game.paddle.x && trajectoria.p2.x +
		this.radi <= game.paddle.x+game.paddle.width){
        Utilitats.play("sonidos/Rebote.mp3");
        k=(trajectoria.p2.y+this.radi - game.paddle.y)/this.vy;
        this.x=trajectoria.p2.x-k*this.vx;
        this.y=game.paddle.y-this.radi;
        dtXoc=k*dt;  // temps que queda
        this.vy = -this.vy;
        xoc=true;
    }

    // Xoc amb el mur
    else {
        for (var i=0; i<game.mur.totxo.length && !xoc; i++) {
            for (var j=0; j<game.mur.totxo[i].length && !xoc; j++) {
                if (game.mur.totxo[i][j] == null) continue;
                // xoc amb un totxo
                var pXoc=Utilitats.interseccioSegmentRectangle(trajectoria,{p:{x:game.mur.totxo[i][j].x-this.radi,y:game.mur.totxo[i][j].y-this.radi},
                    w:game.mur.totxo[i][j].w+2*this.radi,
                    h:game.mur.totxo[i][j].h+2*this.radi});
                if(pXoc){
                    // xoc amb totxo ESPECIAL 1
                    if(game.mur.totxo[i][j].color=="#000000"){
                        Utilitats.play("sonidos/BloqueEsp1.mp3");
                        xoc = true;
                        this.x = pXoc.p.x;
                        this.y = pXoc.p.y;
                        switch (pXoc.vora) {
                            case "superior":
                            case "inferior":
                                this.vy = -this.vy;
                                break;
                            case "esquerra":
                            case "dreta"   :
                                this.vx = -this.vx;
                                break;
                        }
                        dtXoc = (Utilitats.distancia(pXoc.p, trajectoria.p2) / Utilitats.distancia(trajectoria.p1, trajectoria.p2)) * dt;
                        game.mur.totxo[i][j] = null;
                        game.mur.numTotxos--;
                        if(game.score<3){
                            game.score=0;
                        } else {
                            game.score=game.score-3;
                        }

                        game.display.updateScore();
                    }
                    // xoc amb totxo ESPECIAL 2
                    else if(game.mur.totxo[i][j].color=="#ff42dc"){
                        Utilitats.play("sonidos/BloqueEsp2.mp3");
                        xoc = true;
                        this.x = pXoc.p.x;
                        this.y = pXoc.p.y;
                        switch (pXoc.vora) {
                            case "superior":
                            case "inferior":
                                this.vy = -this.vy;
                                break;
                            case "esquerra":
                            case "dreta"   :
                                this.vx = -this.vx;
                                break;
                        }
                        dtXoc = (Utilitats.distancia(pXoc.p, trajectoria.p2) / Utilitats.distancia(trajectoria.p1, trajectoria.p2)) * dt;
                        game.mur.totxo[i][j] = null;
                        game.mur.numTotxos--;
                        if(game.lives==4){
                            game.score=game.score+5;
                        } else{
                            game.score++;
                            game.lives++;
                            game.display.updateLives();
                        }
                        game.display.updateScore();
                    }
                    else {
                        Utilitats.play("sonidos/CoinMario.mp3");
                        xoc = true;
                        this.x = pXoc.p.x;
                        this.y = pXoc.p.y;
                        switch (pXoc.vora) {
                            case "superior":
                            case "inferior":
                                this.vy = -this.vy;
                                break;
                            case "esquerra":
                            case "dreta"   :
                                this.vx = -this.vx;
                                break;
                        }
                        dtXoc = (Utilitats.distancia(pXoc.p, trajectoria.p2) / Utilitats.distancia(trajectoria.p1, trajectoria.p2)) * dt;
                        game.mur.totxo[i][j] = null;
                        game.mur.numTotxos--;
                        game.score++;
                        game.display.updateScore();
                    }
                    if (game.mur.numTotxos == 0) {
                        game.level++;
                        if (game.level > 3) {
                            document.getElementById("msgDiv").innerHTML = "VICTÒRIA";
                            document.getElementById("msgDiv").style.visibility = "visible";
                            Utilitats.checkIftopThree(game.display.topThree, game.player, game.score);
                            Utilitats.play("sonidos/Final.mp3");
                            setTimeout("location.reload(true);",5000);
                        } else {
                            game.inicialitzar();
                        }
                        return;
                    }
                }
            }
        }
    }
    // actualitzem la posició de la bola
    if (game.lives>0) {
        if (xoc) {
            this.update(dtXoc);  // crida recursiva
        }
        else {
            this.x = trajectoria.p2.x;
            this.y = trajectoria.p2.y;
        }
    } else {
        game.level = 0;
        game.display.updateLives();
        document.getElementById("msgDiv").innerHTML = "Fi del Joc";
        document.getElementById("msgDiv").style.visibility = "visible";
        Utilitats.checkIftopThree(game.display.topThree, game.player, game.score);
        Utilitats.play("sonidos/MuerteMario.mpeg");
        setTimeout("location.reload(true);",5000);
    }
};


Ball.prototype.draw = function(ctx){
      ctx.save();
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radi, 0, 2*Math.PI);   // pilota rodona
        ctx.fill();
        ctx.stroke();
        ctx.restore();
};

///////////////////////////////////    Totxo
function Totxo(x,y,w,h,color){
      this.x=x; this.y=y;         // posició, en píxels respecte el canvas
      this.w=w; this.h=h;         // mides
      this.color=color;
}

Totxo.prototype.draw = function(ctx){
    ctx.save();
    ctx.fillStyle=this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle="#333";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
};

///////////////////////////////////    Display
function Display(){
    this.topThree = [];

    document.getElementById("marcadorEsquerraLevel").innerHTML = "Level: " + (game.level+1);
    document.getElementById("marcadorCentreNick").innerHTML = "Name: " + game.player;

    if (localStorage.topThree0) this.topThree[0] = localStorage.topThree0;
    if (localStorage.topThree1) this.topThree[1] = localStorage.topThree1;
    if (localStorage.topThree2) this.topThree[2] = localStorage.topThree2;
    document.getElementById("marcadorDreta").innerHTML ="<b>Top3:</b><br><br>";
    for (var i=0; i<this.topThree.length; i++) {
        player = this.topThree[i].split("|");
        document.getElementById("marcadorDreta").innerHTML += player[1] + "&nbsp;&nbsp;" + player[0] + "<br>";
    }
}

Display.prototype.updateScore = function(dt){
    document.getElementById("marcadorCentreScore").innerHTML = "Marcador: " + game.score + " punts";
}

Display.prototype.updateLives = function(dt){
    var marcadorVides = document.getElementById("marcadorCentreLives");
    marcadorVides.innerHTML = "<br>Intents restants:&nbsp;&nbsp;&nbsp;";
    for (var i=0; i<4; i++) {
        if (i<game.lives)
            marcadorVides.innerHTML += "<img src='imatges/corVerd.jpg'>&nbsp;"
        else
            marcadorVides.innerHTML += "<img src='imatges/corVermell.jpg'>&nbsp;"
    }
}

//////////////////////////////////////////////////////////////////////
//                             Utilitats                            //
//////////////////////////////////////////////////////////////////////

var Utilitats={};

Utilitats.addPaddingZeroes = function(number) {
    while (number.length < 5) {number = "0" + number;}
    return number;
}

Utilitats.checkIftopThree=function(topThree, playerName, playerScore) {
    playerScore = Utilitats.addPaddingZeroes(playerScore.toString());
    topThree[topThree.length] = playerScore + "|" + playerName;
    topThree.sort();
    topThree.reverse();

    localStorage.topThree0 = topThree[0];
    if (topThree[1]) {
        localStorage.topThree1 = topThree[1];
    }
    if (topThree[2]) {
        localStorage.topThree2 = topThree[2];
    }

    document.getElementById("marcadorDreta").innerHTML = "Top3:<br><br>";
    for (var i=0; i<topThree.length && i<3; i++) {
        player = topThree[i].split("|");
        document.getElementById("marcadorDreta").innerHTML += player[1] + "&nbsp;&nbsp;" + player[0] + "<br>";
    }
}

// sleep time expects milliseconds
Utilitats.sleep=function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

Utilitats.play=function(source) {
    if (!game || game.audio) {
        var sound = document.getElementById('sound');
        var soundSource = document.getElementById('soundSource');
        soundSource.src = source;
        sound.load();
        var playPromise = sound.play();
        if (playPromise !== undefined) {
                  playPromise.then(function() {
                  }).catch(function(error) {
                  });
                }
    }
}

Utilitats.puntInterseccio=function (p1,p2,p3,p4){
    // converteix segment1 a la forma general de recta: Ax+By = C
    var a1 = p2.y - p1.y;
    var b1 = p1.x - p2.x;
    var c1 = a1 * p1.x + b1 * p1.y;

    // converteix segment2 a la forma general de recta: Ax+By = C
    var a2 = p4.y - p3.y;
    var b2 = p3.x - p4.x;
    var c2 = a2 * p3.x + b2 * p3.y;

    // calculem el punt intersecció
    var d = a1*b2 - a2*b1;

    // línies paral·leles quan d és 0
    if (d == 0) {
        return false;
    }
    else {
        var x = (b2*c1 - b1*c2) / d;
        var y = (a1*c2 - a2*c1) / d;
        var puntInterseccio={x:x, y:y};	// aquest punt pertany a les dues rectes
        if(Utilitats.contePunt(p1,p2,puntInterseccio) && Utilitats.contePunt(p3,p4,puntInterseccio) )
            return puntInterseccio;
    }
}

Utilitats.contePunt=function(p1,p2, punt){
    return (valorDinsInterval(p1.x, punt.x, p2.x) || valorDinsInterval(p1.y, punt.y, p2.y));

    // funció interna
    function valorDinsInterval(a, b, c) {
        // retorna cert si b està entre a i b, ambdos exclosos
        if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) { // no podem fer a==b amb valors reals!!
            return false;
        }
        return (a < b && b < c) || (c < b && b < a);
    }
}


Utilitats.distancia = function(p1,p2){
    return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
}

Utilitats.interseccioSegmentRectangle = function(seg,rect){

    var pI, dI, pImin, dImin=Infinity, vora;
    // vora superior
    pI=Utilitats.puntInterseccio(seg.p1, seg.p2,
                                                        {x:rect.p.x,y:rect.p.y}, {x:rect.p.x+rect.w, y:rect.p.y});
    if(pI){
        dI=Utilitats.distancia(seg.p1, pI);
        if(dI<dImin){
            dImin=dI;
            pImin=pI;
            vora="superior";
        }
    }
    // vora inferior
    pI=Utilitats.puntInterseccio(seg.p1, seg.p2,
                                                        {x:rect.p.x+rect.w, y:rect.p.y+rect.h},{x:rect.p.x, y:rect.p.y+rect.h});
    if(pI){
        dI=Utilitats.distancia(seg.p1, pI);
        if(dI<dImin){
            dImin=dI;
            pImin=pI;
            vora="inferior";
        }
    }

    // vora esquerra
    pI=Utilitats.puntInterseccio(seg.p1, seg.p2,
                                                        {x:rect.p.x, y:rect.p.y+rect.h},{x:rect.p.x,y:rect.p.y});
    if(pI){
        dI=Utilitats.distancia(seg.p1, pI);
        if(dI<dImin){
            dImin=dI;
            pImin=pI;
            vora="esquerra";
        }
    }
    // vora dreta
    pI=Utilitats.puntInterseccio(seg.p1, seg.p2,
                                                        {x:rect.p.x+rect.w, y:rect.p.y}, {x:rect.p.x+rect.w, y:rect.p.y+rect.h});
    if(pI){
        dI=Utilitats.distancia(seg.p1, pI);
        if(dI<dImin){
            dImin=dI;
            pImin=pI;
            vora="dreta";
        }
    }

    if(vora){
        return {p:pImin,vora:vora}
    }
}

