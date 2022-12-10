import { useContext } from "react";
import { AuthContext, AuthContextDataProps} from '@contexts/AuthContext';

type UseAuthTypeProps = () => AuthContextDataProps;

const useAuth: UseAuthTypeProps = () => {
    const context: AuthContextDataProps = useContext(AuthContext);

    return context;
}

export default useAuth;