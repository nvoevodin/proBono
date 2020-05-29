import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
//import {Button} from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

class Home extends Component {

  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }


    render(){

        return (
            <View style={styles.container}>
              <TouchableOpacity 
              style={{position: 'absolute',right: 20,top: 60}}
              onPress={this.logout}>
                <Text 
                style ={{color:'black', fontSize: 20}}>
                  Logout
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:150,
       height:150,
       backgroundColor:'#fff',
       borderRadius:100,
     }}
 >
   <Entypo name="location" size={40} color="black" />
 </TouchableOpacity>
            </View>
          );

    }



}


export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout:{
    
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: -5,
      //position: 'absolute', // add if dont work with above
    
  }
});