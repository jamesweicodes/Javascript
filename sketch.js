/*
James Wei Ping Pong Game 
CSE 165 
Professor Kyrilov
*/

//bX,bY for ball, and bD for diameter 
//ellipse(bX,bY,bD,bD)
var bX,bY,bD,vX,vY,vMax
var maxAngle
//set pY to y , pX to x, pH to height, pW to width
var pX,pY,pW,pH,pV
  //pV is position to move paddle 
//computer paddle , cX and cY for their paddle 
var cX,cY,cV
var botLevel 
var pScore
var cScore
var freeze

function setup() {
  /* 600 width for ping pong table */
  createCanvas(600, 400);
  // calls function  below 
  restart()
  //convert 75 degrees to radians 
  maxAngle = 75/180 *PI
  botLevel = 0.1
  
   pScore = 0
  cScore = 0
}
function restart() {
  pW =20 
  pH=100
  pX=0
  pY = height/2
  pV = 4 //velocity
  
  //computer 
  cX = width - pW
  cY= height/2
  cV =0
  

  bX= width/2
  bY=height/2
  //height is 1/20 of height
  bD = height/20  
  
  //max velocity set
  vMax=6
  vX =0
  vY=0
  
  freeze = true 
}



//computer paddle , cX and cY for their paddle 
function draw() {
  
  background(0);

  // width should be height /2
  //draw middle line as net
  
  //line width 
  stroke(255)
  strokeWeight(1)
  
  //origin is 0,0
  //line(width/2,0, width/2,height)
  // draw dashes instead of straight line 
  for (var i = 0; i < height/10; i++){
    line(width/2,height/10*i,width/2, height/20 +height/10*i)  }
  
  
  
  //user 
  pY =pY+pV
  //have paddle not go over screen
  if(pY <pH/2)
  {
    pY=pH/2
  }
  
  if (pY > height -pH/2){
    pY = height -pH/2
  }
  //format rectangle consist of x,y,width, and height
  fill(255)
  //rect(0,150,20,100)
  rect(pX,pY-pH/2,pW,pH)
  
  //computer 
  //computer controls it. detects if paddle is near 
  //cV =bY-cY
  //cant move faster than max velocity 
  cV = botLevel * (bY-cY)
  if (cV <-4)
  {
    cV = -4
  }
  if (cV >4)
  {
    cV=4
  }
  cY =cY+cV
  //have paddle not go over screen
  if(cY <pH/2)
  {
    cY=pH/2
  }
  
  if (cY > height -pH/2){
    cY = height -pH/2
  }
  //format rectangle consist of x,y,width, and height
  fill(255)
  //rect(0,150,20,100)
  rect(cX,cY-pH/2,pW,pH)
  
//right- it would go oppoiste if negative 
  bX=bX +vX
  //down 
  bY = bY +vY
  if (bX -bD/2 <= pX +pW &&
      bY >= pY -pH/2 &&
      bY<= pY +pH/2)
  {
    //if ball hits top/bottom paddle 
    var range = (bY-pY) / (pH/2)
    //range when hits edges, gives more angle in this case 75 degrees 
    
    var angle = range * maxAngle
    //once it hits edge of paddle it will go in a different velocity 
  vX = vMax * cos(angle)
  vY=vMax *sin(angle)
  }
  
  //computer 
  //when bx +radius goes beypond width of screen -paddle width 
  if (bX +bD/2 >= width -pW &&
      bY > cY -pH/2 &&
      bY<= cY +pH/2)
  {
    //if ball hits top/bottom paddle 
    var range = (bY-cY) / (pH/2)
    //range when hits edges, gives more angle in this case 75 degrees 
    
    var angle = range * maxAngle
    //once it hits edge of paddle it will go in a different velocity 
    vX = -vMax * cos(angle)
    vY=vMax *sin(angle)
  }
  
  //bounce back option
  //ball cant go above height 
  if(bY+bD/2 >= height)//bottom wall
  { 
    vY=vY *-1 
    //heihgt - balls radius 
    bY = height - bD/2
  }
  
  if(bY -bD/2<=0)//top wall
  {
    //flip sign to go opposite direction 
    vY=vY *-1
    bY=bD/2
  }
  
  if (bX -bD/2 <0){//left wall
    //vX=vX *-1
    //bX=bD/2
    //computer score goes up 
    cScore++
    
    restart()
  }
  //right wall
  if (bX +bD/2 >= width)
  {
    //vX = vX *-1
   // bX =width -bD/2
    //player score adds
    pScore++
    restart()
  }
  
  // for ball detection to hit paddle (bX-bD/2 <= pX+pW) but needs to be between top and bottom paddle 
  
  
  
  //draw a ball 
  //vC and vY for velocity for ball
  ellipse(bX,bY,bD,bD)
  
  textSize(24)
  //scoreboard .25 on left of width and .75 percent on right side of width 
  text(pScore,0.25*width,0.25*height)
  text(cScore,0.75*width, 0.25*height)
}  
  
  //pV is position to move paddle 
  //user presses key
  
  function keyPressed()
{
  if(freeze == true)
  {
    vX=-vMax
    vY=vMax
    freeze = false  
  }
    if(key == 'w')
      
    {
      //go up velocity in 4
      pV=-4
    }
    if(key == 's')
      
    {
      //go down velocity in 4
      pV=4
    }
  
  //computer controls i and k
  if (key =='i')
  {
    cV=-4
  }
  if (key =='k')
  {
    cV=4
  }
  
  
    
}
  
