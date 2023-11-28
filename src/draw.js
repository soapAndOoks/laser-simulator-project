"use strict";
var pauseLoop = false;
var lightPointScreen, mainGame;
var laser, flashlight, lens, mirror, bin, eraser, star, back, level, levelCompleted;
var laserShootingSound, torchClickSound, starDing, shotFailed, popSound;
var backgroundMusic;
var currentlyLoaded = Title;
var LightTrail = true;
var SFX = true;

function preload(){
  laser = loadImage('media/images/laser.png');
  flashlight = loadImage('media/images/flashlight.png');
  lens = loadImage('media/images/lens.jfif');
  mirror = loadImage('media/images/mirror.jfif');
  eraser = loadImage('media/images/eraser.jfif');
  star = loadImage('media/images/star.png');
  back = loadImage('media/images/back.png');
  level = loadImage('media/images/level.png');
  levelCompleted = loadImage('media/images/levelCompleted.png');
  laserShootingSound = loadSound('media/sound/laserShooting.mp3');
  torchClickSound = loadSound('media/sound/torchClick.mp3');
  starDing = loadSound('media/sound/starDing.mp3');
  shotFailed = loadSound('media/sound/shotFailed.mp3');
  popSound = loadSound('media/sound/pop.mp3');
  backgroundMusic = loadSound('media/sound/backgroundMusic.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight).id('canvas');
  mainGame = createGraphics(window.innerWidth, window.innerHeight);
  lightPointScreen = createGraphics(window.innerWidth, window.innerHeight)
  clear1()
  LightPoint.vectorSpeed = window.innerWidth/100;
  angleMode(DEGREES);
  loadFont('OpenSans-Regular.ttf');
  mainGame.angleMode(DEGREES);
  mainGame.textAlign(CENTER);
  mainGame.textSize(window.innerWidth/100);
  backgroundMusic.setVolume(0.2);
  //backgroundMusic.loop();
  currentlyLoaded.loadData();
  //adds this because auto play is blocked without user interaction;
  let called = false;
  function playMusicOnLoad(){
    if (called == true){return}
    backgroundMusic.setVolume(0.2);
    backgroundMusic.loop();
    called = true;
  }
  document.getElementById('canvas').addEventListener('click', playMusicOnLoad);
  //TODO
  //look into dissapearing title when uncommented lines
  let tmp2 = new ShowText('This game REQUIRES use of a desktop computer, keyboard and mouse', window.innerHeight*0.17, window.innerWidth/50);
  //setTimeout(tmp2.delete, 5000, tmp2);
 let tmp1 = new ShowText('it may have unexpected behaviour on mobile due to touch events behaving differently', window.innerHeight*0.20, window.innerWidth/50);
  //setTimeout(tmp1.delete.bind(tmp1), 5000);
}

function draw() {
  renderObjects();
  if (!reflectiveWalls){
    mainGame.push();
    mainGame.strokeWeight(10);
    mainGame.stroke('black');
    mainGame.noFill();
    mainGame.rect(0,0,window.innerWidth, window.innerHeight);
    mainGame.point(0,0);
    mainGame.pop();
  }
  image(lightPointScreen, 0, 0, window.innerWidth, window.innerHeight);
  image(mainGame, 0, 0, window.innerWidth, window.innerHeight);
  
  currentlyLoaded.calculation();
  if (currentlyLoaded.levelEnded() != false){
    clear1();
    currentlyLoaded = currentlyLoaded.levelEnded();
    currentlyLoaded.loadData();
  }
  if (mouseIsPressed){
    if (!eraserDisabled){
      EraserObject.erase();
    }
  }
}

function renderObjects(){
  mainGame.background(255, 255, 255);
  mainGame.clear();
  lightPointScreen.background(255,255,255,50);
  if (!LightTrail){lightPointScreen.background(255,255,255,255);}
  handleKeyPress();
  for (let i in LightPoint.pointsToRender){
    LightPoint.pointsToRender[i].render(lightPointScreen);
  }

  
  if (!pauseLoop){
    for (let i in LightPoint.pointsToRender){
      LightPoint.pointsToRender[i].update();
    }
  }
 for (let i in renderOrder) {
    renderOrder[i].render(mainGame);
  }
}








function mousePressed() {
  mouseInMainGame(mouseX, mouseY)
}







function restart(){
  clear1()
  currentlyLoaded.loadData();
}

function clear1(){
  mainGame.background('white');
  LightPoint.pointsToRender = [];
  LightPoint.IDCounter = 0;
  renderOrder = [];
  currentlySelected = undefined;
  renderOrderCounter = 0;
  LightPoint.vectorSpeed = window.innerWidth/100;
  spawningDisabled = false;
  restartDisabled = false;
  eraserDisabled = false;
  MirrorSpawning = true;
  ShotsLeft = Infinity;
  reflectiveWalls = true;
  EraserObject = new Eraser(mouseX, mouseY,  window.innerWidth*0.05,  window.innerWidth * 0.05, 45);
}


function windowResized(){
  restart();
}