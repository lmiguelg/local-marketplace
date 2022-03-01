import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { Navbar } from '../components/molecules'
import AuthContext from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <IntlProvider locale='pt' defaultLocale='en'>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </IntlProvider>
    </AuthContext>
  )
}

export default MyApp
