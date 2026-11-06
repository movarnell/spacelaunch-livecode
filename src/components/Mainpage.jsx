import { Link } from 'react-router-dom'
import launchIllustration from '../assets/undraw_relaunch_day_902d.svg'

export default function Mainpage() {
  return (
    <section className="container home-intro">
      <h1>Explore upcoming rocket launches</h1>
      <img src={launchIllustration} alt="" width="754" height="750" className="home-illustration" />
      <div className="heroText">
        <p>Welcome to &quot;Rocket Addicts&quot; - your premier destination for the latest and greatest in rocket launch schedules! Whether you’re a space enthusiast, an aspiring astronaut, or just curious about the next giant leap for mankind, we’ve got you covered. Dive deep into our comprehensive calendar to find out when and where the next rockets will pierce the heavens. Stay updated, get fascinated, and join a community that looks to the stars with wonder and anticipation. Strap in and prepare for liftoff with &quot;Rocket Addicts&quot;! 🚀</p>
        <Link to="/launches" className="btn btn-primary">View upcoming launches</Link>
      </div>
    </section>
  )
}
