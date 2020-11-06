import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import {
  getPokemonTypes as _getPokemonTypes,
  getPokemonsByType as _getPokemonsByType,
  getPokemon as _getPokemon,
  PokemonDetails,
} from '../../api/pokemonAPI'
import { PokemonListElement } from '../../api/pokemonAPI'

export type PokemonType = {
  name: string
  url: string
}

type PokemonsByType = {
  id: number
  pokemons: PokemonListElement[] | []
}

interface PokemonState {
  types: PokemonType[]
  selectedPokemonType: PokemonType | null
  pokemonsByType: PokemonsByType
  loading: boolean
  error: string | null
  selectedPokemon: PokemonDetails | {}
  caughtPokemons: PokemonDetails[]
}

const initialState: PokemonState = {
  types: [],
  loading: false,
  selectedPokemonType: null,
  error: null,
  pokemonsByType: {} as PokemonsByType,
  selectedPokemon: {},
  caughtPokemons: [],
}

function startLoading(state: PokemonState) {
  state.loading = true
}

function loadingFailed(state: PokemonState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    getPokemonTypes: startLoading,
    getPokemonTypesSuccess(state, { payload }: PayloadAction<PokemonType[]>) {
      state.types = payload
      state.loading = false
      state.error = null
    },
    fetchError: loadingFailed,
    setSelectedPokemonType(state, { payload }: PayloadAction<PokemonType>) {
      state.selectedPokemonType = payload
      state.loading = false
      state.error = null
    },
    getPokemonsByType: startLoading,
    setPokemonsByType(state, { payload }: PayloadAction<PokemonsByType>) {
      state.pokemonsByType = payload
      state.loading = false
      state.error = null
    },
    getPokemon: startLoading,
    setPokemon(state, { payload }: PayloadAction<PokemonDetails | {}>) {
      state.selectedPokemon = payload
      state.loading = false
      state.error = null
    },
    catchPokemon(state, { payload }: PayloadAction<PokemonDetails>) {
      state.caughtPokemons.push(payload)
    },
    releasePokemon(state, { payload }: PayloadAction<PokemonDetails>) {
      const { caughtPokemons } = state
      const index = caughtPokemons.indexOf(payload)
      state.caughtPokemons.splice(index, 1)
    },
  },
})
export const {
  getPokemonTypes,
  getPokemonTypesSuccess,
  fetchError,
  setSelectedPokemonType,
  getPokemonsByType,
  setPokemonsByType,
  getPokemon,
  setPokemon,
  catchPokemon,
  releasePokemon,
} = pokemonSlice.actions

export const fetchPokemonTypes = (): AppThunk => async dispatch => {
  try {
    dispatch(getPokemonTypes())
    const pokemonTypes = await _getPokemonTypes()
    const { results } = pokemonTypes
    dispatch(getPokemonTypesSuccess(results))
  } catch (err) {
    dispatch(fetchError(err))
  }
}

export const fetchPokemonsByType = (
  selectedPokemonType: PokemonType
): AppThunk => async dispatch => {
  try {
    dispatch(getPokemonsByType())
    const { pokemon, id } = await _getPokemonsByType(selectedPokemonType.name)
    dispatch(setSelectedPokemonType(selectedPokemonType))
    dispatch(setPokemonsByType({ pokemons: pokemon, id }))
  } catch (err) {
    dispatch(fetchError(err))
  }
}

export const fetchPokemon = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(getPokemon())
    const pokemon = await _getPokemon(id)
    dispatch(setPokemon(pokemon))
  } catch (err) {
    dispatch(fetchError(err))
  }
}

const pokemonReducer = pokemonSlice.reducer

export default pokemonReducer
