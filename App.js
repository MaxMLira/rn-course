import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoryScreen from './screen/CategoryScreen';
import {NavigationContainer} from '@react-navigation/native'
import  {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealsOverviewScreen from './screen/MealsOverviewScreen';
import MealDetailScreen from './screen/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteScreen from './screen/FavoriteScreen';
 import {Ionicons} from '@expo/vector-icons';
//import FavoritesContextProvider from './store/context/favorites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/stote';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator(){  
  return <Drawer.Navigator  
            useLegacyImplementation={true} 
            screenOptions = {{
                headerStyle: {backgroundColor: '#351401' },
                headerTintColor: 'white',
                sceneContainerStyle: {backgroundColor: '#3f2f25'},
                drawerContentStyle: {backgroundColor: '#3f2f25'},
                drawerInactiveTintColor: 'white',
                drawerActiveTintColor: '#351401',
                drawerActiveBackgroundColor: '#e4baa1',
            }}
          >
    <Drawer.Screen name='Categories'   component={CategoryScreen} 
        options={{
          title: 'All Categories', 
          drawerIcon:({color,size})=><Ionicons name='list' color={color} size={size} /> 
        }}
      />
    <Drawer.Screen name='Favorites' component={FavoriteScreen}
      options={{
        
        drawerIcon:({color,size})=><Ionicons name='star' color={color} size={size} /> 
      }}
    />
  </Drawer.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavoritesContextProvider> */} 
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
                  screenOptions={{
                      headerStyle: {backgroundColor: '#351401' },
                      headerTintColor: 'white',
                      sceneContainerStyle: {backgroundColor: '#3f2f25'}
                  }}
              >
            <Stack.Screen 
                    name="Drawer"  
                    component={DrawerNavigator}           
                    options={{                    
                      headerShown: false 
                    }}
            />    
            <Stack.Screen name='MealsOverview' component={MealsOverviewScreen} />        
            <Stack.Screen name='MealDetail' component={MealDetailScreen}   options={{title:'About the meal'}}   />
          </Stack.Navigator>        
        </NavigationContainer>
        
      </Provider>
    </>
    
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
