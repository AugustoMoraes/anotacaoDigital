import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,TouchableOpacity, Modal, Pressable, Alert, TextInput} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
Ionicons.loadFont()
AntDesign.loadFont()

export default function ListDividaCliente({route}){
    const cliente = route.params.item
    const [produtos, setProdutos] = useState([])
    const [edit, setEdit] = useState([])
    const [data, setData] = useState('')
    const [validaData, setValidaData] = useState(false)
    const [produtosCliente, setProdutosCliente] = useState([])
    const [modalAddProdutosVisible, setModalAddProdutosVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)

    async function loadingProdutos(){
        await firebase.database().ref('produtos').orderByChild('nome').on('value' , (snapshot)=>{
            setProdutos([])
            snapshot.forEach( (childItem) =>{
                let list = {
                    key: childItem.key,
                    nome: childItem.val().nome,
                    valor: childItem.val().valor,
                    cont: childItem.val().cont,
                }
                setProdutos(oldArray => [...oldArray, list])
            })
        })
    }
    
    async function loadingProdutosCliente(){
        await firebase.database().ref('produtosVendidos').child(cliente.key).orderByChild('data').on('value' , (snapshot)=>{
            setProdutosCliente([])
            snapshot.forEach( (childItem) =>{
                let list = {
                    key: childItem.key,
                    nome: childItem.val().nome,
                    qtd: childItem.val().qtd,
                    data: childItem.val().data,
                    divida: childItem.val().divida,
                    
                }
                setProdutosCliente(oldArray => [...oldArray, list])
            })
        })
    }
    
    useEffect(()=>{
        loadingProdutos()
        loadingProdutosCliente()
    },[])

    function zerarQtdProdutos(){
        produtos.map(produto => {
            produto.cont = 0
        })
    }
    function isValidaQtdProduto(){
        let qtdProdutos = 0
        produtos.map((produto)=>{
            if(produto.cont > 0 ){
                qtdProdutos++
            }
        })

        return qtdProdutos > 0 ? true : false
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
        setData(item.data)
        setModalEditVisible(true)
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
        if(!validaData.isValid()){
            alert('Data Incorreta!')
            return
        }
        if(comparDates(data)){
            alert('Preencha com uma data menor que a de Hoje!')
            setData('')
            return
        }
        await firebase.database().ref('produtosVendidos').child(cliente.key).child(edit.key).update({
            data: data
        })
        alert('Data Alterada com Sucesso!')
        setData('')
        setModalEditVisible(false)
    }
    async function addProdutosClientes(){
        if(isValidaQtdProduto()){
            produtos.map(async (produto)=>{
                if(produto.cont > 0){
                    let key = firebase.database().ref('produtosVendidos').push().key
        
                    await firebase.database().ref('produtosVendidos').child(cliente.key).child(key).set({
                        nome: produto.nome,
                        qtd: produto.cont,
                        data: new Date().toLocaleDateString()
                    })

                }
            })
            await firebase.database().ref('clientes').child(cliente.key).update({
                totalCompras: parseInt(cliente.totalCompras) + parseFloat(getTotal()),
                //totalPago: parseInt(cliente.totalPago) + parseFloat(getTotal()),
            })
            alert('Produtos Cadastrados com Sucesso!')
            setModalAddProdutosVisible(false)
            zerarQtdProdutos()
        }else{
            alert('ERROR!!! \nVocê Precisa adicionar um produto!')
        }
        
    }
    function incrementarProduto(item){
        setProdutos(produtos.map(produto =>{
          if(item.key == produto.key){
            produto.cont++
          }
          return produto
        }))
      }
    function getTotal(){
         return produtos.reduce((total,produto)=>{
          total+= (produto.valor * produto.cont)
          return total
        },0)
      }

    function decrementarProduto(item){
        setProdutos(produtos.map(produto =>{
            if((item.key == produto.key) && (produto.cont!=0)){
              produto.cont--
            }
            return produto
          }))
    }
   
    return(
        <View style={styles.container}>
            
            <Text style={styles.txtHeader}>Cliente: {cliente.nome}</Text>
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Listar Produtos Comprados</Text>
                <TouchableOpacity onPress={()=>setModalAddProdutosVisible(true)}>
                    {<Ionicons name="add-circle-sharp" size={35}/>}
                </TouchableOpacity>
            </View>
            

            <FlatList
                key = {item => item.key}
                data= {produtosCliente}
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
                    <View style={styles.viewCardListProdutosComprados}>
                        {
                            (item.divida == null)&&(
                                <Text style={styles.txtDescProduto}>Nome: {item.nome}</Text>
                            )
                        }
                        {
                            (item.divida == null)&&(
                                <Text style={styles.txtDescProduto}>Quantidade: {item.qtd}</Text>
                            )
                        }
                        {
                            (item.divida == null)&&(
                                <Text style={styles.txtDescProduto}>Data: {item.data}</Text>
                            )
                        }
                        {
                            (item.divida != null)&&(
                                <Text style={[styles.txtDescProduto,{color: '#007111', fontWeight: 'bold'}]}>{item.divida}</Text>
                            )
                        }
                        {
                            (item.divida != null)&&(
                                <Text style={styles.txtDescProduto}>Data: {item.data}</Text>
                            )
                        }
                            
                    </View>
                    </Pressable>
                )}
                />
            {/** 
            <View style={styles.viewFooter}>
                <Text style={styles.txtFooter}>Total a Pagar: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).
                    format(cliente.totalCompras-cliente.totalPago)}</Text>      
            </View>
            */}
            <Modal
                animationType = 'fade'
                visible = {modalAddProdutosVisible}
                //transparent = {true}
            >
                <View style={{flex: 1, backgroundColor: '#999',paddingTop: 10}}>
                <View style={{justifyContent: 'center' , alignItems: 'center'}}>
                    <Text style={{fontSize: 40}}>Lista de Produtos</Text>
                </View>
                <FlatList
                key = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                            <View style={styles.viewDescProduto}>
                                <Text style={styles.txtDescProduto}>Nome: {item.nome}</Text>
                                <Text style={styles.txtDescProduto}>Valor: {item.valor}</Text>
                            </View>
                            <View style={styles.viewContProduto}>
                                <TouchableOpacity onPress={()=>incrementarProduto(item)}>
                                    <Ionicons name= 'md-add-circle' size = {30}/>
                                </TouchableOpacity>
                                <Text style={{fontSize: 19,marginVertical: 3}}>{item.cont}</Text>
                                <TouchableOpacity onPress={()=>decrementarProduto(item)}>
                                    <AntDesign name= 'minuscircle' size = {25}/>
                                </TouchableOpacity>
                            </View>
                    </View>
                )}
                />
                <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity style={styles.btnCancelar} onPress={()=>setModalAddProdutosVisible(false)}>
                                {<Ionicons name="close-circle" size={60} color='#FF6347'/>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConfirmar} onPress={()=>addProdutosClientes()}>
                                {<Ionicons name="checkmark-circle" size={60} color='#32CD32'/>}
                            </TouchableOpacity>
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
                    <Text style={styles.txtTitulo}>Alteração do Produto</Text>
                </View>
                    <View style={styles.viewInput}>   
                    <Text style={styles.tipoInput}>Nome: </Text>
                    <TextInput
                        editable = {false}
                        value = {edit.nome}
                        placeholderTextColor= '#000'
                        style={styles.input}
                    /> 
                    </View>

                    <View style={styles.viewInput}>  
                    <Text style={styles.tipoInput}>Valor: </Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={data}
                        placeholder = 'DD/MM/AAAA'
                        onChangeText={(value) => setData(value)}
                        style={styles.input}
                        ref={ (ref) => setValidaData(ref)}
                        />
                    </View>
                    <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={()=>setModalEditVisible(false)} >
                        <Text style={styles.btnModalEdit}>FECHAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>confirmarModalEdit()}>
                        <Text style={styles.btnModalEdit}>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )
}