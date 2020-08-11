import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList,Modal, TextInput, Pressable, Alert,Linking} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()
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
        setModalEtidVisible(true)
    }
    async function confirmarModalEdit(){
       if(data == ''){
            alert('A Data não foi modificada!')
            setData('')
            setModalEtidVisible(false)
            return
       }
        await firebase.database().ref('historicoAvCliente').child(cliente.key).child(edit.key).update({
            data: data
        })
        alert('Data Alterada com Sucesso!')
        setData('')
        setModalEtidVisible(false)
    }
    function openModal(){
        if(cliente.totalCompras == cliente.totalPago){
            alert('Dívida do Cliente está paga!\nImpossível Adicionar um AV')
            return
        }
        setModalAvVisible(true)
    }
    function fecharModal(){
        setModalAvVisible(false)
    }
    async function confirmar(){
        if(valor == ''){
            alert('Adicione um valor!')
            return
        }
        let numberValue = moneyField.getRawValue()
        if((numberValue > (cliente.totalCompras - cliente.totalPago)) || (cliente.totalCompras - cliente.totalPago == 0) ){
            alert('Impossível adicionar o Av do Cliente, Verifique a dívida do Cliente!')
            setModalAvVisible(false)
            setValor('')
            return 0
        }else{
            console.log('entrou no primeiro if')
            let key = firebase.database().ref('historicoAvCliente').push().key
            await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                valor: numberValue,
                data: new Date().toLocaleDateString(),
            })
            await firebase.database().ref('clientes').child(cliente.key).update({
                totalPago: (cliente.totalPago + numberValue )
            })
            if(numberValue == (cliente.totalCompras - cliente.totalPago)){
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: numberValue,
                    data:  new Date().toLocaleDateString(),
                    divida: 'Dívida Paga'
                })  
                await firebase.database().ref('produtosVendidos').child(cliente.key).child(key).set({
                    valor: numberValue,
                    data:  new Date().toLocaleDateString(),
                    divida: 'Dívida Paga'
                })  
            }
        }
        alert('Av Cadastrado com Sucesso!')
        setModalAvVisible(false)
        zerarForm()
    }
    function zerarForm(){
        setValor('')
    }
    function montarMensagem(){
        let msg = `Total da Compra: ${cliente.totalCompras}\n`
        listAvCliente.map(msgCliente => {
            if(msgCliente.divida!=null){
                msg += `data: ${msgCliente.data}\nvalor: ${msgCliente.valor}\n${msgCliente.divida}\n=========================\n`
            }else{
                msg += `data: ${msgCliente.data}\nvalor: ${msgCliente.valor}\n=========================\n`
            }
        })
        msg += `Total Pago:${cliente.totalPago}\nDébito: ${cliente.totalCompras - cliente.totalPago}`
        return msg
    }
    function enviarMsg(){
        let msg = montarMensagem()
        Linking.openURL(`whatsapp://send?text=Histórico de AV: ${cliente.nome}\n\n${msg}&phone=${cliente.contato}`)
    }
    return(
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Histórico de AV</Text>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons name="add-circle-sharp" size={40}/>
                    </TouchableOpacity>
            </View>
            <View style={[styles.viewHeader,{justifyContent: 'space-between', marginHorizontal: 10}]}>
                <Text style={styles.txtHeader}>Cliente: {cliente.nome}</Text>
                <TouchableOpacity onPress={()=>enviarMsg()}>
                    <Ionicons name="logo-whatsapp" size={35} color="#2d5"/>
                </TouchableOpacity>
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
                                (item.divida != null) &&(
                                    <Text style={[styles.txtCard,{color: '#007111', fontWeight: 'bold'}]}>Dívida: {item.divida}</Text>
                                )
                            }
                        </View>
                    </Pressable>

                )}
                />
                <View style={styles.viewFooter}>
                    <Text style={styles.txtFooter}>Débito de: {cliente.totalCompras - cliente.totalPago}</Text>
                </View>
            {/** MODAL DE ATUALIZAÇÃO DAS INFORMAÇÕES */}
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalAvVisible}
            >
                <View style={{flex: 1, justifyContent:'flex-end'}}>
                <View style={styles.viewModal}>
                    <View style={styles.viewTitulo}>
                        <Text style={styles.txtTitulo}>Adicionar AV</Text>
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.txtTipoInput}>Valor:</Text>
                        <TextInputMask
                            type={'money'}
                            style={styles.input}
                            value={valor}
                            placeholder = 'R$00,00'
                            placeholderTextColor = '#FFF'
                            onChangeText={(value) => setValor(value)}
                            ref={(ref) => setMoneyField(ref)}
                        />
                    </View>
                    <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={()=>fecharModal()}>
                        <Text style={styles.btn}>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmar()}>
                        <Text style={styles.btn}>CONFIRMAR</Text>
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
                    <View style={styles.viewTitulo}>
                        <Text style={styles.txtTitulo}>Editar AV do Cliente</Text>
                    </View>  
                    <View style={styles.viewInput}>
                    <Text style={styles.txtTipoInput}>Data:</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={data}
                        placeholder = {edit.data}
                        placeholderTextColor = '#FFF'
                        onChangeText={(value) => setData(value)}
                        style={styles.input}
                    />
                    </View>
                    <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={()=>setModalEtidVisible(false)}>
                        <Text style={styles.btn}>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmarModalEdit()}>
                        <Text style={styles.btn}>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            
        </View>
    )
}