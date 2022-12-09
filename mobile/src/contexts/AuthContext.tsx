import UserDTO from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            user: {
                id: '1',
                name: 'Enzo',
                email: 'enzo@email.com',
                avatar: 'Enzo.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;