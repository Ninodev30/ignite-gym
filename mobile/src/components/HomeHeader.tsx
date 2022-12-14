import { TouchableOpacity } from 'react-native'
import { Heading, HStack, Icon, Text, VStack } from "native-base"
import { MaterialIcons } from '@expo/vector-icons';
import defaultUserPhoto from '@assets/userPhotoDefault.png';
import useAuth from '@hooks/useAuth';
import api from '@services/api';
import UserPhoto from "./UserPhoto";

const HomeHeader: React.FC = () => {
    const { user, methods: { signOut } } = useAuth();
    const userPhoto: string = `${api.defaults.baseURL}/avatar/${user.avatar}`;

    return (
        <HStack bgColor='gray.600' pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto
                source={user.avatar ? { uri: userPhoto } : defaultUserPhoto}
                alt='user photo'
                size={16}
                mr={4}
            />
            <VStack flex={1}>
                <Text color='gray.100' fontSize='md'>
                    Olá,
                </Text>
                <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                    {user.name}
                </Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialIcons}
                    name='logout'
                    color='gray.200'
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    )
}

export default HomeHeader;