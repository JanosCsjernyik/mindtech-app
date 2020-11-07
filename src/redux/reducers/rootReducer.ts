import { combineReducers } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon'

// Here I can collect all different reducers, in this app I only use one.
const rootReducer = combineReducers({ pokemons: pokemonReducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
