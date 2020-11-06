import { combineReducers } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon'

const rootReducer = combineReducers({ pokemons: pokemonReducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
