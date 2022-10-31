import { Text, Pressable, IPressableProps } from 'native-base';

type Props = IPressableProps & {
    name: string;
    isActive: boolean;
}

const Group: React.FC<Props> = ({ name, isActive, ...rest }) => {
    return (
        <Pressable
            w={24}
            h={10}         
            mr={3}
            bg='gray.600'
            rounded='md'
            justifyContent='center'
            alignItems='center'
            overflow='hidden'
            isPressed={isActive}
            _pressed={{
                borderColor: 'green.500',
                borderWidth: 1
            }}
            {...rest}
        >
            <Text
                color={isActive ? 'green.500' : 'gray.200'}
                fontSize='xs'
                fontWeight='bold'
                textTransform='uppercase'
            >
                {name}
            </Text>
        </Pressable>
    )
}

export default Group;