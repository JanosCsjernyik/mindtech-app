import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/rootReducer'
import { fetchPokemonTypes } from '../../redux/reducers/pokemon'
import PokemonPicker from './components/PokemonPicker'
import PokemonList from './components/PokemonList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
})

// The home page, with two components, PokemonPicker, PokemonList.
// Using two local states here. So the PokemonList component can use it.
const PokemonListingPage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { types } = useSelector((state: RootState) => state.pokemons)

  // Wired to the checkbox, on the PokemonPicker component.
  const [showOnlyCaught, setShowOnlyCaught] = useState(false)
  // Wired to the search field, on the PokemonPicker component.
  const [searchTerm, setSearchTerm] = useState<null | string>(null)

  useEffect(() => {
    if (!types.length) {
      dispatch(fetchPokemonTypes())
    }
  }, [dispatch, types])

  return (
    <div className={classes.wrapper}>
      <PokemonPicker
        pokemonTypes={types}
        setShowOnlyCaught={setShowOnlyCaught}
        showOnlyCaught={showOnlyCaught}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <PokemonList showOnlyCaught={showOnlyCaught} searchTerm={searchTerm} />
    </div>
  )
}

export default PokemonListingPage
