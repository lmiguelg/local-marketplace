import { FC, HTMLAttributes } from 'react'
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  price: number
  image: string
}
const Card: FC<CardProps> = ({ title, price, image, ...rest }) => {
  const intl = useIntl()
  return (
    <div {...rest}>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'630px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
          cursor='pointer'
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: 'blur(15px)',
              zIndex: -1
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)'
              }
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={682}
              objectFit={'cover'}
              src={image}
              alt={title}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {title}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {intl.formatNumber(price, {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </div>
  )
}

export default Card
