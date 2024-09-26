import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Header } from '../components/Header'
import UserService from '../services/UserService'
import { UserResponseDto } from '../types/UserTypes'

export const Contact = () => {
  const [currentUser, setCurrentUser] = useState<UserResponseDto | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoggedIn(false)
        return
      }

      try {
        const { user, status } = await UserService.getInfosOfLoggedUser()

        if (status === 200) {
          setCurrentUser(user)
        } else {
          setIsLoggedIn(false)
        }
      } catch {
        setIsLoggedIn(false)
      }
    }

    fetchUser()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header user={currentUser} />

      <div className="h-screen flex flex-col  mt-4 text-center">
        <p className="text-lg font-semibold">Entre em contato via:</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://wa.me/SEU_NUMERO_DE_WHATSAPP"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            WhatsApp
          </a>

          <a
            href="mailto:seuemail@dominio.com"
            target="_blank"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            E-mail
          </a>
        </div>
      </div>
    </div>
  )
}
