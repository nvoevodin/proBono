import React, {Component} from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';
import * as Animatable from "react-native-animatable";
import { Entypo } from '@expo/vector-icons'; 


class Help extends Component {


    state = {
        email:'',
        password:''
    }

    componentDidMount() {
      
      firebase.auth().onAuthStateChanged(user => {
       //console.log(user)
        // user ? this.registerForPushNotificationsAsync(user) : '',
        // 
        if (user) {
          this.props.navigation.navigate(user.emailVerified == true ? 'Home' : 'StartScreen' )
          console.log(firebase.auth().currentUser.email)
        } 
        
        // Expo.Notifications.addListener(this.listen)
      })
    }



    handleLogin = () => {

    this.props.navigation.navigate('Login')
     
      }

    handleSignUp = () => {

    this.props.navigation.navigate('SignUp')

    }
    


    render(){

        return (
            <Container >
                <Animatable.View animation="bounceInDown" style = {styles.container1}>
<Image source={require('../assets/splash.png')} style = {{width: 160, height: 270}}/> 
              {/* <Entypo  name="location-pin" size={230} color="#eb6e3d" /> */}
              <Text style = {{fontSize:50, fontWeight:'bold'}}>GeoHut</Text>
                {/* <Animatable.Image animation="bounceInDown"
                style = {styles.tinyLogo}
                source={require('../assets/donkey.png')}/> */}

</Animatable.View>

<View style = {styles.container}> 
                <Form>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    success
                    onPress={this.handleLogin}>

                        <Text style = {{color:'white'}}>Login</Text>
                    </Button>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    primary
                    onPress={this.handleSignUp}>

                        <Text style = {{color:'white'}}>Registration</Text>
                    </Button>

                </Form>

                </View>

                <View style = {styles.container3}>

              
              <Text style = {{fontSize:15, fontWeight:'bold'}}>by</Text>
                <Animatable.Image animation="bounceInUp"
                style = {styles.tinyLogo}
                source={require('../assets/companyLogo.png')}/>

</View>
            </Container>
          );

    }



}


export default Help

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
    paddingTop: 10,
    
    paddingRight: 40,
    paddingLeft:40,
    marginTop: 40
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  container3: {
  
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  tinyLogo: {
    
    width:'40%',
    height: '22%'

    
  }
});