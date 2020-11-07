import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { PokemonDetails } from '../../../api/pokemonAPI'
import { Button, Card, Typography } from '@material-ui/core'

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
})

type PokemonCardProps = {
  pokemon: PokemonDetails
  isPokemonCaught: undefined | PokemonDetails
  handlePokeBall: () => void
}

const Pokemoncard: React.FC<PokemonCardProps> = ({ pokemon, isPokemonCaught, handlePokeBall }) => {
  const classes = useStyles()
  return (
    <Card className={`${classes.card}`}>
      <div className={classes.flexCenter}>
        <img src={pokemon?.picture} alt="Pokemon"></img>
      </div>
      <div className={classes.marginBottom}>
        <Typography>Name: {pokemon.name}</Typography>
        <Typography>Height: {pokemon.height}</Typography>
        <Typography>Weight: {pokemon.weight}</Typography>
      </div>

      <div className={classes.marginBottom}>
        <Typography variant="body1" className={classes.bold}>
          Abilities:{' '}
        </Typography>
        {pokemon?.abilities?.map(ability =>
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
  )
}

Pokemoncard.propTypes = {}

export default Pokemoncard
