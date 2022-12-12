import { createContext, ReactNode, useEffect, useState } from "react";
import api from "@services/api";
import UserDTO from "@dtos/UserDTO";
import ContextMethodsTypeProps from "src/@types/contextMethods";
import storageUser from "@storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    methods: ContextMethodsTypeProps;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState<boolean>(true);

    const methods: ContextMethodsTypeProps = {
        signIn: async ({ email, password }) => {
            try {
                const { data } = await api.post('/sessions', { email, password });

                if (data.user) {
                    setUser(data.user);
                    storageUser.save(data.user);
                }

                console.log(data)
            }
            catch (error) {
                throw error;
            }
        },
        signOut: async () => {
            try {
                setIsLoadingUserStorageData(true);

                setUser({} as UserDTO);
                await storageUser.delete();
            }
            catch (error) {
                throw error;
            }
            finally {
                setIsLoadingUserStorageData(false);
            }
        },
        loadUserData: async () => {
            try {
                setIsLoadingUserStorageData(true);
                const userLogged = await storageUser.get();

                if (userLogged)
                    setUser(userLogged);
            }
            catch (error) {
                throw error;
            }
            finally {
                setIsLoadingUserStorageData(false);
            }
        }
    }

    useEffect(() => {
        methods.loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user: user,
            methods: methods,
            isLoadingUserStorageData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;