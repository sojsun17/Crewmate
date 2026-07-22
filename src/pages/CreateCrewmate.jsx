import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import AttributeSelector from '../components/AttributeSelector.jsx'
import { CLASSES, RACES, WEAPONS, ALIGNMENTS } from '../constants.js'

export default function CreateCrewmate() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [race, setRace] = useState('')
  const [weapon, setWeapon] = useState('')
  const [alignment, setAlignment] = useState('')
  const [level, setLevel] = useState(1)
  const [backstory, setBackstory] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name || !characterClass || !race || !weapon || !alignment) {
      setError('Please fill out the name and every attribute before recruiting.')
      return
    }

    setSaving(true)
    const { error: insertError } = await supabase.from('crewmates').insert({
      name,
      character_class: characterClass,
      race,
      weapon,
      alignment,
      level: Number(level) || 1,
      backstory,
    })
    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    navigate('/gallery')
  }

  return (
    <div className="card">
      <h2>Recruit a Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Elenwen Brightblade"
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
            placeholder="Where did this adventurer come from?"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Recruiting...' : 'Recruit Crewmate'}
        </button>
      </form>
    </div>
  )
}
