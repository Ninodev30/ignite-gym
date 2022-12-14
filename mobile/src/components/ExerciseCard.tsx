import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from '@expo/vector-icons';
import ExerciseDTO from "@dtos/ExerciseDTO";
import api from "@services/api";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
}

const ExerciseCard: React.FC<Props> = ({ data, ...rest }) => {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg='gray.500' alignItems='center' p={2} mb={3}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                    alt='exercise image'
                    w={16}
                    h={16}
                    rounded='md'
                />
                <VStack flex={1} ml={4}>
                    <Heading color='white' fontSize='lg' fontFamily='heading'>
                        {data.name}
                    </Heading>
                    <Text color='gray.200' fontSize='sm' mt={1} numberOfLines={2}>
                        {data.series} séries X {data.repetitions} repetições
                    </Text>
                </VStack>
                <Icon
                    as={Entypo}
                    name='chevron-thin-right'
                    color='gray.300'
                />
            </HStack>
        </TouchableOpacity>
    )
}

export default ExerciseCard;