import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f4f7ff',
    },
    viewHeader:{
        //height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 4
    },
    txtHeader:{
        fontSize: 27,
        color: '#000'
    },
    viewTotalReceber:{
        marginTop:7,
        borderRadius: 4,
        padding: 5
    },
    txtDesc:{
        fontSize: 23,
        color: '#242424',
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    cardReceber:{
        marginTop: 7,
        paddingVertical: 30,
        width: '50%', 
        backgroundColor: '#647AFF' && '#39DEF1',
        borderRadius: 15,
        marginHorizontal: 17
        
    },
    txtValorReceber:{
        color: '#fff',
        fontSize: 26,
        marginLeft: 10
    },
    txtCliente:{
        fontSize:17,
        color: '#909090',
        fontWeight: 'bold'
    },
    txtNome:{
        fontSize: 30,
        color: '#242424',
        //fontFamily: 'Poppins'
    },
    txtDescricao:{
        fontSize: 17,
        color: '#909090'
    },
    viewInput:{
        marginVertical:25,
        marginHorizontal: 7,
        padding: 5,
    },
    txtTipoInput:{
        fontSize: 23,
        color: '#000'
    },
    input:{
        marginVertical:5,
        marginBottom: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        color: '#000',
        backgroundColor: '#f2f2f2'
    },
    viewBotao:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //marginTop: 30
    },
    btn:{
        backgroundColor: '#AEAEAE',
        fontSize: 23,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
        color: '#FFF',
    },
    viewCard:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 7,
        elevation: 3,
        shadowOpacity: 0.9,
        opacity: 0.9
        
    },
    viewBotaoCard:{
        marginVertical: -10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtBtnCard:{
        fontSize: 17,
        color: '#000'
    },
    txt:{
        fontSize: 20
    },
    viewModal:{
        flex: 1,
        paddingTop: 45,
        //height: '50%',
        backgroundColor:'#f4f7ff'
    },
    viewTitulo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    txtTitulo:{
        marginVertical: 18,
        color: '#909090',
        fontSize: 27
    },
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
    logBox: {
        //padding: 20,
        margin: 10,
        //borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
      },
     viewTab:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
     },
     viewBtn:{
        width: '40%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomLeftRadius: -60
    },
    viewBtnAdd:{
       width: 60,
       height: 60,
       borderRadius: 30,
       backgroundColor: '#3eccf5',
       justifyContent: 'center',
       alignItems: 'center',
       position: 'relative',
       marginTop: -30,
       //borderBottomLeftRadius: 50,
    },
     viewDivida:{
        backgroundColor: "#6ECB96",
        //opacity: 0.85,
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        borderRadius: 5
     },
     txtDivida:{
         fontSize: 20,
         color:  '#fff'
     },
})