// COMMENTED OUT PARTS OF VERSION USING LOCAL DATA BASE AND CUSTOM HOOK. lEFT IN CODE FOR TRAINING PURPOSES

import './Create.css'
import { useState, useRef /*useEffect*/ } from 'react'
//import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [error, setError] = useState(false)
  const ingredientInput = useRef(null)
  const redirect = useHistory()


  // custom hook local server method
  // const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
    const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}

    try {
      await projectFirestore.collection('recipes').add(doc)
      redirect.push('/')
    } catch(err) {
      setError('Uexpected error: ', err)
    }
  }

  const addItem = (e) => {
    e.preventDefault()
    const ing = ingredient.trim().toLowerCase()
    if (ing && !ingredients.includes(ing)) {
      setIngredients( prevIngredients => [...prevIngredients, ingredient.toLowerCase()])
    }
    setIngredient('')
    ingredientInput.current.focus()
  }

  const handleRemove = (e) => {
    const itemToRemove = e.slice(0,e.indexOf(','))
    setIngredients(prevIngredients => (
      prevIngredients.filter(item => item !== itemToRemove)
    ))
  }

  // redirect after adding recipes
  // useEffect(() => {
  //   if (data) {
  //     redirect.push('/')
  //   }
  // },[redirect, data, error])

  return (
    <div className="create">
      { error && <div>{error}</div>}
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange = { e => setIngredient(e.target.value)}
              value = {ingredient}
              ref = {ingredientInput}
            />
            <button
              className="btn"
              onClick={addItem}
            >add</button>
          </div>
        </label>
        <p>Current ingredients:&nbsp;
        { ingredients.map((ingredient, i) => (
          <span
            key={ingredient}
            className='ingredient'
            onClick={(e) => handleRemove(e.target.textContent)}
          >
              { (ingredients.length-1 !== i) ? `${ingredient}, ` : `${ingredient}.` }
            </span>
        ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}>
          </textarea>
        </label>
        <label>
          <div className="cooking-time">
          <span>Cooking time in minutes:</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
          </div>
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
