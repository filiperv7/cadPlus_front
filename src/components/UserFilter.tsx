interface UserFilterProps {
  selectedProfile: number
  setSelectedProfile: (profileId: number) => void
}

export const UserFilter: React.FC<UserFilterProps> = ({
  selectedProfile,
  setSelectedProfile
}) => {
  const profiles = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Médico(a)' },
    { id: 3, label: 'Enfermeiro(a)' },
    { id: 4, label: 'Paciente' }
  ]

  return (
    <div className="flex space-x-4 mb-4">
      {profiles.map(profile => (
        <button
          key={profile.id}
          onClick={() => setSelectedProfile(profile.id)}
          className={`p-2 rounded ${
            selectedProfile === profile.id
              ? 'bg-[#8C22BC] text-white'
              : 'bg-gray-200'
          }`}
        >
          {profile.label}
        </button>
      ))}
    </div>
  )
}
