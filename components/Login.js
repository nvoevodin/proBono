import React, {Component} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';
import ForgotPassword from './subComponents/forgotPassword'


import { connect } from 'react-redux';


class Help extends Component {


    state = {
      firstName:'',
      lastName:'',
      workId:'',
      email:null,
      password:'',
      errorMessage: null,
      modalVisible: false,
      data: null
    }

    showModal =() => {
      this.setState({ modalVisible : !this.state.modalVisible })
    }
  
    handleLogin = (email, password) => {
      //if(firebase.auth().currentUser.emailVerified){
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
    
      this.saveUserEmail(email);
      this.saveUserData(email, '12345'); //for now hardcoded
      //} else {
      //this.setState({ errorMessage: 'Please, register or verify your account!' })
      //}        
    }

      //sends email to redux store
      saveUserEmail = (email) => {
        console.log('setting email as: ',email);
        this.props.setEmailData(email);
      }

      saveUserData = (email,workId) => {
        let data = {
                      'email': email,
                      'workId': workId
                    };
        console.log('setting user data as ...', data);
        this.props.setUserData(data);
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

                    <Button style ={{margin:10}}
                    full
                    rounded
                    danger
                    onPress={this.showModal}>

                        <Text style = {{color:'white'}}>Forgot Password</Text>
                    </Button>

                    {this.state.modalVisible && ( 
                  <ForgotPassword 
                    modalVisible = {this.state.modalVisible}
                    showModal = {this.showModal}
                    //forgotPassword={this.forgotPassword}
                  />)}


                </Form>
            </Container>
          );

    }



}

const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};

const mapDispachToProps = dispatch => {
  return {
    setEmailData: (y) => dispatch({ type: "SET_EMAIL_DATA", value: y}),
    setUserData: (y) => dispatch({ type: "SET_USER_DATA", value: y})
  };
};


export default connect(mapStateToProps,
  mapDispachToProps
  )(Help);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 40
  },
});