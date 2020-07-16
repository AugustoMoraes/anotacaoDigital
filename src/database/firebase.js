import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyCxvzvteiFBy7xC8xhjp0twFgQ3ex31kyw",
  authDomain: "anotacaodigital-616e7.firebaseapp.com",
  databaseURL: "https://anotacaodigital-616e7.firebaseio.com",
  projectId: "anotacaodigital-616e7",
  storageBucket: "anotacaodigital-616e7.appspot.com",
  messagingSenderId: "670056731435",
  appId: "1:670056731435:web:f744254ff51ab3f6ab2b6e",
  measurementId: "G-KVW7PHQ900"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase