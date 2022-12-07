import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from 'src/routes/auth.routes';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input';
import Button from '@components/Button';

const SignIn: React.FC = () => {
    const { navigate }: AuthNavigatorRoutesProps = useNavigation();

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
                    <Input
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder='Senha'
                        secureTextEntry
                    />
                    <Button
                        title='Acessar'
                        variant='solid'
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