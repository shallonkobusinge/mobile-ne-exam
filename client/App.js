import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import NecHome from './src/screens/NecHome';
import Register from './src/screens/Register';
import VotersHome from './src/screens/VotersHome';
import RegisterCandidate from './src/screens/RegisterCandidates';
import Vote from './src/screens/Vote'
import tw from 'twrnc';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'Login',
            headerShown: false
          }}
        />
        <Stack.Screen
          name='NecHome'
          component={NecHome}
          options={{
            headerShown: false,
          }}



        />
        <Stack.Screen
          name='Vote'
          component={Vote}

        />
        <Stack.Screen
          name='VotersHome'
          component={VotersHome}
          options={{
            headerShown: false,
            title: 'Welcome page for voters'
          }}


        />

        <Stack.Screen
          name='RegisterCandidates'
          component={RegisterCandidate}


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
