import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import deleteIcon from '../assets/delete-icon.svg'
import { projectFirestore } from '../firebase/config'

// import styles
import './RecipeList.css'

export default function RecipeList({recipes}) {
  const { mode } = useTheme()

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  return (
    <div className="recipe-list">
      {!recipes[0] && <p className={`error ${mode}`}>Sorry we have no results...</p>}
      {recipes && recipes.map( recipe => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This!</Link>
          <img
            src={deleteIcon}
            className="delete"
            alt="delete button to delete blog"
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  )
}
