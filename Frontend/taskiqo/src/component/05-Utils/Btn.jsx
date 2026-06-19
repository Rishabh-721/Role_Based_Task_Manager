import React, { useState } from 'react'

const Btn = ({type, text, lodingText, Loading, className}) => {
  return (
    <button type={type} className={className} disabled={Loading}>{Loading ? lodingText : text}</button>
  )
}

export default Btn
