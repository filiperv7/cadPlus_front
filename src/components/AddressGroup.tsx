import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { AddressDto } from '../types/AddressType'

interface AddressGroupProps {
  index: number
  address: AddressDto
  onRemove: () => void
}

export const AddressGroup: React.FC<AddressGroupProps> = ({
  index,
  onRemove
}) => {
  return (
    <div className="flex flex-col gap-2 border p-4 rounded mb-4">
      <div className="flex gap-4">
        <div>
          <div className="flex items-center gap-2">
            <label
              className="font-medium"
              htmlFor={`addresses[${index}].zipCode`}
            >
              CEP:
            </label>
            <Field
              id={`addresses[${index}].zipCode`}
              name={`addresses[${index}].zipCode`}
              className="p-1 pl-2 border rounded-md outline-none"
            />
          </div>

          <ErrorMessage
            name={`addresses[${index}].zipCode`}
            component="div"
            className="errorMessage"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label
              className="font-medium"
              htmlFor={`addresses[${index}].street`}
            >
              Rua:
            </label>
            <Field
              id={`addresses[${index}].street`}
              name={`addresses[${index}].street`}
              className="p-1 pl-2 border rounded-md outline-none"
            />
          </div>

          <ErrorMessage
            name={`addresses[${index}].street`}
            component="div"
            className="errorMessage"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <div className="flex items-center gap-2">
            <label
              className="font-medium"
              htmlFor={`addresses[${index}].state`}
            >
              Estado:
            </label>
            <Field
              id={`addresses[${index}].state`}
              name={`addresses[${index}].state`}
              className="p-1 pl-2 border rounded-md outline-none"
            />
          </div>

          <ErrorMessage
            name={`addresses[${index}].state`}
            component="div"
            className="errorMessage"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label className="font-medium" htmlFor={`addresses[${index}].city`}>
              Cidade:
            </label>
            <Field
              id={`addresses[${index}].city`}
              name={`addresses[${index}].city`}
              className="p-1 pl-2 border rounded-md outline-none"
            />
          </div>

          <ErrorMessage
            name={`addresses[${index}].city`}
            component="div"
            className="errorMessage"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="max-w-52 bg-red-500 text-white px-4 py-2 rounded"
      >
        Excluir Endereço
      </button>
    </div>
  )
}
