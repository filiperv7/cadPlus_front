import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { ListUsers } from '../components/ListUsers'
import { Loading } from '../components/Loading'
import { UserFilter } from '../components/UserFilter'
import UserService from '../services/UserService'
import { UserResponseDto } from '../types/UserTypes'

export const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<UserResponseDto[]>([])
  const [selectedProfile, setSelectedProfile] = useState<number>(4)
  const [currentUser, setCurrentUser] = useState<UserResponseDto | null>(null)
  const [userProfile, setUserProfile] = useState<number | null>(null)

  useEffect(() => {
    const fetchUserAndUsers = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoggedIn(false)
        setLoading(false)
        return
      }

      try {
        // ids para consultas temporárias
        // id de admin: 10fd012e-2a0d-48e7-ade7-185ae99d0dbc
        // id de médico: 90571f04-4d87-4568-b950-d482d09c0ea6
        // id de paciente: baa34c8b-fb5c-486f-86bf-541bd52146c2

        const { user, status } = await UserService.findUserById(
          '10fd012e-2a0d-48e7-ade7-185ae99d0dbc'
        ) // TEMPORÁRIO! todo: criar rota de infos do usuário logado

        if (status === 200 && user) {
          setCurrentUser(user)
          setUserProfile(user.profiles[0].id)
          setIsLoggedIn(true)

          const { users, status: usersStatus } =
            await UserService.findUsersByProfile(selectedProfile)
          if (usersStatus === 200) {
            setUsers(users)
          }
        } else {
          setIsLoggedIn(false)
        }
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndUsers()
  }, [selectedProfile])

  if (loading) {
    return <Loading />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl px-2">
      <Header user={currentUser} userProfile={userProfile}></Header>
      <div className="flex flex-col gap-2 flex-1">
        {userProfile === 1 && (
          <div>
            <div className="pb-3 flex gap-2 justify-end font-semibold text-white">
              <button className="p-2 bg-[#8C22BC] rounded-lg">
                Dar entrada de Paciente
              </button>
              <button className="p-2 bg-[#E66251] rounded-lg">
                Cadastrar Funcionário
              </button>
            </div>

            <UserFilter
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />

            <ListUsers
              users={users}
              onEdit={id => console.log(`Editar ${id}`)}
              onDelete={id => console.log(`Excluir ${id}`)}
              isPatient={selectedProfile === 4}
            />
          </div>
        )}

        {(userProfile === 2 || userProfile === 3) && (
          <ListUsers
            users={users}
            onEdit={id => console.log(`Evoluir ${id}`)}
            onEditName="Evoluir"
            isPatient={true}
          />
        )}
      </div>
    </div>
  )
}
