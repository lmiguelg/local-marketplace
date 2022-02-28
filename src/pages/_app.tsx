import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { Navbar } from '../components/molecules'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale='pt' defaultLocale='en'>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </IntlProvider>
  )
}

export default MyApp
