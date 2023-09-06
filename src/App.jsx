
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './App.css'
import Title from './components/title'
import Mainpage from './components/mainpage'
import Navbar from './components/navbar'
import Launches from './components/Launches'
import About from './components/About'
import WishList from './components/WishList'


function App() {
const [launch, setLaunch] = useState([])
const [favorites, setFavorites] = useState([])
console.log(favorites)
let URL = "https://lldev.thespacedevs.com"
    let launchEndpoint = "/2.2.0/launch/upcoming/?limit=10"
// fetch to get api data and update state for launch

function getLaunch() {
  fetch(URL + launchEndpoint)
  .then((res) => res.json())
  .then((data) => setLaunch(data.results))
  .catch((err) => console.log(err))
}

function getFavorites() {
  fetch('https://64f7c3c8824680fd217ed93d.mockapi.io/favLaunches/')
  .then((res) => res.json())
  .then((data) => setFavorites(data))
  .catch((err) => console.log(err))
}


useEffect(() => {
  getLaunch()
  getFavorites()
}, [])




function addToFavorites(launch) {
  console.log(launch)
  let favL = {
    "key": launch.id,
    "company": launch.provider,
    "date": launch.nextOpportunity,

  }
  setFavorites([...favorites, favL])
  fetch('https://64f7c3c8824680fd217ed93d.mockapi.io/favLaunches/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(favL)
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
}

function deleteFavorite(id) {
  console.log(id)
  let newFav = favorites.filter((fav) => fav.id !== id)
  setFavorites(newFav)
  fetch('https://64f7c3c8824680fd217ed93d.mockapi.io/favLaunches/' + id, {
    method: 'DELETE',
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}





  return (
    <BrowserRouter>
    <Navbar />
   <Title />

    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path="/launches" element={<Launches addToFavorites={addToFavorites} launch={launch}/>} />
      <Route path="/about" element={<About />} />
      <Route path="/wishlist" element={<WishList favorites={favorites} deleteFavorite={deleteFavorite} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
