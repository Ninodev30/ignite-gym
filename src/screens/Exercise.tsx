import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Heading, HStack, Icon, Text, VStack, Image, Box } from "native-base";
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg'
import Button from "@components/Button";

const Exercise: React.FC = () => {
    const { goBack } = useNavigation();

    return (
        <VStack flex={1}>
            <VStack
                bg="gray.600"
                px={8}
                pt={12}
            >
                <TouchableOpacity>
                    <Icon
                        as={Feather}
                        name='arrow-left'
                        color='green.500'
                        size={6}
                        onPress={() => goBack()}
                    />
                </TouchableOpacity>
                <HStack
                    justifyContent='space-between'
                    alignItems='center'
                    mt={4}
                    mb={8}
                >
                    <Heading
                        color='gray.100'
                        fontSize='lg'
                        flexShrink={1}
                    >
                        Puxada frontal
                    </Heading>
                    <HStack alignItems='center'>
                        <BodySvg />
                        <Text
                            color='gray.200'
                            fontSize='sm'
                            textTransform='capitalize'
                            ml={1}
                        >
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <VStack p={8}>
                <Image
                    source={{ uri: 'data:image/jpeg;base64,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' }}
                    alt='Exercise image'
                    w='full'
                    h={80}
                    mb={3}
                    resizeMode='cover'
                    rounded='lg'
                />
                <Box
                    bgColor='gray.600'
                    rounded='md'
                    pb={4}
                    px={4}
                >
                    <HStack
                        alignItems='center'
                        justifyContent='space-around'
                        my={5}
                    >
                        <HStack>
                            <SeriesSvg />
                            <Text
                                color='gray.200'
                                fontSize='sm'
                                ml={2}
                            >
                                3 Séries
                            </Text>
                        </HStack>
                        <HStack>
                            <RepetitionsSvg />
                            <Text
                                color='gray.200'
                                fontSize='sm'
                                ml={2}
                            >
                                12 repetições
                            </Text>
                        </HStack>
                    </HStack>
                    <Button
                        title='Marcar como realizado'
                        variant='solid'
                    />
                </Box>
            </VStack>
        </VStack>
    )
}

export default Exercise;