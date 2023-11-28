'use strict';

function allStarsHit(StarArray){
  for (const element of StarArray){
    if (element.hit == false){return false}
  }
  return true;
}

function generateRandomStars(){
  let StarX = map(Math.random(),0,1,0,window.innerWidth*0.90);
  let StarY = map(Math.random(),0,1,0, window.innerHeight*0.85);
  let result = new Star(StarX, StarY,  window.innerWidth*0.05,  window.innerWidth * 0.05, 0, true);
  return result;
}

class ShotCounterText {
  constructor(){
    this.id = renderOrderCounter;
    renderOrderCounter += 1;
    renderOrder.push(this);
  }
  
  render(buffer){
    buffer.push();
    buffer.rectMode(CORNER);
    buffer.textSize(this.width/800);
    buffer.stroke('black');
    buffer.textAlign(LEFT);
    buffer.text('Shots Left: ' + ShotsLeft, window.innerWidth*0.8, window.innerHeight*0.01, window.innerWidth, window.innerHeight*0.2);
    buffer.pop();
  }
  
  hasCollided(){
    return false;
  }
  getName(){
    return this.constructor.name;
  }
}



class Level1 {
  static #stars = [];
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level1.#stars = [];
    ShotsLeft = 4;
    MirrorSpawning = false;
    spawningDisabled = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
    Level1.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level1.#loadNext=Levels});
let tmp = new ShowText('Level 1:Movement', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level1.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0);
    currentlySelected = Level1.#laser;
    Level1.#text_1 = new ShowText("use the arrow keys to move");
    Level1.#timeCounter = new Date().getTime();
    Level1.#stars.push(generateRandomStars(Level1.#stars));
    Level1.#stars.push(generateRandomStars(Level1.#stars));
    Level1.#stars.push(generateRandomStars(Level1.#stars));
    
  }
  static calculation(){
    switch (Level1.#textShown) {
      case 1:
      if (Level1.#timeCounter+5000<new Date().getTime()){
        Level1.#text_1.delete();
        Level1.#text_2 = new ShowText("Use CTRL + [LeftArrow, RightArrow] to turn");
        Level1.#timeCounter = new Date().getTime();
        Level1.#textShown = 2;
      }
      return;
      case 2:
      if (Level1.#timeCounter+ 5000<new Date().getTime()){
        Level1.#text_2.delete();
        Level1.#text_3 = new ShowText("Double Click the Laser or press 's' to shoot");
        Level1.#timeCounter = new Date().getTime();
        Level1.#textShown = 3;
      }
      return;
      case 3:
      if (Level1.#timeCounter+ 5000<new Date().getTime()){
        Level1.#text_3.delete();
        Level1.#textShown = 4;
      }
      return;
    }
  }
  static levelEnded(){
    if (Level1.#loadNext != false){
      return Level1.#loadNext;
    }
    if (!allStarsHit(Level1.#stars)){return false;}
    if (allStarsHit(Level1.#stars) && Level1.#levelDelayTimer == 0){
      Level1.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level1.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(1);
        return Levels;
      } else {
        return false;
      }
    }
  }
}



class Level2 {
  static #stars = [];
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level2.#stars = [];
    ShotsLeft = 3;
    MirrorSpawning = false;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
     Level2.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, false);
    currentlySelected = Level2.#laser;
    Level2.#text_1 = new ShowText("This laser is malfunctioning=>Press S to try");
    Level2.#timeCounter = new Date().getTime();
    LightPoint.vectorSpeed*=0.1;
    Level2.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level2.#loadNext=Levels});
let tmp = new ShowText('Level 2:Broken', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level2.#stars.push(generateRandomStars(Level2.#stars));
    Level2.#stars.push(generateRandomStars(Level2.#stars));
    Level2.#stars.push(generateRandomStars(Level2.#stars));
  }
  static calculation(){
    switch (Level2.#textShown) {
      case 1:
      if (Level2.#timeCounter+5000<new Date().getTime()){
        Level2.#text_1.delete();
        Level2.#text_2 = new ShowText("Press L or F to spawn a Laser or a Flashlight");
        Level2.#timeCounter = new Date().getTime();
        Level2.#textShown = 2;
      }
      return;
      case 2:
      if (Level2.#timeCounter+ 7000<new Date().getTime()){
        Level2.#text_2.delete();
        Level2.#text_3 = new ShowText("Use Either '+' or '-' to alter Laser speed");
        Level2.#timeCounter = new Date().getTime();
        Level2.#textShown = 3;
      }
      return;
      case 3:
      if (Level2.#timeCounter+ 7000<new Date().getTime()){
        Level2.#text_3.delete();
        Level2.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level2.#loadNext != false){
      return Level2.#loadNext;
    }
    if (!allStarsHit(Level2.#stars)){return false;}
    if (allStarsHit(Level2.#stars) && Level2.#levelDelayTimer == 0){
      Level2.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level2.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(2);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level3 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level3.#stars = [];
    ShotsLeft = 3;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
    Level3.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level3.#loadNext=Levels});
    let tmp = new ShowText('Level 3:Petrified Laser', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level3.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false);
    currentlySelected = Level3.#laser;
    Level3.#text_1 = new ShowText("Spawn a Mirror by clicking 'm' (laser movement/direction is locked in this level)");
    Level3.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level3.#stars.push(generateRandomStars(Level3.#stars));
    Level3.#stars.push(generateRandomStars(Level3.#stars));
    Level3.#stars.push(generateRandomStars(Level3.#stars));
  }
  static calculation(){
    switch (Level3.#textShown) {
      case 1:
      if (Level3.#timeCounter+5000<new Date().getTime()){
        Level3.#text_1.delete();
        Level3.#text_2 = new ShowText('Move and rotate the mirror to get the stars');
        Level3.#timeCounter = new Date().getTime();
        Level3.#textShown = 2;
      }
      return;
      case 2:
      if (Level3.#timeCounter+ 7000<new Date().getTime()){
        Level3.#text_2.delete();
        Level3.#text_3 = new ShowText("Select the laser and shoot the stars");
        Level3.#timeCounter = new Date().getTime();
        Level3.#textShown = 3;
      }
      return;
      case 3:
      if (Level3.#timeCounter+ 7000<new Date().getTime()){
        Level3.#text_3.delete();
        Level3.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level3.#loadNext != false){
      return Level3.#loadNext;
    }
    if (!allStarsHit(Level3.#stars)){return false;}
    if (allStarsHit(Level3.#stars) && Level3.#levelDelayTimer == 0){
      Level3.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level3.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(3);
        return Levels;
      } else {
        return false;
      }
    }
  }
}



class Level4 {
  static #stars = [];
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #text_4;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level4.#stars = [];
    ShotsLeft = 1;
    MirrorSpawning = false;
    spawningDisabled = true;
    restartDisabled = false;
    reflectiveWalls = true;
    Level4.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level4.#loadNext=Levels});
   let tmp = new ShowText('Level 4:e for Elephant?', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText()
     Level4.#laser = new Laser(window.innerWidth*0.05, window.innerHeight * 0.475,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false, true);
    let a = new Mirror(null, null, null, null, 0, createVector(window.innerWidth*3/5, window.innerHeight/2.1), createVector(4/9 * window.innerWidth, window.innerHeight/2.1), false, false);
    a.direction -= 90;
    currentlySelected = Level4.#laser;
    Level4.#text_1 = new ShowText("Note:All objects in this level are immovable");
    Level4.#timeCounter = new Date().getTime();
    eraserDisabled = false;
    Level4.#stars.push(new Star(window.innerWidth*0.9, window.innerHeight*0.5,  window.innerWidth*0.05,  window.innerWidth * 0.05, 0, true, true));
  }
  static calculation(){
    switch (Level4.#textShown) {
      case 1:
      if (Level4.#timeCounter+5000<new Date().getTime()){
        Level4.#text_1.delete();
        Level4.#text_2 = new ShowText("Toggle the eraser by tapping 'e'");
        Level4.#timeCounter = new Date().getTime();
        Level4.#textShown = 2;
      }
      return;
      case 2:
      if (Level4.#timeCounter+ 7000<new Date().getTime()){
        Level4.#text_2.delete();
        Level4.#text_3 = new ShowText("hold and swipe mouse across Mirror(left to right) (restart(press 'r') to restart in case of an accident)");
        Level4.#timeCounter = new Date().getTime();
        Level4.#textShown = 3;
      }
      return;
      case 3:
      if (Level4.#timeCounter+ 7000<new Date().getTime()){
        Level4.#text_3.delete();
        Level4.#text_4 = new ShowText("Tap 'e' again to deselect the eraser and shoot the star!");
        Level4.#timeCounter = new Date().getTime();
        Level4.#textShown = 4;
      }
      case 4:
      if (Level4.#timeCounter + 7000<new Date().getTime()){
        Level4.#text_4.delete();
        Level4.#textShown = 5;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level4.#loadNext != false){
      return Level4.#loadNext;
    }
    if (!allStarsHit(Level4.#stars)){return false;}
    if (allStarsHit(Level4.#stars) && Level4.#levelDelayTimer == 0){
      Level4.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level4.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(4);
        return Levels;
      } else {
        return false;
      }
    }
  }
}



class Level5 {
  static #restartedCounter = 0;
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level5.#levelDelayTimer = new Date().getTime();
    Level5.#restartedCounter += 1
    Level5.#stars = [];
    ShotsLeft = 0;
    spawningDisabled = false;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
    Level5.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level5.#loadNext=Levels});
let tmp = new ShowText('Level 5:Lasers Get Sleep Paralysis?', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level5.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false);
    currentlySelected = Level5.#laser;
    Level5.#text_1 = new ShowText("Eraser and Shooting is disabled");
    Level5.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level5.#stars.push(generateRandomStars(Level5.#stars));
    Level5.#stars.push(generateRandomStars(Level5.#stars));
    Level5.#stars.push(generateRandomStars(Level5.#stars));
    Level5.#stars.push(generateRandomStars(Level5.#stars));
    Level5.#stars.push(generateRandomStars(Level5.#stars));
    Level5.#stars.push(generateRandomStars(Level5.#stars));
  }
  static calculation(){
    switch (Level5.#textShown) {
      case 1:
      if (Level5.#timeCounter+5000<new Date().getTime()){
        Level5.#text_1.delete();
        Level5.#text_2 = new ShowText('How will you get around this one?');
        Level5.#timeCounter = new Date().getTime();
        Level5.#textShown = 2;
      }
      return;
      case 2:
      if (Level5.#timeCounter+ 7000<new Date().getTime()){
        Level5.#text_2.delete();
        Level5.#text_3 = new ShowText("Just press R to Restart");
        Level5.#timeCounter = new Date().getTime();
        Level5.#textShown = 3;
      }
      return;
      case 3:
      if (Level5.#timeCounter+ 7000<new Date().getTime()){
        Level5.#text_3.delete();
        Level5.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
  if (Level5.#loadNext != false){
    Level5.#restartedCounter = 0;
      return Level5.#loadNext;
    }
    if (Level5.#restartedCounter == 1){return false;}
    if (Level5.#levelDelayTimer+1000 < new Date().getTime()){
      Level5.#restartedCounter = 0;
      starDing.setVolume(0.3);
      if (SFX){
        starDing.play();
      }
      GameData.Levels.addCompletedLevel(5);
      return Levels;
    } else {
      return false;
    }
  }
}







class Level6 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #text_4;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level6.#stars = [];
    ShotsLeft = 6;
    spawningDisabled = true;
    MirrorSpawning = false;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
     Level6.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, true);
    currentlySelected = Level6.#laser;
    Level6.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level6.#loadNext=Levels});
let tmp = new ShowText('Level 6:Moving Stars!', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level6.#text_1 = new ShowText("Use the spacebar to pause the light beam");
    Level6.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level6.#stars.push(generateRandomStars(Level6.#stars));
    Level6.#stars.push(generateRandomStars(Level6.#stars));
    Level6.#stars.push(generateRandomStars(Level6.#stars));
    Level6.#stars.push(generateRandomStars(Level6.#stars));
  }
  static calculation(){
    for (const element of Level6.#stars){
      let tmpVector = createVector(element.xPos-window.innerWidth/2, element.yPos-window.innerHeight/2);
      tmpVector.rotate(1);
      tmpVector.add(createVector(window.innerWidth/2, window.innerHeight/2))
      element.xPos = tmpVector.x;
      element.yPos = tmpVector.y;
      element.hitBoxLeftTop = [element.xPos, element.yPos];
      element.hitBoxRightBottom = [element.xPos+element.width, element.yPos+element.height];
    }
    
    switch (Level6.#textShown) {
      case 1:
      if (Level6.#timeCounter+5000<new Date().getTime()){
        Level6.#text_1.delete();
        Level6.#text_2 = new ShowText('Stop the light in the path of the moving stars and move it when the star comes (or just wait for luck)');
        Level6.#timeCounter = new Date().getTime();
        Level6.#textShown = 2;
      }
      return;
      case 2:
      if (Level6.#timeCounter+ 7000<new Date().getTime()){
        Level6.#text_2.delete();
        Level6.#text_3 = new ShowText("Remember how unpredictable light bounces?");
        Level6.#timeCounter = new Date().getTime();
        Level6.#textShown = 3;
      }
      return;
      case 3:
      if (Level6.#timeCounter+ 7000<new Date().getTime()){
        Level6.#text_3.delete();
        Level6.#text_4 = new ShowText("Easter Egg: controllng the speed of the light (+/-) also works here.)");
        Level6.#timeCounter = new Date().getTime();
        Level6.#textShown = 4;
      }
       return;
      case 4:
      if (Level6.#timeCounter+ 7000<new Date().getTime()){
        Level6.#text_4.delete();
        Level6.#textShown = 5;
        }
        return;
    }
  }
  static levelEnded(){
    if (Level6.#loadNext != false){
      return Level6.#loadNext;
    }
    if (!allStarsHit(Level6.#stars)){return false;}
    if (allStarsHit(Level6.#stars) && Level6.#levelDelayTimer == 0){
      Level6.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level6.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(6);
        return Levels;
      } else {
        return false;
      }
    }
  }
}




class Level7 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level7.#stars = [];
    ShotsLeft = 7;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
    Level7.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level7.#loadNext=Levels});
    let tmp = new ShowText('Level 7:Revenge Of the 7 Stars', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level7.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false);
    currentlySelected = Level7.#laser;
    Level7.#text_1 = new ShowText("The Sevens will prevail (777777777...)");
    Level7.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
    Level7.#stars.push(generateRandomStars(Level7.#stars));
  }
  static calculation(){
    for (const element of Level7.#stars){
      let tmpVector = createVector(element.xPos-window.innerWidth/2, element.yPos-window.innerHeight/2);
      tmpVector.rotate(1);
      tmpVector.add(createVector(window.innerWidth/2, window.innerHeight/2))
      element.xPos = tmpVector.x;
      element.yPos = tmpVector.y;
      element.hitBoxLeftTop = [element.xPos, element.yPos];
      element.hitBoxRightBottom = [element.xPos+element.width, element.yPos+element.height];
    }
    
    switch (Level7.#textShown) {
      case 1:
      if (Level7.#timeCounter+5000<new Date().getTime()){
        Level7.#text_1.delete();
        Level7.#text_2 = new ShowText('Round 2: spawn a mirror to get the stars');
        Level7.#timeCounter = new Date().getTime();
        Level7.#textShown = 2;
      }
      return;
      case 2:
      if (Level7.#timeCounter+ 7000<new Date().getTime()){
        Level7.#text_2.delete();
        Level7.#text_3 = new ShowText("Select the laser and shoot the stars");
        Level7.#timeCounter = new Date().getTime();
        Level7.#textShown = 3;
      }
      return;
      case 3:
      if (Level7.#timeCounter+ 7000<new Date().getTime()){
        Level7.#text_3.delete();
        Level7.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level7.#loadNext != false){
      return Level7.#loadNext;
    }
    if (!allStarsHit(Level7.#stars)){return false;}
    if (allStarsHit(Level7.#stars) && Level7.#levelDelayTimer == 0){
      Level7.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level7.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(7);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level8 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level8.#stars = [];
    ShotsLeft = 10;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = true;
    Level8.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level8.#loadNext=Levels});
    let tmp = new ShowText('Level 8:Moving?', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level8.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 180, true, false, false);
    currentlySelected = Level8.#laser;
    Level8.#text_1 = new ShowText("This level is closely linked to Level 7 and 6");
    Level8.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
    Level8.#stars.push(generateRandomStars(Level8.#stars));
  }
  static calculation(){
    for (const element of Level8.#stars){
      let tmpVector = createVector(element.xPos-window.innerWidth/2, element.yPos-window.innerHeight/2);
      tmpVector.rotate(0.75);
      tmpVector.add(createVector(window.innerWidth/2, window.innerHeight/2))
      element.xPos = tmpVector.x;
      element.yPos = tmpVector.y;
      element.hitBoxLeftTop = [element.xPos, element.yPos];
      element.hitBoxRightBottom = [element.xPos+element.width, element.yPos+element.height];
    }
    switch (Level8.#textShown) {
      case 1:
      if (Level8.#timeCounter+5000<new Date().getTime()){
        Level8.#text_1.delete();
        Level8.#text_2 = new ShowText('But this is much Harder, even the Laser is flipped :)');
        Level8.#timeCounter = new Date().getTime();
        Level8.#textShown = 2;
      }
      return;
      case 2:
      if (Level8.#timeCounter+ 7000<new Date().getTime()){
        Level8.#text_2.delete();
        Level8.#text_3 = new ShowText("Use the mirrors and the laser to win");
        Level8.#timeCounter = new Date().getTime();
        Level8.#textShown = 3;
      }
      return;
      case 3:
      if (Level8.#timeCounter+ 7000<new Date().getTime()){
        Level8.#text_3.delete();
        Level8.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level8.#loadNext != false){
      return Level8.#loadNext;
    }
    if (!allStarsHit(Level8.#stars)){return false;}
    if (allStarsHit(Level8.#stars) && Level8.#levelDelayTimer == 0){
      Level8.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level8.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(8);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level9 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level9.#stars = [];
    ShotsLeft = 15;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = false;
    Level9.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level9.#loadNext=Levels});
    let tmp = new ShowText('Level 9:Matt Walls', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level9.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false);
    currentlySelected = Level9.#laser;
    Level9.#text_1 = new ShowText("Watch out for the walls, light goes 'pop' when it hits it");
    Level9.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level9.#stars.push(generateRandomStars(Level9.#stars));
    Level9.#stars.push(generateRandomStars(Level9.#stars));
    Level9.#stars.push(generateRandomStars(Level9.#stars));
  }
  static calculation(){
    switch (Level9.#textShown) {
      case 1:
      if (Level9.#timeCounter+5000<new Date().getTime()){
        Level9.#text_1.delete();
        Level9.#text_2 = new ShowText('Spawn a mirror and use it to hit the stars');
        Level9.#timeCounter = new Date().getTime();
        Level9.#textShown = 2;
      }
      return;
      case 2:
      if (Level9.#timeCounter+ 7000<new Date().getTime()){
        Level9.#text_2.delete();
        Level9.#text_3 = new ShowText("Select the laser and shoot the stars");
        Level9.#timeCounter = new Date().getTime();
        Level9.#textShown = 3;
      }
      return;
      case 3:
      if (Level9.#timeCounter+ 7000<new Date().getTime()){
        Level9.#text_3.delete();
        Level9.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level9.#loadNext != false){
      return Level9.#loadNext;
    }
    if (!allStarsHit(Level9.#stars)){return false;}
    if (allStarsHit(Level9.#stars) && Level9.#levelDelayTimer == 0){
      Level9.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level9.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(9);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level10 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #text_4;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level10.#stars = [];
    ShotsLeft = 12;
    spawningDisabled = true;
    MirrorSpawning = false;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = false;
     Level10.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, true);
    currentlySelected = Level10.#laser;
    Level10.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level10.#loadNext=Levels});
let tmp = new ShowText('Level 10:Star Gazing', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level10.#text_1 = new ShowText("Shoot the stars");
    Level10.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level10.#stars.push(generateRandomStars(Level10.#stars));
    Level10.#stars.push(generateRandomStars(Level10.#stars));
    Level10.#stars.push(generateRandomStars(Level10.#stars));
  }
  static calculation(){
    for (const element of Level10.#stars){
      let tmpVector = createVector(element.xPos-window.innerWidth/2, element.yPos-window.innerHeight/2);
      tmpVector.rotate(0.5);
      tmpVector.add(createVector(window.innerWidth/2, window.innerHeight/2))
      element.xPos = tmpVector.x;
      element.yPos = tmpVector.y;
      element.hitBoxLeftTop = [element.xPos, element.yPos];
      element.hitBoxRightBottom = [element.xPos+element.width, element.yPos+element.height];
    }
    
    switch (Level10.#textShown) {
      case 1:
      if (Level10.#timeCounter+5000<new Date().getTime()){
        Level10.#text_1.delete();
        Level10.#text_2 = new ShowText('This could be down to luck');
        Level10.#timeCounter = new Date().getTime();
        Level10.#textShown = 2;
      }
      return;
      case 2:
      if (Level10.#timeCounter+ 7000<new Date().getTime()){
        Level10.#text_2.delete();
        Level10.#text_3 = new ShowText("You can still pause and slow down light like normal");
        Level10.#timeCounter = new Date().getTime();
        Level10.#textShown = 3;
      }
      return;
      case 3:
      if (Level10.#timeCounter+ 7000<new Date().getTime()){
        Level10.#text_3.delete();
        Level10.#text_4 = new ShowText("Restart if you have lost (r)");
        Level10.#timeCounter = new Date().getTime();
        Level10.#textShown = 4;
      }
       return;
      case 4:
      if (Level10.#timeCounter+ 7000<new Date().getTime()){
        Level10.#text_4.delete();
        Level10.#textShown = 5;
        }
        return;
    }
  }
  static levelEnded(){
    if (Level10.#loadNext != false){
      return Level10.#loadNext;
    }
    if (!allStarsHit(Level10.#stars)){return false;}
    if (allStarsHit(Level10.#stars) && Level10.#levelDelayTimer == 0){
      Level10.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level10.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(10);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level11 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level11.#stars = [];
    ShotsLeft = 2;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = false;
    Level11.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level11.#loadNext=Levels});
    let tmp = new ShowText("Level 11:Don't drop Anything", window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level11.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 0, true, false, false);
    currentlySelected = Level11.#laser;
    Level11.#text_1 = new ShowText("2 shots, 2 stars");
    Level11.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level11.#stars.push(generateRandomStars(Level11.#stars));
    Level11.#stars.push(generateRandomStars(Level11.#stars));
  }
  static calculation(){
    switch (Level11.#textShown) {
      case 1:
      if (Level11.#timeCounter+5000<new Date().getTime()){
        Level11.#text_1.delete();
        Level11.#text_2 = new ShowText('Rotate a mirror at a 45 degree angle to reflect it perpendictually');
        Level11.#timeCounter = new Date().getTime();
        Level11.#textShown = 2;
      }
      return;
      case 2:
      if (Level11.#timeCounter+ 7000<new Date().getTime()){
        Level11.#text_2.delete();
        Level11.#text_3 = new ShowText("How are you doing?");
        Level11.#timeCounter = new Date().getTime();
        Level11.#textShown = 3;
      }
      return;
      case 3:
      if (Level11.#timeCounter+ 7000<new Date().getTime()){
        Level11.#text_3.delete();
        Level11.#textShown = 4;
      }
       return;
    }
  }
  static levelEnded(){
    if (Level11.#loadNext != false){
      return Level11.#loadNext;
    }
    if (!allStarsHit(Level11.#stars)){return false;}
    if (allStarsHit(Level11.#stars) && Level11.#levelDelayTimer == 0){
      Level11.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level11.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(11);
        return Levels;
      } else {
        return false;
      }
    }
  }
}


class Level12 {
  static #stars = [];
  static #mirror;
  static #laser;
  static #timeCounter = new Date().getTime()*0;
  static #text_1;
  static #text_2;
  static #text_3;
  static #text_4;
  static #textShown = 1;
  static #levelDelayTimer = new Date().getTime() * 0;
  static #loadNext = false
  
  static loadData(){
    Level12.#stars = [];
    ShotsLeft = 20;
    spawningDisabled = true;
    MirrorSpawning = true;
    restartDisabled = false;
    eraserDisabled = true;
    reflectiveWalls = false;
     Level12.#laser = new Laser(window.innerWidth*0.1, window.innerHeight * 0.2,  window.innerWidth*0.1,  window.innerWidth * 0.1, 270, true, false, false);
    currentlySelected = Level12.#laser;
    Level12.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Level12.#loadNext=Levels});
let tmp = new ShowText('Level 12:Impossible', window.innerHeight*0.10, window.innerWidth/50);
    setTimeout(tmp.delete, 1000);
    new ShotCounterText();
    Level12.#text_1 = new ShowText("Shoot the stars");
    Level12.#timeCounter = new Date().getTime();
    eraserDisabled = true;
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
    Level12.#stars.push(generateRandomStars(Level12.#stars));
  }
  static calculation(){
    for (const element of Level12.#stars){
      let tmpVector = createVector(element.xPos-window.innerWidth/2, element.yPos-window.innerHeight/2);
      tmpVector.rotate(2.5);
      tmpVector.add(createVector(window.innerWidth/2, window.innerHeight/2))
      element.xPos = tmpVector.x;
      element.yPos = tmpVector.y;
      element.hitBoxLeftTop = [element.xPos, element.yPos];
      element.hitBoxRightBottom = [element.xPos+element.width, element.yPos+element.height];
    }
    
    switch (Level12.#textShown) {
      case 1:
      if (Level12.#timeCounter+5000<new Date().getTime()){
        Level12.#text_1.delete();
        Level12.#text_2 = new ShowText('This is designed to test your limits');
        Level12.#timeCounter = new Date().getTime();
        Level12.#textShown = 2;
      }
      return;
      case 2:
      if (Level12.#timeCounter+ 7000<new Date().getTime()){
        Level12.#text_2.delete();
        Level12.#text_3 = new ShowText("Try to beat this boss level");
        Level12.#timeCounter = new Date().getTime();
        Level12.#textShown = 3;
      }
      return;
      case 3:
      if (Level12.#timeCounter+ 7000<new Date().getTime()){
        Level12.#text_3.delete();
        Level12.#text_4 = new ShowText("20 Shots;12 Stars");
        Level12.#timeCounter = new Date().getTime();
        Level12.#textShown = 4;
      }
       return;
      case 4:
      if (Level12.#timeCounter+ 7000<new Date().getTime()){
        Level12.#text_4.delete();
        Level12.#textShown = 5;
        }
        return;
    }
  }
  static levelEnded(){
    if (Level12.#loadNext != false){
      return Level12.#loadNext;
    }
    if (!allStarsHit(Level12.#stars)){return false;}
    if (allStarsHit(Level12.#stars) && Level12.#levelDelayTimer == 0){
      Level12.#levelDelayTimer = new Date().getTime();
      return false;
    } else {
      if (Level12.#levelDelayTimer+2000 < new Date().getTime()){
        GameData.Levels.addCompletedLevel(12);
        return Levels;
      } else {
        return false;
      }
    }
  }
}