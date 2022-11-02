import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, ScrollView, Center, Skeleton, Text, Heading } from "native-base";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import Input from '@components/Input';
import Button from '@components/Button';

const Profile: React.FC = () => {
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const PHOTO_SIZE: number = 33;

    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Center mt={9} px={10}>
                    {
                        isPhotoLoading ?
                            <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded='full'
                                startColor='gray.600'
                                endColor='gray.400'
                            />
                            :
                            <UserPhoto
                                source={{ uri: 'https://github.com/Ninodev30.png' }}
                                alt='User Photo'
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity>
                        <Text
                            color='green.500'
                            fontSize='md'
                            fontFamily='heading'
                            mt={2}
                            mb={8}
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        bgColor='gray.600'
                        placeholder='Nome'
                    />

                    <Input
                        bgColor='gray.600'
                        placeholder='ninodm.dev@gmail.com'
                        isDisabled
                    />

                    <Heading
                        color='gray.200'
                        fontSize='md'
                        alignSelf='flex-start'
                        mt={9}
                        mb={4}
                    >
                        Alterar senha
                    </Heading>

                    <Input
                        bgColor='gray.600'
                        placeholder='Senha antiga'
                        secureTextEntry
                    />

                    <Input
                        bgColor='gray.600'
                        placeholder='Nova senha'
                        secureTextEntry
                    />

                    <Input
                        bgColor='gray.600'
                        placeholder='Confirme a nova senha'
                        secureTextEntry
                    />

                    <Button
                        title='Trocar senha'
                        variant='solid'
                        mt={6}
                    />
                </Center>
            </ScrollView>
        </VStack>
    )
}

export default Profile;