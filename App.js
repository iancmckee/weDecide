import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/MyDrawer'
import { withAuthenticator } from 'aws-amplify-react-native'
import {Amplify, Auth} from 'aws-amplify' 
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile)


function App() {

  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default withAuthenticator(App)