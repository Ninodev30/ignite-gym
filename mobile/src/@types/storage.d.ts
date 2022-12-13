import UserDTO from "@dtos/UserDTO";

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

export default StorageType;