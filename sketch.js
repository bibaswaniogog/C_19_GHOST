var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  spookySound.loop();
 
  if (gameState === "play"){ 
    if(tower.y > 400){
        tower.y = 300
      }

      if(keyDown("space")){
        ghost.velocityY = -5;
      }
      ghost.velocityY += 0.8;
      if(keyDown("right")){
        ghost.x = ghost.x + 3;
      }
      if(keyDown("left")){
        ghost.x = ghost.x - 3;
      }

      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }

      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end";
      }
      spawnDoors();

      drawSprites()
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 300, 300);
  }
}
function spawnDoors(){
  if(frameCount % 240 === 0 ){
    var door = createSprite(Math.round(random(100, 500)),0);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 700;

    var climber = createSprite(door.x, 50);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 700;
    doorsGroup.add(door);
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    invisibleBlock = createSprite(climber.x, 65, climber.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 700;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;
  }
}
