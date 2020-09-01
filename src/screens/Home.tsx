import  React, {useState} from 'react'
import { StyleSheet, Dimensions,
  SafeAreaView, Text, View, StatusBar} from 'react-native'
import {connect} from 'react-redux';
import SwipeButton from '../CustomSwipeBtn'
import {IUser} from '../interface';
import MyTouchOpacity from '../customComponents/MyTouchOpacity'
import propTypes from 'prop-types';
const width=Dimensions.get('window').width;


const Home=(props: IUser) => {
  const {name}=props.loginUser;
  const [swipeBtnData, setSwipeBtnData]=useState ({
    title: 'Swipe me to continue', titleColor: 'black'
  })

  const onPress = () => {
    props.navigation.navigate('Profile')
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1A1924'}}>
      <StatusBar barStyle='light-content'/>
      <View style={[styles.view, {justifyContent: 'flex-end', marginBottom: 100}]}>
  <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>Welcome {'\n'}{name} </Text>
      <MyTouchOpacity
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
          style={{width: '100%', alignItems: 'center', marginTop: 20}}>

         <Text style={{color: 'white', fontSize: 18}}>Press To Logout</Text>
     </MyTouchOpacity>

<View style={{marginTop: 100}}>
    <MyTouchOpacity
     onPress={onPress}
    style={[styles.btn, {backgroundColor: 'white'}]}>
        <Text style={{color: '#6EB1F7', fontWeight: 'bold', fontSize: 15}}>Press Me</Text>
     </MyTouchOpacity>

     <MyTouchOpacity
     onPress={onPress}
     style={[styles.btn, {backgroundColor: 'lightgrey'}]}>
        <Text style={{color: '#6EB1F7', fontSize: 15}}>Press Me</Text>
     </MyTouchOpacity>

     <MyTouchOpacity
     onPress={onPress}
     style={[styles.btn, {backgroundColor: '#6EB1F7'}]}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Press Me</Text>
     </MyTouchOpacity>

     <SwipeButton
     height={40}
     borderRadius={8}
     railFillBackgroundColor={'rgba(256, 256, 256,0.5)'}
     railBackgroundColor={'grey'}
     title={swipeBtnData.title}
     titleColor={swipeBtnData.titleColor}
     titleFontSize={16}
       containerStyles={{marginTop: 30, width: width / 1.5, height: 40, borderRadius: 8}}
       railStyles={{height: 40, borderRadius: 8}}
          // thumbIconImageSource={img}
          thumbIconBackgroundColor={'#6EB1F7'}
          thumbIconStyles={{borderRadius: 8, backgroundColor: 'white'}}
          onSwipeStart={() => {}}
          onSwipeFail={() => {}}
          onSwipeSuccess={() =>
            {
              setSwipeBtnData({title: 'Success', titleColor: 'black'})
              setTimeout(() => {onPress() }, 250)
            }
          }
        />
</View>
    </View >
      </SafeAreaView>
  );
}

Home.propTypes = {
  loginUser: propTypes.object
}

const mapStateToProps=(state: any) => ({
  loginUser: state.red_LoginData,

})

const styles=StyleSheet.create({
 view: {flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center'
},
 text: { color: 'white', fontSize: 25},
 btn: {
    borderRadius: 8,
    width: width / 1.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6EB1F7',
    marginTop: 20
  }

})

export default connect(mapStateToProps, null)(Home)
