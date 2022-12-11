import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthNavigatorRoutesProps } from 'src/routes/auth.routes';
import SignInDataProps from 'src/@types/signInDataProps';
import loginSchema from '@utils/loginSchema';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input';
import Button from '@components/Button';
import useAuth from '@hooks/useAuth';

const SignIn: React.FC = () => {
    const { user, methods: { signIn } } = useAuth();
    const { navigate }: AuthNavigatorRoutesProps = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInDataProps>({
        resolver: yupResolver(loginSchema.signIn)
    })

    const handleSignIn: (data: SignInDataProps) => Promise<void> = async ({ email, password }) => {
        try {
            await signIn({ email, password });
            console.log(user);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt='People training'
                    resizeMode='contain'
                    position='absolute'
                />
                <Center my={24}>
                    <LogoSvg />
                    <Text color='gray.100' fontSize='sm'>
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>
                <Center mt={16}>
                    <Heading
                        color='gray.100'
                        fontFamily='heading'
                        mb={6}
                    >
                        Acesse sua conta
                    </Heading>
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType='send'
                            />
                        )}
                    />
                    <Button
                        title='Acessar'
                        variant='solid'
                        onPress={handleSubmit(handleSignIn)}
                    />
                </Center>
                <Center mt={20}>
                    <Text
                        color='gray.100'
                        fontSize='sm'
                        fontFamily='body'
                        mb={3}
                    >
                        Ainda não tem acesso?
                    </Text>
                    <Button
                        title='Criar conta'
                        variant='outline'
                        onPress={() => navigate('signUp')}
                    />
                </Center>
            </VStack>
        </ScrollView>
    )
}

export default SignIn;