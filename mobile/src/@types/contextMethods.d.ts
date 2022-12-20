import UserDTO from "@dtos/UserDTO";
import SignInDataProps from "./signInDataProps";

type ContextMethodsType = {
    signIn: (data: SignInDataProps) => Promise<void>;
    signOut: () => Promise<void>;
    loadUserData: () => Promise<void>;
    userAndTokenUpdate: (userData: UserDTO, token: string) => void;
    storageUserAndTokenSave: (userData: UserDTO, token: string) => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

export default ContextMethodsType;