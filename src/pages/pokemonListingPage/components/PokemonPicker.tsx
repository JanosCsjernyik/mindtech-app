import React, { useEffect } from 'react'
import { fetchPokemonsByType, PokemonType } from '../../../redux/reducers/pokemon'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers/rootReducer'
import { makeStyles } from '@material-ui/core/styles'

type PokemonPickerProps = {
  pokemonTypes: PokemonType[]
  setShowOnlyCaught: (value: boolean | ((prevVar: boolean) => boolean)) => void
  showOnlyCaught: boolean
  setSearchTerm: (value: string | null | ((prevVar: string | null) => string | null)) => void
  searchTerm: null | string
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: '1rem',
  },
})

const PokemonPicker: React.FC<PokemonPickerProps> = ({
  pokemonTypes,
  setShowOnlyCaught,
  showOnlyCaught,
  setSearchTerm,
  searchTerm,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { selectedPokemonType, pokemonsByType } = useSelector((state: RootState) => state.pokemons)

  useEffect(() => {
    if (selectedPokemonType && !pokemonsByType.id) {
      dispatch(fetchPokemonsByType(selectedPokemonType))
    }
    if (!selectedPokemonType && pokemonTypes.length) {
      dispatch(fetchPokemonsByType(pokemonTypes[0]))
    }
  }, [selectedPokemonType, dispatch, pokemonTypes, pokemonsByType.id])

  return (
    <div className={classes.wrapper}>
      <TextField
        variant="outlined"
        select
        SelectProps={{
          native: true,
        }}
        value={selectedPokemonType?.name || pokemonTypes[0]?.name}
        onChange={e => {
          const pokemonName = e.target.value
          const selectedPokemonType = pokemonTypes.find(
            pokemonType => pokemonType.name === pokemonName
          )!
          dispatch(fetchPokemonsByType(selectedPokemonType))
        }}
      >
        {pokemonTypes &&
          pokemonTypes.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
      </TextField>
      <TextField
        className={classes.marginLeft}
        label="Search"
        variant="outlined"
        value={searchTerm || ''}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <FormControlLabel
        className={classes.marginLeft}
        control={
          <Checkbox value={showOnlyCaught} onChange={e => setShowOnlyCaught(e.target.checked)} />
        }
        label="Show Caught"
      />
    </div>
  )
}

export default PokemonPicker
