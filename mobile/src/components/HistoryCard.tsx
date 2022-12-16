import HistoryDTO from "@dtos/HistoryDTO";
import { Heading, HStack, Text, VStack } from "native-base";

type Props = {
    data: HistoryDTO;
};

const HistoryCard: React.FC<Props> = ({ data: { group, hour, name } }) => {
    return (
        <HStack w='full' px={5} py={4} mb={3} bgColor='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
            <VStack mr={5}>
                <Heading color='white' fontSize='md' fontFamily='heading' textTransform='capitalize'>
                    {group}
                </Heading>
                <Text color='gray.100' fontSize='lg' numberOfLines={1} maxWidth={200}>
                    {name}
                </Text>
            </VStack>
            <Text color='gray.300' fontSize='md'>
                {hour}
            </Text>
        </HStack>
    )
}

export default HistoryCard;