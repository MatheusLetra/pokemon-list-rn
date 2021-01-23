import React, {useEffect,useState } from  'react'
import {Modal,View,Image,Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function Pokemon (props) {

    const [modalVisible,setModalVisible] = useState(false)
    const [pokemonBaseExperience, setPokemonBaseExperience] = useState([])
    const [abilitie,setAbilitie] = useState('')

    const {name, url} = props.data.item
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','')
    const imageURL = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokemonNumber + '.png'
    
    

   
    useEffect (() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + String(name),{
            method: 'GET',
            headers :{
              'Accept': 'application/json'
            }
          })
          .then(response =>response.json())
            .then(data => {
                setAbilitie(data.abilities)
                setPokemonBaseExperience(data.base_experience) 
            })
    },[])
        
    const capitalize = str => {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    const getAbilities =  () => {
        let stringAbilities = ''
        for (let i = 1; i < abilitie.length; i++ ) {
            stringAbilities =  stringAbilities  + ' ' + capitalize(abilitie[i].ability.name)
        }
        if (stringAbilities !== '') {
            return (<Text style={styles.modalAbilities}> {`Habilities:${stringAbilities }\nBase Experience: ${String(pokemonBaseExperience)} `}</Text> )
        }
        else {
            return (<Text style={styles.modalAbilities}>Abilities not found</Text> )
        }
        
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
                        {getAbilities()}
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
        backgroundColor: '#FFFACD', 
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
        justifyContent: 'center',
        marginVertical: 20, 
        marginHorizontal: 20, 
        backgroundColor: '#00BFFF'
    },
    mainImage:{
        width:75, 
        height: 75
    },
    mainText:{
        marginTop: 15
    },
    modalAbilities:{
        color: '#191970',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20
    }
})