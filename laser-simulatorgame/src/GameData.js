class LevelData {
  static #completedLevels = new Set();
  
  static addCompletedLevels(LevelIDs){
    for (const element of LevelsIDs){
      LevelData.addCompletedLevel(element);
    }  
  }
  
  static addCompletedLevel(levelID){
    LevelData.#completedLevels.add(levelID);
  }
  static hasCompleted(LevelID){
    return LevelData.#completedLevels.has(LevelID);
  }
  static deleteData(){
    LevelData.#completedLevels.clear();
  }
}

class SettingData {
}



class GameData {
  static Levels = LevelData;
}