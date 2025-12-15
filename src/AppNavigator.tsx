import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import ListScreen from './screens/ListScreen';
import EditScreenClean from './screens/EditScreenClean';

const Stack = createNativeStackNavigator<RootStackParamList>() as any;

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Contacts' }} />
      <Stack.Screen name="Edit" component={EditScreenClean} options={{ title: 'Edit Contact' }} />
    </Stack.Navigator>
  );
}
