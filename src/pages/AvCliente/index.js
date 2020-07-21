import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList,Modal, TextInput} from 'react-native'
import firebase from '../../database/firebase'
import styles from './styles'
export default function AvCliente({route}){
    const cliente = route.params.item
    const [listAvCliente, setListAvCliente] = useState([])
    const [modalAvVisible, setModalAvVisible] = useState(false)
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
                    data: childItem.val().data
                }
                setListAvCliente(oldArray => [...oldArray, list])
            })

        })
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
        }
        

        zerarForm()
    }
    function zerarForm(){
        setValor('')
    }
    return(
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text>Histórico de AV - Cliente: {cliente.nome}</Text>
                <TouchableOpacity onPress={()=>setModalAvVisible(true)}>
                    <Text>AV</Text>
                </TouchableOpacity>
            </View>
            <View>
            <FlatList
                key = {item => item.key}
                data= {listAvCliente}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                        <View>
                            <Text>Data: {item.data}</Text>
                            <Text>Valor: {item.valor}</Text>
                        </View>
                    </View>
                )}
            />
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

            </View>
        </View>
    )
}