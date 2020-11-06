import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PokemonListingPage from './pages/pokemonListingPage/PokemonListingPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage/PokemonDetailsPage'

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pokemon/:id" component={PokemonDetailsPage} />
        <Route path="" component={PokemonListingPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
