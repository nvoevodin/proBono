import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

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
                style ={{color:'blue', fontSize: 20}}>
                  Logout
                  </Text>
              </TouchableOpacity>
              <Text>Home</Text>
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