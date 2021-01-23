import React, { useEffect, useState } from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';
import Pokemon from './src/components/pokemon';
import Header from './src/components/header';

export default function App() {
  
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000',{
      method: 'GET',
      headers :{
        'Accept': 'application/json'
      }
    })
    .then(response =>response.json())
      .then(data => {
        let newData = data.results
        newData.push(
          { 
            name: 'empty-1',
            url: ''
          }
        )
        setPokemons(newData)
      })
  }, [])

  return (
    <SafeAreaView style={{marginTop: 30}}>
      <Header />
      <View >      
      <FlatList 
        data={pokemons}

        keyExtractor={(pokemon) => pokemon.name}
        numColumns={3}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={PokemonShow}
        style={{ backgroundColor: '#00BFFF'}}
       
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

