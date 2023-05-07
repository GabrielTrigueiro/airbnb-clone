'use client'
//verificar se estamos usando server side rendering ou não

import { useEffect, useState } from "react"

const ClientOnly = ({children}: {children:React.ReactNode}) => {

  const[hasMounted, setHasMounted] = useState(false);

  useEffect(() =>  {
    setHasMounted(true)
  },[])

  if(!hasMounted){
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly