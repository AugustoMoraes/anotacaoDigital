import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,TouchableOpacity} from 'react-native'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

export default function ListDividaCliente({route}){
    const {item} = route.params
    const [produtos, setProdutos] = useState([])
    
    useEffect(()=>{
        async function loadingProdutos(){
            await firebase.database().ref('produtos').on('value' , (snapshot)=>{
                setProdutos([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        valor: childItem.val().valor,      
                    }
                    setProdutos(oldArray => [...oldArray, list])
                })
            })
        }
        loadingProdutos()
    },[])
    function addProdutosClientes(){
        alert('OK')
    }
    return(
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text>Listar Produtos Comprados</Text>
                <TouchableOpacity onPress={()=>addProdutosClientes()}>
                    {<Ionicons name="add-circle-sharp" size={25}/>}
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                        <View>
                            <Text>Nome: {item.nome}</Text>
                            <Text>Valor: {item.valor}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.ViewFooter}>
                <Text>Total a Pagar: {item.saldo}</Text>      
            </View>

        </View>
    )
}