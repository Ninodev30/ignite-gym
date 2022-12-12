import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import useAuth from '@hooks/useAuth';
import Loading from '@components/Loading';

const Routes: React.FC = () => {
    const { user, isLoadingUserStorageData } = useAuth();
    const { colors } = useTheme();

    DefaultTheme.colors.background = colors.gray[700];

    if (isLoadingUserStorageData)
        return <Loading />;

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={DefaultTheme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}

export default Routes;