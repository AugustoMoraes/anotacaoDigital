import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    viewHeader:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        width: '100%',
    },
    txtHeader:{
        fontSize: 25,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    viewCardListProdutosComprados:{
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 7,
    },
    viewCardListProdutos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 7,
        //paddingBottom: 10,
    },
    txtDescProduto:{
        fontSize: 17,
        paddingBottom: 5
    },
    viewDescProduto:{
        justifyContent: "space-around"
    },
    viewContProduto:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewFooter:{
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingHorizontal: 7
    },
    txtFooter:{
        fontSize: 25,
    },
    /**
    btnCancelar:{
        backgroundColor:'#FF6347',
        padding: 5,
        borderRadius: 7,
        marginVertical: 5
    },
     
    btnConfirmar:{
        backgroundColor:'#32CD32',
        padding: 5,
        borderRadius: 7,
        marginVertical: 5
    },
    */
    txtBtn:{
        fontSize: 17,
    },

})