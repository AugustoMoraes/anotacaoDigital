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
    },
    txtDescricao:{
        fontSize: 17
    },
    viewModal:{
        flex: 1,
        backgroundColor: '#2d5',
        padding: 5,
    },
    viewInput:{
        marginVertical:5,
        padding: 5,
    },
    input:{
        marginVertical:5,
        fontSize: 20,
    },
    viewBotao:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btn:{
        backgroundColor: '#fff',
        fontSize: 20,
        padding: 5,
        borderRadius: 7
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
    },
    txt:{
        fontSize: 20
    },
    viewModalAv:{
        height: '50%',
        backgroundColor:'#2d5'
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