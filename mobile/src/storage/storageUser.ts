import AsyncStorage from "@react-native-async-storage/async-storage";
import UserDTO from "@dtos/UserDTO";
import USER_STORAGE from "./storageConfig";

type StorageUserType = {
    save: (user: UserDTO) => Promise<void>;
    get: () => Promise<UserDTO>;
    delete: () => Promise<void>;
}

const storageUser: StorageUserType = {
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
}

export default storageUser;