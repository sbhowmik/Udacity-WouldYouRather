import React from 'react'
import { Link, useLocation } from 'react-router-dom'


//
export default function PageNotFound() {

    let location = useLocation()

    return (
      <div>
        <div className='choice-alert spacious'><b>404 PAGE NOT FOUND for {location.pathname}</b></div>
        <Link to={`/`}>
          <button className='btn'>Go To HOME</button>
        </Link>
      </div>
    )

}//class or function