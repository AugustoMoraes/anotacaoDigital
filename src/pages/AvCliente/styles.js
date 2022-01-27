import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f4f7ff'
    },  
    viewHeader:{
        marginVertical: 25,
        marginHorizontal: 10
    },
    txtHeader:{
       fontSize: 25,
       color: '#000'
    },
    viewClose:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
    },
    txtDebito:{
        fontSize: 27,
        color: '#242424'
    },
    viewValorDebito:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    txtValorDebito:{
        fontSize: 32,
        color: '#00CCC0' && '#13B1FB',
        marginTop: 5,
        alignItems: 'center' 
    },
    viewCliente:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtCliente:{
        fontSize: 22,
        color: '#909090'
    },
    viewHistorico:{
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 18
    },
    txtHistorico:{
        fontSize: 25,
        color: '#242424'
    },
    viewDeleteDividas:{
        backgroundColor: '#39DCF2' && '#38F2E8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        opacity: 0.97
    },
    btnDeleteDividas:{
        padding: 5,
    },
    txtDeleteDividas:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    viewCard:{
        backgroundColor: '#fff',
        elevation: 3,
        shadowOpacity: 7,
        //marginVertical: 5,
        //marginHorizontal: 7,
        padding: 7,
        borderRadius: 7
    },
    txtDesc:{
        fontSize: 25,
        color: '#242424'
    },
    txtValueDesc:{
        fontSize: 17,
        marginBottom: 5,
        color: '#909090'
    },
    viewFooter:{
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingHorizontal: 7
    },
    txtFooter:{
        fontSize: 25,
        color: '#000'
    },
    viewTitulo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    txtTitulo:{
        color: '#242424',
        fontSize: 27,
    },
    viewModal:{
        backgroundColor: '#fff',
    },
    viewInput:{
        flexDirection: 'row',
        //alignItems: 'center',
        borderColor: '#FFF',
        marginHorizontal: 5,
    },
    input:{
        color: '#909090',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#242424',
        marginBottom: 7,
        borderRadius: 7,
        paddingVertical: 0,
        fontSize: 25
    },
    txtTipoInput:{
        fontSize: 25,
        color: '#242424',
        marginHorizontal: 15
    },
    viewBtn:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems:'center',
        marginTop: 35
    },
    btn:{
        backgroundColor: '#37DCF2',
        padding: 10,
        color: '#fff',
        fontSize: 19,
        borderRadius: 7
    },
    //Teste Pressable
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
    viewDividaPaga:{
        flexDirection: 'row',
        backgroundColor: '#E1F5EA',
        //justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderRadius: 7,
        marginTop: 7,
        alignItems: 'center'
    },
    txtPago:{
        fontSize: 15,
        color: '#40C379'
    },
})