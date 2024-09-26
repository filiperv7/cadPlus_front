// ListUsers.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserResponseDto } from '../types/UserTypes'
import { Modal } from './Modal'

interface ListUsersProps {
  users: UserResponseDto[]
  onEdit: (userId: string, healthStatus?: number) => void
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
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [healthStatus, setHealthStatus] = useState<number>(1)

  const navigate = useNavigate()

  const confirmDelete = (userId: string) => {
    setSelectedUserId(userId)
    setIsModalDeleteOpen(true)
  }

  const handleDelete = async () => {
    if (selectedUserId && onDelete) {
      onDelete(selectedUserId)
    }

    setIsModalDeleteOpen(false)
  }

  const confirmEdit = (userId: string) => {
    if (onEditName === 'Editar') {
      navigate(`/edit_user/${userId}`)
    } else {
      setSelectedUserId(userId)
      setIsModalEditOpen(true)
    }
  }

  const handleEdit = () => {
    if (selectedUserId) {
      onEdit(selectedUserId, healthStatus)
    }

    setIsModalEditOpen(false)
  }

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
                onClick={() => confirmEdit(user.id)}
                className="text-blue-500 hover:underline mr-2"
              >
                {onEditName ?? 'Editar'}
              </button>
              {onDelete && (
                <button
                  onClick={() => confirmDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Confirmar Exclusão"
        content={<p>Você realmente deseja excluir este usuário?</p>}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        title="Evoluir Paciente"
        content={
          <div>
            <label htmlFor="healthStatus">Novo Estado de Saúde:</label>
            <input
              id="healthStatus"
              type="number"
              min={1}
              max={4}
              value={healthStatus}
              onChange={e => setHealthStatus(Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
          </div>
        }
        onConfirm={handleEdit}
        confirmText="Evoluir Paciente"
        cancelText="Cancelar"
      />
    </>
  )
}
