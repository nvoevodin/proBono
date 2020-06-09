import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Content, Card, CardItem, Body } from "native-base";
import * as firebase from 'firebase';
import PageTemplate from './subComponents/Header'
import ChangeInfo from './subComponents/changeInformationModal'
//import Layout from '../constants/Layout';
 

import { connect } from 'react-redux';

class Profile extends Component {


  logout = () =>{
    firebase.auth().signOut()
        .catch(error => console.log(error))

    this.props.navigation.navigate('StartScreen')
  }


  uid = firebase.auth().currentUser.uid;

  state = {
    firstName:'',
    lastName:'',
    modalVisible: false,
    total: null,
    totalWeek: null,
    showHistory: false,
    data:null
  }



//CHANGE INFO MODAL TOGGLE
  showModal =() => {
    this.setState({ modalVisible : !this.state.modalVisible })
  }


  componentDidMount() {
    this.readUserData()
    
  }

  getCheckinData =() => {
  
    fetch(`https://geohut.metis-data.site/historycheckins/${this.props.reducer.userInfo.workId}`)
      .then(res => res.json())
      .then(res => {
       
        this.setState({ data: res["data"], showHistory: true })
      })
  }


  readUserData() {

  
    firebase.database().ref('UsersList/'+ this.uid + '/info').once('value', snapshot => {
     
    let data = snapshot.val()

       
        this.setState({ firstName: data.firstName,
                        lastName: data.lastName,
                        workId: data.workId});

                        fetch(`https://geohut.metis-data.site/checkins/${this.props.reducer.userInfo.workId}`)
                        .then(res => res.json())
                        .then(res => {
                
                    this.setState({total:res.data[0]['total']})
                    
                        }).catch(error => this.setState({totalWeek: 0}))

                        fetch(`https://geohut.metis-data.site/checkinsWeek/${this.props.reducer.userInfo.workId}`)
                        .then(res => res.json())
                        .then(res => {
                   
                    this.setState({totalWeek:res.data[0]['count_ins']})
                    
                        }).catch(error => {
                         
                          this.setState({totalWeek: 0})})
    })
    
  }

  showHistory = () => {
    this.setState({ showHistory : !this.state.showHistory })
  }


    render(){


        return (
          <React.Fragment>
          <PageTemplate title={'Profile'} logout = {this.logout}/>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>{`User Id: ${this.state.workId}`}</Text>
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
                    Check-Ins This Week: {this.state.totalWeek}
                  </Text>
                  <Text>
                    Total Check-Ins: {this.state.total}
                  </Text>
                </Body>
              </CardItem>
              
            </Card>
              
               <Button style ={{margin:10, marginTop: 40}}
               full
               rounded
               primary
               onPress={this.showModal}>
                   <Text style = {{color:'white'}}>Change Info</Text>
               </Button>
              
           
                    
                    <Button style ={{margin:10}}
                      full
                      rounded
                      primary
                      onPress={this.getCheckinData}>
                      <Text style = {{color:'white'}}>{this.state.showHistory ? 'Refresh Checkin History' : 'Show Checkin History'}</Text>
                    </Button>
                    { this.state.showHistory ?
                    <Button style ={{margin:10, marginTop: 5}}
                      full
                      rounded
                      primary
                      onPress={()=>Alert.alert('Data sharing may be added in the future')}>
                      <Text style = {{color:'white'}}>Share my Data</Text>
                    </Button> : <View></View>
                    }

                    { this.state.showHistory ?
                     
                      this.state.data.map((item, index) => (
                        <View key = {index} style = {styles.item}>
                                <View>
                                    <Text>{`Site: ${item.site_id}`}</Text>
                                    <Text>{`Checkin Date: ${item.checkin_date_time.substring(0,10)} ${item.checkin_date_time.substring(11,16)} AM`}</Text>
                                </View>
                        </View>
                      ))  : <View></View>
                    }

                   
          </Content>
       <ChangeInfo 
       modalVisible = {this.state.modalVisible}
       showModal = {this.showModal}
       
       />
        </React.Fragment>
          );

    }



}


const mapStateToProps = (state) => {
    
  const { reducer } = state
  return { reducer }
};



export default connect(mapStateToProps
  )(Profile);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:40
  },
  item: {
    //flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    padding: 15,
    //margin: 2,
    //borderColor: '#2a4944',
    //borderRadius: 20,
    //idth: Layout.window.width - 20,
    //width:'100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    backgroundColor: '#a7a6ba'
 }
});