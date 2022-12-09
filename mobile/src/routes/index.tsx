import { useContext } from 'react';
import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthContext } from '@contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const contextData = useContext(AuthContext);
    console.log('logged user', contextData)

    const { colors } = useTheme();
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