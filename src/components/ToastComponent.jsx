import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function ToastComponent( {children} ) {
  return (
    <>
    <ToastContainer/>
    {children}
    </>
  )
}
