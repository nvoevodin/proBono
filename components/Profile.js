import React, {Component} from 'react';
import { StyleSheet, Text} from 'react-native';
import { Container, Button, Content, Card, CardItem, Body } from "native-base";
import * as firebase from 'firebase';

import PageTemplate from './subComponents/Header'


class Profile extends Component {


  tempAlert1 = () =>{
alert('Change your info here (placeholder)')
  }
  tempAlert2 = () =>{
    alert('(placeholder)')
      }


  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }


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


    render(){

        return (
          <React.Fragment>
          <PageTemplate title={'Profile'} logout = {this.logout}/>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>{this.state.workId}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    First Name: {this.state.firstName}
                  </Text>
                  <Text>
                    Last Name: {this.state.lastName}
                  </Text>
                  <Text>
                    Some Stat: 7
                  </Text>
                  <Text>
                    Some Stat: 464
                  </Text>
                </Body>
              </CardItem>
              
            </Card>

            <Button style ={{margin:10, marginTop: 40}}
                    full
                    rounded
                    primary
                    onPress={this.tempAlert1}>

                        <Text style = {{color:'white'}}>Change Info</Text>
                    </Button>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    primary
                    onPress={this.tempAlert2}>
                             <Text style = {{color:'white'}}>Something</Text>
                    </Button>
          </Content>
        </React.Fragment>
          );

    }



}


export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:40
  },
});