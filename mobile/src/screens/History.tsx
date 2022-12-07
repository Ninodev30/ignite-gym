import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";

const History: React.FC = () => {
    const [listExercises, setListExercises] = useState([
        {
            title: 'title 1',
            data: ['', '', '']
        },
        {
            title: 'title 2',
            data: ['', '', '']
        }
    ])

    return (
        <VStack flex={1}>
            <ScreenHeader title='Histórico de exercícios' />
            <SectionList
                sections={listExercises}
                keyExtractor={(item: any, index) => item + index}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Heading
                        color='gray.200'
                        fontSize='md'
                        fontFamily='heading'
                        mt={10}
                        mb={3}
                    >
                        {title}
                    </Heading>
                )}
                contentContainerStyle={listExercises.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text
                        color='gray.100'
                        textAlign='center'
                    >
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer treinar hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
                px={8}
            />
        </VStack>
    )
}

export default History;