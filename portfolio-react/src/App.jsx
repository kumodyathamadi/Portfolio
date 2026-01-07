import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import MyWork from './Components/MyWork/MyWork'
import Achieve from './Components/Achievements/Achieve'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import Education from './Components/Education/Education'
import Work from './Components/Work/Work'


const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <About/>
      <Work/>
      <Education/>
      <MyWork/>
      <Achieve/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
