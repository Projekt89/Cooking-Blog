import { useParams } from 'react-router-dom'
//import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipes() {
  const { id } = useParams()
  const { mode } = useTheme()
//firebase method
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)

  useEffect( () => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id)
      .onSnapshot( (doc) => {
        if (doc.exists) {
          setIsPending(false)
          setRecipe(doc.data())
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      }, (err) => {
        setError(err.message)
      })

      return () => unsub()
  }, [id])

  // custom hook local server method
  // const { data: recipe, isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`)

  return (
    <div className={`recipe ${mode}`}>
      { error && <p className={`error ${mode}`}>{error}</p> }
      { isPending && <p className={`loading ${mode}`}>Loading...</p>}
      { recipe &&
         <>
           <h2 className="page-title">{recipe.title}</h2>
           <p>Takes {recipe.cookingTime} to make.</p>
           <ul>
             {recipe.ingredients.map( ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
         </>
      }
    </div>
  )
}
