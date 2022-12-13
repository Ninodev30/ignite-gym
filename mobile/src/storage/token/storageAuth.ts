import AsyncStorage from "@react-native-async-storage/async-storage";
import AUTH_TOKEN_STORAGE from "./storageConfig";

type StorageAuthTokenType = {
    save: (token: string) => Promise<void>;
    get: () => Promise<string>;
    delete: () => Promise<void>;
}

const storageAuthToken: StorageAuthTokenType = {
    save: async (token) => {
        try {
            await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
        }
        catch (error) {
            throw error;
        }
    },
    get: async () => {
        try {
            const storage: string | null = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
            const token: string = storage ? JSON.parse(storage) : {};

            return token;
        }
        catch (error) {
            throw error;
        }
    },
    delete: async () => {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
        }
        catch (error) {
            throw error;
        }
    }
}

export default storageAuthToken;