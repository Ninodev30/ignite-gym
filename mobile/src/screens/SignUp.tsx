import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input';
import Button from '@components/Button';

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup
        .string()
        .required('Informe o nome.'),
    email: yup
        .string()
        .required('Informe o seu e-mail.')
        .email('E-mail inválido.'),
    password: yup
        .string()
        .required('Informe a senha.')
        .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    password_confirm: yup
        .string()
        .required('Informe a confirmação de senha.')
        .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
})

const SignUp: React.FC = () => {
    const { goBack } = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const handleSignUp: (data: FormDataProps) => void = ({ name, email, password, password_confirm }) => {
        console.log(name, email, password, password_confirm);
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
                <Center mt={24} mb={20}>
                    <LogoSvg />
                    <Text color='gray.100' fontSize='sm'>
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>
                <Center>
                    <Heading
                        color='gray.100'
                        mb={6}
                        fontFamily='heading'
                    >
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Nome'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

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
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='password_confirm'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Confirmar a senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password_confirm?.message}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                            />
                        )}
                    />

                    <Button
                        title='Criar e acessar'
                        variant='solid'
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>
                <Button
                    title='Voltar para o login'
                    variant='outline'
                    mt={12}
                    onPress={() => goBack()}
                />
            </VStack>
        </ScrollView>
    )
}

export default SignUp;