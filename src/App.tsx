import * as React from 'react'
import {StyleSheet, View } from 'react-native'
import AppNavigator from './navigator/AppNavigator'
import { Provider } from 'react-redux';
import store from './redux/Store';
// covering ts type - any, null, undefined, object, never, typeassertions
export interface Props { }
export interface State { }

export class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }

  error(message: string) {
    throw new Error(message)
  }

  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator/>
      </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})