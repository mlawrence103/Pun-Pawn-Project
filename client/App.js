import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import AllPuns from './components/AllPuns'
import AllUsers from './components/AllUsers'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllPuns />
      <AllUsers />
    </div>
  )
}

export default App
