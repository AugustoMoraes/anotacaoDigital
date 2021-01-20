import firebase from 'firebase/app'
import 'firebase/database'

/**
var firebaseConfig = { //Banco de Dados Teste
  apiKey: "AIzaSyC4gMIGQr9q__vnY05hbXsU5_64HcgrVJ4",
  authDomain: "anotacaodigitalteste.firebaseapp.com",
  databaseURL: "https://anotacaodigitalteste.firebaseio.com",
  projectId: "anotacaodigitalteste",
  storageBucket: "anotacaodigitalteste.appspot.com",
  messagingSenderId: "1040302330708",
  appId: "1:1040302330708:web:1043633ab1ff07d3286ec1",
  measurementId: "G-T6W9D45B4S"
};//Banco de Dados Teste

*/

 
var firebaseConfig = { // Banco de Dados Edivaldo (Cigarreiro)
  apiKey: "AIzaSyCxvzvteiFBy7xC8xhjp0twFgQ3ex31kyw",
  authDomain: "anotacaodigital-616e7.firebaseapp.com",
  databaseURL: "https://anotacaodigital-616e7.firebaseio.com",
  projectId: "anotacaodigital-616e7",
  storageBucket: "anotacaodigital-616e7.appspot.com",
  messagingSenderId: "670056731435",
  appId: "1:670056731435:web:f744254ff51ab3f6ab2b6e",
  measurementId: "G-KVW7PHQ900"
}; // Banco de Dados Edivaldo (Cigarreiro)


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase