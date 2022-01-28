import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, FlatList,Modal, TextInput, Pressable, Alert,Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'


Ionicons.loadFont()
AntDesign.loadFont()


export default function AvCliente({route}){
    const cliente = route.params.item
    const [listAvCliente, setListAvCliente] = useState([])
    const [listProdutosCliente, setListProdutosCliente] = useState([])
    const [modalAvVisible, setModalAvVisible] = useState(false)
    const [modalEditVisible, setModalEtidVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [moneyField, setMoneyField] = useState('')
    const [validaData, setValidaData] = useState(false)
    const [debito, setDebito] = useState(0)
    const navigation = useNavigation()
    useEffect(()=>{
        loadingAvCliente()
        loadingListProdutosCliente()
        //console.log(listProdutosCliente)
        setDebito(cliente.totalCompras - cliente.totalPago)
        //ordernarListaDate()
        
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

    async function loadingListProdutosCliente(){
        await firebase.database().ref('produtosVendidos').child(cliente.key).orderByChild('data').on('value',(snapshot) => {
                setListProdutosCliente([])
                snapshot.forEach( (childItem) => {
                    let list = {
                        key: childItem.val().key,
                        data: childItem.val().data,
                        qtd: childItem.val().qtd,
                        nome: childItem.val().nome
                    }
                    setListProdutosCliente(oldArray => [...oldArray,list])
                })
            })
    }
    function msgDataUltimaCompraCliente(){
        //loadingListProdutosCliente()
        //let tamanho = listProdutosCliente.length
        let ultimoProduto = listProdutosCliente[listProdutosCliente.length -1]
        //console.log(`Ultimo Produto: ${ultimoProduto.nome} - Quantidade: ${ultimoProduto.qtd}`)
        let list = listProdutosCliente.filter(dataCompra => dataCompra.data == ultimoProduto.data)

        let msgUltimasCompras = `ultimoProduto :${ultimoProduto.data}\n\n`
        
        list.map(produto =>{
            msgUltimasCompras += `\n\nProduto: ${produto.nome}\nQuantidade: ${produto.qtd}\n=========================\n`
        })

        return msgUltimasCompras
    }
    function editOrDelete({item}){
        Alert.alert(
            "Selecione uma opção!",
            "",
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
    function comparDates (date) {
        let parts = date.split('/') // separa a data pelo caracter '/'
        let today = new Date()      // pega a data atual
        
        date = new Date(parts[2], parts[1] - 1, parts[0]) // formata 'date'
        
        // compara se a data informada é maior que a data atual
        // e retorna true ou false
        return date > today ? true : false
      }
    async function confirmarModalEdit(){
       if(data == ''){
            alert('A Data não foi modificada!')
            setData('')
            setModalEtidVisible(false)
            return
       }
       if(!validaData.isValid()){
            alert('Data Incorreta!')
            return
        }

        if(comparDates(data)){
            alert('Preencha com uma data menor que a de Hoje!')
            setData('')
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
            let key = firebase.database().ref('historicoAvCliente').push().key
            //let datAtual = new Date()
            await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                valor: numberValue,
                data: new Date().toLocaleDateString(),
                //data:  new Date(`${datAtual.getFullYear()}-${datAtual.getMonth()}-${datAtual.getDay()}`),
            })
            await firebase.database().ref('clientes').child(cliente.key).update({
                totalPago: (cliente.totalPago + numberValue )
            })
            if(numberValue == (cliente.totalCompras - cliente.totalPago)){
                await firebase.database().ref('historicoAvCliente').child(cliente.key).child(key).set({
                    valor: numberValue,
                    data:  new Date().toLocaleDateString(),
                    //data:  new Date(`${datAtual.getFullYear()}-${datAtual.getMonth()}-${datAtual.getDay()}`),
                    divida: 'Dívida Paga'
                })  
                await firebase.database().ref('produtosVendidos').child(cliente.key).child(key).set({
                    valor: numberValue,
                    data:  new Date().toLocaleDateString(),
                    //data:  new Date(`${datAtual.getFullYear()}-${datAtual.getMonth()}-${datAtual.getDay()}`),
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
        let msgUltimaCompra = msgDataUltimaCompraCliente()
        let msg = `Ultimas Compras:\n\n${msgUltimaCompra}\nTotal da Compra: ${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
        format(cliente.totalCompras)}\n\nHistórico De AV do Cliene\n\n`

        listAvCliente.map(msgCliente => {
            if(msgCliente.divida!=null){
                msg += `data: ${msgCliente.data}\nvalor: ${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
                format(msgCliente.valor)}\n${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
                format(msgCliente.divida)}\n=========================\n`
            }else{
                msg += `data: ${msgCliente.data}\nvalor: ${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
                format(msgCliente.valor)}\n=========================\n`
            }
        })
        msg += `Total Pago:${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
            format(cliente.totalPago)}\nDébito: ${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
            format(cliente.totalCompras - cliente.totalPago)}`
        return msg
    }
    function enviarMsg(){
        let msg = montarMensagem()
        Linking.openURL(`whatsapp://send?text=Histórico de AV: ${cliente.nome}\n\n${msg}&phone=${cliente.contato}`)
    }
    
    function ordenar(a, b) {
        return a.data > b.data;
    }
    function ordernarListaDate(list){
        list.map(lista => {
            lista.data = lista.data.split('/').reverse().join('/')
        })
        
        let listaOdernada = list.sort(ordenar)

        listaOdernada.map(lista => {
            lista.data = lista.data.split('/').reverse().join('/')
        })
        return listaOdernada
    }
    function deleteHistoricoAV(){
        if(cliente.totalCompras != cliente.totalPago){
            alert('A dívida ainda não foi quitada!')
            return
        }
        Alert.alert(
            "Você deseja excluir o histórico de Av?",
            "",
            [
                {
                    text: 'CANCELAR',
                },
                {
                    text: 'CONFIRMAR', onPress:async ()=>
                        {
                         
                            await firebase.database().ref('historicoAvCliente')
                                    .child(cliente.key).remove()
                        }

                    
                },
            ]
        )

    }
    return(
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <View style={styles.viewClose}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <AntDesign name="close" size={30} color='#242424'/>
                    </TouchableOpacity>
                    <Text style={styles.txtDebito}>Débito</Text>
                </View>
                <View style={styles.viewValorDebito}>
                    <Text style={styles.txtValorDebito}>
                        {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(debito)}
                    </Text>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons name='add-circle-sharp' size={45} color='#38E1EE'/>
                    </TouchableOpacity>
                </View>
                {/**
                <Text style={styles.txtHeader}>Histórico de AV</Text>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons name="add-circle-sharp" size={40} color='#000'/>
                    </TouchableOpacity>
                 */}
            </View>
            <View style={styles.viewHistorico}>
                <Text style={styles.txtHistorico}>Histórico de AV</Text>
            <View style={styles.viewCliente}>
                <Text style={styles.txtCliente}>{cliente.nome}</Text>
                <TouchableOpacity onPress={()=>enviarMsg()}>
                    <Ionicons name="logo-whatsapp" size={35} color="#2d5"/>
                </TouchableOpacity>
            </View>
            
            <FlatList
                key = {item => item.key}
                data=  {ordernarListaDate(listAvCliente)} 
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
                            <Text style={styles.txtDesc}>Valor</Text>
                            <Text style={styles.txtValueDesc}>{Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                            <Text style={styles.txtDesc}>Data</Text>
                            <Text style={styles.txtValueDesc}>{item.data}</Text>
                        </View>
                        <View style={styles.viewDividaPaga}>
                            {
                                (item.divida != null) &&(
                                    <AntDesign name="checkcircle" size={43} color="#6ECB96" style={{marginVertical: 10}}/>
                                )
                            }
                            <View style={{flexDirection: 'column', marginLeft: 10}}>
                                <View>
                                    {
                                        (item.divida != null) &&(
                                            <Text style={[styles.txtCard,{color: '#007111', fontWeight: 'bold'}]}>{item.divida}</Text>
                                        )
                                    }
                                    {
                                        (item.divida != null) &&(
                                            <Text style={[styles.txtCard,{color: '#007111', fontWeight: 'bold'}]}>Data: {item.data}</Text>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </Pressable>

                )}
                />
                {
                (cliente.totalCompras === cliente.totalPago)&&(
                    <View style={styles.viewDeleteDividas}>
                        <TouchableOpacity style={styles.btnDeleteDividas} onPress={deleteHistoricoAV}>
                            <Text style={styles.txtDeleteDividas}>
                                Limpar Histórico de AV
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
                }
                </View>
                {/** 
                <View style={styles.viewFooter}>
                        <Text style={styles.txtFooter}>Débito de: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(debito)}
                        </Text>
                </View>
                */}
            {/** MODAL DE ATUALIZAÇÃO DAS INFORMAÇÕES */}
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalAvVisible}
            >
                <View style={{flex:1}}>
                    {/**,  */}
                <View style={{height: '65%',backgroundColor: '#303030', opacity: 0.60, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                </View>
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
                            placeholderTextColor = '#909090'
                            onChangeText={(value) => setValor(value)}
                            ref={(ref) => setMoneyField(ref)}
                        />
                    </View>
                    <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={()=>fecharModal()}>
                        <Text style={[styles.btn,{backgroundColor: '#AEAEAE'}]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmar()}>
                        <Text style={styles.btn}>Confirmar</Text>
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
                <View style={{flex: 1}}>
                <View style={{height: '65%',backgroundColor: '#303030', opacity: 0.60, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                </View>
                <View style={styles.viewModal}>
                    <View style={styles.viewTitulo}>
                        <Text style={styles.txtTitulo}>Editar AV</Text>
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
                        placeholderTextColor = '#909090'
                        onChangeText={(value) => setData(value)}
                        ref={ (ref) => setValidaData(ref)}
                        style={styles.input}
                    />
                    </View>
                    <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={()=>setModalEtidVisible(false)}>
                        <Text style={[styles.btn,{backgroundColor: '#AEAEAE'}]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmarModalEdit()}>
                        <Text style={styles.btn}>Confirmar</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                
                </View>
            </Modal>
            
        </View>
    )
}