import { Card, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PokemonListElement } from '../../../api/pokemonAPI'
import { setPokemon } from '../../../redux/reducers/pokemon'
import { RootState } from '../../../redux/reducers/rootReducer'
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles({
  wrapper: {
    padding: '1rem 0 1rem 0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '1rem',
    gridRemplateAreas: `
      ". . . ."
      ". . . ."
      ". . . ."`,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    cursor: 'pointer',
  },
  caught: {
    backgroundColor: green[100],
  },
  spinner: { display: 'flex', justifyContent: 'center', marginTop: '20rem' },
})

type PokemonListProps = {
  showOnlyCaught: boolean
  searchTerm: null | string
}

// Listing the pokemons.
const PokemonList: React.FC<PokemonListProps> = ({ showOnlyCaught, searchTerm }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const { pokemonsByType, caughtPokemons, loading } = useSelector(
    (state: RootState) => state.pokemons
  )

  // Gets a pokemon, caught boolean, also checks if the pokemon name includes the search
  // term that the user added. Returns the pokemon should appear ont he pokemon list.
  const setShow = (pokemon: PokemonListElement, caught: boolean): boolean => {
    if (showOnlyCaught) {
      return searchTerm ? pokemon.pokemon.name.includes(searchTerm) && caught : caught
    } else {
      return searchTerm ? pokemon.pokemon.name.includes(searchTerm) : true
    }
  }

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )
  }

  // Creating an extended PokemonListElement with the show attribute.
  // The item will only be rendered if show is true.
  const processedPokemonsByType = pokemonsByType.pokemons
    ? (pokemonsByType.pokemons as PokemonListElement[]).map(pokemon => {
        // Checking if the pokemon is caught.
        const caught = !!caughtPokemons.find(
          caughtPokemon => caughtPokemon.name === pokemon.pokemon.name
        )
        return {
          ...pokemon,
          caught,
          show: setShow(pokemon, caught),
        }
      })
    : []

  // Renders the pokemons depending on the show attribute.
  return (
    <div className={classes.wrapper}>
      {processedPokemonsByType.map(pokemon => {
        return pokemon.show ? (
          <Card
            className={`${classes.card} ${pokemon.caught && classes.caught}`}
            onClick={() => {
              const pokemonUrlSplit = pokemon.pokemon.url.split('/')
              const pokemonId = pokemonUrlSplit[pokemonUrlSplit.length - 2]
              dispatch(setPokemon({}))
              history.push(`pokemon/${pokemonId}`)
            }}
            key={pokemon.pokemon.name}
          >
            <Typography>{pokemon.pokemon.name}</Typography>
          </Card>
        ) : null
      })}
    </div>
  )
}

export default PokemonList
