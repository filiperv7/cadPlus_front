import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { UserForm } from '../components/UserForm'
import UserService from '../services/UserService'
import { UserResponseDto, UserUpdateDto } from '../types/UserTypes'

const initialValues: UserUpdateDto = {
  id: '',
  cpf: '',
  name: '',
  email: '',
  phone: '',
  addresses: [],
  addressesExcluded: []
}

export const MyProfile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserResponseDto | null>(null)
  const [formValues, setFormValues] = useState<UserUpdateDto>(initialValues)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
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

      try {
        if (user) {
          setFormValues({
            id: user.id,
            cpf: user.cpf,
            name: user.name,
            email: user.email,
            phone: user.phone,
            addresses: user.addresses,
            addressesExcluded: []
          })
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
      }
    }

    fetchUsers()
  }, [])

  const edit = async (values: UserUpdateDto) => {
    const { status } = await UserService.updateUser(values)
    if (status === 200) {
      navigate('/')
    } else {
      alert('Erro ao editar usuário, verifique se o CPF é válido.')
    }
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl px-2">
      <Header user={currentUser} />

      <h1 className="text-2xl font-medium">Editar Usuário</h1>
      <UserForm initialValues={formValues} onSubmit={edit} isEditMode />
    </div>
  )
}
