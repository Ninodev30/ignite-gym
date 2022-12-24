import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast, Center } from "native-base";
import HistoryDTO from "@dtos/HistoryDTO";
import AppError from "@utils/AppError";
import api from "@services/api";
import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";
import Loading from "@components/Loading";
import useAuth from "@hooks/useAuth";

type HistoryList = {
    title: string;
    data: HistoryDTO[];
}[];

const History: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [listExercises, setListExercises] = useState<HistoryList>([]);

    const { show } = useToast();
    const { refreshedToken } = useAuth();

    const fecthHistory: () => Promise<void> = async () => {
        try {
            setIsLoading(true);

            const { data } = await api.get('history');
            setListExercises(data);
        }
        catch (error) {
            const isAppError = error instanceof AppError;
            const title: string = isAppError ? error.message : 'Não foi possível carregar o historico';

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

    useFocusEffect(
        useCallback(() => {
            fecthHistory();
        }, [refreshedToken])
    );

    return (
        <VStack flex={1}>
            <ScreenHeader title='Histórico de exercícios' />
            {isLoading ?
                <Loading /> : listExercises?.length > 0 ?
                    <SectionList
                        sections={listExercises}
                        keyExtractor={item => (item.id).toString()}
                        renderItem={({ item }) => <HistoryCard data={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <Heading color='gray.200' fontSize='md' fontFamily='heading' mt={10} mb={3}>
                                {title}
                            </Heading>
                        )}
                        contentContainerStyle={listExercises.length === 0 && { flex: 1, justifyContent: 'center' }}
                        showsVerticalScrollIndicator={false}
                        px={8}
                    />
                    :
                    <Center flex={1}>
                        <Text color='gray.100' textAlign='center'>
                            Não há exercícios registrados ainda. {'\n'}
                            Vamos fazer treinar hoje?
                        </Text>
                    </Center>
            }
        </VStack>
    )
}

export default History;