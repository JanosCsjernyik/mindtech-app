import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/reducers/rootReducer'
import { catchPokemon, fetchPokemon, releasePokemon } from '../../redux/reducers/pokemon'
import { PokemonDetails } from '../../api/pokemonAPI'
import { isEqual } from 'lodash'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useHistory } from 'react-router-dom'
import Pokemoncard from './components/PokemonCard'

const useStyles = makeStyles({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'fixed',
    left: '1rem',
    top: '1rem',
  },
})

const PokemonDetailsPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { selectedPokemon: pokemon, caughtPokemons } = useSelector(
    (state: RootState) => state.pokemons
  )
  const _pokemon = pokemon as PokemonDetails

  const isPokemonCaught = caughtPokemons.find(caughtPokemon => isEqual(caughtPokemon, _pokemon))

  const handlePokeBall = (): void => {
    if (!isPokemonCaught) {
      dispatch(catchPokemon(_pokemon))
    } else {
      dispatch(releasePokemon(_pokemon))
    }
  }

  useEffect(() => {
    dispatch(fetchPokemon(id))
  }, [dispatch, id])

  return (
    <div className={classes.flexCenter}>
      <IconButton className={classes.back} onClick={() => history.goBack()}>
        <ArrowBackIosIcon />
      </IconButton>
      <Pokemoncard
        pokemon={_pokemon}
        isPokemonCaught={isPokemonCaught}
        handlePokeBall={handlePokeBall}
      />
    </div>
  )
}

PokemonDetailsPage.propTypes = {}

export default PokemonDetailsPage
