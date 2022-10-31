import { Image, IImageProps } from "native-base"

type Props = IImageProps & {
    size: number;
}

const UserPhoto: React.FC<Props> = ({ size, ...rest }) => {
    return (
        <Image
            w={size}
            h={size}
            rounded='full'
            borderWidth={2}
            borderColor='gray.00'
            {...rest}
        />
    )
}

export default UserPhoto;