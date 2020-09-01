import  React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,
    Dimensions, Modal, Keyboard, TouchableWithoutFeedback,
   StatusBar, TextInput,
   SafeAreaView } from 'react-native'
import {action_Login} from '../redux/Actions'
import {connect} from 'react-redux';
import { isEmulator } from 'react-native-device-info';
import blue from '../utils/Constants'
const width=Dimensions.get('window').width;
import MyTouchOpacity from '../customComponents/MyTouchOpacity'

const Login=(props: any) => {
  const [userData, setUserData]=useState ({name: '', password: ''})
  const [modalData, setModalData]=useState ({isEmulator: false, showInfoPopUp: false})

  useEffect(() => {
    console.log('useEffectcall')
    checkDevice()
  }, [])

  const checkDevice= async () => {
    const result=await isEmulator();
    setModalData({isEmulator: result, showInfoPopUp: true})
  }

  const onPressLogin = () => {
    Keyboard.dismiss();

    if (userData.name.trim().length < 1)
     { alert('Please add a valid name'); return; }

    if (userData.password.trim().length < 1)
     { alert('Please add a valid password'); return; }
    props.setLoginData(userData)
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const customPopup = () => {
    return (
      <Modal
      visible={setModalData.showInfoPopUp}
      onRequestClose={() => {setModalData({...modalData, showInfoPopUp: false})}}
      transparent={true}
      hardwareAccelerated={true}
      animationType={'slide'}
      >
     <TouchableWithoutFeedback onPress={() => setModalData({...modalData, showInfoPopUp: false})}>
        <View style={{flex: 1, backgroundColor: 'rgba(1,1,1,0.4)', justifyContent: 'flex-end'}}>
        <View style={{width, height: 300, backgroundColor: 'white', padding: 10}}>
        <Text style={{color: 'black', fontSize: 20}}>This app is running in {modalData.isEmulator ? 'Emulator' : 'Real Device'}</Text>
          <Text>Thsi is a custom modal popup </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        </Modal>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1A1924'}} >
      <StatusBar barStyle='light-content'/>

        <View style={styles.view}>

        <TextInput
        placeholder={'Username'}
        placeholderTextColor={'lightgrey'}
        style={[styles.input, {marginTop: 30}]}
        onChangeText={name => setUserData({...userData, name})}
        value={userData.name}
       />
     <TextInput
    style={[styles.input, {marginTop: 20}]}
    placeholder={'Password'}
    placeholderTextColor={'lightgrey'}
    secureTextEntry={true}
    onChangeText={password => setUserData({...userData, password})}
    value={userData.password}
  />
         <MyTouchOpacity
            style={styles.btn}
            onPress={onPressLogin}>
              <Text style={styles.text}>Sign up</Text>
           </MyTouchOpacity>
       </View>
       {modalData.showInfoPopUp && customPopup()}
      </SafeAreaView>
  );


}

// const mapStateToProps=(state) => ({
// })

const mapDispatchToProps=(dispatch: any) => ({
  setLoginData: (data: any) => dispatch(action_Login(data))
})

// =======================================================================
// Styles
// =======================================================================

const styles=StyleSheet.create({
 view: {
   flex: 1,
   backgroundColor: '#1A1924',
   marginTop: width / 4,
   alignItems: 'center'
  },
 input: {
    paddingHorizontal: 10,
    borderRadius: 10,
    width: width / 1.5,
    height: 40,
    fontSize: 16,
    borderColor: blue,
    color: 'white',
    borderWidth: 1
     },
 text: {
   color: 'white',
   fontWeight: 'bold',
   fontSize: 20,
  },
 btn: {
    width: width / 1.5,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
    marginTop: 20
  }

})

export default connect(null, mapDispatchToProps)(Login)