var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, background1, backgroundImg
var BananaGroup, obstacleGroup
var score
var ground
var score;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImg = loadImage("jungle.jpg")
}



function setup() {
  createCanvas(800, 400)

  background1 = createSprite(0, 0, 800, 400)
  background1.addImage(backgroundImg);
  background1.scale = 1.5;
  background1.x = background1.width / 2;
  background1.velocityX = -4;

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  ground.visible = false;

  BananaGroup = new Group();
  ObstaclesGroup = new Group();
  score = 0;

}


function draw() 
{
  background(0);

  if (background1.x < 100) {
    background1.x = background1.width / 2;
  }

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  if (BananaGroup.isTouching(monkey)) {
    score = score + 2;
    BananaGroup.destroyEach();
  }
    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }
  


  spawnFood();
  spawnObstacles();

if (ObstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.08;
  }


  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 500, 50);
}

function spawnFood() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(180, 180, 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.x = Math.round(random(500, 600))
    banana.lifetime = 510;
    banana.scale = 0.1

    BananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    var stone = createSprite(800, 320, 10, 40);
    stone.addImage(obstaceImage);
    stone.velocityX = -6
    stone.x = Math.round(random(500, 600));
    stone.scale = 0.2;
    stone.lifetime = 420;

    ObstaclesGroup.add(stone);

  }
}