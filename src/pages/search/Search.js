// import { useFetch } from '../../hooks/useFetch'
// import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useState, useEffect } from 'react'

// styles
import './Search.css'

export default function Search({ query, recipes }) {
  const [results, setResults] = useState([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect( () => {
    setResults([])
    setIsPending(true)
    setError(false)
    const search = []
    if (recipes) {
      recipes.forEach((recipe) => {
        const title = recipe.title.toLowerCase()
        if (title.includes(query)) search.push(recipe)
        else {
          recipe.ingredients.forEach((elem) => {
            const ingredient = elem.toLowerCase()
            if (ingredient.includes(query)) search.push(recipe)
          })
        }
      })
    } else {
      setError('Oops we have difficulty accessing our database. Please try again later.')
      setIsPending(false)
      return
    }

    if (search.length < 1) {
      setIsPending(false)
      return
    }
    setIsPending(false)
    setResults(search)
  }, [query, recipes])

  // OLD SEARCH USING LOCAL DATA
  // const queryString = useLocation().search
  // const query = new URLSearchParams(queryString)
  // const searchPhrase = query.get('q').toLowerCase()
  //
  //
  // const url = 'http://localhost:3000/recipes/?q=' + searchPhrase
  // const { data, isPending, error } = useFetch(url)

  // const [results, setResults] = useState(null);
  //
  // useEffect( () => {
  //   const search = []
  //   console.log(searchPhrase);
  //   if (data) {
  //     data.forEach((recipe) => {
  //       const title = recipe.title.toLowerCase()
  //       if (title.includes(searchPhrase)) search.push(recipe)
  //       else {
  //         recipe.ingredients.forEach((elem) => {
  //           const ingredient = elem.toLowerCase()
  //           if (ingredient.includes(searchPhrase)) search.push(recipe)
  //         })
  //       }
  //     })
  //   }
  //   setResults(search)
  // }, [data, searchPhrase])

  return (
    <div className="search">
      <p>Recipes including: {query[0].toUpperCase() + query.slice(1, query.length)}</p>
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {results && <RecipeList recipes={results} /> }
    </div>
  )
}
