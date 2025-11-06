import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // Returning reset separately to avoid passing it to <input> (prevents React warning)
  return {
    type,
    value,
    onChange,
    reset
  }
}
