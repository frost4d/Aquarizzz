import { NavigationContainer } from "@react-navigation/native";
// import CourseListScreen from "./screens/CourseListScreen";
// import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen';
import AppStack from './navigation/AppStack';
import Feeds from './screens/Feeds';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator 
  //   screenOptions={{
  //     tabBarLabelPosition: "below-icon",
  //     tabBarShowLabel: true,
  //     tabBarActiveTintColor: "purple",
  // }}
    >
      <Stack.Screen name="Market" component={AppStack}/>
      <Stack.Screen name="Breed" component={AppStack}/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Tab.Screen name="Home" component={HomeStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Profile" component={ProfileStack} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
