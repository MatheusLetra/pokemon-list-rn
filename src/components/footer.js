import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Footer () {
    return(
        <View style={styles.footer}>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        backgroundColor: '#8A2BE2',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})