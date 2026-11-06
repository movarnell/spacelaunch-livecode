const launchFeed = 'https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10'

// Launch Library includes recently completed flights in its upcoming feed.
const completedStatusIds = new Set([3, 4, 7])

const dayFormat = { year: 'numeric', month: 'long', day: 'numeric' }

function formatSchedule(value, precision) {
  const date = new Date(value)
  if (!value || Number.isNaN(date.getTime())) return 'Date to be announced'

  const format = (options) => date.toLocaleString(undefined, { ...options, timeZone: 'UTC' })
  switch (precision) {
    case 'Second':
    case 'Minute':
    case 'Hour':
      return format({ ...dayFormat, hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
    case 'Day':
      return format(dayFormat) + ' (UTC)'
    case 'Month':
      return format({ month: 'long', year: 'numeric' })
    case 'Quarter':
      return 'Q' + (Math.floor(date.getUTCMonth() / 3) + 1) + ' ' + date.getUTCFullYear()
    case 'Year':
      return String(date.getUTCFullYear())
    default:
      return 'Date to be announced'
  }
}

export async function getLaunches(signal) {
  const response = await fetch(launchFeed, { signal })
  if (!response.ok) {
    if (response.status === 429) throw new Error('The launch provider is receiving too many requests. Please try again later.')
    throw new Error('The launch schedule is unavailable. Please try again.')
  }

  const data = await response.json()
  if (!Array.isArray(data.results)) throw new Error('The provider returned an unreadable launch schedule.')

  return data.results
    .filter((launch) => launch?.id && !completedStatusIds.has(launch.status?.id))
    .map((launch) => ({
      id: String(launch.id),
      name: launch.name || 'Unnamed launch',
      image: launch.image?.image_url || launch.image?.thumbnail_url || '',
      thumbnail: launch.image?.thumbnail_url,
      provider: launch.launch_service_provider?.name,
      location: launch.pad?.location?.name,
      missionType: launch.mission?.type,
      description: launch.mission?.description,
      status: launch.status?.name,
      statusDescription: launch.status?.description,
      schedule: formatSchedule(launch.net, launch.net_precision?.name),
    }))
}
