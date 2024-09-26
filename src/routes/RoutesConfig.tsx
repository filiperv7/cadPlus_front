import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Contact } from '../pages/Contact'
import { Dashboard } from '../pages/Dashboard'
import { EditUser } from '../pages/EditUser'
import Login from '../pages/Login'
import { MyProfile } from '../pages/MyProfile'
import { PatientCheckIn } from '../pages/PatientCheckIn'
import { RegisterEmployee } from '../pages/RegisterEmployee'

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit_user/:id" element={<EditUser />} />
      <Route path="/register_employee" element={<RegisterEmployee />} />
      <Route path="/patient_check_in" element={<PatientCheckIn />} />
      <Route path="/my_profile" element={<MyProfile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default RoutesConfig
