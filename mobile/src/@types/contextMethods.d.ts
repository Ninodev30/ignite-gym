import UserDTO from "@dtos/UserDTO";
import SignInDataProps from "./signInDataProps";

type ContextMethodsTypeProps = {
    signIn: (data: SignInDataProps) => Promise<void>;
    signOut: () => Promise<void>;
    loadUserData: () => Promise<void>;
    storageUserAndToken: (user: UserDTO, token: string) => Promise<void>;
}

export default ContextMethodsTypeProps;