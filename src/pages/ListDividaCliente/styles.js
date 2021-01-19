import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    viewHeader:{
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginVertical: 7,
        backgroundColor: '#fff',
        borderRadius: 7,
        width: '100%',
    },
    txtHeader:{
        fontSize: 25,
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    viewCardListProdutosComprados:{
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 7,
        padding: 5,
        borderRadius: 7
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
        paddingBottom: 5,
        color: '#000'
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
    txtBtn:{
        fontSize: 17,
    },
    viewModal:{
        //flex: 1,
        backgroundColor: '#292929',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7
    },
    viewInput:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        marginHorizontal: 5,
    },
    viewTitulo:{
        margin: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitulo:{
        color: '#fff',
        fontSize: 25
    },
    input:{
        color: '#fff',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 7,
        borderRadius: 7,
        paddingVertical: 0,
        fontSize: 25
    },
    tipoInput:{
        fontSize: 20,
        color: '#fff',
    },
    viewBtn:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems:'center',
        marginVertical: 15,
    },
    btnModalEdit:{
        fontSize: 23,
        //paddingHorizontal: 10,
        color: '#fff'
    },
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
})