import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList,Modal, TextInput, Pressable, Alert} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import firebase from '../../database/firebase'
import styles from './styles'
export default function AvCliente({route}){
    const cliente = route.params.item
    const [listAvCliente, setListAvCliente] = useState([])
    const [modalAvVisible, setModalAvVisible] = useState(false)
    const [modalEditVisible, setModalEtidVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [moneyField, setMoneyField] = useState('')
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
                    text: 'CANCELAR',
                },
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
    async function confirmarModalEdit(){
       
        await firebase.database().ref('historicoAvCliente').child(cliente.key).child(edit.key).update({
            data: data
        })
        alert('Data Alterada com Sucesso!')
        setData('')
        setModalEtidVisible(false)
    }
    function openModal(){
        if(cliente.saldo == 0){
            alert('Dívida do Cliente está paga!\nImpossível Adicionar um AV')
            return
        }
        setModalAvVisible(true)
    }
    function fecharModal(){
        
        setModalAvVisible(false)
    }
    async function confirmar(){
        let numberValue = moneyField.getRawValue()
        if(numberValue > cliente.saldo ){
            alert('Saldo é Menor que o valor Pago pelo Cliente!')
            
            return 0
        }else{
            let key = firebase.database().ref('historicoAvCliente').push().key
            await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                valor: numberValue,
                data: new Date().toLocaleDateString(),
            })
            alert('Av Cadastrado com Sucesso!')
            await firebase.database().ref('clientes').child(cliente.key).update({
                    saldo: (cliente.saldo - numberValue )
                })
            if(cliente.saldo == valor){
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: numberValue,
                    data:  new Date().toLocaleDateString(),
                    divida: 'Dívida Paga'
                })  
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: numberValue,
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
                            <Text style={styles.txtCard}>Data: {item.data}</Text>
                            <Text style={styles.txtCard}>Valor: {item.valor}</Text>
                            {
                                !isNaN(item.divida) &&(
                                    <Text style={styles.txtCard}>Dívida: {item.divida}</Text>
                                )
                            }
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
                <View style={{flex: 1, justifyContent:'flex-end'}}>
                <View style={styles.viewModal}>
                    <View>
                        <Text>Adicionar AV</Text>
                    </View>
                    <View style={styles.viewInput}>
                        <TextInputMask
                            type={'money'}
                            style={styles.input}
                            value={valor}
                            placeholder = 'R$00,00'
                            placeholderTextColor = '#000'
                            onChangeText={(value) => setValor(value)}
                            ref={(ref) => setMoneyField(ref)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>fecharModal()}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmar()}>
                        <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalEditVisible}
                
            >
                <View style={{flex: 1, justifyContent:'flex-end'}}>
                <View style={styles.viewModal}>
                    <View style={styles.viewInput}>
                        
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={data}
                        placeholder = 'R$00,00'
                        onChangeText={(value) => setData(value)}
                        />
                        
                        <Text>Data de Pagamento: {edit.data}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>setModalEtidVisible(false)}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmarModalEdit()}>
                        <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            
        </View>
    )
}