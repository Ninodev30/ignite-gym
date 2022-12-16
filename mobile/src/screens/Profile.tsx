import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast } from "native-base";
import * as EIP from 'expo-image-picker';
import * as EFS from 'expo-file-system';
import useAuth from '@hooks/useAuth';
import ProfileFormDataProps from 'src/@types/profileForm';
import profileSchema from '@utils/profileSchema';
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import Input from '@components/Input';
import Button from '@components/Button';

const Profile: React.FC = () => {
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [userPhoto, setUserPhoto] = useState<string>('https://github.com/Ninodev30.png');

    const { show } = useToast();
    const PHOTO_SIZE: number = 33;

    const { user } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    const handleUserPhotoSelect: () => Promise<void> = async () => {
        try {
            setIsPhotoLoading(true);

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

    const handleSignUp: () => Promise<void> = async () => {
        try {
        }
        catch (error) {

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
                        <Text color='green.500' fontSize='md' fontFamily='heading' mt={2} mb={8}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>
                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { value } }) => (
                            <Input
                                bgColor='gray.600'
                                isDisabled
                                value={value}
                            />
                        )}
                    />
                    <Heading color='gray.200' fontSize='md' fontFamily='heading' alignSelf='flex-start' mt={9} mb={4}>
                        Alterar senha
                    </Heading>
                    <Controller
                        control={control}
                        name='old_password'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Senha antiga'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            //errorMessage={errors.old_password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='new_password'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            //errorMessage={errors.new_password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='confim_new_password'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Confirme a nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                // errorMessage={errors.confim_new_password?.message}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                            />
                        )}
                    />
                    <Button
                        title='Trocar senha'
                        variant='solid'
                        mt={6}
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>
            </ScrollView>
        </VStack>
    )
}

export default Profile;