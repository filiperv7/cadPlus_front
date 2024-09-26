import { CaretLeft } from '@phosphor-icons/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserResponseDto } from '../types/UserTypes'
import { Modal } from './Modal'

interface HeaderProps {
  user: UserResponseDto | null
  userProfile?: number | null
}

export const Header: React.FC<HeaderProps> = ({ user, userProfile }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const firstName = user?.name.split(' ').shift()
  const lastName = user?.name.split(' ').pop()
  let userName = firstName
  if (user?.name.split(' ') != undefined && user?.name.split(' ').length != 1)
    userName = `${firstName} ${lastName}`

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const handleBackClick = () => {
    if (location.pathname !== '/') {
      // Se a rota atual não for "/", redirecione para "/"
      navigate('/')
    } else {
      // Se a rota for "/", abre o modal de logout
      setIsLogoutModalOpen(true)
    }
  }

  return (
    <div className="max-w-5xl flex items-center justify-between h-14">
      <div className="flex items-center">
        <CaretLeft
          size={26}
          weight="bold"
          className="text-[#8C22BC] mt-1 cursor-pointer"
          onClick={handleBackClick}
        />

        <h2 className="text-2xl">
          Cad<span className="text-[#8C22BC] font-bold">Plus</span>
        </h2>
      </div>

      <div className="flex items-center gap-16">
        <div className="flex items-center gap-5 text-[#8C22BC] font-medium">
          <a href="/contact" className="duration-1000 hover:underline">
            Entre em contato
          </a>
          <a href="/my_profile" className="duration-1000 hover:underline">
            Meu Perfil
          </a>
        </div>

        <p className="flex flex-col items-end mt-2 welcome">
          <span>
            Bem-vindo(a) <span className="font-bold">{userName}</span>!
          </span>
          {userProfile === 1 || userProfile === 2 || userProfile === 3 ? (
            <span>O que deseja fazer hoje?</span>
          ) : (
            <span>Como você está hoje?</span>
          )}
        </p>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Sair"
        content={<p>Tem certeza que deseja sair?</p>}
        onConfirm={handleLogout}
      />
    </div>
  )
}
