import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Alert,ImageBackground,Animated, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import Geofence from 'react-native-expo-geofence';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import Layout from '../constants/Layout';
import * as Animatable from "react-native-animatable";

import background from '../assets/background.png'

const moment = require('moment');
import PageTemplate from './subComponents/Header'
const myIp =  '192.168.1.183' // '192.168.2.7' //  
import { connect } from 'react-redux';

class Home extends Component {

  
  uid = firebase.auth().currentUser.uid;
  

  state = {
    firstName:'',
    lastName:'',
    workId:'',
    //email: 'voevodin.nv@gmail.com',//'fauslyfox110@gmail.com', //for now swap email to see effect
    phone: '',
    submitted:false,
    preSubmitted:false,
    polygonPoints: [
      {  latitude: 40.7557, longitude: -73.9457 }
        //latitude: -23.658739, longitude: -46.666305 }//,
      //{ latitude: -23.651814, longitude:  -46.664129 }
      ],
    userLocation : { 
          latitude: 40.7557, longitude: -73.9457 
        //latitude: -23.652508,
        //longitude: -46.661474
      },
    proximity:null,
    hasLocationPermission: null,
    proximityMax:200,
    siteId:1000,
    siteName: null,
    siteAdress:null,
    siteLocation: { latitude: 40.7635514, longitude: -73.9289525  },
    submittedAnimation: false,
    animatedValue: new Animated.Value(70)
  }


  componentDidMount() {

    if (firebase.auth().currentUser.emailVerified == false){
      Alert.alert(
        'ALERT!',
        'Please verify your email first.',
        [
          
          {text: 'OK'}
        ],
        {cancelable: false}
      );
      this.logout()
      }

    
    this.getSiteData(this.props.reducer.email);
    //this.readUserData();
    this.getLocationsPermissions();

  }

    

    // handleAnimation = () => {
    //   console.log('starting to transform')
    //   Animated.timing(this.state.animatedValue, {
    //     toValue: 1,
    //     duration: 1000,
    //     easing: Easing.ease
    //   }).start()
    // }

    //get site data information //this will have to eventually run globally using redux
    getSiteData = (email) => {
      console.log('retrieving site data with email:', email);
      fetch(`http://${myIp}:3002/siteinfo/${email}`)
        .then(res => res.json())
        .then(res => {
        console.log(res["data"][0])
        this.setState({ siteName: res["data"][0].site_name,
                        siteId : res["data"][0].site_id,
                        siteAdress : res["data"][0].site_address
                      })

                      this.setState(prevState => ({
                        siteLocation: {                   // object that we want to update
                                  ...prevState.siteLocation,    // keep all other key-value pairs
                                  latitude: res["data"][0].latitude,
                                  longitude: res["data"][0].longitude       // update the value of specific key
                              }
                          }))
        })
    }

    //ask for location permissions 
    getLocationsPermissions = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      //status && console.log('location: ', status)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
        } else {
          this.setState({ hasLocationPermission : status })
        }
      
    }


  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }




//   readUserData = () => {
//     firebase.database().ref('UsersList/'+ this.uid + '/info').once('value', snapshot => {
//     console.log('user data:',snapshot.val());    
//     let data = snapshot.val()//[this.uid]
//

 //        //console.log('our data: ',data);
 //        this.setState({ firstName: data.firstName,
 //                        lastName: data.lastName,
 //                        workId: data.workId,
 //                        email: data.email});  

         //pull site data
         //this.getSiteData(data.email);

//     })
    
//   }



  getCurrentLoc  = async() => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      location =  await JSON.stringify(location);
      location = await eval( '(' + '[' + location + ']' + ')' );
      //location && console.log(location[0].coords.latitude);
      return location;
    } catch(e) {
      Alert.alert('cannot get current location, try again or ask for help')
    }
    
  }

  preCheckin = async () => {
    if (this.state.preSubmitted === false) {
      this.setState({submittedAnimation:true});
      console.log('prechecking...')
      try {    
        //get location
        let location = await this.getCurrentLoc();
        console.log(parseFloat(location[0].coords.latitude));
        console.log(parseFloat(location[0].coords.longitude));
        
        //test how far away the user is
        let distance = await getDistance(
                                   { latitude: parseFloat(location[0].coords.latitude), longitude: parseFloat(location[0].coords.longitude)  },
                                   { latitude: this.state.siteLocation.latitude, longitude: this.state.siteLocation.longitude  },
                                    accuracy = 1);
        console.log('distance: ',distance);
        
        //send data
          fetch(
            // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
            `http://${myIp}:3002/add?time=${moment().utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0'
              }&site_id=${"B10002"}&first_name=${this.state.firstName}
              &last_name=${this.state.lastName}&user_id=${this.state.workId}
              &latitude=${this.state.userLocation.latitude}
              &longitude=${this.state.userLocation.longitude}
              &checkin_type=1
              &distance=${distance}`,
              { method: "POST" }
              ).catch(err => console.error(err));
  
            //show checkin as done
            this.setState({preSubmitted:true})
            Alert.alert('Thank you for pre-checkin, do not forget to checkin!')
      } catch (e) {
        console.log(e);
      }
      this.setState({submittedAnimation:false});
    } else {

      Alert.alert('You have already done a pre-checkin!')
    }
  }



  handleButton = async () =>{
    
    if (this.state.submitted === false) {
      this.setState({submittedAnimation:true});
    try {    
      //get location
      let location = await this.getCurrentLoc();
      console.log(parseFloat(location[0].coords.latitude));
      console.log(parseFloat(location[0].coords.longitude));
      
      //test how far away the user is
      let distance = await getDistance(
                                 { latitude: parseFloat(location[0].coords.latitude), longitude: parseFloat(location[0].coords.longitude)  },
                                 { latitude: this.state.siteLocation.latitude, longitude: this.state.siteLocation.longitude  },
                                  accuracy = 1);
      console.log('distance: ',distance);
      
      //validate that location is close enough to the site (200 meters)
      if (distance <= this.state.proximityMax) {
        //if it is send data to database
        //this.getCurrentLoc();
        fetch(
          // MUST USE YOUR LOCALHOST ACTUAL IP!!! NOT http://localhost...
          `http://${myIp}:3002/add?time=${moment().utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0'
            }&site_id=${"B10002"}&first_name=${this.state.firstName}
            &last_name=${this.state.lastName}&user_id=${this.state.workId}
            &latitude=${this.state.userLocation.latitude}
            &longitude=${this.state.userLocation.longitude}
            &checkin_type=0
            &distance=${distance}`,
            { method: "POST" }
            ).catch(err => console.error(err));

          //close animation
          //this.handleAnimation();

          //show checkin as done
          
          this.setState({submitted:true})
          
      } else {
        //console.log('something went wrong');
        Alert.alert('Please move closer to your site and try again.')
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({submittedAnimation:false});

  } else {

    Alert.alert('You have already checked in. If you think this is a mistake contact our app support team under the help page.');
  }
    
  }


    render(){
      console.log('user email: ',this.props.reducer.email);
      console.log('all user data: ', this.props.reducer.userInfo);


        return (
          <React.Fragment>
            <PageTemplate title={'Home'} logout = {this.logout}/>
<View style = {styles.container}>
            <View style={styles.bubble}>
              <Text style={styles.titleText}>
                Site: {this.state.siteName ? `${this.state.siteName}` : `Retrieving ... `}
              </Text>
  
            </View>

            {/* <View style={styles.bubble1}>
              <Text style={styles.titleText}>
                Address: {this.state.siteName ? `${this.state.siteAdress}` : `Retrieving ... `}
              </Text>
  

            </View> */}


            
            <View style={styles.container}>
    
            <TouchableOpacity
            //disabled={this.state.submitted}
                style={{
                  position: 'absolute',
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:170,
                height:170,
                backgroundColor: this.state.submitted == false ? '#eb6e3d' : 'green',
                borderRadius:100,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                elevation: 15, // Android
                zIndex: 1
              }}
              onPress = {this.handleButton}
              >
                
                {this.state.submitted == false ? <Entypo  name= "location" size={60} color="white" /> : <Entypo name="check" size={70} color="white" />}
              </TouchableOpacity>
            {/*<ImageBackground source={background} style={styles.image}> </ImageBackground>*/}
            {this.state.submittedAnimation == false ?
            <Animatable.View animation = 'zoomIn'>
            <Animated.Image
            
                    source={background}
                    resizeMode='cover'
                    style={{
                        //marginTop:100,
                        //position: 'absolute',
                        //left: 40,
                        //top: 100,
                        //height: 100,
                        //width: 100,
                        zIndex: 0,
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        opacity: 0.2,
                        transform: [
                            {
                                translateX: this.state.animatedValue.interpolate({
                                    inputRange: [0, 80],
                                    outputRange: [0,1]
                                })
                            },
                            {
                                translateY: this.state.animatedValue.interpolate({
                                    inputRange: [0, 80],
                                    outputRange: [0, 1]
                                })
                            },
                            {
                                scaleX: this.state.animatedValue.interpolate({
                                    inputRange: [1, 15],
                                    outputRange: [0, 1]
                                })
                            },
                            {
                                scaleY: this.state.animatedValue.interpolate({
                                    inputRange: [1, 15],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }}
                />
 </Animatable.View> :
            <Animatable.View animation = 'zoomOut'>
            <Animated.Image
            
                    source={background}
                    resizeMode='cover'
                    style={{
                        //marginTop:100,
                        //position: 'absolute',
                        //left: 40,
                        //top: 100,
                        //height: 100,
                        //width: 100,
                        zIndex: 0,
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        opacity: 0.2,
                        transform: [
                            {
                                translateX: this.state.animatedValue.interpolate({
                                    inputRange: [0, 80],
                                    outputRange: [0,1]
                                })
                            },
                            {
                                translateY: this.state.animatedValue.interpolate({
                                    inputRange: [0, 80],
                                    outputRange: [0, 1]
                                })
                            },
                            {
                                scaleX: this.state.animatedValue.interpolate({
                                    inputRange: [1, 15],
                                    outputRange: [0, 1]
                                })
                            },
                            {
                                scaleY: this.state.animatedValue.interpolate({
                                    inputRange: [1, 15],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }}
                />
 </Animatable.View>}
    


    
              

            </View>

            <Button 
            style ={{margin:10, backgroundColor:'#ebf2f2', shadowColor: 'black', // IOS
      shadowOffset: { height: 4, width: 0 }, // IOS
      shadowOpacity: 0.4, // IOS
      shadowRadius: 1, //IOS
    }}
                    full
                    rounded
                    
                    onPress={this.preCheckin}>

                        <Text style = {{color:'black', fontWeight:'bold'}}>Pre-CheckIn</Text>
                    </Button>

                    {this.state.submittedAnimation && 
                    <View style={styles.loading}>
      <ActivityIndicator animating = {this.state.submittedAnimation} style = {{left: '0.5%', bottom: '40%'}} size="large" color="white" />
 
    </View>
    }

                    </View>
            </React.Fragment>
          );

    }



}

const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};



export default connect(mapStateToProps
  )(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logout:{
    
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: -5,
      //position: 'absolute', // add if dont work with above
    
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
    
  },
  bubble:{
    position: 'absolute',
    top: '-3.2%',
    alignItems: 'center',
    justifyContent: 'center', width: '36%', height: '6%',
      marginLeft: '32%', marginRight:'32%', 
      padding: 5, borderRadius: 30, paddingBottom: 5,
      backgroundColor:  '#4aa0cf',
      shadowColor: 'black', // IOS
      shadowOffset: { height: 4, width: 0 }, // IOS
      shadowOpacity: 0.5, // IOS
      shadowRadius: 1, //IOS
      elevation: 15, // Android
      zIndex: 9999,
  },
  bubble1:{
    position: 'absolute',
    top: 120,
    alignItems: 'center',
    justifyContent: 'center', width: '80%', height: '4%',
      margin: 6,
      padding: 5, borderRadius: 20, paddingBottom: 5,
      backgroundColor:  '#4aa0cf',
      shadowColor: '#499ecc', // IOS
      shadowOffset: { height: 6, width: 2 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 5, // Android
  },
  image: {
    
   
    zIndex: 0,
    justifyContent: "center",
    width: '100%',
    height: '100%',
    opacity: 0.19
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    backgroundColor:'#666570',
    opacity:0.8
  }
});