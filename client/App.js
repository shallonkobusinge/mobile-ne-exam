import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import tw from 'twrnc';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer
    >
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'Login',
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Welcome',
            headerShown: false
          }}


        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerShown: false
          }}
        />




      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
