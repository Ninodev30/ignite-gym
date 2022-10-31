import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input';
import Button from '@components/Button';

const SignUp: React.FC = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
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
                <Center>
                    <Heading color='gray.100' mb={6} fontFamily='heading'>
                        Crie sua conta
                    </Heading>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder='Senha'
                        secureTextEntry
                    />
                    <Input
                        placeholder='Confirmar a senha'
                        secureTextEntry
                    />
                    <Button
                        title='Criar e acessar'
                        variant='solid'
                    />
                </Center>
                <Button
                    title='Voltar para o login'
                    variant='outline'
                    mt={8}
                    onPress={handleGoBack}
                />
            </VStack>
        </ScrollView>
    )
}

export default SignUp;