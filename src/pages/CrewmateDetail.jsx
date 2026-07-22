import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  async function fetchCrewmate() {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setCrewmate(data)
    }
    setLoading(false)
  }

  if (loading) return <p style={{ color: 'white' }}>Loading crewmate...</p>
  if (error) return <p className="error-text">{error}</p>
  if (!crewmate) return null

  return (
    <div className="card">
      <h2>{crewmate.name}</h2>
      <div className="detail-attrs">
        <span>Level {crewmate.level}</span>
        <span>{crewmate.race}</span>
        <span>{crewmate.character_class}</span>
        <span>{crewmate.weapon}</span>
        <span>{crewmate.alignment}</span>
      </div>

      <h3>Backstory</h3>
      <p>{crewmate.backstory || 'No backstory recorded yet for this adventurer.'}</p>

      <div className="actions-row">
        <Link className="btn" to={`/crewmate/${crewmate.id}/edit`}>Edit Crewmate</Link>
        <Link className="btn secondary" to="/gallery">Back to Party</Link>
      </div>
    </div>
  )
}
