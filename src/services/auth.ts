import { v4 as uuid } from 'uuid'

type signInRequestType = {
  email: string
  password: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: signInRequestType) {
  await delay()

  return {
    token: uuid(),
    user: {
      name: 'Werick Nalyson',
      email: 'wericknalyson@gmail.com',
      avatar_url: 'https://github.com/werick-nalyson.png'
    }
  }
}

export async function recoverUserInformation(token: string) {
  await delay()

  return {
    user: {
      name: 'Werick Nalyson',
      email: 'wericknalyson@gmail.com',
      avatar_url: 'https://github.com/werick-nalyson.png'
    }
  } 
}