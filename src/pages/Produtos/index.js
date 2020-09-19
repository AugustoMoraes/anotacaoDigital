import React, {useEffect,useState} from 'react'
import firebase from '../../database/firebase'
import styles from './styles'
import {View, Text, FlatList, TouchableOpacity, Modal,TextInput,Alert} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
Ionicons.loadFont()
Entypo.loadFont()
export default function Produtos(){
    const [produtos,setProdutos] = useState([])
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [moneyField, setMoneyField] = useState('')
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    
    useEffect(()=>{
        async function loadingProdutos(){
            await firebase.database().ref('produtos').orderByChild('nome').on('value' , (snapshot)=>{
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
        console.log(`valor: ${valor}`)
        if(nome == '' || valor == ''){
          alert('preencha os campos em branco')
          return
        }
        let numberValue = returnNumber(valor)
        let key = firebase.database().ref('produtos').push().key
        await firebase.database().ref('produtos').child(key).set({
            nome: nome,
            valor: numberValue,
            cont: "0"
        })
        zerarForm()
        alert('Produto Cadastrado com Sucesso!')
        setModalAddVisible(false)
    }
    function cancelarEdit(){
        setModalEditVisible(false)
        zerarForm()
    }
    async function confirmarEdit(){
      //alert('inicio')
      console.log(`Edit.valor: ${edit.valor}`)
      console.log(`valor: ${valor}`)
      if(edit.nome == nome && edit.valor == valor){
        alert('Produto Editado com Sucesso!')
        zerarForm()
        setModalEditVisible(false)
        return
      }
      /** 
       console.log(`valor: ${valor}`)
       let numberValue = numberValue.getRawValue()
       
       console.log(`moneyField: ${numberValue}`)
       //alert(`numberValue: ${numberValue}`)
       */
      
      let numberValue = returnNumber(valor)
      console.log(`numberValue: ${numberValue}`)
      await firebase.database().ref('produtos').child(edit.key).set({
          nome: nome,
          valor: numberValue == 0.0 ? edit.valor : numberValue,
          cont: '0'
      })
        zerarForm()
        setModalEditVisible(false)
        alert('Produto Editado com Sucesso!')
    }
    function returnNumber(string){
        let numberValue = string.substring(2)
        let numberFormat = numberValue.replace(',','.')

        return parseFloat(numberFormat)

    }
    function editProduto({item}){
        //console.log(typeof(item.valor))
        setEdit(item)
        setNome(item.nome),
        //setValor(item.valor.toString())
        setValor(item.valor)
        setModalEditVisible(true)
        //alert('editar Produto')
    }
    async function deleteProduto({item}){
        Alert.alert(
            "Alerta!",
            "Você deseja deletar esse produto?",
            [
              {
                text: "CANCELAR",
              },
              { 
                text: "CONFIRMAR", onPress: async ()=>{
                await firebase.database().ref('produtos').child(item.key).remove()
                alert('Produto Deletado Com Sucesso!')
              }
              //()=> alert('Bem Vindo')
              }
            ],
            //{ cancelable: false }
          );
      
        /** 
        
        */
    }
    

    return(
        <View style={styles.container}>
            
            <View style={styles.viewHeader}>
                <Text style={styles.txtHeader}>Cadastro de Produtos</Text>
                <TouchableOpacity onPress={()=>addProduto()}>
                    {<Ionicons name="add-circle-sharp" size={35} color='#000'/>}
                </TouchableOpacity>
            </View>
             
            <FlatList
                keyExtractor = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                        <View>
                            <Text style={styles.txtCard}>Nome: {item.nome}</Text>
                            <Text style={styles.txtCard}>Valor: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>editProduto({item})}>
                                {<Entypo name="edit" size={28} color='#000'/>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>deleteProduto({item})}>
                                {<Ionicons name="close-circle" size={28} color='#000'/>}
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
          <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={styles.modalView}>
                <View style={styles.headerModalEdit}>
                  <Text style={styles.txtHeaderModalEdit}>Cadastro de Produto</Text>
                </View>
            <TextInput
              style={styles.inputPedido}
              returnKeyType = 'next'
              placeholder= "Nome do Produto"
              placeholderTextColor= '#000'
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <TextInputMask
                  style={styles.inputPedido}
                  value={valor}
                  onChangeText={(value)=>{setValor(value)}}
                  type={'money'}
                  placeholder = {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(valor)}
                  placeholderTextColor= '#000'
                  ref={ (ref) => setMoneyField(ref)} 
            />
            
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={()=>cancelar()}
            >
              <Text style={styles.txtPedido}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirmar}
              onPress={()=>confirmar()}
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
          <View style={styles.viewModalEdit}>
          <View style={styles.modalView}>
              <View style={styles.headerModalEdit}>
                  <Text style={styles.txtHeaderModalEdit}>Atualização do Produto</Text>
              </View>
            <TextInput
              style={styles.inputPedido}
              returnKeyType = 'next'
              //placeholder= "Nome do Produto"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
              <TextInputMask
                  style={styles.inputPedido}
                  value={edit.valor}
                  onChangeText={(value)=>{setValor(value)}}
                  type={'money'}
                  placeholder = {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(valor)}
                  placeholderTextColor= '#000'
                  ref={(ref) => setMoneyField(ref)} 
              />
            
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={()=>cancelarEdit()}
            >
              <Text style={styles.txtPedido}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirmar}
              onPress={()=>confirmarEdit()}
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