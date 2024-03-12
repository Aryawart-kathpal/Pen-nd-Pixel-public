import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const HomeLayout = ({children}) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default HomeLayout;