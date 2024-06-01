import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
  token: string
  userInfo: {
    id: string
    name: string
    avatar: string
    phone_number: string
  }
}

interface Action {
  setToken: (value: string) => void
  setUserInfo: (value: State['userInfo']) => void
}

const userStore = create(persist<State & Action>(set => ({
  token: '',
  userInfo: {
    id: '',
    name: '',
    avatar: '',
    phone_number: '',
  },
  setToken: (value) => {
    set(() => ({ token: value }))
  },
  setUserInfo: (value) => {
    set(() => ({ userInfo: value }))
  },
}), {
  name: 'user-store',
  storage: createJSONStorage(() => localStorage),
}))

export { userStore }
