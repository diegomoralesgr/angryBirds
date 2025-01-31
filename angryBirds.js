const {Engine, 
  World, 
  Bodies, 
  Body, 
  Constraint, 
  MouseConstraint,
  Mouse
} = Matter;

let engine, 
world, 
ground, 
bird, 
slingShot, 
boxes = [], 
mc, 
redImg,
crateImg,
grassImg;

function preload(){
  redImg = loadImage("assets/img/RedBird.png")
  crateImg = loadImage("assets/img/crate.png")
  grassImg = loadImage("assets/img/grass.jpg")
}

function setup() {
  const canvas = createCanvas(640, 480);

  engine = Engine.create();
  world = engine.world;

  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  mc = MouseConstraint.create(
    engine, {
      mouse: mouse,
      collisionFilter:{
        mask: 2
      }
  });
  
  World.add(world, mc);


  ground = new Ground(width/2, height-10, width, 20, grassImg);
  for (let j = 0; j<4; j++){
    for (let i=0; i<10; i++){
      const box = new Box(
        400 + 50*j, height - 40*i, 40, 40, crateImg
      );
      boxes.push(box);
    }
  }
  bird = new Bird(150, 350, 20, 2, redImg);
  slingShot = new SlingShot(bird);

}

function draw() {
  background(0, 181, 226);

  Engine.update(engine);
  slingShot.fly(mc);
  ground.show();
  for(const box of boxes) {
    box.show();
  }
  slingShot.show();
  bird.show();
}

function keyPressed(){
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 350, 20, 2, redImg);
    slingShot.attach(bird);
  }


}
