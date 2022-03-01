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
import { useContext, useRef } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {
  const formBgColor = useColorModeValue('gray.200', 'gray.900')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { signIn } = useContext(AuthContext)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (email && password) {
      await signIn({ email, password })
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Flex
        height='100vh'
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Flex direction='column' background={formBgColor} p={12} rounded={6}>
          <Heading mb={6}>Sign in</Heading>
          <Input
            ref={emailRef}
            placeholder='email@email.com'
            variant='filled'
            mb={3}
            type='email'
            name='email'
          />
          <Input
            ref={passwordRef}
            placeholder='**********'
            variant='filled'
            mb={6}
            type='password'
            name='password'
          />
          <Button type='submit' colorScheme='teal'>
            Sign in
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default Home
