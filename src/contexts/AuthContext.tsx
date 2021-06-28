import {createContext, useEffect, useState} from 'react'
import { parseCookies, setCookie } from 'nookies'
import Router from 'next/router'

import { signInRequest, recoverUserInformation } from '../services/auth'
import { api } from '../services/api'

type signInData = {
  email: string
  password: string
}

type User = {
  name: string
  email: string
  avatar_url: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: signInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@NEXTAUTH:TOKEN': token } = parseCookies()

    if(token) {
      recoverUserInformation(token).then(response => setUser(response.user))
      Router.push('/dashboard')
    }

  }, [])

  async function signIn ({ email, password }: signInData) {
    const { token, user } = await signInRequest({
      email,
      password
    })

    setCookie(undefined, '@NEXTAUTH:TOKEN', token, { 
      maxAge: 60 * 60 * 1, // hour
     })

     api.defaults.headers['Authorization'] = `Bearer ${token}`
     setUser(user)

     Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}