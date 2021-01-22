import React, {useEffect,useState} from  'react'
import {Modal,View,Image,Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function Pokemon (props) {

    const [modalVisible,setModalVisible] = useState(false)
    const [pokemonAbilities, setPokemonAbilities] = useState([])

    const {name, url} = props.data.item
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','')
    const imageURL = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokemonNumber + '.png'
    
    useEffect(() => {
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
    },[])

    const getAbilities = () => {
        return 'Overgrow, Speed'
    }
    const showPokemonDetails = () => {
        setModalVisible(!modalVisible)
    }



    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <TouchableOpacity style={styles.outDetails}
                    onPress={showPokemonDetails}>
                    <View>
                    </View>
                </TouchableOpacity>
                <View style={styles.containerDetailsModal}>
                    <Image style={styles.imageModal}
                        source={{uri: imageURL}}/>
                    <Text style={styles.textNameModal}>
                        {'#' + pokemonNumber + ' - ' + name.toUpperCase()}</Text> 
                    <Text style={styles.modalAbilities}>Habilities: {getAbilities()}</Text> 
                </View>
                <TouchableOpacity style={styles.outDetails}
                    onPress={showPokemonDetails}>
                    <View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <TouchableOpacity onPress={showPokemonDetails}>
                <View style={styles.mainContainer}>
                    <Image style={styles.mainImage}
                        source={{uri: imageURL}}/>
                    <Text style={styles.mainText}>{'#' + pokemonNumber }</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    outDetails : {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    containerDetailsModal:{
        flex: 3, 
        backgroundColor: '#f0f0ff', 
        alignItems: 'center', 
        justifyContent:'center'

    },
    imageModal: {
        width: 150, 
        height: 150
    },
    textNameModal:{
        marginTop: 40, 
        fontWeight: 'bold', 
        fontSize: 30
    },
    mainContainer:{
        alignItems:'center', 
        marginVertical: 20, 
        marginHorizontal: 20, 
        backgroundColor: '#EE82EE'
    },
    mainImage:{
        width:75, 
        height: 75
    },
    mainText:{
        marginTop: 15
    },
    modalAbilities:{
        color: 'red',
        fontSize: 20
    }
})