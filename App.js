import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import AllExpensesScreen from './screen/AllExpensesScreen';
import RecentExpensesScreen from './screen/RecentExpensesScreen';
import {Ionicons} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ManageExpensesScreen from './screen/ManageExpensesScreen';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expense-context';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
function ExpensesOverview(){
 return (
      <BottomTab.Navigator screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (<IconButton icon='add' size={24} color={tintColor}
         onPress={()=>{
          navigation.navigate('ManageExpenses');
         }}/>),
      
      })} >
        <BottomTab.Screen 
                name="RecentExpenses" 
                component={RecentExpensesScreen} 
                options={{
                  title: 'Recent',
                  tabBarIcon: ({color, size}) => <Ionicons name='hourglass' color={color} size={size} />
                }}
        />

        <BottomTab.Screen 
                name="AllExpenses" 
                component={AllExpensesScreen} 
                options={{
                  title: 'All Expenses',
                  tabBarIcon: ({color, size}) => <Ionicons name='calendar' color={color} size={size} />
                }}
        />
        
      </BottomTab.Navigator>);
}

export default function App() {

  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider  >
        <NavigationContainer>
            <Stack.Navigator screenOptions={
              {
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white'
              }
            }  >
              <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown:false}} />
              <Stack.Screen name='ManageExpenses' component={ManageExpensesScreen}
                  options={{
                    title : 'Manage Expense',
                    presentation: 'modal'
                  }}
              />       
            </Stack.Navigator>     
        </NavigationContainer>
      </ExpensesContextProvider>
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
