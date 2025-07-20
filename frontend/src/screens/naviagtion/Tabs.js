import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Home from '../Home/Home';
import Search from '../Search/Search';


const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Search':
            iconName = 'search-outline';
            break;
          case 'Favorites':
            iconName = 'heart-outline';
            break;
          case 'Shop':
            iconName = 'cart-outline';
            break;
          case 'Chatbot':
            iconName = 'chatbubble-ellipses-outline';
            break;
          default:
            iconName = 'ellipse';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ alignItems: 'center' }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#FFD700' : '#999'}
            />
            <Text style={{ color: isFocused ? '#FFD700' : '#999', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      {/* <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Chatbot" component={Chatbot} /> */}
    </Tab.Navigator>
  );
}
