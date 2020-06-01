import React, {Component} from 'react';
import { StyleSheet, Text, Alert} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';

const myIp =  '192.168.2.7' //'192.168.1.183' 


class SignUp extends Component {




    state = {
        email:'',
        password:'',
        errorMessage:null,
        firstName:'',
        lastName:'',
        workId:''
    }


         // when a user signs up they will have a record added to the user table in realtime database
         addUser = (uid,workId,firstName,lastName) => {
            // console.log(uid)
            firebase.database().ref('UsersList/' + uid + '/info/').set({
                workId,
                firstName,
                lastName
          }).then((data)=>{
              //success callback
             //console.log('data ' , data)
          }).catch((error)=>{
              //error callback
              // console.log('error ' , error)
          })
          }
    


    handleSignUp = (email, password) => {
     

      fetch(`http://${myIp}:3002/validate/${email}`)
        .then(res => res.json())
        .then(res => {
 
          if (res.data[0].id === email){

            if(this.state.password.length < 6){
                alert("Must be minimum 6 characters!")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=> firebase.auth().currentUser.sendEmailVerification())
            .then((user)=>{
               
                this.addUser(firebase.auth().currentUser.uid,
                                this.state.workId, 
                             this.state.firstName, 
                             this.state.lastName, 
                             );
                            
              })
    
            .catch(error => this.setState({ errorMessage: error.message }))
    
            Alert.alert('SUCCESS!','We just emailed you a verification link.',[{text: 'OK'}],{cancelable: false},);


          } else {
            Alert.alert('Access Denied!','You must use your employer-issued ID!',[{text: 'OK'}],{cancelable: false},);
          }
            
            
        }
        ).catch(error => Alert.alert('Access Denied!','You must use your employer-issued ID!',[{text: 'OK'}],{cancelable: false},))

        
 

        




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


export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 40
  },
});