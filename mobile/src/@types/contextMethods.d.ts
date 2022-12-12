import SignInDataProps from "./signInDataProps";

type ContextMethodsTypeProps = {
    signIn: (data: SignInDataProps) => Promise<void>;
    signOut: () => Promise<void>;
    loadUserData: () => Promise<void>;
}

export default ContextMethodsTypeProps;