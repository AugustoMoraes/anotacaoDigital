import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,TouchableOpacity, Modal} from 'react-native'
import firebase from '../../database/firebase'
import styles from './styles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
Ionicons.loadFont()
AntDesign.loadFont()

export default function ListDividaCliente({route}){
    const cliente = route.params.item
    const [produtos, setProdutos] = useState([])
    const [produtosCliente, setProdutosCliente] = useState([])
    const [modalAddProdutosVisible, setModalAddProdutosVisible] = useState(false)

    async function loadingProdutos(){
        await firebase.database().ref('produtos').on('value' , (snapshot)=>{
            setProdutos([])
            snapshot.forEach( (childItem) =>{
                let list = {
                    key: childItem.key,
                    nome: childItem.val().nome,
                    valor: childItem.val().valor,
                    cont: childItem.val().cont
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
        produtos.map((produto)=>{
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
    async function addProdutosClientes(){
        if(isValidaQtdProduto()){
            produtos.map(async (produto)=>{
                if(produto.cont > 0){
                    //saldo += (produto.cont * produto.valor)  
                    let key = firebase.database().ref('produtosVendidos').push().key
        
                    await firebase.database().ref('produtosVendidos').child(cliente.key).child(key).set({
                        nome: produto.nome,
                        qtd: produto.cont,
                    })

                }
            })
            
            await firebase.database().ref('clientes').child(cliente.key).update({
                saldo: parseInt(cliente.saldo) + parseFloat(getTotal())
            })
            alert('Produtos Cadastrados com Sucesso!')
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
                    <View style={styles.viewCardListProdutosComprados}>
                            <Text style={styles.txtDescProduto}>Nome: {item.nome}</Text>
                            <Text style={styles.txtDescProduto}>Quantidade: {item.qtd}</Text>
                    </View>
                )}
                />

            <View style={styles.viewFooter}>
                <Text style={styles.txtFooter}>Total a Pagar: {cliente.saldo}</Text>      
            </View>
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
                                    <Ionicons name= 'md-add-circle' size = {25}/>
                                </TouchableOpacity>
                                <Text style={{fontSize: 17,marginVertical: 3}}>{item.cont}</Text>
                                <TouchableOpacity onPress={()=>decrementarProduto(item)}>
                                    <AntDesign name= 'minuscircle' size = {20}/>
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
        </View>
    )
}