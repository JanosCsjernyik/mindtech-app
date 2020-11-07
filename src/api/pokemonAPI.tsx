import axios from 'axios'
import { PokemonType } from '../redux/reducers/pokemon'

// Creating an axios instance. With a baseUrl.
const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'content-type': 'application/json',
  },
})

// Pokemon types.
export interface PokemonTypesResult {
  count: number
  next: null | boolean
  previous: null | boolean
  results: PokemonType[]
}

type Pokemon = {
  name: string
  url: string
}

export type PokemonListElement = {
  pokemon: Pokemon
  slot: number
}

export interface PokemonTypeList {
  pokemon: PokemonListElement[]
  id: number
}

type Ability = {
  slot: number
  is_hidden: boolean
  ability: {
    name: string
    url: string
  }
}

export interface PokemonDetails {
  name: string
  weight: number
  height: number
  abilities: Ability[]
  picture: string
}

// Collecting here all the Pokemon related API calls.
export const getPokemonTypes = async (): Promise<PokemonTypesResult> => {
  try {
    const { data } = await axiosInstance.get<PokemonTypesResult>('type')
    return data
  } catch (e) {
    throw e
  }
}

export const getPokemonsByType = async (type: string): Promise<PokemonTypeList> => {
  try {
    const { data } = await axiosInstance.get(`type/${type}`)
    return data
  } catch (e) {
    throw e
  }
}

export const getPokemon = async (id: string): Promise<PokemonDetails> => {
  try {
    const { data } = await axiosInstance.get(`/pokemon/${id}`)
    const { name, height, weight, abilities, sprites } = data

    const pokemonDetail = {
      name,
      height,
      weight,
      abilities,
      picture: sprites['front_default'],
    }

    return pokemonDetail
  } catch (e) {
    throw e
  }
}
