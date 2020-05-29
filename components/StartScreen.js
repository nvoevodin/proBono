import React, {Component} from 'react';
import { StyleSheet, Text, View , Alert,Image} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';



class Help extends Component {


    state = {
        email:'',
        password:''
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
                <View style = {styles.container1}>

                <Image
                style = {styles.tinyLogo}
                source={require('../assets/donkey.png')}/>

</View>

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
    
    padding: 40
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 250,
    
    height: 250

    
  }
});