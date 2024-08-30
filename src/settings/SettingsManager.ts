import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsManager {
  enableCam: boolean;
  enableMic: boolean;
  backendURL: string;
  dailyApiKey: string;
}

// Define the settings object
const defaultSettings: SettingsManager = {
  enableCam: false,
  enableMic: true,
  backendURL: "https://api.daily.co/v1/bots/start",
  dailyApiKey: ""
};

export class SettingsManager {
  private static preferencesKey = 'settingsPreference';

  static async getSettings(): Promise<SettingsManager> {
    try {
      const data = await AsyncStorage.getItem(this.preferencesKey);
      if (data !== null) {
        return JSON.parse(data) as SettingsManager;
      } else {
        return defaultSettings;
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      return defaultSettings;
    }
  }

  static async updateSettings(settings: SettingsManager): Promise<void> {
    try {
      const data = JSON.stringify(settings);
      await AsyncStorage.setItem(this.preferencesKey, data);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }
}

