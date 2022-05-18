// import { useFetch } from '../../hooks/useFetch'
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

// import styles
import './Home.css'

// import components
import RecipeList from '../../components/RecipeList'

export default function Home({ recipes, setRecipes }) {
  const { mode } = useTheme()

  // OLD FETCHING FROM LOCAL HOST const { data: recipes, isPending, error} = useFetch('http://localhost:3000/recipes')

  // FETCHING FROM FIRESTORE
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection("recipes")
      .onSnapshot( (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load')
          setIsPending(false)
        } else {
          let results = []
          snapshot.docs.forEach( doc => {
            results.push({ id: doc.id, ...doc.data()})
          })
          setRecipes(results)
          setIsPending(false)
        }
      }, (err) => {
        setError(err.message)
        setIsPending(false)
      })

      return () => unsub()
  }, [setRecipes])

  return (
    <div className="home">
      { isPending && <p className={`loading ${mode}`}>Loading...</p> }
      { error && <p className={`error ${mode}`}>{error}</p> }
      { recipes && !isPending && <RecipeList recipes={recipes} /> }
    </div>
  )
}
