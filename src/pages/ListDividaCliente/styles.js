import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f4f7ff'
    },
    viewHeader:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginVertical: 35,
        paddingHorizontal: 10,
        //backgroundColor: '#fff',
        
        width: '60%',
    },
    txtHeader:{
        fontSize: 25,
        color: '#000',
        //alignContent: 'center'
        //alignContent: 'center',
    },
    viewDescricao:{
        width: '70%',
        marginHorizontal: 15,
    },
    txt:{
        fontSize:23,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5
    },  
    viewList:{
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10,
        backgroundColor:'#fff'
    },
    viewCardListProdutosComprados:{
        marginVertical: 5,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 7,
        //paddingBottom: 3,
    },
    viewDivisao:{
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: '#909090',
        //paddingTop: 3
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
    txtDescricao:{
        marginBottom: 5
    },
    txtDescProduto:{
        fontSize: 20,
        color: '#000'
    },
    viewDescProduto:{
        justifyContent: "space-around"
    },
    viewContProduto:{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%',

    },
    viewDividaPaga:{
        flexDirection: 'row',
        backgroundColor: '#E1F5EA',
        //justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center'
    },
    txtPago:{
        fontSize: 15,
        color: '#40C379'
    },
    txtDescPago:{
        fontSize: 13,
        color: '#000'
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
        flex: 1,
        paddingTop: 10,
        //marginTop: 40,
        backgroundColor:'#fff',
        borderTopRightRadius: 35, 
        borderTopLeftRadius: 35
    },
    viewModalHeader:{
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    txtModalHeader:{
        fontSize: 27,
        color: '#909090'
    },
    viewInput:{
        marginVertical:10,
        marginHorizontal: 7,
        padding: 5,
    },
    viewTitulo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        backgroundColor: '#f4f7ff'
    },
    txtTitulo:{
        marginVertical: 18,
        color: '#909090',
        fontSize: 27
    },
    input:{
        marginVertical:5,
        //marginBottom: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        color: '#000',
        backgroundColor: '#f2f2f2'
    },
    tipoInput:{
        fontSize: 23,
        color: '#000'
    },
    viewBtnAdd:{
        alignItems: 'flex-end',
        marginHorizontal: 16,
        backgroundColor: '#fff',
    },
    viewBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    btnModalEdit:{
        backgroundColor: '#AEAEAE',
        fontSize: 20,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
        color: '#FFF',
    },
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
})