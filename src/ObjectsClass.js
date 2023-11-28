"use strict";



var renderOrder = [];
var renderOrderCounter = 0;



class StaticImage {
  constructor (picName, xPos, yPos, width, height, direction, jumperFunction=false, canBeErased = true) {
    this.id = renderOrderCounter;
    this.picName = picName;
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = height;
    this.width = width;
    this.hitBoxLeftTop = [xPos, yPos];
    this.hitBoxRightBottom = [xPos+width, yPos+height];
    this.direction = direction;
    this.jumperFunction = jumperFunction;
    this.canBeErased = canBeErased;
    renderOrderCounter += 1;
    renderOrder.push(this);
  }
  
  render(areaToSpawn){
    areaToSpawn.push();
    areaToSpawn.imageMode(CENTER);
    areaToSpawn.translate(this.xPos+this.width/2, this.yPos+this.height/2);
    areaToSpawn.rotate(this.direction);
    areaToSpawn.image(this.picName, 0, 0, this.width, this.height);
    areaToSpawn.pop();
  }
  
  hasCollided(xPos, yPos, functionCall, isEraser = true) {
    if (isEraser && !this.canBeErased){return false;}
   if (xPos > this.hitBoxLeftTop[0] & xPos<this.hitBoxRightBottom[0] & yPos > this.hitBoxLeftTop[1] & yPos < this.hitBoxRightBottom[1]) {
     if (this.jumperFunction){let a = this.jumperFunction();return a;}
     functionCall();
     return true;
   }
   return false;
  }
  getName(){
    return this.constructor.name;
  }
}


class Star extends StaticImage {
  constructor(xPos, yPos, width, height, direction, deleteLightPoint, canBeErased = true, inert = false){
    super(star, xPos, yPos, width, height, direction, undefined, canBeErased);
    this.deleteLightPoint = deleteLightPoint;
    this.hit = false;
    this.inert = inert;
  }
  isInert(){
    return this.inert;
  }
  
  hitLightPoint(){
    this.hit = true;
    starDing.setVolume(0.5);
    if (SFX){
      starDing.play();
    }
    for (let i = 0; i<renderOrder.length; i++){
      if (renderOrder[i].id == this.id){renderOrder.splice(i,1)}
    }
  }

  move(xOffset, yOffset){
    if (this.isInert()){return}
    this.xPos += xOffset;
    this.yPos += yOffset;
  }
  get directionChangable() {return !this.isInert();}
}

class ShowText {
  constructor(text, y=window.innerHeight*0.9, textSize = undefined, rect = false, jumperFunction, rectColor = [0,0,0]){
    this.y = y;
    this.name = 'text';
    this.text = text;
    this.textSize = textSize;
    this.rect = rect;
    this.hitBoxLeftTop = [window.innerWidth*0.25, this.y-this.textSize];
    this.hitBoxRightBottom = [window.innerWidth*0.25+window.innerWidth*0.5, this.y-this.textSize+this.textSize*1.2];
    this.jumperFunction = jumperFunction;
    this.rectColor = rectColor;
    renderOrderCounter += 1;
    renderOrder.push(this);
  }
  render(buffer){
    if (this.rect == false){
      if (this.textSize == undefined || this.textSize == 'DEFAULT'){
        buffer.text(this.text, window.innerWidth/2, this.y);
      } else {
        buffer.push();
        buffer.textSize(this.textSize);
        buffer.text(this.text, window.innerWidth/2, this.y);
        buffer.pop();
      }
      return
    }
    if (this.rect == false){new TypeError('failed postcondition check');}
    buffer.push();
    buffer.textSize(this.textSize);
    buffer.stroke(this.rectColor);
    buffer.rect(window.innerWidth*0.25, this.y-this.textSize, window.innerWidth*0.5, this.textSize*1.2);
    buffer.pop();
    buffer.push();
    buffer.textSize(this.textSize);
    buffer.text(this.text, window.innerWidth/2, this.y);
    buffer.pop();
  }
  
  hasCollided(xPos, yPos, functionCall, isEraser = false){
    if (isEraser == true){return false;}
    if (this.rect == false){return false;}
    if (xPos > this.hitBoxLeftTop[0] & xPos<this.hitBoxRightBottom[0] & yPos > this.hitBoxLeftTop[1] & yPos < this.hitBoxRightBottom[1]) {
    if (this.jumperFunction != false && this.jumperFunction != undefined && this.jumperFunction != null){
      this.jumperFunction();
      return false;
    }
    functionCall();
    return true;
   }
   return false;
  }
  delete(){
    for (let i = 0; i<renderOrder.length; i++){
      if (renderOrder[i].id == this.id){
        renderOrder.splice(i,1);
        return true;
      }
    }
    return false;
  }
  getName(){
    return this.constructor.name;
  }
}




class MovableObjects extends StaticImage {
  constructor(picName, xPos, yPos, width, height, direction, movable = true, directionChangable = true, canBeErased = true) {
    super(picName, xPos, yPos, width, height, direction, false, canBeErased);
    this.movable = movable;
    this.directionChangable = directionChangable;
  }
  move(xOffset, yOffset){
    if (this.movable == false){
      let tmp = new ShowText('moving ' + this.getName() + ' is disabled for this level', window.innerHeight*0.10);
    setTimeout(tmp.delete.bind(tmp), 1000);
      return;
    }
    this.xPos += xOffset;
    this.yPos += yOffset;
    this.hitBoxLeftTop = [this.xPos, this.yPos];
    this.hitBoxRightBottom = [this.xPos+this.width, this.yPos+this.height];
  }
}





class Laser extends MovableObjects {
  constructor(xPos, yPos, width, height, direction, shootable = true, movable = true, directionChangable = true, erasable = true){
    super(laser, xPos, yPos, width, height, direction, movable, directionChangable, erasable);
    this.shootable = shootable;
  }
  shoot(buffer, bufferWidth, bufferHeight, dotColor, dotSize){
    new Error('jfjf');
    if (this.shootable == false){
      if (SFX){
        shotFailed.play();
      }
      ShotsLeft += 1;
      return;
    }
    let sourceVector = createVector(this.xPos +this.width/2, this.yPos+this.height/2);
    let destVector = createVector(Math.cos(radians((this.direction))), Math.sin(radians((this.direction)))).normalize();
    let point = new LightPoint(sourceVector, destVector, buffer, bufferWidth, bufferHeight, dotColor, dotSize);
    LightPoint.pointsToRender.push(point);
    laserShootingSound.setVolume(0.5);
    if (SFX){
      laserShootingSound.play();
    }
    return point;
  }
}

class FlashLight extends MovableObjects{
  constructor(xPos, yPos, width, height, direction, shootable = true){
    super(flashlight, xPos, yPos, width, height, direction);
    this.shootable = shootable
  }
  shoot(buffer, bufferWidth, bufferHeight, dotColor, dotSize){
    if (this.shootable == false){
      shotFailed.play();
      return;
    }
    for (let i = -10; i<=9; i += 2){
      let sourceVector = createVector(this.xPos +this.width/2, this.yPos+this.height/2)
      let destVector = createVector(Math.cos(radians((this.direction+i))), Math.sin(radians((this.direction+i)))).normalize();
      let point = new LightPoint(sourceVector, destVector, buffer, bufferWidth, bufferHeight, dotColor, dotSize);
      LightPoint.pointsToRender.push(point);
    }
    if (SFX){
      torchClickSound.play();
    }
    return point;
  }
}



class Mirror extends MovableObjects{
  constructor(xPos, yPos, width, height, direction, VectorStart, VectorStop, movable = true, directionChangable = true){
    super(mirror, xPos, yPos, width, height, direction, movable, directionChangable);
    this.VectorStart = VectorStart;
    this.VectorStop = VectorStop;
    this.Vector = createVector(1,0);
    this.lastDirection = 0;
  }
  
  #updateVectors(){
    this.Vector.x = Math.cos(radians(this.direction));
    this.Vector.y = Math.sin(radians(this.direction));
    let centerX = (this.VectorStart.x+this.VectorStop.x)/2;
    let centerY = (this.VectorStart.y+this.VectorStop.y)/2;
    
    this.VectorStart = createVector(this.VectorStart.x-centerX, this.VectorStart.y-centerY);
    
    this.VectorStart.rotate(this.direction - this.lastDirection);
    
    this.VectorStart.x += centerX;
    this.VectorStart.y += centerY;
    this.VectorStop = createVector(this.VectorStop.x-centerX, this.VectorStop.y-centerY);
    
    this.VectorStop.rotate(this.direction - this.lastDirection);
    
    this.VectorStop.x += centerX;
    this.VectorStop.y += centerY;
    this.lastDirection = this.direction;
  }
  
  render(buffer){
    buffer.push();
    this.#updateVectors();
    buffer.stroke('silver');
    buffer.strokeWeight(window.width*0.01);
    buffer.line(this.VectorStart.x, this.VectorStart.y, this.VectorStop.x, this.VectorStop.y);
    buffer.pop();
  }
  move(xOffset, yOffset){
    if (this.movable == false){
      let tmp = new ShowText('moving ' + this.getName() + ' is disabled for this level', window.innerHeight*0.10);
    setTimeout(tmp.delete.bind(tmp), 1000);
      return;
    }
    this.VectorStart.x += xOffset;
    this.VectorStart.y += yOffset;
    this.VectorStop.x += xOffset;
    this.VectorStop.y += yOffset;
  }
  
  #findDistance(Vector1, Vector2){
    return p5.Vector.dist(Vector1, Vector2)
  }
  
  hasCollided(xPos, yPos, functionCall){
    let cutoff = 1;
    let currPoint = createVector(xPos, yPos);
    let dist1 = this.#findDistance(this.VectorStart, currPoint) + this.#findDistance(currPoint, this.VectorStop);
    let dist2 = this.#findDistance(this.VectorStart, this.VectorStop);
    if (abs(dist2 - dist1) < cutoff){
      functionCall();
    } else {
      return false;
    }
  }
}




class Lens extends MovableObjects {
   constructor(xPos, yPos, diameter, direction){
    super(lens, xPos, yPos, width, height, direction);
    this.diameter = diameter;
   }
  render(buffer){
    buffer.push();
    buffer.stroke(164, 194, 205, 100);
    buffer.fill(164, 194, 205, 100);
    buffer.strokeWeight(window.width*0.01);
    buffer.circle(this.xPos, this.yPos, this.diameter)
    buffer.pop();
  }
  hasCollided(xPos, yPos, functionCall){
    let r = p5.Vector.dist(createVector(this.xPos, this.yPos), createVector(xPos, yPos))
    if (r <= this.diameter/2){
      functionCall();
      return true;
    } else{
      return false;
    }
  }
}


class Eraser extends StaticImage {
  constructor(xPos, yPos, width, height, direction){
    super(eraser, xPos, yPos, width, height, direction);
    this.eraseOn = false;
  }
  render(buffer){
    if (!this.eraseOn){return;}
    this.xPos = mouseX-this.width/2;
    this.yPos = mouseY-this.height/2;
    super.render(buffer);
  }
  hasCollided(xPos, yPos, functionCall, supress = true){
    if (supress){return false}
    super.hasCollided(xPos, yPos, functionCall);
  }
  
  erase(){
    if (!this.eraseOn){return;}
    new Error(9)
    this.hitBoxLeftTop = [this.xPos, this.yPos];
    this.hitBoxRightBottom = [this.xPos+this.width, this.yPos+this.height];
    for (const element of LightPoint.pointsToRender){
      this.hasCollided(element.sourceVector.x, element.sourceVector.y, function a(){element.delete()}, false);
    }
    for (let i = 0; i<renderOrder.length; i++){
      let a = function(){renderOrder.splice(i,1);currentlySelected=undefined}
      renderOrder[i].hasCollided(this.xPos, this.yPos, a, true);
    }
  }
  toggleEraser(permissable = true){
    if (permissable == false){
      let tmp = new ShowText('Eraser functions are disabled for this level', window.innerHeight*0.10);
      setTimeout(tmp.delete.bind(tmp), 1000);
      return;
    }
    this.eraseOn = !this.eraseOn;
  }
}




class LightPoint {
  static IDCounter = 0;
  
  constructor(sourceVector, dirVector, buffer, bufferWidth, bufferHeight, dotColor, dotSize) {
    this.sourceVector = sourceVector;
    this.dirVector = dirVector;
    this.buffer = buffer;
    this.bufferWidth = bufferWidth;
    this.bufferHeight = bufferHeight;
    this.dotColor = dotColor;
    this.dotSize = dotSize;
    this.history = [];
    this.id = LightPoint.IDCounter;
    LightPoint.IDCounter += 1;
  }
  
  static vectorSpeed = 1;
  static pointsToRender = [];
  static idCounter = 0;

  #reflect(mirrorVector){
    mirrorVector.normalize();
    this.dirVector.normalize();
    let k = p5.Vector.dot(this.dirVector, mirrorVector)/p5.Vector.dot(mirrorVector, mirrorVector);
    let minusDirVector = p5.Vector.mult(this.dirVector, -1);
    let twoMirrorVector = p5.Vector.mult(mirrorVector, 2);
    let mirrorVectorAndK = p5.Vector.mult(twoMirrorVector, k);
    let reflectedMirrorVector = p5.Vector.add(minusDirVector, mirrorVectorAndK);
    this.dirVector = reflectedMirrorVector;
    return reflectedMirrorVector;
  }

  
  update(){
    for (const element of renderOrder){
      if (element.getName() == 'Mirror'){
        let a = function(){this.#reflect(element.Vector);}
        element.hasCollided(this.sourceVector.x, this.sourceVector.y, a.bind(this));
      } else if (element.getName() == 'Lens'){
        let b = p5.Vector.sub(createVector(element.xPos, element.yPos), this.sourceVector);
        let a = function(){this.#reflect(b)}
        element.hasCollided(this.sourceVector.x, this.sourceVector.y, a.bind(this));
      } else if (element.getName() == 'Star'){
        let a = function(){this.delete();element.hitLightPoint();}
        element.hasCollided(this.sourceVector.x, this.sourceVector.y, a.bind(this), false);
      }
    }
    this.#handleWalls(reflectiveWalls);
  }

  #handleWalls(reflect = true){
    let finalVector = p5.Vector.mult(this.dirVector.normalize(),  LightPoint.vectorSpeed);
    this.sourceVector.add(finalVector);
    
    if (this.sourceVector.x > this.bufferWidth || this.sourceVector.x < 0){
      if (!reflect){
        popSound.setVolume(0.5);
        popSound.play();
        this.delete();
        return;
    }
      this.dirVector.x *= -1;
    } else if (this.sourceVector.y > this.bufferHeight|| this.sourceVector.y < 0){
      if (!reflect){
        popSound.setVolume(0.5);
        popSound.play();
        this.delete();
        return;
    }
      this.dirVector.y *= -1;
    }
  }
  
  render(buffer) {
    buffer.push();
    buffer.stroke(this.dotColor);
    buffer.fill(this.dotColor);
    buffer.strokeWeight(this.dotSize);
    buffer.point(this.sourceVector);
    buffer.pop(); 
  }

  delete(){
    for (let i = 0; i<LightPoint.pointsToRender.length; i++){
      if (LightPoint.pointsToRender[i].id == this.id){LightPoint.pointsToRender.splice(i,1)}
    }
  }
}


