import React, {useEffect,useState} from 'react'
import firebase from '../../database/firebase'
import styles from './styles'
import {View, Text, FlatList, TouchableOpacity, Modal,TextInput,Alert} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import {useNavigation} from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

Ionicons.loadFont()
MaterialCommunityIcons.loadFont()
Entypo.loadFont()
AntDesign.loadFont()

export default function Produtos(){
    const [produtos,setProdutos] = useState([])
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [edit, setEdit] = useState([])
    const [moneyField, setMoneyField] = useState('')
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const navigation = useNavigation()

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
        //console.log(`valor: ${valor}`)
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
      //console.log(`Edit.valor: ${edit.valor}`)
      //console.log(`valor: ${valor}`)
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
      let numberValue
      if(isNumber(valor)){
        numberValue = valor
      }else{
        numberValue = returnNumber(valor)
      }
      //console.log(`numberValue: ${numberValue}`)
      await firebase.database().ref('produtos').child(edit.key).set({
          nome: nome,
          valor: numberValue == 0.0 ? edit.valor : numberValue,
          cont: '0'
      })
        zerarForm()
        setModalEditVisible(false)
        alert('Produto Editado com Sucesso!')
    }
    function isNumber(valor){
      return typeof valor === "number"
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
                {/** 
                <TouchableOpacity onPress={()=>addProduto()}>
                    {<Ionicons name="add-circle-sharp" size={35} color='#000'/>}
                </TouchableOpacity>
                */}
            </View>
             
            <FlatList
                keyExtractor = {item => item.key}
                data= {produtos}
                renderItem = { ({item}) => (
                    <View style={styles.viewCardListProdutos}>
                        <View>
                            <Text style={styles.txtDescricao}>Produto</Text>
                            <Text style={styles.txtCard}>{item.nome}</Text>
                            <Text style={styles.txtDescricao}>Valor: {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(item.valor)}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <View>
                            <TouchableOpacity onPress={()=>editProduto({item})}>
                                {<Entypo name="edit" size={28} color='#000'/>}
                            </TouchableOpacity>
                            </View>
                            <View>
                            <TouchableOpacity onPress={()=>deleteProduto({item})}>
                                {<Ionicons name="close-circle" size={28} color='#000'/>}
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <View style={styles.viewTab}>
                <View style={[styles.viewBtn,{borderTopRightRadius: 60}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Clientes')}>
                        <MaterialCommunityIcons name='clipboard-text' size={35} color='#242424'/> 
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBtnAdd}>
                    <TouchableOpacity onPress={()=>setModalAddVisible(true)}>
                        {/*<ButtonAdd/> */}
                        <Entypo name='plus' size={50} color='#fff'/> 
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewBtn,{borderTopLeftRadius: 60}]}>
                    <TouchableOpacity onPress={()=>{}}>
                        <AntDesign name='shoppingcart' size={35} color='#3AE2F0' /> 
                    </TouchableOpacity>
                </View>
            </View>
        <Modal
            animationType="slide"
            visible={modalAddVisible}
            transparent= {true}
        >
          <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={styles.modalView}>
                <View style={styles.viewTitulo}>
                  <Text style={styles.txtTitulo}>Cadastro de Produto</Text>
                </View>
              <View style={{flex: 1, backgroundColor: '#fff', marginTop: 30, borderTopRightRadius: 35, borderTopLeftRadius: 35}}>   
            <View style={styles.viewInput}>  
            <Text style={styles.txtTipoInput}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              returnKeyType = 'next'
              placeholder= "Nome do Produto"
              placeholderTextColor= '#999'
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <Text style={styles.txtTipoInput}>Valor do Produto</Text>
            <TextInputMask
                  style={styles.input}
                  value={valor}
                  onChangeText={(value)=>{setValor(value)}}
                  type={'money'}
                  placeholder = {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(valor)}
                  placeholderTextColor= '#999'
                  ref={ (ref) => setMoneyField(ref)} 
            />
            </View>
            <View style={styles.viewBotao}>
            <TouchableOpacity onPress={()=>cancelar()}>
              <Text style={styles.btn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>confirmar()}>
              <Text style={[styles.btn,{backgroundColor: '#37DCF2'}]}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>      
          </View>
        </Modal>


        <Modal
            animationType="slide"
            visible={modalEditVisible}
            transparent= {true}
        >
          <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={styles.modalView}>
              <View style={styles.viewTitulo}>
                  <Text style={styles.txtTitulo}>Editar Produto</Text>
              </View>
              <View style={{flex: 1, backgroundColor: '#fff', marginTop: 30, borderTopRightRadius: 35, borderTopLeftRadius: 35}}>
              <View style={styles.viewInput}>
              <Text style={styles.txtTipoInput}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              returnKeyType = 'next'
              placeholder= "Nome do Produto"
              value={nome}
              onChangeText={(value)=>{setNome(value)}}
            />
            <Text style={styles.txtTipoInput}>Valor do Produto</Text>
              <TextInputMask
                  style={styles.input}
                  value={edit.valor}
                  onChangeText={(value)=>{setValor(value)}}
                  type={'money'}
                  placeholder = {Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(valor)}
                  ref={(ref) => setMoneyField(ref)} 
              />
            </View>
            <View style={styles.viewBotao}>
            <TouchableOpacity
              onPress={()=>cancelarEdit()}
            >
              <Text style={styles.btn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={()=>confirmarEdit()}
            >
              <Text style={[styles.btn,{backgroundColor: '#37DCF2'}]}>Confirmar</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
          </View>
        </Modal>
        </View>
    )
}