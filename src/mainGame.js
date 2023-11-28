"use strict";

var currentlySelected;
var CTRLPressed, ALTPressed, SHIFTPressed = false;
var lastPressed = {id:undefined}
var lastTimePressed = new Date().getTime();
var spawningDisabled = false;
var restartDisabled = false;
var eraserDisabled = false;
var MirrorSpawning = true;
var reflectiveWalls = true;
var ShotsLeft = Infinity;
var EraserObject;


function hasDoubleClicked(classObject){
  if (classObject.id != lastPressed.id){
    lastPressed = classObject;
    lastTimePressed = new Date().getTime();
    return false;
  }
  if (lastTimePressed > new Date().getTime()-500){
    lastPressed = {id:undefined}
    lastTimePressed = new Date().getTime();
    return true;
  }
  lastPressed = {id:undefined};
  return false;
}

function handleDoubleClicks(name, classObject){
  let doubleClicked = hasDoubleClicked(classObject);
  if (!doubleClicked){return false;}
  if (name == 'Laser' || name == 'FlashLight'){
    if (ShotsLeft <= 0){
      let tmp = new ShowText('No more shots can be fired for this level', window.innerHeight*0.10);
      setTimeout(tmp.delete.bind(tmp), 1000);
      return;
      }
    ShotsLeft -= 1;
  }
  if (name == 'Laser'){
        classObject.shoot(mainGame, window.innerWidth, window.innerHeight * 0.97, [255, 0, 0], window.innerWidth *0.01);
      } else if (name == 'FlashLight') {
        classObject.shoot(mainGame, window.innerWidth, window.innerHeight * 0.97, [255, 255, 0], window.innerWidth *0.01);
      }
      return true;
}

function mouseInMainGame(mouseX, mouseY){
  for (const element of renderOrder){
     let collided = element.hasCollided(mouseX, mouseY, function(){hitsItem(element.getName(), element);}, false);
    //avoid duplication firing
    if (collided){
      return true;
    }
  }
}

function hitsItem(name, ClassObject){ 
  //star is meant to be passive object[target]
  if (name == 'Star'){if (ClassObject.isInert() == false){return}}
  for (let i = renderOrder.length-1; i>=0;i--){
    if (ClassObject.id == renderOrder[i].id){
      renderOrder.splice(i, 1);
      renderOrder.push(ClassObject);
    }
  }
  currentlySelected = ClassObject;
  handleDoubleClicks(name, ClassObject);
}


function keyReleased(){
  if (key == 'Control'){
    CTRLPressed = false;
  } else if (key == 'Alt'){
    ALTPressed = false;
  } else if (key == 'Shift'){
    SHIFTPressed = false;
  }
}


var MOVEMENT_CONSTANT = window.innerWidth/100;


function handleKeyPress(){
  if (currentlySelected != undefined && currentlySelected != null){
    if (keyIsDown(37) && !CTRLPressed){
      currentlySelected.move(-MOVEMENT_CONSTANT/2, 0);
      currentlySelected.render(mainGame);
    }
    if (keyIsDown(39) && !CTRLPressed){
      currentlySelected.move(MOVEMENT_CONSTANT/2, 0);
      currentlySelected.render(mainGame);
    }
    if (keyIsDown(38)){
      currentlySelected.move(0, -MOVEMENT_CONSTANT/2);
      currentlySelected.render(mainGame);
    }
    if (keyIsDown(40)){
      currentlySelected.move(0, MOVEMENT_CONSTANT/2);
      currentlySelected.render(mainGame);
    }
  }
}

function keyPressed(){
  if (key == ' '){
    pauseLoop = !pauseLoop;
  }
  
  if (key == 'ArrowLeft' && CTRLPressed){
      if (!currentlySelected.directionChangable){
        let tmp = new ShowText('Rotating this ' + currentlySelected.getName() + ' is not allowed for this level', window.innerHeight*0.10);
        setTimeout(tmp.delete.bind(tmp), 1000);
        return;
      }
      currentlySelected.direction -= 22.5;
      currentlySelected.direction %= 360;
      return;
  }
  if (key == 'ArrowRight' && CTRLPressed){
    if (!currentlySelected.directionChangable){
        let tmp = new ShowText('Rotating this ' + currentlySelected.getName() + ' is not allowed for this level', window.innerHeight*0.10);
        setTimeout(tmp.delete.bind(tmp), 1000);
        return;
    }
    currentlySelected.direction += 22.5;
    currentlySelected.direction %= 360;
    return;
  }
  switch (key){
    case 'Control':
      CTRLPressed = true;
      return;
    case 'Alt':
      ALTPressed = true;
      return;
    case 'Shift':
      SHIFTPressed = true;
      return;
    case 'r':
      if (!restartDisabled){
        restart();
        return;
      } else {
        let tmp = new ShowText('Restarting is disabled for this level', window.innerHeight*0.10);
        setTimeout(tmp.delete.bind(tmp), 1000);
        return;
      }
    case '+':
      LightPoint.vectorSpeed *= 1.25;
      return;
    case '-':
      LightPoint.vectorSpeed *= 0.75;
      return;
    case 'e':
      EraserObject.toggleEraser(!eraserDisabled);
      return;
    case 's':
      if (ShotsLeft <= 0){
        let tmp = new ShowText('No more shots can be fired for this level', window.innerHeight*0.10);
        setTimeout(tmp.delete.bind(tmp), 1000);
        return;
      }
      if (currentlySelected == undefined || currentlySelected == null){return;}
      if (currentlySelected.getName() == 'Laser'){
        ShotsLeft -= 1;
        currentlySelected.shoot(mainGame, window.innerWidth, window.innerHeight * 0.97, [255, 0, 0], window.innerWidth *0.01);
      } else if (currentlySelected.getName() == 'FlashLight') {
        ShotsLeft -= 1
        currentlySelected.shoot(mainGame, window.innerWidth, window.innerHeight * 0.97, [255, 255, 0], window.innerWidth *0.01);
      }
      return;
  }
  spawnObject(key);
  return false;
}

function spawnObject(key){
  if (key != 'l' && key !='f' && key !='m' && key != 't'){
    return;
  }
  if (MirrorSpawning && key == 'm'){
    let newObj = new Mirror(null, null, null, null, 0, createVector(window.innerWidth/3, 40), createVector(3/5 * window.innerWidth, 40));
    currentlySelected = newObj;
    return;
  }
  if (spawningDisabled && !MirrorSpawning){
    let tmp = new ShowText('Spawning new objects is disabled for this level', window.innerHeight*0.10);
    setTimeout(tmp.delete.bind(tmp), 1000);
    return;
  }
  if (spawningDisabled && MirrorSpawning){
    let tmp = new ShowText('Spawning new objects except a mirror is disabled for this level', window.innerHeight*0.10);
    setTimeout(tmp.delete.bind(tmp), 1000);
    return;
  }
  let newObj;
  switch (key){
      case 'l':
      newObj = new Laser(window.innerWidth*0.5, window.innerHeight * 0.97/2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0);
      currentlySelected = newObj;
      return;
    case 'f':
      newObj = new FlashLight(window.innerWidth*0.5, window.innerHeight * 0.97/2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0);
      currentlySelected = newObj;
      return;
    case 't':
      newObj = new Star(window.innerWidth/2, window.innerHeight/2,  window.innerWidth*0.05,  window.innerWidth * 0.05, 0, true, true, false);
      currentlySelected = newObj;
      return;
    case 'm':
      let tmp = new ShowText('Spawning Mirrors are disabled for this level', window.innerHeight*0.10);
    setTimeout(tmp.delete.bind(tmp), 1000);
    return;
  }
}