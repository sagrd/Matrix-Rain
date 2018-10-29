
var symbolsize = 14;
var streams = [];

function setup() {
   createCanvas(window.innerWidth, window.innerHeight);
   background(0);

   var x = 0;
   for (var i = 0; i<= width/symbolsize; i++){
      var stream = new Stream();
      stream.createSymbols(x,random(0, window.innerHeight));
      streams.push(stream);
      x+= symbolsize;
   }

   textSize(symbolsize);
}

function draw() {
   background(0, 150);
   // stream.render();
   streams.forEach(function(stream){
      stream.render();
   });
}

function Symbol(x,y,speed, first){
   this.x = x;
   this.y = y;
   this.value;
   this.speed = speed;
   this.first = first;

   //time period for switch interval
   this.time = round(random(45,50));
   
   this.setToRandomSymbol = function(){
      if(frameCount % this.time == 0){
         var list = "ABCDEF0123456789".split("");
         var last = list[round(random(16))];
         var randomChar = "0x09" + int(random(8)) + last;

         // console.log(randomChar);
         // console.log(last);
         this.value = String.fromCharCode(randomChar);
      }

   }

   //moving the symbol
   this.move = function(){
      this.y += this.speed;
      if (this.y >= window.innerHeight){
         this.y = 0;
      }

   }

}

function Stream(){
   this.symbols = [];
   this.totalSymbols = round(random(5,25));
   this.speed = round(random(5,7));

   this.createSymbols = function(x,y){
      //True
      var first = round(random(0,1)) == 1;
      for(var i = 0; i <= this.totalSymbols; i++){
         symbol = new Symbol(x,y,this.speed, first);
         symbol.setToRandomSymbol();
         this.symbols.push(symbol);

         y -= symbolsize;
         first = false;
      }
   }

   this.render = function(){
      this.symbols.forEach(function(symbol){
         if(symbol.first){
            fill(180, 255, 180);
         }else{
            fill(0,255,70);            
         }

         text(symbol.value, symbol.x, symbol.y);
         symbol.move();
         symbol.setToRandomSymbol();         
      });
   }

}