export interface SaveData {
  PlayerName: string;
  AccountLevel: number;
  BP_Balance: number;
  Diamond_Balance: number;
  OwnedHeroes: string[];
  Settings: {
    AudioVol: number;
    Sensitivity: number;
  };
}

export class SaveSystem {
  private static instance: SaveSystem;
  private readonly STORAGE_KEY = 'game_save_data';

  private constructor() {}

  public static getInstance(): SaveSystem {
    if (!SaveSystem.instance) {
      SaveSystem.instance = new SaveSystem();
    }
    return SaveSystem.instance;
  }

  public load(): SaveData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load save data:', error);
    }
    // Return default save data
    return {
      PlayerName: '',
      AccountLevel: 1,
      BP_Balance: 0,
      Diamond_Balance: 0,
      OwnedHeroes: [],
      Settings: {
        AudioVol: 1.0,
        Sensitivity: 1.0,
      },
    };
  }

  public save(data: SaveData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('Game saved successfully');
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  }

  public reset(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('Game data reset');
  }
}