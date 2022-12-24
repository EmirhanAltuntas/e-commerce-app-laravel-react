import React from 'react'

function Loading() {
  return (
    <div className="spinner-grow text-info  m-auto" 
    style={{width:"200px",
    height:"200px",
    zIndex:"5",
    position:'absolute',
    top:'30%',
    left:'30%',
    marginLeft:'-50px',
    marginTop:'-50px',
    backgroundColor:'rgba(129, 129, 129, 0.591)'
    }} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Loading

