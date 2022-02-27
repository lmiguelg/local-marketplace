import type { NextPage } from 'next'
import Router from 'next/router'
import {
  Button,
  Flex,
  Heading,
  Input,
  Switch,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode()
  const formBgColor = useColorModeValue('gray.200', 'gray.900')

  return (
    <Flex height='100vh' direction='column'>
      <Flex direction='row' justify='end' alignItems='center'>
        ☀️
        <Switch
          id='colorMode'
          colorScheme='teal'
          p={2}
          onChange={toggleColorMode}
        />
        🌛
      </Flex>
      <Flex height='100vh' alignItems='center' justifyContent='center'>
        <Flex direction='column' background={formBgColor} p={12} rounded={6}>
          <Heading mb={6}>Login</Heading>
          <Input
            placeholder='email@email.com'
            variant='filled'
            mb={3}
            type='email'
          />
          <Input
            placeholder='**********'
            variant='filled'
            mb={6}
            type='password'
          />
          <Button colorScheme='teal' onClick={() => Router.push('/car')}>
            Log in
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
