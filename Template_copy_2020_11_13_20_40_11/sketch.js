var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,ground2;
var score=0;
var collided,collision;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeycollision = loadAnimation("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(400,400);
  
  
  monkey = createSprite(40,335);
  monkey.addAnimation("ajnfre",monkey_running);
  monkey.addAnimation("oarngao",monkeycollision);
  monkey.scale = 0.1
  
  wall = createSprite(5,200,5,400);
  wall.visible = false;
  
  ground = createSprite(80,370,600,10);
  
  
  obstacleGroup = new Group();
  ground2Group = new Group();
  bananaGroup = new Group();
  crackGroup = new Group();
}


function draw() {
  background(180);
  ground.x = ground.width /2;
  console.log(monkey.y);
  fill("black");
  text("Score: "+score,340,40);
  monkey.debug = true;
  //monkey.setCollider("rectangle",0,0,30,10);
  
  monkey.collide(ground);
    monkey.collide(ground2Group);
    monkey.collide(wall);
    monkey.collide(obstacleGroup);
  
  if(gameState ==1){
    cracks();
    obstacles();
    bananas();
    grounds2();
    
    ground.velocityX = -6;
    monkey.collide(ground);
    monkey.collide(ground2Group);
    monkey.collide(wall);
   // monkey.collide(obstacleGroup);
    
   // monkey.addAnimation("ajnfre",monkey_running);
    
    if(keyDown("space") && monkey.y >= 325){
      monkey.velocity.y=-17;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    
    if(monkey.isTouching(bananaGroup)){
      score+=1;
      bananaGroup.destroyEach();
    }
    
    if(monkey.collide(obstacleGroup)){
      gameState=0;
     
      
    }}
    
    if(gameState==0){
      monkey.changeAnimation("oarngao",monkeycollision);
      text("Game Over",170,200);
      
      gameover();
       //text("Game Over",140,200);rock.velocityX=0
      
    
  
  
  if(keyDown("r") && gameState==0){
    gameState=1;
  }
    }
  
  
  drawSprites();

  
}

function grounds2(){
  if(frameCount % 180==0){
    ground2 = createSprite(440,245,140,10);
    ground2.velocityX=-6;
    ground2.lifetime = 140;
    ground2Group.add(ground2);
    
    
    
  }
}

function cracks(){
  if(frameCount % 40==0){
    crack = createSprite(410,370,3,10);
    //crack.debug = true;
    crack.shapeColor = "lightgray";
    crack.velocityX=-6;
    crack.depth = ground.depth;
    crack.depth = crack.depth + 1;
    crack.lifetime = 120;
    crackGroup.add(crack);
  }
  
}


function obstacles(){
  if(frameCount % 60 ==0){
    rock = createSprite(440,337);
    rock.scale = 0.15
    rock.addImage(obstacleImage);
    rock.velocityX=-6;
    rock.lifetime = 120;
    obstacleGroup.add(rock);
    
    
  }
}

function bananas(){
  if(frameCount % 70 ==0){
    banana = createSprite(410,Math.round(random(250,200)));
    banana.velocityX=-6;
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.lifetime = 120;
    bananaGroup.add(banana);
  }
}

function gameover(){
  
      banana.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      ground2Group.setVelocityXEach(0);
      ground2Group.setLifetimeEach(-1);  
      crack.velocityX=0;
      monkey.velocityX=0;
      monkey.velocityY=0;
      banana.lifetime=-1;
      rock.lifetime=-1;
      crack.lifetime=-1;
}

function reset(){
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  crackGroup.destroyEach();
  
  
}
