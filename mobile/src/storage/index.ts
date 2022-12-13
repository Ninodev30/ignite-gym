import AsyncStorage from "@react-native-async-storage/async-storage";
import UserDTO from "@dtos/UserDTO";
import { USER_STORAGE, AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageType = {
    user: {
        save: (user: UserDTO) => Promise<void>;
        get: () => Promise<UserDTO>;
        delete: () => Promise<void>;
    },
    token: {
        save: (token: string) => Promise<void>;
        get: () => Promise<string>;
        delete: () => Promise<void>;
    }
}

const storage: StorageType = {
    user: {
          save: async (user) => {
            try {
                const storage: string = JSON.stringify(user);
                await AsyncStorage.setItem(USER_STORAGE, storage);
            }
            catch (error) {
                throw error;
            }
        },
        get: async () => {
            try {
                const storage: string | null = await AsyncStorage.getItem(USER_STORAGE);
                const user: UserDTO = storage ? JSON.parse(storage) : {};

                return user;
            }
            catch (error) {
                throw error;
            }
        },
        delete: async () => {
            try {
                await AsyncStorage.removeItem(USER_STORAGE);
            }
            catch (error) {
                throw error;
            }
        }
    },
    token: {
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
}

export default storage;
