import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Help extends Component {


    render(){

        return (
            <View style={styles.container}>
              <Text>Help</Text>
            </View>
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