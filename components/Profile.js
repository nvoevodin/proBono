import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import * as firebase from 'firebase';

import PageTemplate from './subComponents/Header'


class Profile extends Component {


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
          <PageTemplate title={'Profile'}/>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>{this.state.firstName + ' ' + this.state.lastName}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    NativeBase is a free and open source framework that enable
                    developers to build
                    high-quality mobile apps using React Native iOS and Android
                    apps
                    with a fusion of ES6.
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer bordered>
                <Text>GeekyAnts</Text>
              </CardItem>
            </Card>
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
  },
});