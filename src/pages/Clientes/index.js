import React, {useState,useEffect,} from 'react'
import {View, Text,TouchableOpacity,Modal,TextInput,FlatList, Pressable,Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import firebase from '../../database/firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

Ionicons.loadFont()
MaterialCommunityIcons.loadFont()
Entypo.loadFont()
AntDesign.loadFont()

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
                        totalCompras: childItem.val().totalCompras,      
                        totalPago: childItem.val().totalPago,      
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
            totalCompras: 0,   
            totalPago: 0
        })
        alert('Cliente Adicionado Com Sucesso!')
        zerarForm()
        setModalAddVisible(false)
        //loadingClientes()
    }
    function cancelar(){
        zerarForm()
        setModalAddVisible(false)
    }
    function confirmar(){
        if(nome == '' || contato == ''){
            alert('Preencha todos os campos')
            return
        }
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
            "",
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
        if(item.totalCompras > item.totalPago){
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
        zerarForm()
        alert(`Usuário Deletado ${item.nome}`)
    }
    function editar({item}){
        setEdit(item)
        setNome(item.nome)
        setContato(item.contato.substring(4))
        setModalEditVisible(true)
        //alert(`Usuário Editado ${item.nome}`)
    }
    function cancelarEdicao(){
        setEdit([])
        zerarForm()
        setModalEditVisible(false)
        //alert('Ok')
    }
    async function confirmarEdicao(){
        //alert('OK')
        if(nome == '' || contato == ''){
            alert('Preencha os campos!')
            return 
        }
        await firebase.database().ref('clientes').child(edit.key).update({
            nome: nome,
            contato: `5591${contato}`
        })
        zerarForm()
        setEdit([])
        setModalEditVisible(false)
        alert('Modificado com Sucesso!')
    }
    function totalReceber(){
        let total = 0
        clientes.map( cliente => {
           total +=  (cliente.totalCompras - cliente.totalPago)
        },0)
        return total
    }
    return(
        
        <View style={styles.container}>
            
            <View style={styles.viewTotalReceber}>
                <Text style={styles.txtDesc}>
                    Total a Receber
                </Text>
                <View style={styles.cardReceber}>
                    <Text style={styles.txtValorReceber}>
                        {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(totalReceber())} 
                    </Text>
                </View>
            </View>
            <View style={{ marginVertical: 15}}>
                <Text style={styles.txtDesc}>Compras</Text>
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
                                : '#fff',   
                            },
                            
                            styles.wrapperCustom
                        ]}
                    >
                    <View style={styles.viewCard}>
                        <View>
                            <Text style={styles.txtCliente}>Cliente</Text>
                            <Text style={styles.txtNome}>{item.nome}</Text>
                            <Text style={styles.txtDescricao}>
                                Total de Compras: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(item.totalCompras)}
                            </Text>
                            <Text style={styles.txtDescricao}>
                                Total Pago: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.totalPago)}
                                </Text>
                            {
                                
                                (item.totalCompras == item.totalPago) &&(
                                    <View style={styles.viewDivida}>
                                        <Text style={styles.txtDivida}> Dívida Paga </Text>
                                    </View>
                                    //<Text style={[styles.txtDescricao,{backgroundColor: '#37dcf2',color: '#007111', fontWeight: 'bold', fontSize: 20}]}>Dívida Paga</Text>
                                )
                            }
                            {
                                
                                (item.totalCompras != item.totalPago) &&(
                                    <View style={[styles.viewDivida,{backgroundColor: '#FF7070'}]}>
                                        <Text style={styles.txtDivida}> Pendente </Text>
                                    </View>
                                    //<Text style={[styles.txtDescricao,{backgroundColor: '#37dcf2',color: '#007111', fontWeight: 'bold', fontSize: 20}]}>Dívida Paga</Text>
                                )
                            }
                            
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
            <View style={styles.viewTab}>
                <View style={[styles.viewBtn,{borderTopRightRadius: 60}]}>
                    <TouchableOpacity onPress={()=>{}}>
                        <MaterialCommunityIcons name='clipboard-text' size={35} color='#3AE2F0'/> 
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBtnAdd}>
                    <TouchableOpacity onPress={()=>setModalAddVisible(true)}>
                        {/*<ButtonAdd/> */}
                        <Entypo name='plus' size={50} color='#fff'/> 
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewBtn,{borderTopLeftRadius: 60}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Produtos')}>
                        <AntDesign name='shoppingcart' size={35} color='#242424' /> 
                    </TouchableOpacity>
                </View>
            </View>
            
            <Modal
                animationType ='slide'
                visible = {modalAddVisible}
            >
                <View style={styles.viewModal}> 
                    <View style={styles.viewTitulo}>
                        <Text style={styles.txtTitulo}>Adicionar Cliente</Text>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 30, borderTopRightRadius: 35, borderTopLeftRadius: 35}}>
                    <View style={styles.viewInput}>
                    <Text style={styles.txtTipoInput}>Nome do Cliente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder= 'digite seu nome'
                        //placeholderTextColor = '#ddd'
                        value = {nome}
                        onChangeText = {(value)=>setNome(value)}
                    />
                    <Text style={styles.txtTipoInput}>Contato</Text>
                    <TextInput
                        style={styles.input}
                        placeholder = 'número de telefone'
                        //placeholderTextColor = '#ddd'
                        keyboardType = 'numeric'
                        value = {contato}
                        onChangeText = {(value)=>setContato(value)} 
                    />
                    </View>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={cancelar}>
                            <Text style={styles.btn}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmar}>
                            <Text style={[styles.btn,{backgroundColor: '#37DCF2'}]}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType ='slide'
                visible = {modalEditVisible}
            >
                <View style={styles.viewModal}>
                <View style={styles.viewTitulo}>
                        <Text style={styles.txtTitulo}>Atualizar Cliente</Text>
                </View>
                    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 30, borderTopRightRadius: 35, borderTopLeftRadius: 35}}>
                    <View style={styles.viewInput}>
                    <Text style={styles.txtTipoInput}>Nome do Cliente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder= 'digite seu nome'
                        //placeholderTextColor = '#fff'
                        value = {nome}
                        onChangeText = {(value)=>setNome(value)}
                    />
                    <Text style={styles.txtTipoInput}>Contato</Text>
                    <TextInput
                        style={styles.input}
                        placeholder = 'digite seu número de telefone'
                        //placeholderTextColor = '#fff'
                        keyboardType = 'numeric'
                        value = {contato}
                        placeholderTextColor = '#000'
                        onChangeText = {(value)=>setContato(value)}
                    />
                    </View>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={()=>cancelarEdicao()}>
                            <Text style={styles.btn}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>confirmarEdicao()}>
                            <Text style={[styles.btn,{backgroundColor: '#37DCF2'}]}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
            
        </View>
    )
}