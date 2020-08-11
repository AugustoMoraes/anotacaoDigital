import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#999'
    },  
    viewHeader:{
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    txtHeader:{
       fontSize: 25,
       color: '#fff'
    },
    viewCard:{
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 7,
        padding: 5,
        borderRadius: 7
    },
    txtCard:{
        fontSize: 16,
        marginBottom: 5,
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
    viewModal:{
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
    input:{
        color: '#fff',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 7,
        borderRadius: 7,
        paddingVertical: 0,
        fontSize: 20
    },
    tipoInput:{
        fontSize: 20,
        color: '#fff',
    },
    //Teste Pressable
    wrapperCustom: {
        marginVertical: 5,
        marginHorizontal: 7,
        //padding: 5,
        borderRadius: 7
    },
    
})