import React, {Component} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';



class Help extends Component {


    state = {
        email:'',
        password:''
    }


    handleLogin = (email, password) => {

        try{

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(function (user){
            console.log(user)
        })
        .then(this.props.navigation.navigate('Home'))

        }
        catch(error){
            console.log(error.toString())

        }

           
             
      }

      goBack = () => {

        this.props.navigation.navigate('StartScreen')
   
              
                
         }
    


    render(){

        return (
            <Container style = {styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText = {(email) => this.setState({email})}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText = {(password) => this.setState({password})}/>
                    </Item>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    success
                    onPress={() => this.handleLogin(this.state.email, this.state.password)}>

                        <Text style = {{color:'white'}}>Login</Text>
                    </Button>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    primary
                    onPress={this.goBack}>

                        <Text style = {{color:'white'}}>Go Back</Text>
                    </Button>

                </Form>
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
});