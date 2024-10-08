import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { UserForm } from '../components/UserForm'
import UserService from '../services/UserService'
import { UserCreationDto, UserResponseDto } from '../types/UserTypes'

const initialValues: UserCreationDto = {
  cpf: '',
  name: '',
  email: '',
  phone: '',
  addresses: [],
  password: '',
  idProfile: 0
}

export const PatientCheckIn: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserResponseDto | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoggedIn(false)
        return
      }

      const { user, status } = await UserService.getInfosOfLoggedUser()
      setCurrentUser(user)

      if (status === 200 && user) {
        setCurrentUser(user)
      } else {
        setIsLoggedIn(false)
      }
    }

    fetchUser()
  }, [])

  const register = async (values: UserCreationDto) => {
    values.idProfile = 4

    const { status } = await UserService.createUser(values)
    if (status === 200) {
      navigate('/')
    } else {
      alert('Erro ao dar entrada de paciente, verifique se o CPF é válido.')
    }
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl px-2">
      <Header user={currentUser} />

      <h1 className="text-2xl font-medium">Dar entrada de Paciente</h1>
      <UserForm
        initialValues={initialValues}
        onSubmit={register}
        isPatientCheckIn
      />
    </div>
  )
}
