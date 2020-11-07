
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, back, backImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage=loadImage("back.png");
}

function setup() {
  createCanvas(400,400);
  
  back=createSprite(200,200);
  back.addImage(backImage);
  
  monkey=createSprite(80,350,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.11;
  
  ground = createSprite(400,395,800,10);
  ground.shapeColor="lightgreen";
  ground.velocityX=-5;
  //ground.visible=false;

  FoodGroup =new Group();
  obstaclesGroup =new Group();

  score =0;
}


function draw() {
  background("black");
  
    if (keyDown("space")) {
      monkey.velocityY=-18;
    } 
  
      monkey.velocityY=monkey.velocityY+1;

    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
   if(obstaclesGroup.isTouching(monkey)) {
        monkey.velocityY = 0;
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        FoodGroup.destroyEach();
   }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  
    var survivalTime=0;
  
    food();
    obstacles();
    monkey.collide(ground);
    monkey.collide(obstaclesGroup);
  
    drawSprites();  
  
      textSize(20);
      fill("red");
      survivalTime = Math.round(frameCount/frameRate());
      text("Survival Time: "+survivalTime,10,20);
      text("Score: "+score,310,20);
}

function food() {
   
    if (frameCount % 80 === 0) {
      banana = createSprite(400,200);
      banana.addImage(bananaImage);
      banana.scale=0.07;
      banana.y = random(120,250);    
      banana.velocityX =-5;
      banana.lifetime=100;
    
      FoodGroup.add(banana);
  
  }
}

function obstacles(){
    if(frameCount % 300 === 0) {
      obstacle = createSprite(400,360);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.17;
      obstacle.velocityX =-6;
      obstacle.lifetime=100;
      obstacle.setCollider("circle",0,0,200);
      //obstacle.debug=true;
      obstaclesGroup.add(obstacle);
  }
}



