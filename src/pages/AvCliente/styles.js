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
    viewModal:{
        flex: 1,
        backgroundColor: '#d4a'
    },

    //Teste Pressable
    text: {
        fontSize: 16
      },
      wrapperCustom: {
        borderRadius: 8,
        padding: 6
      },
      logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
      }
      
})