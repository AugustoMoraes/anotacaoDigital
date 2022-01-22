import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F4F7FF'
    },
    viewHeader:{
        marginVertical: 30,
        marginHorizontal: 10
    },
    txtHeader:{
        fontSize: 20, 
        color: '#242424',
        fontWeight: 'bold'
    },
    viewCardListProdutos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 7,
        elevation: 3,
        shadowOpacity: 0.9,
        opacity: 0.9
    },
    txtDescricao:{
        fontSize: 17,
        color: '#909090'
    },
    txtCard:{
        fontSize: 23,
        color: '#000'
    },
    modalView: {
        flex: 1,
        paddingTop: 45,
        //height: '50%',
        backgroundColor:'#f4f7ff'
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
    viewModalEdit:{
        flex: 1,
        justifyContent: 'flex-end'
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
    txtTipoInput:{
        fontSize: 23,
        color: '#000'
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
    btnAdd:{
        justifyContent: 'center',
        alignItems: 'center',
        //position: 'absolute'
    }, 
})