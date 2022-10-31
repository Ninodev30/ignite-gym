import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
    title: string;
    variant: 'solid' | 'outline'
}

const Button: React.FC<Props> = ({ title, variant, ...rest }) => {
    return (
        <ButtonNativeBase
            w='full'
            h={14}
            rounded='sm'
            bg={variant === 'solid' ? 'green.700' : 'transparent'}
            borderWidth={variant === 'solid' ? 'none' : 1}
            borderColor='green.500'
            _pressed={{ bg: variant === 'solid' ? 'green.500' : 'gray.500' }}
            mb={6}
            {...rest}
        >
            <Text
                color={variant === 'solid' ? 'white' : 'green.500'}
                fontFamily='heading'
                fontSize='sm'
            >
                {title}
            </Text>
        </ButtonNativeBase>
    )
}

export default Button;