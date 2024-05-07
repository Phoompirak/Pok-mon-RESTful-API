import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const About = () => {
  return (
    <div>
      <Navbar />
      <h3 style={{
        fontSize: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        About page
      </h3>

      <Footer />
    </div>
  )
}

export default About
