import React from 'react'

function EmptyListMessage({text}) {
  return (
    <div className="alert alert-info mt-1" role="alert">
    {text}
  </div>
  )
}

export default EmptyListMessage