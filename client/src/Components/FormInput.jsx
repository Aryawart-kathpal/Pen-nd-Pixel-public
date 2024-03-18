import React from 'react'

const InputText = ({type, name, value, placeholder, handleOnChange}) => {
  return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleOnChange}
            className='bg-transparent placeholder:text-slate-400'
        />
  )
}

const Button =({name ,handleOnSubmit}) =>{
    return(
        <button onClick={handleOnSubmit}>
            {name} 
        </button>
    )
}

export {InputText, Button}
