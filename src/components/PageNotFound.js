import React from 'react'
import { Link } from 'react-router-dom'

//
export default function PageNotFound() {
  return (
    <div>
      <div className='choice-alert spacious'><b>404 PAGE NOT FOUND</b></div>
      <Link to={`/`}>
        <button className='btn'>Go To HOME</button>
      </Link>
    </div>
    
  )
}