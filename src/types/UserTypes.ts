import { AddressDto } from './AddressType'
import { HealthStatus } from './HealthStatus'
import { ProfileDto } from './ProfileType'

export type UserCreationDto = {
  cpf: string
  name: string
  email: string
  password: string
  phone: string
  addresses: AddressDto[]
  idProfile: number
}

export type UserUpdateDto = {
  id: string
  cpf: string
  name: string
  email: string
  phone: string
  addresses: AddressDto[]
  addressesExcluded?: string[]
}

export type UserResponseDto = {
  id: string
  cpf: string
  name: string
  email: string
  phone: string
  healthStatus: HealthStatus
  addresses: AddressDto[]
  profiles: ProfileDto[]
}

export type LoginDto = {
  email: string
  password: string
}
