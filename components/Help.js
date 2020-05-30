import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageTemplate from './subComponents/Header'

class Help extends Component {

  


    render(){

        return (
          <React.Fragment>
            <PageTemplate title={'Help'}/>
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