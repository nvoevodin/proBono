import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

class Help extends Component {


    handleLogin = () => {

    
           this.props.navigation.navigate('Home')
             

     
      }
    


    render(){

        return (
            <Container style = {styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                        autoCorrect={false}
                        autoCapitalize='none'/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize='none'/>
                    </Item>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    success
                    onPress={this.handleLogin}>

                        <Text>Login</Text>
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
    padding: 10
  },
});