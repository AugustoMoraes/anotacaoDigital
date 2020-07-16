import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    viewCardListProdutos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    viewHeader:{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    txtHeader:{
        fontSize: 20, 
        color: '#fff'
    },
    modalView: {
        backgroundColor: "#8A2BE2",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
        height: '100%'
    },
    inputPedido:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 5,
        marginBottom:10
    },
    btnCancelar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 40,
        backgroundColor: '#DC143C',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnConfirmar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 40,
        backgroundColor: '#008000',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
})