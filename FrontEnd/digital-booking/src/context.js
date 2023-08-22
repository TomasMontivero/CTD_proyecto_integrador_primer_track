import React, { createContext, useContext, useState, useEffect } from 'react';

const WidthContext = createContext();

const WidthContextProvider = ({ children }) =>{
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    // console.log(`Page is ${width} px wide`);
  
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])
  
  return (
    <WidthContext.Provider value={width}>
      {children}
    </WidthContext.Provider>
  )
}

export const useWidthContext = () =>{
  return useContext(WidthContext)
}

export const UserLoggedContext = createContext({})
export const UserContext = createContext({})

export const ComesFromDetail = createContext()

export const ComesFromDetailProvider = ({ children }) => {
  const [ isFromDetail, setIsFromDetail ] = useState(false)

  return (
    <ComesFromDetail.Provider value={{fromDetail: [isFromDetail, setIsFromDetail]}}>
      {children}
    </ComesFromDetail.Provider>
  )
}


export default WidthContextProvider;