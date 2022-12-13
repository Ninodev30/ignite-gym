import AsyncStorage from "@react-native-async-storage/async-storage";
import UserDTO from "@dtos/UserDTO";
import StorageType from "src/@types/storage";
import { USER_STORAGE, AUTH_TOKEN_STORAGE } from "@storage/config";

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
                const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE) as string;

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