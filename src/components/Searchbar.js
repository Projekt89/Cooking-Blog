import { useState } from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './Searchbar.css'

export default function Searchbar({ setQuery }) {
  const [term, setTerm] =useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(term.toLowerCase())
    history.push('/search')
    // OLD SEARCH USING LOCAL DATA
    // history.push(`/search/?q=${term}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
        <button>&#x1F50E;&#xFE0E;</button>
      </form>
    </div>
  )
}
