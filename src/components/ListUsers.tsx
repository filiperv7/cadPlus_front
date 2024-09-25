// ListUsers.tsx
import React from 'react'
import { UserResponseDto } from '../types/UserTypes'

interface ListUsersProps {
  users: UserResponseDto[]
  onEdit: (userId: string) => void
  isPatient: boolean
  onEditName?: string
  onDelete?: (userId: string) => void
}

export const ListUsers: React.FC<ListUsersProps> = ({
  users,
  onEdit,
  onEditName,
  onDelete,
  isPatient
}) => {
  return (
    <>
      <h1 className="text-2xl font-medium pb-2">
        {isPatient ? 'Pacientes' : 'Usuários'}
      </h1>

      <div className="flex flex-col space-y-2">
        {users.map(user => (
          <div
            key={user.id}
            className="border border-gray-300 rounded p-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <h3 className="font-bold">{user.name}</h3>
              {isPatient && (
                <p className="text-gray-600">
                  Estado de Saúde: {user.healthStatus}
                </p>
              )}
            </div>
            <div>
              <button
                onClick={() => onEdit(user.id)}
                className="text-blue-500 hover:underline mr-2"
              >
                {onEditName ?? 'Editar'}
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
