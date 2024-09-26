import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import AuthService from '../services/AuthService'
import { LoginDto } from '../types/UserTypes'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'Senha deve ter 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
        'Senha deve ter letras maiúsculas, minúsculas e caracteres especiais'
      )
  })

  const handleSubmit = async (values: { email: string; password: string }) => {
    const loginDto: LoginDto = {
      email: values.email,
      password: values.password
    }

    try {
      const { token, status } = await AuthService.login(loginDto)

      if (status === 200) {
        localStorage.setItem('token', token)
        navigate('/')
      } else {
        setError('Login falhou. Verifique suas credenciais.')
      }
    } catch (error) {
      setError('Ocorreu um erro ao realizar o login.')
      console.error(error)
    }
  }

  return (
    <div className="max-w-5xl flex flex-col items-center mt-40 h-screen">
      <h2 className="text-5xl">
        Cad<span className="text-[#8C22BC] font-bold">Plus</span>
      </h2>

      <div className="flex justify-center items-center h-screen -mt-40">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {error && <div className="errorMessage">{error}</div>}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="password">
                  Senha
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <button
                type="submit"
                className="bg-[#8C22BC] text-white p-2 rounded w-full hover:bg-blue-600"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
