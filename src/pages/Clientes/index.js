import React, {useState,useEffect,} from 'react'
import {View, Text,TouchableOpacity,Modal,TextInput,FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import firebase from '../../database/firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

export default function Clientes(){
    const navigation = useNavigation()
    const [clientes, setClientes] = useState([])
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')

    useEffect(()=>{
        async function loadingClientes(){
            await firebase.database().ref('clientes').on('value' , (snapshot)=>{
                setClientes([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        contato: childItem.val().contato,
                        nome: childItem.val().nome,
                        saldo: childItem.val().saldo,      
                    }
                    setClientes(oldArray => [...oldArray, list])
                })
            })
        }
        loadingClientes()
    },[])
    function zerarForm(){
        setNome('')
        setContato('')
    }
    async function addCliente(){
        let key = firebase.database().ref('clientes').push().key
        await firebase.database().ref('clientes').child(key).set({
            nome: nome,
            contato: `5591${contato}`,
            saldo: 0
        })
        alert('Cliente Adicionado Com Sucesso!')
        zerarForm()
        setModalAddVisible(false)
        //loadingClientes()
    }
    function cancelar(){
        setModalAddVisible(false)
    }
    function confirmar(){
        addCliente()
    }
    function addProdutosCliente({item}){
        navigation.navigate('ListDividaCliente',{item})
    }
    return(
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text>Clientes em Débito</Text>
                <TouchableOpacity onPress={()=>setModalAddVisible(true)}>
                    {<Ionicons name="add-circle-sharp" size={25}/>}
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor = {item => item.key}
                data= {clientes}
                renderItem = { ({item}) => (
                    <View style={styles.viewCard}>
                        <View>
                            <Text>Nome: {item.nome}</Text>
                            <Text>Saldo: {item.saldo}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>addProdutosCliente({item})}> 
                            <Text>Adicionar Produtos</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Modal
                animationType ='slide'
                visible = {modalAddVisible}
                transparent = {true}
            >
                <View style={styles.viewModal}>
                    <View style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder= 'Nome do Cliente'
                        value = {nome}
                        onChangeText = {(value)=>setNome(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder = 'Contato'
                        keyboardType = 'numeric'
                        value = {contato}
                        onChangeText = {(value)=>setContato(value)}
                    />
                    </View>

                    <View style={styles.viewBotao}>
                        <TouchableOpacity style={styles.btn} onPress={cancelar}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={confirmar}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}