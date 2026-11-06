import { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function WishList({ favorites, removeFavorite }) {
  const list = useRef(null)
  const heading = useRef(null)
  const removedIndex = useRef(null)

  useLayoutEffect(() => {
    if (removedIndex.current === null) return
    const buttons = list.current?.querySelectorAll('button')
    const next = buttons?.[Math.min(removedIndex.current, buttons.length - 1)]
    const focusTarget = next || heading.current
    focusTarget.focus()
    removedIndex.current = null
  }, [favorites])

  function remove(item, index) {
    if (removeFavorite(item)) removedIndex.current = index
  }

  return (
    <section className="container">
      <h1 className="display-5 text-center" ref={heading} tabIndex={-1}>Wish List</h1>
      {favorites.length === 0 ? (
        <p className="text-center">Your wish list is empty. <Link to="/launches">Browse upcoming launches</Link>.</p>
      ) : (
        <ul ref={list} className="list-group my-4">
          {favorites.map((item, index) => (
            <li className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-2" key={item.id}>
              <div>
                <h2 className="h5">{item.name}</h2>
                <p className="mb-0">{item.schedule}</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-danger"
                aria-label={'Remove ' + item.name + ' from Wish List'}
                onClick={() => remove(item, index)}
              >Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

WishList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
  })).isRequired,
  removeFavorite: PropTypes.func.isRequired,
}
