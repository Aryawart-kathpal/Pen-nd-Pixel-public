import React from 'react'

export const HomeLayout = ({children}) => {
  return (
    <div>
        <children />
        <footer className="bg-gray-200 text-center text-xs p-3 absolute bottom-0 w-full">
            <p>PEN & PIXEL | © 2024</p>
        </footer>  
    </div>
  )
}
