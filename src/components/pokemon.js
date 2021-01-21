import React, {useState} from  'react'
import {Modal,View,Image,Text, TouchableOpacity} from 'react-native'

export default function Pokemon (props) {

    const [modalVisible,setModalVisible] = useState(false)
    const [pokemonAbilities, setPokemonAbilities] = useState([])

    const {name, url} = props.data.item
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','')
    const imageURL = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokemonNumber + '.png'

     const getPokemonDetails =  (name) => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + String(name),{
            method: 'GET',
            headers :{
              'Accept': 'application/json'
            }
          })
          .then(response =>response.json())
            .then(data => {
               setPokemonAbilities(data.abilities)
            })
    }

    const showPokemonDetails = () => {
        if (modalVisible == false){
            getPokemonDetails(name)
        }
        setModalVisible(!modalVisible)
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                    onPress={showPokemonDetails}>
                    <View>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 3, backgroundColor: '#f0f0ff', alignItems: 'center', justifyContent:'center'}}>
                    <Image style={{width: 150, height: 150}}
                        source={{uri: imageURL}}/>
                    <Text style={{marginTop: 40, fontWeight: 'bold', fontSize: 30}}>
                        {'#' + pokemonNumber + ' - ' + name.toUpperCase()}</Text>  
                </View>
                <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                    onPress={showPokemonDetails}>
                    <View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <TouchableOpacity onPress={showPokemonDetails}>
                <View style={{alignItems:'center', marginVertical: 20, marginHorizontal: 20, backgroundColor: '#EE82EE'}}>
                    <Image style={{ width:75, height: 75}}
                        source={{uri: imageURL}}/>
                    <Text style={{marginTop: 15}}>{'#' + pokemonNumber }</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}