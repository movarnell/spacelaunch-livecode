
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './App.css'
import Title from './components/title'
import Mainpage from './components/mainpage'
import Navbar from './components/navbar'
import Launches from './components/Launches'


function App() {
const [launch, setLaunch] = useState([])
let URL = "https://lldev.thespacedevs.com"
    let launchEndpoint = "/2.2.0/launch/upcoming/?limit=20"
// fetch to get api data and update state for launch

function getLaunch() {
  fetch(URL + launchEndpoint)
  .then((res) => res.json())
  .then((data) => setLaunch(data.results))
  .catch((err) => console.log(err))
}

useEffect(() => {
  getLaunch()
}, [])





  return (
    <BrowserRouter>
    <Navbar />
   <Title />

    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path="/launches" element={<Launches launch={launch}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
