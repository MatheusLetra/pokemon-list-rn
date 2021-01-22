import React, { useEffect, useState } from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import Pokemon from './src/components/pokemon';
import Header from './src/components/header';

export default function App() {
  
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/',{
      method: 'GET',
      headers :{
        'Accept': 'application/json'
      }
    })
    .then(response =>response.json())
      .then(data => {
        setPokemons(data.results)
      })
  }, [])

  return (
    <SafeAreaView style={{marginTop: 30}}>
      <Header />
      <View>      
      <FlatList 
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        numColumns={3}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={PokemonShow}
        style={{ backgroundColor: '#EE82EE'}}
       
      />
      </View>

    </SafeAreaView>
  );

  function PokemonShow (pokemon){    

    return(
      <Pokemon data={pokemon}/> 
    )
  }
}

