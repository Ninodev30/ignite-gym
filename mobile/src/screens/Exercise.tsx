import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Heading, HStack, Icon, Text, VStack, Image, Box, useToast } from "native-base";
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg'
import Button from "@components/Button";
import ExerciseDTO from "@dtos/ExerciseDTO";
import api from "@services/api";
import AppError from "@utils/AppError";
import { useState } from "react";

type RouteParams = {
    data: ExerciseDTO;
}

const Exercise: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { show } = useToast();
    const { goBack } = useNavigation();

    const { params } = useRoute();
    const { data: { name, group, demo, series, repetitions, id } } = params as RouteParams;

    const handleExerciseHistoryRegister: () => Promise<void> = async () => {
        try {
            setIsLoading(true);

            await api.post('/history', { exercise_id: id });

            const title: string = 'Parabéns! Exercício concluído com sucesso.'

            show({
                title,
                placement: 'top',
                bgColor: 'green.700'
            });
        }
        catch (error) {
            const isAppError = error instanceof AppError;
            const title: string = isAppError ? error.message : 'Não foi possível registrar o exercício';

            show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1}>
            <VStack bg="gray.600" px={8} pt={12}>
                <TouchableOpacity>
                    <Icon
                        as={Feather}
                        name='arrow-left'
                        color='green.500'
                        size={6}
                        onPress={() => goBack()}
                    />
                </TouchableOpacity>
                <HStack justifyContent='space-between' alignItems='center' mt={4} mb={8}>
                    <Heading color='gray.100' fontSize='lg' fontFamily='heading' flexShrink={1}>
                        {name}
                    </Heading>
                    <HStack alignItems='center'>
                        <BodySvg />
                        <Text color='gray.200' fontSize='sm' textTransform='capitalize' ml={1}>
                            {group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <VStack p={8}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/demo/${demo}` }}
                    alt='Exercise image'
                    w='full' h={80} mb={3}
                    resizeMode='cover'
                    rounded='lg'
                />
                <Box bgColor='gray.600' rounded='md' pb={4} px={4}>
                    <HStack alignItems='center' justifyContent='space-around' my={5}>
                        <HStack>
                            <SeriesSvg />
                            <Text color='gray.200' fontSize='sm' ml={2}>
                                {series} Séries
                            </Text>
                        </HStack>
                        <HStack>
                            <RepetitionsSvg />
                            <Text color='gray.200' fontSize='sm' ml={2}>
                                {repetitions} repetições
                            </Text>
                        </HStack>
                    </HStack>
                    <Button
                        title='Marcar como realizado'
                        variant='solid'
                        isLoading={isLoading}
                        onPress={handleExerciseHistoryRegister}
                    />
                </Box>
            </VStack>
        </VStack>
    )
}

export default Exercise;