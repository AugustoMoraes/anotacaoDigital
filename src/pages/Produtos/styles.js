import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    viewHeader:{
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    txtHeader:{
        fontSize: 25, 
        color: '#000'
    },
    viewCardListProdutos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 7
    },
    txtCard:{
        fontSize: 18,
        color: '#000'
    },
    modalView: {
        backgroundColor: "#292929",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
        width: '100%',
    },
    viewModalEdit:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    headerModalEdit:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtHeaderModalEdit:{
        fontSize: 25,
        color: '#fff'
    },
    inputPedido:{
        backgroundColor: '#FFF',
        borderRadius: 7,
        padding: 5,
        marginBottom:7,
        fontSize: 25
    },
    btnCancelar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 40,
        backgroundColor: '#FFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnConfirmar:{
        marginTop: 10, 
        marginBottom: 5,
        height: 40,
        backgroundColor: '#FFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    txtPedido:{
        fontSize: 25,
        color: '#000'
    }
})