import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Linking } from 'react-native'
import PageTemplate from './subComponents/Header';
import Accordian from './subComponents/accordian'
import Layout from '../constants/Layout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 

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
          data: 'Please contact your casemanager at REBNY immediately for assistance with this issue.'
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
        }
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
          
          <React.Fragment>
            <PageTemplate title={'Help'} logout = {this.logout}/>
            <View style={styles.container}>
              <Text style={styles.titleText}>
                General
              </Text>
              <Text
                style={styles.generalText}
              >GeoHut is used by REBNY to help workers track their time at work. If you feel that any of the information regarding your account in this app is inaccurate please contact your case manager immediately.</Text>
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

              

              {/** PORTION DEALING WITH CONTACT*/}
              <View>
                <Text 
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop: '5%',
                    marginLeft: 130
                  }}
                >
                  Contact Us
                </Text>
                <Text
                  style={styles.generalText}
                >
                  If you are unable to resolve your issue using the information on this page please send an email to the following.
                </Text>

                
                {/** FIRST CONTACT*/}
                <View style={styles.linkContainer}>
                  <Text>
                    Issues with your case: 
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')}
                  >
                    <Ionicons name="ios-mail" size={30} color="black" />
                  </TouchableOpacity>
                  
                </View>
                
              
                {/** SECOND CONTACT*/}
                <View style={styles.linkContainer}>
                  <Text>
                    Issues with the App: 
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: 22}}
                    onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')}
                  >
                  <Ionicons name="ios-mail" size={30} color="black" />
                </TouchableOpacity>
                </View>

              </View>
              
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
    width: Layout.window.width - 20,
    marginLeft:10
    
  },
  accordianContainer: {
    //flex:1,
    marginTop: 5,
    //backgroundColor:Colors.PRIMARY,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  contactUs: {
    marginBottom: 280,
    backgroundColor: 'black'
  },
  generalText: {
    marginTop:5, 
  },
  linkContainer: {
    marginTop: 5,
    flexDirection: 'row',
    //paddingVertical: 15,
    //paddingHorizontal: 5,
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center"
  }

});

