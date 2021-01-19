import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },  
    viewHeader:{
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    txtHeader:{
       fontSize: 25,
       color: '#000'
    },
    viewDeleteDividas:{
        marginVertical: 7,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    btnDeleteDividas:{
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5
    },
    txtDeleteDividas:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    viewCard:{
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 7,
        padding: 5,
        borderRadius: 7
    },
    txtCard:{
        fontSize: 20,
        marginBottom: 5,
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
        color: '#000'
    },
    viewTitulo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    txtTitulo:{
        color: '#FFF',
        fontSize: 30,
    },
    viewModal:{
        backgroundColor: '#292929',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7
    },
    viewInput:{
        flexDirection: 'row',
        //alignItems: 'center',
        borderColor: '#FFF',
        marginHorizontal: 5,
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
    txtTipoInput:{
        fontSize: 25,
        color: '#fff',
        marginHorizontal: 15
    },
    viewBtn:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems:'center',
        marginVertical: 7
    },
    btn:{
        color: '#fff',
        fontSize: 23
    },
    //Teste Pressable
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
    
})