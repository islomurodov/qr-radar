import type { AxiosError, AxiosResponse } from 'axios'
import type { QRCode, User } from '~/types/auth'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import instance from '~/composables/axios'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  if (typeof window !== 'undefined') {
    token.value = localStorage.getItem('userToken')
  }

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    if (typeof window !== 'undefined') {
      localStorage.setItem('userToken', newToken)
    }
  }

  function setUser(userData: User) {
    user.value = userData
  }

  function logout() {
    token.value = null
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken')
    }
  }

  async function login(credentials: { login: string, password: string }) {
    if (!credentials.login && !credentials.password)
      return toast.error('Пожалуйста, заполните все пустые поля')

    try {
      const response: AxiosResponse = await instance.post('/auth/login', credentials)

      const data = response.data
      setToken(data.token)
      setUser(data)

      return true
    }
    catch (error: any) {
      toast.error(error.response?.data)

      throw new Error(error)
    }
  }

  async function getMe() {
    const response: AxiosResponse = await instance.get('/auth/me', {
      headers: {
        Authorization: `Baerer ${token.value}`,
      },
    })
    const user: User = response.data

    return user
  }

  async function getQRCode(qrCode_id: string) {
    const response: AxiosResponse = await instance.get(`/qr-code/get/${qrCode_id}`, {
      headers: {
        Authorization: `Baerer ${token.value}`,
      },
    })

    const data: QRCode = response.data

    return data
  }

  return { user, isAuthenticated, token, setUser, login, logout, getQRCode, getMe, setToken }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
