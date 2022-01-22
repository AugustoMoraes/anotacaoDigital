import React from 'react'
import {View, StyleSheet} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo' 

Entypo.loadFont()

export default function ButtonAddTab() {
    return(
        <View style={styles.container}>
            <Entypo name="plus" size={45} color={'#FFF'}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3eccf5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: -30,
        //zIndex: 1
    }
})