import axios, { AxiosError } from 'axios'
import { UserResponseDto, UserUpdateDto } from '../types/UserTypes'
import { UserCreationDto } from './../types/UserTypes'

class UserService {
  private baseUrl: string
  private port = import.meta.env.VITE_PORT || 7131

  constructor() {
    this.baseUrl = `https://localhost:${this.port}/api/User`
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
      Authorization: token ? token : ''
    }
  }

  async createUser(
    userDto: UserCreationDto
  ): Promise<{ message: string; status: number }> {
    try {
      const response = await axios.post(`${this.baseUrl}/create`, userDto, {
        headers: this.getAuthHeaders()
      })

      return { message: response.data.message, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return {
          message: '',
          status: axiosError.response.status
        }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async updateUser(
    userDto: UserUpdateDto
  ): Promise<{ message: string; status: number }> {
    try {
      const response = await axios.put(`${this.baseUrl}/update`, userDto, {
        headers: this.getAuthHeaders()
      })

      return { message: response.data.message, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return {
          message: '',
          status: axiosError.response.status
        }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async findUserById(
    id: string
  ): Promise<{ user: UserResponseDto | null; status: number }> {
    try {
      const response = await axios.get(`${this.baseUrl}?id=${id}`, {
        headers: this.getAuthHeaders()
      })

      return { user: response.data, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { user: null, status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async deleteUser(id: string): Promise<{ message: string; status: number }> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeaders()
      })

      return { message: response.data.message, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return {
          message: '',
          status: axiosError.response.status
        }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async findUsersByProfile(
    idProfile: number
  ): Promise<{ users: UserResponseDto[]; status: number }> {
    try {
      const response = await axios.get(`${this.baseUrl}/profile/${idProfile}`, {
        headers: this.getAuthHeaders()
      })

      return { users: response.data, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { users: [], status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async checkInPatientWithExistingUser(
    userId: string
  ): Promise<{ message: string; status: number }> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/check_in_patient/existing_user/${userId}`,
        {},
        {
          headers: this.getAuthHeaders()
        }
      )

      return { message: response.data.message, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { message: '', status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async evolvePatient(
    userId: string,
    healthStatus: number
  ): Promise<{ message: string; status: number }> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/evolve_patient/${userId}`,
        { healthStatus },
        {
          headers: this.getAuthHeaders()
        }
      )

      return { message: response.data.message, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { message: '', status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }

  async getInfosOfLoggedUser(): Promise<{
    user: UserResponseDto | null
    status: number
  }> {
    try {
      const response = await axios.get(`${this.baseUrl}/infos_of_logged_user`, {
        headers: this.getAuthHeaders()
      })

      return { user: response.data, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return { user: null, status: axiosError.response.status }
      }

      throw new Error('An unexpected error occurred.')
    }
  }
}

export default new UserService()
