import { createContext, FC, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

type User = {
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInProps) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  // useEffetct to validate if user is authenticated every time the page is loaded
  // useEffect(() => {
  //   const { token } = parseCookies()
  //   if (token) {
  //     setUser(JSON.parse(user))
  //   }
  // }, [])

  const signIn = async ({ email, password }: SignInProps) => {
    // call login api
    // if success save token (returnd by api) in cookies
    const token = 'asd8a76da87d6asd68a7sd68a76da78d687asd6ada789d'

    setCookie(undefined, 'token', token, {
      maxAge: 60 * 60 * 1 //1 hour
    })

    setUser({
      name: 'John Doe',
      email
    })

    Router.push('/car')
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
