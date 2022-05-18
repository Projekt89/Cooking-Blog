import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useState } from 'react'

// Do przeanalizowania, pobieranie wpisów z firestore, dodawanie wpisów (cczy dodawanie jest lokalnie czy do firestore), lift up state to i wybieranie tylko elementow zawierających fraze ze zmiennej q w adresie. Zrobić tak żeby działało z firestore


//styles
import './App.css';

// componenets imports
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector'

//page imports
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'

function App() {
  const [recipes, setRecipes] = useState(null)
  const [query, setQuery] = useState([])
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar setQuery={setQuery}/>
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home recipes={recipes} setRecipes={setRecipes}/>
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search query={query} recipes={recipes}/>
          </Route>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
