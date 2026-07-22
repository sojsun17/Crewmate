import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import AttributeSelector from '../components/AttributeSelector.jsx'
import { CLASSES, RACES, WEAPONS, ALIGNMENTS } from '../constants.js'

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [race, setRace] = useState('')
  const [weapon, setWeapon] = useState('')
  const [alignment, setAlignment] = useState('')
  const [level, setLevel] = useState(1)
  const [backstory, setBackstory] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedMessage, setSavedMessage] = useState('')

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
      setName(data.name)
      setCharacterClass(data.character_class)
      setRace(data.race)
      setWeapon(data.weapon)
      setAlignment(data.alignment)
      setLevel(data.level)
      setBackstory(data.backstory || '')
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSavedMessage('')

    if (!name || !characterClass || !race || !weapon || !alignment) {
      setError('Please fill out the name and every attribute.')
      return
    }

    setSaving(true)
    const { error: updateError } = await supabase
      .from('crewmates')
      .update({
        name,
        character_class: characterClass,
        race,
        weapon,
        alignment,
        level: Number(level) || 1,
        backstory,
      })
      .eq('id', id)
    setSaving(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setSavedMessage('Changes saved!')
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Remove ${name} from your party? This cannot be undone.`)
    if (!confirmed) return

    const { error: deleteError } = await supabase.from('crewmates').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    navigate('/gallery')
  }

  if (loading) return <p style={{ color: 'white' }}>Loading crewmate...</p>

  return (
    <div className="card">
      <h2>Edit {name || 'Crewmate'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <AttributeSelector
          label="Class"
          options={CLASSES}
          value={characterClass}
          onChange={setCharacterClass}
        />

        <AttributeSelector
          label="Race"
          options={RACES}
          value={race}
          onChange={setRace}
        />

        <AttributeSelector
          label="Weapon"
          options={WEAPONS}
          value={weapon}
          onChange={setWeapon}
        />

        <AttributeSelector
          label="Alignment"
          options={ALIGNMENTS}
          value={alignment}
          onChange={setAlignment}
        />

        <div className="form-group">
          <label>Level</label>
          <input
            type="number"
            min="1"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Backstory</label>
          <textarea
            rows="4"
            value={backstory}
            onChange={(e) => setBackstory(e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}
        {savedMessage && <p style={{ color: '#2f4d2f', fontWeight: 'bold' }}>{savedMessage}</p>}

        <div className="actions-row">
          <button className="btn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn danger" type="button" onClick={handleDelete}>
            Delete Crewmate
          </button>
          <Link className="btn secondary" to={`/crewmate/${id}`}>Back to Details</Link>
        </div>
      </form>
    </div>
  )
}
