import React, {Component} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';



class Help extends Component {


    state = {
        email:'',
        password:''
    }


    handleSignUp = (email, password) => {

        try{

        if(this.state.password.length < 6){
            alert("Must be minimum 6 characters!")
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=> firebase.auth().currentUser.sendEmailVerification())

        Alert.alert('SUCCESS!','We just emailed you a verification link.',[{text: 'OK'}],{cancelable: false},);


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
                    onPress={() => this.handleSignUp(this.state.email, this.state.password)}>

                        <Text style = {{color:'white'}}>Register</Text>
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