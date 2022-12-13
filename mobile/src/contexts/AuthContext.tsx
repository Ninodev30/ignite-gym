import { createContext, ReactNode, useEffect, useState } from "react";
import api from "@services/api";
import UserDTO from "@dtos/UserDTO";
import ContextMethodsType from "src/@types/contextMethods";
import storage from "@storage/index";

export type AuthContextDataProps = {
    user: UserDTO;
    methods: ContextMethodsType;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState<boolean>(true);

    const methods: ContextMethodsType = {
        signIn: async ({ email, password }) => {
            try {
                setIsLoadingUserStorageData(true);

                const { data: { user, token } } = await api.post('/sessions', { email, password });

                if (user && token) {
                    await methods.storageUserAndTokenSave(user, token);
                    methods.userAndTokenUpdate(user, token);
                }
            }
            catch (error) {
                throw error;
            }
            finally {
                setIsLoadingUserStorageData(false);
            }
        },
        signOut: async () => {
            try {
                setIsLoadingUserStorageData(true);

                setUser({} as UserDTO);
                await storage.user.delete();
                await storage.token.delete();
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

                const userLogged: UserDTO = await storage.user.get();
                const token: string = await storage.token.get();

                if (userLogged && token)
                    methods.userAndTokenUpdate(userLogged, token);
            }
            catch (error) {
                throw error;
            }
            finally {
                setIsLoadingUserStorageData(false);
            }
        },
        userAndTokenUpdate: (userData, token) => {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userData);
        },
        storageUserAndTokenSave: async (userData, token) => {
            try {
                await storage.user.save(userData);
                await storage.token.save(token);
            }
            catch (error) {
                throw error;
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