import axios, { AxiosError } from 'axios'
import { LoginDto } from '../types/UserTypes'

class AuthService {
  private baseUrl: string
  port = import.meta.env.VITE_PORT || 7131

  constructor() {
    this.baseUrl = `https://localhost:${this.port}/api/User`
  }

  async login(loginDto: LoginDto): Promise<{ token: string; status: number }> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, loginDto)
      return { token: response.data.token, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { token: '', status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }
}

export default new AuthService()
