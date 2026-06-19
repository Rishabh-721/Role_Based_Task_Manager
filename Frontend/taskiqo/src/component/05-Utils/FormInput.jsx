import React from 'react'

const FormInput = ({type, name, info, value, onChange}) => {
  return (
    <input type={type} name={name} placeholder={info} 
    value={value} onChange={onChange}/>
  )
}

export default FormInput
