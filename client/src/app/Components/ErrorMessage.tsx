import React from 'react'

function ErrorMessage({text}) {
  return (
    <div className="alert alert-warning mt-1" role="alert">
      {text}
    </div>
  )
}

export default ErrorMessage