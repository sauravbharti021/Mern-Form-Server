import React from 'react'
import './Error.css'
export default function Error() {
  return (
    <div className="error-container">
      <h1 className="error-heading">Error 404</h1>
      <p className="error-message">Oops! Page not found.</p>
      <p className="error-submessage">Kindly go back to the previous page.</p>
    </div>
  )
}
