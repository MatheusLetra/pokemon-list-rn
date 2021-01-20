import React from  'react'
import {View,Image,Text} from 'react-native'

export default function Pokemon (props) {
 
    const {name, url} = props.data.item
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','')
    const imageURL = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokemonNumber + '.png'
    
    return(
        <View style={{flexDirection: 'row'}}>
        <Image style={{width: 50, height: 50}}
            source={{uri: imageURL}}/>
         <Text>{name}</Text>
        </View>
    )

}