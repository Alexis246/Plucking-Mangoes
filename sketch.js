const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState = "onSling";
var engine, world;
var magno1,mango2,mango3,mango4,mango5;
var backgroundImg;
var stone, slingshot;
var tree, treeImg;
var boy, boyImg;


function preload() {
    
}

function setup(){
    var canvas = createCanvas(800,700);
    rectMode(CENTER);

    engine = Engine.create();
    world = engine.world;


    ground = new Ground(width/2,height,800,40);

    mango1 = new Mango(525,400,50,50);
    mango2 = new Mango(575,350,50,50);
    mango3 = new Mango(605,440,50,50);
    mango4 = new Mango(655,300,50,50);
    mango5 = new Mango(700,400,50,50);

    stone1 = new Stone(100,550,50,50);

    //boy = createSprite(100,650,50,50);
    //boy.addImage(boyImg);
    //tree = createSprite(500,500,100,100);
    //tree.addImage(treeImg);

    slingshot = new SlingShot(stone1.body,{x:100, y:550});
}

function draw(){
    background("white");
    Engine.update(engine);
    ground.display();
    mango1.display();
    mango2.display();
    mango3.display();
    mango4.display();
    mango5.display();

    stone1.display();
    slingshot.display();   

    detectCollision(stone1,mango1);
    detectCollision(stone1,mango2);
    detectCollision(stone1,mango3);
    detectCollision(stone1,mango4);
    detectCollision(stone1,mango5);
}

function mouseDragged(){
    if (gameState != "launched"){
    Matter.Body.setPosition(stone1.body, {x: mouseX , y: mouseY});
}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(stone1.body);
        gameState = "onSling";
    }
}

function detectCollision(stoneObject,mangoObject){
    var mangoBodyPosition = mangoObject.body.position;
    var stoneBodyPosition = stoneObject.body.position;
    var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
    if (distance <= mangoObject.width + stoneObject.width/2){
        Matter.Body.setStatic(mangoObject.body,false);
    }
}