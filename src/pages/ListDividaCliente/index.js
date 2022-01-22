import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,TouchableOpacity, Modal, Pressable, Alert, TextInput} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
Ionicons.loadFont()
AntDesign.loadFont()

export default function ListDividaCliente({route}){
    const cliente = route.params.item
    const navigation = useNavigation()
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
        await firebase.database().ref('produtosVendidos').child(cliente.key).on('value' , (snapshot)=>{
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
    return(
        <View style={styles.container}>
            
            <View style={styles.viewHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    {<AntDesign name="close" size={35} color='#000'/>}
                </TouchableOpacity>               
                <Text style={styles.txtHeader}>{cliente.nome}</Text>
            </View>
             <View style={styles.viewList}>
                <View style={styles.viewDescricao}>
                    <Text style={styles.txt}>
                        Produtos
                    </Text>
                    <Text style={styles.txtDescricao}>
                        Clique no icone no canto inferior direito para adicionar um novo produto.
                    </Text>
                   
                </View>

            <FlatList
                key = {item => item.key}
                data= {ordernarListaDate(produtosCliente)}
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
                                <Text style={[styles.txtDescProduto,{fontSize: 15}]}>Quantidade: {item.qtd}</Text>
                            )
                        }
                        {
                            (item.divida == null)&&(
                                <Text style={[styles.txtDescProduto,{fontSize: 15}]}>Data: {item.data}</Text>
                            )
                        }
                        {
                            (item.divida == null)&&(
                                <View style={styles.viewDivisao}>
                                    
                                </View>
                            )
                        }
                        <View style={styles.viewDividaPaga}>
                                {
                                    (item.divida != null)&&(
                                        <AntDesign name="checkcircle" size={43} color="#6ECB96" style={{marginVertical: 10}}/>         
                                    )
                                }
                            <View style={{flexDirection: 'column', marginLeft: 10}}>
                                <View sty>
                               
                                {
                                    (item.divida != null)&&(
                                        <Text style={styles.txtPago}>{item.divida}</Text>
                                    )
                                }
                                {
                                    (item.divida != null)&&(
                                        <Text style={styles.txtPago}>Data: {item.data}</Text>
                                    )
                                }
                                </View>
                            </View>

                        </View>    
                    </View>
                    </Pressable>
                )}
                />
                {/** 
                
                */}
                <View style={styles.viewBtnAdd}>
                    <TouchableOpacity onPress={()=>setModalAddProdutosVisible(true)}>
                            {<Ionicons name="add-circle-sharp" size={65} color='#38E1EE'/>}
                        </TouchableOpacity>
                </View>
            </View>
           
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
                <View style={styles.viewModal}>
                <View style={styles.viewModalHeader}>
                    <TouchableOpacity onPress={()=>setModalAddProdutosVisible(false)}>
                        <AntDesign name="close" size={30} color='#242424'/>
                    </TouchableOpacity>
                    <Text style={styles.txtModalHeader}>Adicionar Produto</Text>
                    <TouchableOpacity onPress={()=>addProdutosClientes()}>
                        <AntDesign name="check" size={30} color='#242424'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewList}>
                <View style={[styles.viewDescricao,{paddingVertical: 20}]}>
                    <Text style={styles.txt}>Lista de Produtos</Text>
                </View>
                <FlatList
                key = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <>
                    <View style={styles.viewCardListProdutos}>
                            <View style={styles.viewDescProduto}>
                                <Text style={styles.txtDescProduto}>{item.nome}</Text>
                                <Text style={[styles.txtDescProduto,{fontSize: 16}]}>{Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                            </View>
                            <View style={styles.viewContProduto}>
                                <TouchableOpacity onPress={()=>incrementarProduto(item)}>
                                    <Ionicons name= 'add-circle-outline' size = {30} color='#00CCC0'/>
                                </TouchableOpacity>
                                <Text style={{fontSize: 19,marginVertical: 3, color: '#000'}}>{item.cont}</Text>
                                <TouchableOpacity onPress={()=>decrementarProduto(item)}>
                                    <AntDesign name= 'minuscircleo' size = {25} color='#00CCC0'/>
                                </TouchableOpacity>
                            </View>
                    </View>
                    <View style={[styles.viewDivisao, {width: '80%'}]}>

                    </View>
                    </>
                )}
                />
                </View>
                </View>
                
            </Modal>

                    
            <Modal
                transparent = {true}
                animationType = 'slide'
                visible = {modalEditVisible}
            >
                <View style={{flex: 1,backgroundColor:'#f4f7ff', justifyContent:'flex-end'}}> 
                
                <View style={styles.viewTitulo}>
                    <Text style={styles.txtTitulo}>Editar Produto</Text>
                </View>
                <View style={styles.viewModal}> 
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
                        <Text style={[styles.btnModalEdit,{backgroundColor:'#37DCF2'}]}>CONFIRMAR</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )
}