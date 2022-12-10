import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import useAuth from '@hooks/useAuth';

const Routes: React.FC = () => {
    const { user } = useAuth();
    const { colors } = useTheme();
    
    console.log('logged user', user)
    DefaultTheme.colors.background = colors.gray[700];

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={DefaultTheme}>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )
}

export default Routes;