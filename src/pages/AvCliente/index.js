import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList,Modal, TextInput, Pressable, Alert} from 'react-native'
import firebase from '../../database/firebase'
import styles from './styles'
export default function AvCliente({route}){
    const cliente = route.params.item
    const [listAvCliente, setListAvCliente] = useState([])
    const [modalAvVisible, setModalAvVisible] = useState(false)
    const [modalEditVisible, setModalEtidVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [valor, setValor] = useState('')

    useEffect(()=>{
        loadingAvCliente()
    },[])
    async function loadingAvCliente(){

        await firebase.database().ref('historicoAvCliente').child(cliente.key).on('value', (snapshot) =>{
            setListAvCliente([])
            snapshot.forEach( (childItem) => {
                let list = {
                    key: childItem.key,
                    valor: childItem.val().valor,
                    divida: childItem.val().divida,
                    data: childItem.val().data
                }
                setListAvCliente(oldArray => [...oldArray, list])
            })

        })
    }
    function editOrDelete({item}){
        Alert.alert(
            "Mensagem",
            "Descrição da Mensagem",
            [
                {
                    text: 'EDITAR', onPress: ()=>{editar({item})}
                },
            ]
        )
    }
    function editar({item}){
        setEdit(item)
        //console.log(item)
        setModalEtidVisible(true)
    }
    function openModal(){
        if(cliente.saldo == 0){
            alert('Dívida do Cliente está paga!\nImpossível Adicionar um AV')
            return
        }
        setModalAvVisible(true)
    }
    async function confirmar(){
        
        if(parseFloat(valor) > cliente.saldo ){
            alert('Saldo é Menor que o valor Pago pelo Cliente!')
            
            return 0
        }else{
            let key = firebase.database().ref('historicoAvCliente').push().key
            await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                valor: parseFloat(valor),
                data:  new Date().toLocaleDateString()
            })
            alert('Av Cadastrado com Sucesso!')
            await firebase.database().ref('clientes').child(cliente.key).update({
                    saldo: (cliente.saldo - parseFloat(valor) )
                })
            if(cliente.saldo == valor){
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: parseFloat(valor),
                    data:  new Date().toLocaleDateString(),
                    divida: 'Dívida Paga'
                })  
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: parseFloat(valor),
                    data:  new Date().toLocaleDateString(),
                    divida: 'Dívida Paga'
                })  
            }
        }
        

        zerarForm()
    }
    function zerarForm(){
        setValor('')
    }

    return(
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Histórico de AV</Text>
                    <TouchableOpacity onPress={openModal}>
                        <Text style={styles.txtHeader}>ADD</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Cliente: {cliente.nome}</Text>
            </View>
            <FlatList
                key = {item => item.key}
                data= {listAvCliente}
                renderItem = { ({item}) => (
                    <Pressable 
                     
                    onPress={()=>editOrDelete({item})}
                    
                    >
                        <View style={styles.viewCard}>
                            <Text style={styles.txtCard}>Data: {item.data}</Text>
                            <Text style={styles.txtCard}>Valor: {item.valor}</Text>
                            <Text style={styles.txtCard}>Dívida: {item.divida}</Text>
                        </View>
                    </Pressable>
                )}
            />
            {/** MODAL DE ATUALIZAÇÃO DAS INFORMAÇÕES */}
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalAvVisible}
            >
                <View style={styles.viewModal}>
                    <View style={styles.viewInput}>
                        <TextInput 
                            style={styles.input}
                            placeholder= 'R$00,00'
                            value = {valor}
                            keyboardType = "numeric"
                            onChangeText = {(value) => setValor(value)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>setModalAvVisible(false)}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmar()}>
                        <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalEditVisible}
                
            >
                <View style={styles.viewModal}>
                    <View style={styles.viewInput}>
                        
                        <TextInput 
                            style={styles.input}
                            placeholder= {`${edit.data}`}
                            value = {valor}
                            keyboardType = "numeric"
                            onChangeText = {(value) => setValor(value)}
                        />
                        
                        <Text>Data de Pagamento: {edit.data}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>setModalEtidVisible(false)}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmar()}>
                        <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </View>
    )
}