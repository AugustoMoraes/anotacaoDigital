import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },
    viewHeader:{
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#ddd'
    },
    viewModal:{
        backgroundColor: '#2d5',
        padding: 5
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
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
        marginTop: 10,
    },
    txt:{
        fontSize: 20
    }
})