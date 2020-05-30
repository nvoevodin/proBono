import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
//import {Button} from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
const moment = require('moment');


class Home extends Component {

  uid = firebase.auth().currentUser.uid;

  state = {
    firstName:'',
    lastName:'',
    workId:''
  }


  componentDidMount() {

    this.readUserData()

  }





  readUserData() {
    firebase.database().ref('UsersList/'+ this.uid + '/info').once('value', snapshot => {
    console.log('user data:',snapshot.val());    
    let data = snapshot.val()//[this.uid]

        //console.log('our data: ',data);
        this.setState({ firstName: data.firstName,
                        lastName: data.lastName,
                        workId: data.workId});
       
        

    })
    
  }





  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }

  handleButton = () =>{
    fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `http://192.168.2.7:3002/add?time=${moment().utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0'
      }&site_id=${"B10002"}&first_name=${this.state.firstName}&last_name=${this.state.lastName}&user_id=${this.state.workId}`,
      { method: "POST" }
    ).catch(err => console.error(err));

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
    onPress = {this.handleButton}
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