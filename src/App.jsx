import { useEffect, useRef, useState } from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import About from './components/About'
import Launches from './components/Launches'
import Mainpage from './components/Mainpage'
import Navbar from './components/Navbar'
import Title from './components/Title'
import WishList from './components/WishList'

const storagePrefix = 'rocket-addict.favorite.'
const titles = { '/': 'Home', '/about': 'About', '/launches': 'Upcoming Launches', '/wishlist': 'Wish List' }

function readFavorites() {
  const favorites = []
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (!key.startsWith(storagePrefix)) continue
      try {
        const item = JSON.parse(window.localStorage.getItem(key))
        if (item && storagePrefix + item.id === key && typeof item.id === 'string'
          && typeof item.name === 'string' && typeof item.schedule === 'string') favorites.push(item)
      } catch {
        // One damaged entry should not hide the rest of the list.
      }
    }
  } catch {
    // Some browser privacy settings block access to storage entirely.
  }
  return favorites.sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0))
}

function Site() {
  const { pathname } = useLocation()
  const previousPage = useRef(pathname)
  const main = useRef(null)
  const [favorites, setFavorites] = useState(readFavorites)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const title = titles[pathname.toLowerCase().replace(/\/$/, '') || '/'] || 'Page not found'
    document.title = title + ' | Rocket Addict'
    if (previousPage.current !== pathname) {
      setNotice('')
      main.current.focus()
      window.scrollTo(0, 0)
    }
    previousPage.current = pathname
  }, [pathname])

  useEffect(() => {
    function refresh(event) {
      if (event.key === null || event.key.startsWith(storagePrefix)) setFavorites(readFavorites())
    }
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  function addFavorite({ id, name, schedule }) {
    const item = { id, name, schedule, savedAt: Date.now() }
    try {
      window.localStorage.setItem(storagePrefix + id, JSON.stringify(item))
      setFavorites(readFavorites())
      setNotice(name + ' added to your wish list.')
    } catch {
      setNotice('Your browser could not save this launch. Check that site storage is allowed and has space.')
    }
  }

  function removeFavorite(item) {
    try {
      window.localStorage.removeItem(storagePrefix + item.id)
      setFavorites(readFavorites())
      setNotice(item.name + ' removed from your wish list.')
      return true
    } catch {
      setNotice('Your browser could not update the wish list. Check that site storage is allowed.')
      return false
    }
  }

  return (
    <>
      <a className="skip-link visually-hidden-focusable" href="#main-content" onClick={(event) => {
        event.preventDefault()
        main.current.focus()
      }}>Skip to main content</a>
      <Navbar />
      <Title />
      <main id="main-content" tabIndex={-1} ref={main}>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/launches" element={<Launches addFavorite={addFavorite} favorites={favorites} />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<WishList favorites={favorites} removeFavorite={removeFavorite} />} />
          <Route path="*" element={<section className="container"><h1>Page not found</h1><Link to="/">Return home</Link></section>} />
        </Routes>
        <p className="text-center mx-3" role="status">{notice}</p>
      </main>
    </>
  )
}

export default function App() {
  return <HashRouter><Site /></HashRouter>
}
