import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // Return two separate objects:
  // "inputProps" can safely be spread into <input>
  return {
    inputProps: {
      type,
      value,
      onChange
    },
    reset
  }
}
