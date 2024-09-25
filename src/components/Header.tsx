import { CaretLeft } from '@phosphor-icons/react'
import { UserResponseDto } from '../types/UserTypes'

interface HeaderProps {
  user: UserResponseDto | null
  userProfile: number | null
}

export const Header: React.FC<HeaderProps> = ({ user, userProfile }) => {
  const firstName = user?.name.split(' ').shift()
  const lastName = user?.name.split(' ').pop()
  const userName = `${firstName} ${lastName}`

  return (
    <div className="max-w-5xl flex items-center justify-between h-14">
      <div className="flex items-center gap-2">
        <CaretLeft size={26} weight="bold" className="text-[#8C22BC] mt-1" />
        <h2 className="text-2xl">
          Cad<span className="text-[#8C22BC] font-bold">Plus</span>
        </h2>
      </div>

      <div className="flex items-center gap-16">
        <div className="flex items-center gap-5 text-[#8C22BC] font-medium">
          <a href="/contact" className="duration-1000 hover:underline">
            Entre em contato
          </a>
          <a href="/contact" className="duration-1000 hover:underline">
            Meu Perfil
          </a>
        </div>

        <p className="flex flex-col items-end mt-2">
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
    </div>
  )
}
