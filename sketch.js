

var banana, banana_Image,bananasGroup;
var obstacle,obstaclesGroup;
var ground,Invisible_ground;
var monkey_collided,monkey_running;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var restart;
var score;
var text1;

function preload(){
  
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png" ,"Monkey_10.png")
 
  banana_Image = loadImage("banana.png");
stone_Image =  loadImage("stone-1.png");
  player_collided = loadImage("Monkey_01.png");
  restart1 = loadImage("restart.png");
  gameOver1  = loadImage("gameOver.png");
}




function setup() {
  createCanvas(600, 400);
 
 
   ground = createSprite(400,200,600,400);
  ground.addImage("ground",backImage);
  ground.x = ground.width /100;
  ground.velocityX = -4;
  
  
  Invisible_ground = createSprite(300,390,600,10);
  
   monkey = createSprite(50,390,20,50);

   bananasGroup = new Group();
  obstaclesGroup = new Group();
    monkey.addAnimation("running",player_running);
  monkey.addImage("collided",player_collided);

  monkey.scale = 0.1;

  gameOver = createSprite(300,150,50,50);
  gameOver.addImage("over",gameOver1);
  restart = createSprite(300,200,50,50);
  restart.addImage("start",restart1);
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
  text1 = text("score: "+ score,50,50);
  monkey.setCollider("circle",10,-10,100);
}
 

function draw() {
  background(180);
  
  if(gameState === PLAY){
     if(keyDown("space") && monkey.y>320) {
    monkey.velocityY = -15;
  }
        if (ground.x <95 ){
    ground.x = ground.width/2;
       
       
  } 
    
    ground.velocityX = -4;
  if(obstaclesGroup.isTouching(monkey)){
  monkey.scale =0.1;
    gameState = 0;
  }
  
   switch(score){
    
    case 10: monkey.scale = 0.12
      break;
    case 20: monkey.scale = 0.13
      break;
      case 30: monkey.scale = 0.14
      break;
     case 40: monkey.scale = 0.15
      break;
      default: break;
  }
    if(monkey.isTouching(bananasGroup)){
    score =score+2;
      bananasGroup.destroyEach();
    }
   
    spawnbananas();  
  spawnobstacles();
  }
  
  if(gameState === END){
   monkey.changeAnimation("collided",player_collided);
monkey.velocityX=0;
ground.velocityX =0 ;
monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
      restart.visible = true;
  gameOver.visible = true;
}

  if( mousePressedOver(restart)) {
reset()
  }

  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(Invisible_ground);
  
  
  
  text1.depth = backImage.depth+10;
  
 
  
  
  Invisible_ground.visible = false;
  
  
  
   
  textSize(32);
text1 = text("score: "+ score,500,50);
  
  drawSprites();
  
  
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(150,250));
    banana.addImage(banana_Image);
    banana.scale = 0.05;
    banana.velocityX = -7;
  
     //assign lifetime to the variable
    banana.lifetime = 200;
    

    
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
  }

function spawnobstacles (){
if (frameCount % 150 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.y = 370
    obstacle.addImage(stone_Image);
    obstacle.scale = 0.25;
    obstacle.velocityX = -7;
  
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
  obstaclesGroup.add(obstacle);
}
}


  function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  bananasGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  monkey.changeAnimation("running",player_running);
  
 
  
  }