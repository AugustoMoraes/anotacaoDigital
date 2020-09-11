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
    const [listProdutosCliente, setListProdutosCliente] = useState([])
    const [modalAvVisible, setModalAvVisible] = useState(false)
    const [modalEditVisible, setModalEtidVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [moneyField, setMoneyField] = useState('')
    const [validaData, setValidaData] = useState(false)
    
    useEffect(()=>{
        loadingAvCliente()
        loadingListProdutosCliente()
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
        let ultimoProduto = listProdutosCliente[listProdutosCliente.length - 1]

        //console.log(`Ultimo Produto: ${ultimoProduto.nome} - Quantidade: ${ultimoProduto.qtd}`)
        let list = listProdutosCliente.filter(dataCompra => dataCompra.data === ultimoProduto.data)

        let msgUltimasCompras = ``
        
        list.map(produto =>{
            msgUltimasCompras += `Produto: ${produto.nome}\nQuantidade: ${produto.qtd}\nData: ${produto.data}\n=========================\n`
        })

        return msgUltimasCompras
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
            let datAtual = new Date()
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
    function ordernarListaDate(){
        listAvCliente.map(lista => {
            lista.data = lista.data.split('/').reverse().join('/')
        })
        
        let listaOdernada = listAvCliente.sort(ordenar)

        listaOdernada.map(lista => {
            lista.data = lista.data.split('/').reverse().join('/')
        })
        return listaOdernada
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
                data=  {ordernarListaDate()} 
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
                            <Text style={styles.txtCard}>Valor: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
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
                        <Text style={styles.txtFooter}>Débito de: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(cliente.totalCompras - cliente.totalPago)}
                        </Text>
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
                        ref={ (ref) => setValidaData(ref)}
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