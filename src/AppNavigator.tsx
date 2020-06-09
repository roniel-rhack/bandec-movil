import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/Home";
import {Icon} from "native-base";
import {AppearanceProvider} from 'react-native-appearance';
import AuthScreen from "./screens/Auth";
import {SafeAreaProvider} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const iconTab = ({color}: { color: string, focused: boolean, size: number }, name: string) =>
    <Icon name={name} color={color}/>

/*
La aplicacion aun no esta lista para el modo oscuro, cuando lo este es solo descomentariar la linea
const scheme = useColorScheme(); y en la prop theme de NavigationContainer cambiar por la siguiente linea
scheme === 'dark' ? DarkTheme : DefaultTheme
*/
const AppNavigator: React.FC<{}> = (props: {}) => {
    // const scheme = useColorScheme();
    return (
        <AppearanceProvider>
            <SafeAreaProvider>
                <NavigationContainer theme={DefaultTheme}>
                    <Tab.Navigator initialRouteName="Auth">
                        <Tab.Screen name="Auth" component={AuthScreen}
                                    options={{tabBarIcon: props1 => iconTab(props1, "person-add")}}/>
                        <Tab.Screen name="Inicio" component={HomeScreen}
                                    options={{tabBarIcon: props1 => iconTab(props1, "home")}}/>
                        <Tab.Screen name="Servicios" component={HomeScreen}
                                    options={{tabBarIcon: props1 => iconTab(props1, "calendar")}}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </AppearanceProvider>
    )
}

export default AppNavigator;