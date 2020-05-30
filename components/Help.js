import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageTemplate from './subComponents/Header'

class Help extends Component {

  
  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }


    render(){

        return (
          <React.Fragment>
            <PageTemplate title={'Help'} logout = {this.logout}/>
            <View style={styles.container}>
              <Text>Help</Text>
            </View>
          </React.Fragment>
         
          );

    }



}


export default Help

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});