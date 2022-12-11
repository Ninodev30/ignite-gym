import SignInDataProps from "./signInDataProps";

type ContextMethodsTypeProps = {
    signIn: (data: SignInDataProps) => Promise<void>;
}

export default ContextMethodsTypeProps;