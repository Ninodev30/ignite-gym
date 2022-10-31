import { useState } from 'react';
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import HomeHeader from "@components/HomeHeader";
import Group from "@components/Group";

const Home: React.FC = () => {
    const [groups, setGroups] = useState<string[]>(['Costas', 'Biceps', 'Triceps', 'Ombro']);
    const [groupSelected, setGroupSelected] = useState<string>('costas');

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected === item}
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
            <HStack justifyContent='space-between'>
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
                    4
                </Text>
            </HStack>
        </VStack>
    )
}

export default Home;