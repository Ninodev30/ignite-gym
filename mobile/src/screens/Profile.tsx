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
import AppError from '@utils/AppError';
import UserDTO from '@dtos/UserDTO';
import api from '@services/api';
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import Input from '@components/Input';
import Button from '@components/Button';

type UpdateTypeProps = {
    photo: () => Promise<void>;
    data: (data: ProfileFormDataProps) => Promise<void>;
}

const Profile: React.FC = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);

    const { show } = useToast();
    const { user, methods: { updateUserProfile } } = useAuth();

    const userPhoto: string = `${api.defaults.baseURL}/avatar/${user.avatar}`;
    const PHOTO_SIZE: number = 33;

    const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    const handleUpdate: UpdateTypeProps = {
        photo: async () => {
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

                    const fileExtension = photoSelected.uri.split('.').pop();

                    const photoFile: any = {
                        name: `${user.name}.${fileExtension}`.toLowerCase(),
                        uri: photoSelected.uri,
                        type: `${photoSelected.type}/${fileExtension}`
                    };

                    updateAvatar(photoFile);
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
        },
        data: async ({ name, password, old_password }) => {
            try {
                setIsUpdating(true);

                const userUpdated: UserDTO = user;
                userUpdated.name = name;

                await api.put('/users', {
                    name,
                    password,
                    old_password
                })

                await updateUserProfile(userUpdated);

                show({
                    title: 'Perfil atualizado com sucesso',
                    placement: 'top',
                    bgColor: 'green.500'
                });
            }
            catch (error) {
                const isAppError = error instanceof AppError;
                const title: string = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

                show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
            finally {
                setIsUpdating(false);
            }
        }
    }

    const updateAvatar: (photoFile: any) => Promise<void> = async (photoFile) => {
        try {
            const userPhotoUploadForm = new FormData();
            userPhotoUploadForm.append('avatar', photoFile)

            const { data: { avatar } } = await api.patch('users/avatar', userPhotoUploadForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const userUpdated: UserDTO = user;
            userUpdated.avatar = avatar;

            updateUserProfile(userUpdated);

            show({
                title: 'Foto atualizada',
                placement: 'top',
                bgColor: 'green.500'
            })
        }
        catch (error) {
            throw error;
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
                    <TouchableOpacity onPress={handleUpdate.photo}>
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
                                errorMessage={errors.name?.message}
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
                        render={({ field: { onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Senha antiga'
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='confirm_password'
                        render={({ field: { onChange } }) => (
                            <Input
                                bgColor='gray.600'
                                placeholder='Confirme a nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                                onSubmitEditing={handleSubmit(handleUpdate.data)}
                                returnKeyType='send'
                            />
                        )}
                    />
                    <Button
                        title='Atualizar'
                        variant='solid'
                        mt={6}
                        onPress={handleSubmit(handleUpdate.data)}
                        isLoading={isUpdating}
                    />
                </Center>
            </ScrollView>
        </VStack>
    )
}

export default Profile;