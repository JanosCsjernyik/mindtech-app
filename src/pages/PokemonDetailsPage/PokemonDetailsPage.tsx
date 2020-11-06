import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/reducers/rootReducer'
import { catchPokemon, fetchPokemon, releasePokemon } from '../../redux/reducers/pokemon'
import { PokemonDetails } from '../../api/pokemonAPI'
import { isEqual } from 'lodash'
import { Button, Card, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1rem',
    minWidth: '200px',
  },
  marginBottom: { marginBottom: '1rem' },
  bold: {
    fontWeight: 'bold',
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

  const handlePokeBall = () => {
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
      <Card className={`${classes.card}`}>
        <div className={classes.flexCenter}>
          <img src={_pokemon?.picture} alt="Pokemon"></img>
        </div>
        <div className={classes.marginBottom}>
          <Typography>Name: {_pokemon.name}</Typography>
          <Typography>Height: {_pokemon.height}</Typography>
          <Typography>Weight: {_pokemon.weight}</Typography>
        </div>

        <div className={classes.marginBottom}>
          <Typography variant="body1" className={classes.bold}>
            Abilities:{' '}
          </Typography>
          {_pokemon?.abilities?.map(ability =>
            ability.is_hidden ? null : (
              <Typography key={ability.ability.name}>{ability.ability.name}</Typography>
            )
          )}
        </div>

        <div className={classes.flexCenter}>
          <Button
            color={isPokemonCaught ? 'secondary' : 'primary'}
            variant="contained"
            onClick={handlePokeBall}
          >
            {isPokemonCaught ? 'Release' : 'Catch'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

PokemonDetailsPage.propTypes = {}

export default PokemonDetailsPage
