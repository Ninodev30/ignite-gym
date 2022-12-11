import { createContext, ReactNode, useState } from "react";
import api from "@services/api";
import UserDTO from "@dtos/UserDTO";
import ContextMethodsTypeProps from "src/@types/contextMethods";

export type AuthContextDataProps = {
    user: UserDTO;
    methods: ContextMethodsTypeProps;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    const methods: ContextMethodsTypeProps = {
        signIn: async ({ email, password }) => {
            try {
                const { data } = await api.post('/sessions', { email, password });

                if (data.user)
                    setUser(data.user);

                console.log(email)
                console.log(password)
            }
            catch (error) {
                throw error;
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user: user, methods: methods }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;