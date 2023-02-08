import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home.js'
import ISSLocationScreen from './screens/ISSlocation.js'
import MeteorsScreen from './screens/meteors.js';
import "react-native-gesture-handler"

const Stack= createStackNavigator()
function App () {
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>

<Stack.Screen name='Home' component={HomeScreen}/>
<Stack.Screen name='ISSLocation' component={ISSLocationScreen}/>
<Stack.Screen name='Meteors' component={MeteorsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App