import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

//components
import Searchbar from './Searchbar'
//styles
import './Navbar.css'

export default function Navbar({ setQuery }) {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{background: color}}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Scheff</h1>
        </Link>
        <Searchbar setQuery={ setQuery }/>
        <Link to="/create">
          Create recipe
        </Link>
      </nav>
    </div>
  )
}
