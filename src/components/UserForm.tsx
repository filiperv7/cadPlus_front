import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { UserCreationDto, UserUpdateDto } from '../types/UserTypes'
import { AddressGroup } from './AddressGroup'

interface UserFormProps<T> {
  onSubmit: (values: T) => void
  initialValues: T
  isEditMode?: boolean
  isPatientCheckIn?: boolean
}

export const UserForm = <T extends UserUpdateDto | UserCreationDto>({
  initialValues,
  onSubmit,
  isEditMode = false,
  isPatientCheckIn = false
}: UserFormProps<T>) => {
  const validationSchema = Yup.object({
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .length(11, 'CPF deve ter 11 caracteres')
      .matches(/^[0-9]+$/, 'CPF deve conter apenas números'),
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: Yup.string()
      .required('Telefone é obrigatório')
      .length(11, 'Telefone deve ter 11 caracteres')
      .matches(/^[0-9]+$/, 'Telefone deve conter apenas números'),
    addresses: Yup.array().of(
      Yup.object({
        zipCode: Yup.string()
          .required('CEP é obrigatório')
          .length(8, 'CEP deve ter 8 caracteres')
          .matches(/^[0-9]+$/, 'CEP deve conter apenas números'),
        street: Yup.string().required('Rua é obrigatória'),
        city: Yup.string().required('Cidade é obrigatória'),
        state: Yup.string().required('Estado é obrigatório')
      })
    ),
    password: Yup.string(),
    idProfile: Yup.number()
  })

  if (!isEditMode) {
    validationSchema.fields.password = Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'Senha deve ter 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
        'Senha deve ter letras maiúsculas, minúsculas e caracteres especiais'
      )

    if (!isPatientCheckIn)
      validationSchema.fields.idProfile = Yup.number().required(
        'Perfil é obrigatório'
      )
  }

  const isUserUpdateDto = (
    user: UserCreationDto | UserUpdateDto
  ): user is UserUpdateDto => {
    return (user as UserUpdateDto).addressesExcluded !== undefined
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
      enableReinitialize
    >
      {({ values, setFieldValue, isValid }) => (
        <Form className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <label className="font-medium" htmlFor="cpf">
                  CPF:
                </label>
                <Field
                  id="cpf"
                  name="cpf"
                  className="p-1 pl-2 border rounded-md outline-none"
                />
              </div>

              <ErrorMessage
                name="cpf"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <label className="font-medium" htmlFor="name">
                  Nome:
                </label>
                <Field
                  id="name"
                  name="name"
                  className="w-96 p-1 pl-2 border rounded-md outline-none"
                />
              </div>

              <ErrorMessage
                name="name"
                component="div"
                className="errorMessage"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <label className="font-medium" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  name="email"
                  className="w-96 p-1 pl-2 border rounded-md outline-none"
                />
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <label className="font-medium" htmlFor="phone">
                  Telefone:
                </label>
                <Field
                  id="phone"
                  name="phone"
                  className="w-[10.5rem] p-1 pl-2 border rounded-md outline-none"
                />
              </div>

              <ErrorMessage
                name="phone"
                component="div"
                className="errorMessage"
              />
            </div>
          </div>

          {!isEditMode && (
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <label className="font-medium" htmlFor="password">
                    Senha:
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="w-96 p-1 pl-2 border rounded-md outline-none"
                  />
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="errorMessage"
                />
              </div>

              {!isPatientCheckIn && (
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <label className="font-medium" htmlFor="idProfile">
                        Perfil:
                      </label>
                      <Field
                        as="select"
                        id="idProfile"
                        name="idProfile"
                        className="p-1 pl-2 border rounded-md outline-none"
                      >
                        <option value="">Selecione um perfil</option>
                        <option value="1">Admin</option>
                        <option value="2">Médico(a)</option>
                        <option value="3">Enfermeiro(a)</option>
                      </Field>
                    </div>

                    <ErrorMessage
                      name="idProfile"
                      component="div"
                      className="errorMessage"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <FieldArray name="addresses">
            {({ remove, push }) => (
              <div>
                {values.addresses.map((address, index) => (
                  <AddressGroup
                    key={index}
                    index={index}
                    address={address}
                    onRemove={() => {
                      if (address.id && isEditMode && isUserUpdateDto(values)) {
                        setFieldValue('addressesExcluded', [
                          ...(values.addressesExcluded || []),
                          address.id
                        ])
                      }
                      remove(index)
                    }}
                  />
                ))}

                <button
                  type="button"
                  onClick={() =>
                    push({ zipCode: '', street: '', city: '', state: '' })
                  }
                  className="bg-[#8C22BC] text-white px-4 py-2 rounded"
                >
                  + Adicionar Endereço
                </button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-[#8C22BC] text-white px-4 py-2 rounded ${
                !isValid && 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isValid}
            >
              Salvar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
