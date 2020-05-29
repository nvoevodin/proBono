import React, {Component} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';



class Help extends Component {


    state = {
        email:'',
        password:'',
        errorMessage:null,
        firstName:'',
        lastName:'',
        WorkId:''
    }


    handleSignUp = (email, password) => {

        

        if(this.state.password.length < 6){
            alert("Must be minimum 6 characters!")
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=> firebase.auth().currentUser.sendEmailVerification())
        .catch(error => this.setState({ errorMessage: error.message }))

        Alert.alert('SUCCESS!','We just emailed you a verification link.',[{text: 'OK'}],{cancelable: false},);


    }

    goBack = () => {

     this.props.navigation.navigate('StartScreen')

           
             
      }
    


    render(){

        return (
            <Container style = {styles.container}>
                <Form>
                {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

          <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input
                        autoCorrect={false}
                        onChangeText = {(firstName) => this.setState({firstName})}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input
                        secureTextEntry={false}
                        autoCorrect={false}
                        onChangeText = {(lastName) => this.setState({lastName})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Work ID</Label>
                        <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText = {(workId) => this.setState({workId})}/>
                    </Item>

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

          

                    <Button style ={{margin:10, marginTop: 40}}
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