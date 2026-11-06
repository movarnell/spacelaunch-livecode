import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getLaunches } from '../launchData'

export default function Launches({ favorites, addFavorite }) {
  const [launches, setLaunches] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timer = window.setTimeout(() => controller.abort(), 20000)

    getLaunches(controller.signal)
      .then((result) => {
        if (active) setLaunches(result)
      })
      .catch((reason) => {
        if (!active) return
        const message = reason instanceof TypeError || reason.name === 'AbortError'
          ? 'The launch provider could not be reached. Please try again.'
          : reason.message
        setError(message)
      })
      .finally(() => window.clearTimeout(timer))

    return () => {
      active = false
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [attempt])

  function retry() {
    setError('')
    setAttempt((value) => value + 1)
  }

  return (
    <section className="smoke">
      <h1 className="display-5 text-center">Upcoming Launches</h1>
      <div className="text-center" role="status">
        {error || (launches === null ? 'Loading launch schedule…' : '')}
        {launches?.length === 0 && 'No upcoming launches are listed.'}
      </div>
      {error && <div className="text-center mt-2"><button type="button" className="btn btn-primary" onClick={retry}>Try again</button></div>}
      {launches?.length > 0 && (
        <ul className="launch-list list-unstyled">
          {launches.map((launch) => {
            const saved = favorites.some((item) => item.id === launch.id)
            return (
              <li key={launch.id}>
                <article className="launch-card card h-100 shadow-sm">
                  {launch.image && (
                    <img
                      src={launch.image}
                      className="launch-image card-img-top"
                      loading="lazy"
                      alt=""
                      onError={({ currentTarget }) => {
                        if (launch.thumbnail && currentTarget.src !== launch.thumbnail) {
                          currentTarget.src = launch.thumbnail
                        } else {
                          currentTarget.hidden = true
                        }
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h2 className="h4 card-title">{launch.name}</h2>
                    <p><strong>Estimated launch</strong> {launch.schedule}</p>
                    {launch.provider && <p>Provider: {launch.provider}</p>}
                    {launch.missionType && <p>Mission type: {launch.missionType}</p>}
                    {launch.location && <p>Location: {launch.location}</p>}
                    {launch.description && <p>{launch.description}</p>}
                    {launch.status && <p><strong>Status: {launch.status}</strong></p>}
                    {launch.statusDescription && <p>{launch.statusDescription}</p>}
                    <button
                      type="button"
                      className="btn btn-primary"
                      aria-disabled={saved}
                      aria-label={saved ? launch.name + ' saved to Wish List' : 'Add to Wish List: ' + launch.name}
                      onClick={() => { if (!saved) addFavorite(launch) }}
                    >
                      {saved ? 'Saved to Wish List' : 'Add to Wish List'}
                    </button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

Launches.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  addFavorite: PropTypes.func.isRequired,
}
