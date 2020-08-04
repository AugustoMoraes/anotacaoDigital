import React, {useState,useEffect,} from 'react'
import {View, Text,TouchableOpacity,Modal,TextInput,FlatList, Pressable,Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import firebase from '../../database/firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

export default function Clientes(){
    const navigation = useNavigation()
    const [clientes, setClientes] = useState([])
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [nome, setNome] = useState('')
    const [edit, setEdit] = useState([])
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
            saldo: 0,   
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
    function AvCliente({item}){
        navigation.navigate('AvCliente',{item})
    }
    function editOrDelete({item}){
        Alert.alert(
            "Selecione Uma Opção",
            "Menasgem 2",
            [
                {
                    text: 'CANCELAR'
                },
                {
                    text: 'DELETAR', onPress: ()=> {deletar({item})}
                },
                {
                    text: 'EDITAR', onPress: ()=> {editar({item})}
                },
            ]
        )
    }
    async function deletar({item}){
        if(item.saldo > 0){
            alert('O usuário ainda está em débito! Impossível deleta-lo')
            return
        }
        await [
            // deletar usuário da lista de clientes
            firebase.database().ref('clientes').child(item.key).remove(),
            // deletar usuário da lista de Histórico de Clientes
            firebase.database().ref('historicoAvCliente').child(item.key).remove(),
            // deletar usuário da lista de Produtos Vendidos
            firebase.database().ref('produtosVendidos').child(item.key).remove()
        
        ]
        
        alert(`Usuário Deletado ${item.nome}`)
    }
    function editar({item}){
        setEdit(item)
        setNome(item.nome)
        setContato(item.contato)
        setContato(contato.substring(4))
        setModalEditVisible(true)
        //alert(`Usuário Editado ${item.nome}`)
    }
    function cancelarEdicao(){
        setModalEditVisible(false)
        //alert('Ok')
    }
    async function confirmarEdicao(){
        //alert('OK')
        if(edit.nome == '' || edit.contato == ''){
            alert('Preencha os campos!')
            return 
        }
        await firebase.database().ref('clientes').child(edit.key).update({
            nome: nome,
            contato: `5591${contato}`
        })
        setNome('')
        setContato('')
        setModalEditVisible(false)
        alert('Modificado com Sucesso!')
    }
    return(
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Clientes em Débito</Text>
                <TouchableOpacity onPress={()=>setModalAddVisible(true)}>
                    {<Ionicons name="add-circle-sharp" size={30}/>}
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor = {item => item.key}
                data= {clientes}
                renderItem = { ({item}) => (
                    <Pressable
                        onPressOut ={()=>editOrDelete({item})}
                        style={({ pressed }) => [
                            {
                            backgroundColor: pressed
                                ? '#777'
                                : '#fff'
                            },
                            styles.wrapperCustom
                        ]}
                    >
                    <View style={styles.viewCard}>
                        <View>
                            <Text style={styles.txtDescricao}>Nome: {item.nome}</Text>
                            <Text style={styles.txtDescricao}>Saldo: {item.saldo}</Text>
                        </View>
                        <View style={styles.viewBotaoCard}>
                                <TouchableOpacity onPress={()=>addProdutosCliente({item})}> 
                                    <Text style={styles.txtBtnCard}>Produtos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>AvCliente({item})}> 
                                    <Text style={styles.txtBtnCard}>AV</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                    </Pressable>
                )}
            />
            <Modal
                animationType ='slide'
                visible = {modalAddVisible}
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

            <Modal
                animationType ='slide'
                visible = {modalEditVisible}
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
                        <TouchableOpacity style={styles.btn} onPress={()=>cancelarEdicao()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={()=>confirmarEdicao()}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </View>
    )
}