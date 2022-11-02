import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { AppNavigatorRoutesProps } from 'src/routes/app.routes';
import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";
import ExerciseCard from '@components/ExerciseCard';

const Home: React.FC = () => {
    const [groups, setGroups] = useState<string[]>(['Costas', 'Biceps', 'Triceps', 'Ombro']);
    const [groupSelected, setGroupSelected] = useState<string>('Costas');
    const [exercises, setExercises] = useState<string[]>(['puxada frontal', 'remada curvada', 'remada unilateral', 'rosca direta']);
    const { navigate }: AppNavigatorRoutesProps = useNavigation();

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
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            title={item}
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