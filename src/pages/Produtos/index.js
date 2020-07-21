import React, {useEffect,useState} from 'react'
import firebase from '../../database/firebase'
import styles from './styles'
import {View, Text, FlatList, TouchableOpacity, Modal,TextInput,Keyboard} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
Ionicons.loadFont()
Entypo.loadFont()
export default function Produtos(){
    const [produtos,setProdutos] = useState([])
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    
    useEffect(()=>{
        async function loadingProdutos(){
            await firebase.database().ref('produtos').on('value' , (snapshot)=>{
                setProdutos([])
                snapshot.forEach( (childItem) =>{
                    let list = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        valor: childItem.val().valor,      
                    }
                    setProdutos(oldArray => [...oldArray, list])
                })
            })
        }
        loadingProdutos()
    },[])
   
    function zerarForm(){
        setNome('')
        setValor('')
    }
    function addProduto(){
        setModalAddVisible(true)
        //alert('OK')
    }
    function cancelar(){
        setModalAddVisible(false)
        zerarForm()
    }
    async function confirmar(){
        let key = firebase.database().ref('produtos').push().key
        await firebase.database().ref('produtos').child(key).set({
            nome: nome,
            valor: valor,
            cont: "0"
        })
        setValor('')
        alert('Produto Cadastrado com Sucesso!')
        setModalAddVisible(false)
    }
    function cancelarEdit(){
        setModalEditVisible(false)
        zerarForm()
    }
    async function confirmarEdit(){
        alert('Confirmar')
        /** 
        let key = firebase.database().ref('produtos').push().key
        await firebase.database().ref('produtos').child(key).set({
            nome: nome,
            valor: parseFloat(valor)
        })
        setValor('')
        alert('Produto Cadastrado com Sucesso!')
        setModalAddVisible(false)
        */
    }
    function editProduto({item}){
        setModalEditVisible(true)
        //alert('editar Produto')
    }
    async function deleteProduto({item}){
        await firebase.database().ref('produtos').child(item.key).remove()
        alert('Produto Deletado Com Sucesso!')
    }
    

    return(
        <View style={styles.container}>
            
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Nome da Empresa</Text>
                <TouchableOpacity onPress={()=>addProduto()}>
                    {<Ionicons name="add-circle-sharp" size={30}/>}
                </TouchableOpacity>
            </View>
             
            <FlatList
                keyExtractor = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                        <View>
                            <Text>Nome: {item.nome}</Text>
                            <Text>Valor: {item.valor}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>editProduto({item})}>
                                {<Entypo name="edit" size={20}/>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>deleteProduto({item})}>
                                {<Ionicons name="close-circle" size={20}/>}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        <Modal
            animationType="slide"
            visible={modalAddVisible}
            transparent= {true}
        >
          <View style={{flex: 1}}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputPedido}
              returnKeyType = 'next'
              placeholder= "Nome do Produto"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <TextInput
                style={styles.inputPedido}
                placeholder= "Valor do produto"
                keyboardType= 'numeric'
                value={valor}
                onChangeText={(value)=>{setValor(value)}}
            />
            
            
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={cancelar}
            >
              <Text style={styles.txtPedido}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirmar}
              onPress={confirmar}
            >
              <Text style={styles.txtPedido}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>

          </View>
        </Modal>


        <Modal
            animationType="slide"
            visible={modalEditVisible}
            transparent= {true}
        >
          <View style={{flex: 1}}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputPedido}
              returnKeyType = 'next'
              placeholder= "Nome do Produto"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <TextInput
                style={styles.inputPedido}
                placeholder= "Valor R$00,00"
                keyboardType= 'numeric'
                value={valor}
                onChangeText={(value)=>{setValor(value)}}
            />
            
            
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={cancelarEdit}
            >
              <Text style={styles.txtPedido}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirmar}
              onPress={confirmarEdit}
            >
              <Text style={styles.txtPedido}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>

          </View>
        </Modal>
        </View>
    )
}