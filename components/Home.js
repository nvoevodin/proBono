import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Home extends Component {


    render(){

        return (
            <View style={styles.container}>
              <Text>Home</Text>
            </View>
          );

    }



}


export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});