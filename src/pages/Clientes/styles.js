import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
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
        backgroundColor: '#fff',
        marginTop:5,
        borderRadius: 4,
        padding: 5
    },
    txtTotalReceber:{
        fontSize: 25,
        color: '#000'
    },
    txtDescricao:{
        fontSize: 17,
        color: '#000'
    },
    viewModal:{
        flex: 1,
        backgroundColor: '#2d5',
        padding: 5,
    },
    viewInput:{
        marginVertical:5,
        marginHorizontal: 7,
        padding: 5,
    },
    input:{
        marginVertical:5,
        fontSize: 25,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 7,
        color: '#fff'
    },
    viewBotao:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
    },
    btn:{
        backgroundColor: '#fff',
        fontSize: 25,
        padding: 5,
        borderRadius: 7,
        color: '#000'
    },
    viewCard:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 7
    },
    viewBotaoCard:{
        marginVertical: -10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtBtnCard:{
        fontSize: 22,
        color: '#000'
    },
    txt:{
        fontSize: 20
    },
    viewModal:{
        flex: 1,
        //height: '50%',
        backgroundColor:'#292929'
    },
    viewTitulo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    txtTitulo:{
        color: '#FFF',
        fontSize: 30
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
      }
})