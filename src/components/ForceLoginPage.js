import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'


//
function ForceLoginPage() {

  let location = useLocation()

  return (
    <Redirect to = {{ 
                    pathname: '/login',
                    state: {from: location}
                    }}  
    />
    )    


}


export default ForceLoginPage