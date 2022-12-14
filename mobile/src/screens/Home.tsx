import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base";
import { AppNavigatorRoutesProps } from 'src/routes/app.routes';
import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";
import ExerciseCard from '@components/ExerciseCard';
import api from '@services/api';
import AppError from '@utils/AppError';
import ExerciseDTO from '@dtos/ExerciseDTO';

type FetchType = {
    groups: () => Promise<void>;
    exercisesByGroup: () => Promise<void>;
}

const Home: React.FC = () => {
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSelected, setGroupSelected] = useState<string>('antebraço');
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    
    const { show } = useToast();
    const { navigate }: AppNavigatorRoutesProps = useNavigation();

    const fetch: FetchType = {
        groups: async () => {
            try {
                const { data } = await api.get('groups');
                setGroups(data);
            }
            catch (error) {
                const isAppError = error instanceof AppError;
                const title: string = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

                show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
        },
        exercisesByGroup: async () => {
            try {
                const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
                setExercises(data);
                console.log(data);
            }
            catch (error) {
                const isAppError = error instanceof AppError;
                const title: string = isAppError ? error.message : 'Não foi possível carregar os exercícios';

                show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
        }
    }

    useEffect(() => {
        fetch.groups();
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetch.exercisesByGroup();
        }, [groupSelected])
    )

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                // this property is for implement a X-padding between the items
                my={10}
                maxH={10}
            />
            <VStack flex={1} px={8}>
                <HStack justifyContent='space-between' mb={5}>
                    <Heading
                        color='gray.200'
                        fontSize='md'
                        fontFamily='heading'
                    >
                        Exercícios
                    </Heading>
                    <Text
                        color='gray.200'
                        fontSize='sm'
                    >
                        {exercises.length}
                    </Text>
                </HStack>
                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            data={item}
                            onPress={() => navigate('exercise')}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 20 }}
                />
            </VStack>
        </VStack>
    )
}

export default Home;