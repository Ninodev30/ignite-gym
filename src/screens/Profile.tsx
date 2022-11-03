import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast } from "native-base";
import * as EIP from 'expo-image-picker';
import * as EFS from 'expo-file-system';
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import Input from '@components/Input';
import Button from '@components/Button';

const Profile: React.FC = () => {
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [userPhoto, setUserPhoto] = useState<string>('https://github.com/Ninodev30.png');
    const PHOTO_SIZE: number = 33;

    const { show } = useToast();

    const handleUserPhotoSelect: () => Promise<void> = async () => {
        setIsPhotoLoading(true);

        try {
            const photoSelected: EIP.ImagePickerResult = await EIP.launchImageLibraryAsync({
                mediaTypes: EIP.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],    // Image 4 for 4
                allowsEditing: true
            });

            if (photoSelected.cancelled)
                return;

            if (photoSelected.uri) {
                const photoInfo: EFS.FileInfo = await EFS.getInfoAsync(photoSelected.uri);

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5)
                    return show({
                        title: 'Escolha uma imagem de até 5MB',
                        placement: 'top',
                        bgColor: 'red.700'
                    });

                setUserPhoto(photoSelected.uri);
            }
        }

        catch (error) {
            show({
                title: 'Não foi possível alterar sua foto',
                placement: 'top',
                bgColor: 'gray.400'
            });
            console.log(error);
        }

        finally {
            setIsPhotoLoading(false);
        }
    }

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
                                source={{ uri: userPhoto }}
                                alt='User Photo'
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
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