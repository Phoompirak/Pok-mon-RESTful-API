import React from 'react'
import Navbar from '../Navbar/Navbar'

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
    </div>
  )
}

export default About
