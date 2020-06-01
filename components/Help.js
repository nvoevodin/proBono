import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PageTemplate from './subComponents/Header';
import Accordian from './subComponents/accordian'
import Layout from '../constants/Layout';

const Colors = {
  PRIMARY:'#1abc9c',
  WHITE:'#ffffff',
  GREEN:'#0da935',
  LIGHTGRAY: '#C7C7C7',
  DARKGRAY: '#5E5E5E',
  CGRAY: '#ececec',
}


class Help extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu :[
        { 
          title: "I can't make it to work, what should I do?", 
          data: 'You can document your excuse with your caseworker and do a pre-check-in at the homepage.',
        },
        { 
          title: 'My site manager says I am not on the list for work, what should I do?',
          data: 'Please contact your casemanager at REBNY immediately.'
        },
        { 
         title: 'I am not receiving payment despite showing up to work. What should I do?',
         data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
          title: 'I have another question?',
          data: 'Here is your answer.'
        },
        { 
          title: 'I have another question?',
          data: 'Here is your answer.'
        },
        { 
          title: 'I have another question?',
          data: 'Here is your answer.'
        },
      ]
     }
  }

  
  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }

    render(){
      

        return (
          <ScrollView>
          <React.Fragment>
            <PageTemplate title={'Help'} logout = {this.logout}/>
            <View style={styles.container}>
              <Text style={styles.titleText}>
                General
              </Text>
              <Text>GeoHut is used by REBNY to help workers track their time at work. If you feel that any of the information regarding your account in this app is inaccurate please contact your case manager immediately.</Text>
              <Text style={styles.titleText}>
                FAQs
              </Text>
              <View style={styles.accordianContainer}>
                {
                this.state.menu.map((item, index) => (
                  <Accordian 
                    key = {item.id} 
                    title={item.title}
                    data={item.data}
                  />
                      
                  
                ))
                }
              </View>

              <View>
                <Text style={styles.titleText}>
                  Contact Us
                </Text>
                <Text>
                A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.
                </Text>
              </View>
              
            </View>
          </React.Fragment>
          </ScrollView>
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
    width: Layout.window.width - 30,
    
    
  },
  accordianContainer: {
    flex:1,
    
    //backgroundColor:Colors.PRIMARY,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
    
    
  },
  contactUs: {
    marginBottom: 280
  }

});

