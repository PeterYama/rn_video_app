import React, { Component } from 'react'
import { Button, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraView from './views/CameraView'
import ListView from './views/ListView'

const Stack = createStackNavigator();

export default class app extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
              screenOptions={screenOptions}
              initialRouteName="ListView"
              screenOptions={screenOptions}
            >
          <Stack.Screen
            name="CameraView"
            component={CameraView}
          />
          <Stack.Screen 
          name="ListView" 
          component={ListView}
          options = {{
            title:'List View'
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );

  }

}
const screenOptions = {
  container: {
    flex: 1,
    marginTop: 0,
  },
  headerStyle: {
    backgroundColor: '#528ff5'
  },
  headerTintColor: '#fff'
  ,
  headerTitleStyle: {

  }
}