import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateCrewmate from './pages/CreateCrewmate.jsx'
import Gallery from './pages/Gallery.jsx'
import CrewmateDetail from './pages/CrewmateDetail.jsx'
import EditCrewmate from './pages/EditCrewmate.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <nav className="top-nav">
        <Link className="brand" to="/">⚔️ Party Roster</Link>
        <div className="links">
          <Link to="/create">Recruit</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/crewmate/:id" element={<CrewmateDetail />} />
        <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
      </Routes>
    </div>
  )
}
