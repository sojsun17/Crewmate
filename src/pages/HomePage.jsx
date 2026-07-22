import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="hero">
      <h1>Party Roster</h1>
      <p>Assemble your D&D adventuring party, one crewmate at a time.</p>
      <div className="actions-row" style={{ justifyContent: 'center' }}>
        <Link className="btn" to="/create">Recruit a Crewmate</Link>
        <Link className="btn secondary" to="/gallery">View Your Party</Link>
      </div>
    </div>
  )
}
