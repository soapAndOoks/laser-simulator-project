'use strict';

class LevelPicture extends StaticImage {
  //completed defaults as true as it is annoying if user completes level but game glitches and tells them otherwise
  constructor(xPos, yPos, width, height, text = 'Level Bonus', calledFunction, completed = true){
    let picName
    if (!completed){
      picName = level;
    } else {
      picName = levelCompleted;
    }
    
    super(picName, xPos, yPos, width, height, 0, calledFunction, false);
    this.text = text;
  }
  render(buffer){
    super.render(buffer);
    buffer.push();
    buffer.rectMode(CORNER);
    buffer.textSize(this.width/8);
    buffer.stroke('black');
    buffer.textAlign(LEFT);
    buffer.text(this.text, this.xPos, this.yPos+this.height+this.height*0.01, this.xPos + this.width, this.yPos+this.height+this.height*0.01);
    buffer.pop();
  }
}



class ControlsInstructions extends ShotCounterText {
  render(buffer){
    buffer.push();
    buffer.rectMode(CORNER);
    buffer.textSize(this.width/800);
    buffer.stroke('black');
    buffer.textAlign(LEFT);
    buffer.text('Use the buttons: F, L, M, T to spawn a Flashlight, Laser, Mirror or Target(Star)', window.innerWidth*0.1, window.innerHeight*0.25, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('Click S or double click the shooter to shoot a laser of Flashlight', window.innerWidth*0.1, window.innerHeight*0.40, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('Use the mouse to select Objects', window.innerWidth*0.1, window.innerHeight*0.55, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('Use the arrow keys to move', window.innerWidth*0.1, window.innerHeight*0.70, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('Use CTRL + Left/Right arrow to turn', window.innerWidth*0.1, window.innerHeight*0.85, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.pop();
  }
}

class InfomationText extends ShotCounterText {
  render(buffer){
    buffer.push();
    buffer.rectMode(CORNER);
    buffer.textSize(this.width/800);
    buffer.stroke('black');
    buffer.textAlign(LEFT);
    buffer.text('Credits to many people for the free images and audio provided on pixaby', window.innerWidth*0.1, window.innerHeight*0.25, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('This game completes one of my passions, creating a light simulator', window.innerWidth*0.1, window.innerHeight*0.40, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('This game helped me with many skills such as debugging, UI-Design and maths(matrixes)', window.innerWidth*0.1, window.innerHeight*0.55, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('It also requires skill due to the low level library used which requires coding of simple UI elements like interactive Text-Boxes, moving elements, bouncy walls, back buttons etc.', window.innerWidth*0.1, window.innerHeight*0.70, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.text('All my code is stored in the src/ folder', window.innerWidth*0.1, window.innerHeight*0.85, window.innerWidth*0.9, window.innerHeight*0.8);
    buffer.pop();
  }
}


class Title {
  static #loadNext = false;
  static loadData(){
    Title.#loadNext = false;
    new ShowText('Laser Simulator', window.innerHeight*0.12, window.innerWidth/15, false);
    new ShowText('Play Levels', window.innerHeight*0.30, window.innerWidth/30, true, function a(){Title.#loadNext=Levels;return true;});
    new ShowText('Settings', window.innerHeight*0.45, window.innerWidth/30, true, function a(){Title.#loadNext=Settings;return true;});
    new ShowText('Controls', window.innerHeight*0.60, window.innerWidth/30, true, function a(){Title.#loadNext=Controls;return true;});
    new ShowText('Infomation', window.innerHeight*0.75, window.innerWidth/30, true, function a(){Title.#loadNext=Infomation;return true;});
    new ShowText('Sandbox', window.innerHeight*0.90, window.innerWidth/30, true, function a(){Title.#loadNext=Sandbox;return true;});
  }
  static calculation(){
    
  }
  
  static levelEnded(){
    return Title.#loadNext;
  }
}




class Settings {
  static #loadNext = false;
  static #musicPlaying;
  static #lightTrail;
  static #SFX;
  static loadData(){
    Settings.#loadNext = false;
    new ShowText('Laser Simulator Settings', window.innerHeight*0.12, window.innerWidth/20, false);
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Settings.#loadNext=Title});
    let msg = backgroundMusic.isPlaying()?'Music Playing (tap to change)':'Music Stopped (tap to change)'
    Settings.#musicPlaying = new ShowText(msg, window.innerHeight*0.25, window.innerWidth/40, true, Settings.#handleMusicChange, backgroundMusic.isPlaying()?[0,255,0]:[255, 0, 0]);
    msg = SFX?'Special Sound Effects Off (tap to change)':'Special Sound Effects On (tap to change)';
    Settings.#SFX = new ShowText(msg, window.innerHeight*0.45, window.innerWidth/40, true, this.#handleSFXChange, SFX?[0, 255, 0]:[255,0,0]);
    msg = LightTrail?'Light Trail On (tap to change)':'Light Trail Off (tap to change)';
    Settings.#lightTrail = new ShowText(msg, window.innerHeight*0.65, window.innerWidth/40, true, this.#handleLightTrailChange, LightTrail?[0, 255, 0]:[255,0,0]);
  }
  static calculation(){
  }
  static levelEnded(){return Settings.#loadNext}

  static #handleLightTrailChange(){
    let msg = !LightTrail?'Light Trail On (tap to change)':'Light Trail Off (tap to change)';
    Settings.#lightTrail.text = msg;
    Settings.#lightTrail.rectColor = !LightTrail?[0, 255, 0]:[255,0,0];
    LightTrail = !LightTrail;
  }
  
  static #handleMusicChange(){
    if (Settings.#musicPlaying.text == 'Music Playing (tap to change)'){
      Settings.#musicPlaying.text = 'Music Stopped (tap to change)';
      Settings.#musicPlaying.rectColor = [255,0,0];
      backgroundMusic.pause();
    } else {
      Settings.#musicPlaying.text = 'Music Playing (tap to change)'
      Settings.#musicPlaying.rectColor = [0,255,0];
      backgroundMusic.setVolume(0.2);
      backgroundMusic.play();
    }
    return true;
  }

  static #handleSFXChange(){
    Settings.#SFX.text = SFX?'Special Sound Effects Off (tap to change)':'Special Sound Effects On (tap to change)';
    Settings.#SFX.rectColor = SFX?[255,0,0]:[0,255,0];
    SFX = !SFX;
  }
}




class Levels {
  static #levelProgress = [false, false, false, false, false, false];
  static levelCompleted(level){
    Levels.#levelProgress[level-1] = true;
  }
  static #loadNext = false;
  static loadData(){
    Levels.#loadNext = false;
    new ShowText('Laser Simulator Levels', window.innerHeight*0.12, window.innerWidth/20, false);
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Levels.#loadNext=Title});
    new LevelPicture(window.innerWidth*0.15, window.innerHeight*0.2, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 1', function a(){Levels.#loadNext = Level1;},GameData.Levels.hasCompleted(1));
    new LevelPicture(window.innerWidth*0.35, window.innerHeight*0.2, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 2', function a(){Levels.#loadNext = Level2;},GameData.Levels.hasCompleted(2));
    new LevelPicture(window.innerWidth*0.55, window.innerHeight*0.2, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 3', function a(){Levels.#loadNext = Level3;},GameData.Levels.hasCompleted(3));
    new LevelPicture(window.innerWidth*0.75, window.innerHeight*0.2, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 4', function a(){Levels.#loadNext = Level4;},GameData.Levels.hasCompleted(4));
    new LevelPicture(window.innerWidth*0.15, window.innerHeight*0.5, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 5', function a(){Levels.#loadNext = Level5;},GameData.Levels.hasCompleted(5));
    new LevelPicture(window.innerWidth*0.35, window.innerHeight*0.5, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 6', function a(){Levels.#loadNext = Level6;},GameData.Levels.hasCompleted(6));
    new LevelPicture(window.innerWidth*0.55, window.innerHeight*0.5, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 7', function a(){Levels.#loadNext = Level7;},GameData.Levels.hasCompleted(7));
    new LevelPicture(window.innerWidth*0.75, window.innerHeight*0.5, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 8', function a(){Levels.#loadNext = Level8;},GameData.Levels.hasCompleted(8));
    new LevelPicture(window.innerWidth*0.15, window.innerHeight*0.8, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 9', function a(){Levels.#loadNext = Level9;},GameData.Levels.hasCompleted(9));
    new LevelPicture(window.innerWidth*0.35, window.innerHeight*0.8, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 10', function a(){Levels.#loadNext = Level10;},GameData.Levels.hasCompleted(10));
     new LevelPicture(window.innerWidth*0.55, window.innerHeight*0.8, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 11', function a(){Levels.#loadNext = Level11;},GameData.Levels.hasCompleted(11));
    new LevelPicture(window.innerWidth*0.75, window.innerHeight*0.8, window.innerWidth*0.1, window.innerHeight*0.1, 'Level 12', function a(){Levels.#loadNext = Level12;},GameData.Levels.hasCompleted(12));
  }
  static calculation(){
    
  }
  static levelEnded(){return Levels.#loadNext}
}





class Controls {
  static #loadNext = false;
  static loadData(){
    Controls.#loadNext = false;
    new ShowText('Laser Simulator Controls', window.innerHeight*0.12, window.innerWidth/20, false);
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Controls.#loadNext=Title});
    new ControlsInstructions()
  }
  static calculation(){
  }
  static levelEnded(){return Controls.#loadNext}
}







class Sandbox {
  static #loadNext = false;
  static loadData(){
    Sandbox.#loadNext = false;
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Sandbox.#loadNext=Title});
  }
  static calculation(){
  }
  static levelEnded(){
    return Sandbox.#loadNext;
  }
}





class Infomation {
  static #loadNext = false;
  static loadData(){
    Infomation.#loadNext = false;
    new ShowText('Infomation', window.innerHeight*0.12, window.innerWidth/20, false);
    new StaticImage(back, window.innerWidth*0.01, window.innerHeight*0.01, window.innerWidth/20, window.innerWidth/20, 0, function a(){Infomation.#loadNext=Title});
    new InfomationText()
  }
  static calculation(){
  }
  static levelEnded(){return Infomation.#loadNext}
}