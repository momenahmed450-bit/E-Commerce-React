import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-text">Page not found</p>
      <Link className="error-link" to="/">Go Home</Link>
    </div>
  )
}

export default Error
