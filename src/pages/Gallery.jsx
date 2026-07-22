import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setCrewmates(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <p style={{ color: 'white' }}>Loading your party...</p>
  }

  if (error) {
    return <p className="error-text">{error}</p>
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-state">
        <h2 style={{ color: 'white' }}>Your party is empty</h2>
        <p>Recruit your first crewmate to begin the adventure.</p>
        <Link className="btn" to="/create">Recruit a Crewmate</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ color: 'white' }}>Your Party ({crewmates.length})</h2>
      <div className="gallery-grid">
        {crewmates.map((c) => (
          <Link className="crewmate-card" to={`/crewmate/${c.id}`} key={c.id}>
            <Link className="edit-link" to={`/crewmate/${c.id}/edit`} onClick={(e) => e.stopPropagation()}>
              Edit
            </Link>
            <h3>{c.name}</h3>
            <div className="meta">
              Lvl {c.level} {c.race} {c.character_class}
            </div>
            <div className="meta">{c.alignment}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
