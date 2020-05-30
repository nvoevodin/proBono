import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
//import {Button} from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
const moment = require('moment');

import PageTemplate from './subComponents/Header'

class Home extends Component {

  
  uid = firebase.auth().currentUser.uid;
  

  state = {
    firstName:'',
    lastName:'',
    workId:'',
    submitted:false
  }


  componentDidMount() {

    

    this.readUserData()

  }



  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
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





  handleButton = () =>{
    fetch(
      // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
      `http://192.168.2.7:3002/add?time=${moment().utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0'
      }&site_id=${"B10002"}&first_name=${this.state.firstName}&last_name=${this.state.lastName}&user_id=${this.state.workId}`,
      { method: "POST" }
    ).catch(err => console.error(err));

    this.setState({submitted:true})

  }


    render(){

        return (
          <React.Fragment>
            <PageTemplate title={'Home'} logout = {this.logout}/>
            <View style={styles.container}>
              
              <TouchableOpacity 
              style={{position: 'absolute',right: 20,top: 60}}
              onPress={this.logout}>
      
              </TouchableOpacity>
              <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:170,
       height:170,
       backgroundColor: this.state.submitted == false ? '#eb6e3d' : 'green',
       borderRadius:100,
       shadowColor: 'rgba(0,0,0, .4)', // IOS
       shadowOffset: { height: 1, width: 1 }, // IOS
       shadowOpacity: 1, // IOS
       shadowRadius: 1, //IOS
       elevation: 5, // Android
     }}
    onPress = {this.handleButton}
 >
   {this.state.submitted == false ? <Entypo name= "location" size={60} color="white" /> : <Entypo name="check" size={70} color="white" />}
 </TouchableOpacity>
            </View>
            </React.Fragment>
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