import { createContext, ReactNode, useState } from "react";
import UserDTO from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDTO>({
        id: '1',
        name: 'Enzo Damascena',
        email: 'enzo@email.com',
        avatar: 'Enzo.png'
    })

    return (
        <AuthContext.Provider value={{ user: user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;