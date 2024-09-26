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
        const { user, status } = await UserService.getInfosOfLoggedUser()

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

  const deleteUser = async (userId: string) => {
    const { status } = await UserService.deleteUser(userId)

    if (status === 200) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }

  const evolvePatient = async (userId: string, healthStatus?: number) => {
    if (healthStatus) {
      const { status } = await UserService.evolvePatient(userId, healthStatus)

      if (status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, healthStatus } : user
          )
        )
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl px-2">
      <Header user={currentUser} userProfile={userProfile}></Header>
      <div className="flex flex-col gap-2 flex-1">
        {userProfile === 1 && (
          <div>
            <div className="pb-3 flex gap-2 justify-end font-semibold text-white">
              <a
                href="/patient_check_in"
                className="p-2 bg-[#8C22BC] rounded-lg"
              >
                Dar entrada de Paciente
              </a>
              <a
                href="/register_employee"
                className="p-2 bg-[#E66251] rounded-lg"
              >
                Cadastrar Funcionário
              </a>
            </div>

            <UserFilter
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />

            <ListUsers
              users={users}
              onEdit={id => console.log(`Editar ${id}`)}
              onDelete={id => deleteUser(id)}
              onEditName="Editar"
              isPatient={selectedProfile === 4}
            />
          </div>
        )}

        {(userProfile === 2 || userProfile === 3) && (
          <ListUsers
            users={users}
            onEdit={evolvePatient}
            onEditName="Evoluir"
            isPatient={true}
          />
        )}
      </div>
    </div>
  )
}
