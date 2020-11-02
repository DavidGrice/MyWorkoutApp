import React, { useEffect, useMemo, useReducer, useState } from 'react';
//import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-community/async-storage';

import Splash from './Splash';

import Login from './AuthStack/Login';
import Signup from './AuthStack/Signup';

import Home from './HomeStack/Home';
import Profile from './HomeStack/Profile';
import Settings from './HomeStack/Settings';
import Stats from './HomeStack/Stats';
import Workout from './HomeStack/Workout';

import CreateWorkout from './HomeStack/WorkoutStack/CreateWorkout';
import EditWorkout from './HomeStack/WorkoutStack/EditWorkout';
import HowToWorkout from './HomeStack/WorkoutStack/HowToWorkout';
import RemoveWorkout from './HomeStack/WorkoutStack/RemoveWorkout';
import WorkoutHistory from './HomeStack/WorkoutStack/WorkoutHistory';
import CardioWorkout from './HomeStack/WorkoutStack/Cardio';
import StrengthWorkout from './HomeStack/WorkoutStack/Strength';
import WorkoutHistorySummary from './HomeStack/WorkoutStack/WorkoutHistorySummary';
import RemoveWorkoutHistorySummary from './HomeStack/WorkoutStack/RemoveWorkoutHistorySummary';
import EditWorkoutHistory from './HomeStack/WorkoutStack/EditWorkoutHistory';
import EditWorkoutHistoryCardio from './HomeStack/WorkoutStack/EditWorkoutHistoryCardio';
import EditWorkoutHistoryStrength from './HomeStack/WorkoutStack/EditWorkoutHistoryStrength';

import { AuthContext } from './context';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login"}}
        />
        <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup"}}
        />
    </AuthStack.Navigator>
);

// const SettingsStack = createDrawerNavigator();
// const SettingsStackScreen = () => {
//     return (
//         <SettingsStack.Navigator>
            
//             <SettingsStack.Screen name="Settings" component={Settings}/>
//         </SettingsStack.Navigator>
//     );
// };

const WorkoutStack = createStackNavigator();
const WorkoutStackScreen = () => {
    return (
        <WorkoutStack.Navigator
        headerMode="none">
            <WorkoutStack.Screen name="Let's Workout" component={Workout} />
            <WorkoutStack.Screen name="Create Workout" component={CreateWorkout} />
            <WorkoutStack.Screen name="Edit Workout" component={EditWorkout} />
            <WorkoutStack.Screen name="Remove Workout" component={RemoveWorkout} />
            <WorkoutStack.Screen name="Workout History" component={WorkoutHistory}/>
            <WorkoutStack.Screen name="Workout Videos" component={HowToWorkout} />
            <WorkoutStack.Screen name="CardioWorkout" component={CardioWorkout} />
            <WorkoutStack.Screen name="StrengthWorkout" component={StrengthWorkout} />
            <WorkoutStack.Screen name="WorkoutHistorySummary" component={WorkoutHistorySummary} />
            <WorkoutStack.Screen name="RemoveWorkoutHistorySummary" component={RemoveWorkoutHistorySummary} />
            <WorkoutStack.Screen name="EditWorkoutHistory" component={EditWorkoutHistory} />
            <WorkoutStack.Screen name="EditWorkoutHistoryCardio" component={EditWorkoutHistoryCardio} />
            <WorkoutStack.Screen name="EditWorkoutHistoryStrength" component={EditWorkoutHistoryStrength} />
        </WorkoutStack.Navigator>
    );
};

const HomeTabs = createMaterialBottomTabNavigator();
const HomeTabsScreen = () => {
    return (
    <HomeTabs.Navigator 
    headerMode="none"
    initialRouteName="Home"
    shifting={true}>
        <HomeTabs.Screen name="Home" component={Home}
        options={{
            tabBarLabel: 'Home',
            tabBarColor: '#fdb964',
            tabBarIcon: ({focused}) => (
                <Icon name={focused?"home":"home-outline"} style={{color:'white'}} size={24} />
            ),
        }}/>
        <HomeTabs.Screen name="Workout" component={WorkoutStackScreen}
        options={{
            tabBarLabel: 'Workout',
            tabBarColor: 'purple',
            tabBarIcon: ({focused}) => (
                <Icon name={focused?"arm-flex":"arm-flex-outline"} style={{color:'white'}} size={24} />
            ),
        }}
        />
        <HomeTabs.Screen name="Stats" component={Stats}
        options={{
            tabBarLabel: 'Stats',
            tabBarColor: '#4A4DE7',
            tabBarIcon: ({focused}) => (
                <Icon name={focused?"chart-areaspline":"chart-line"} style={{color:'white'}} size={24} />
            ),
        }}
        />
        <HomeTabs.Screen name="Profile" component={Profile}
        options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#1a5028',
            tabBarIcon: ({focused}) => (
                <Icon name={focused?"head":"head-outline"} style={{color:'white'}} size={24} />
            ),
        }}/>
    </HomeTabs.Navigator>
)};

const RootStack = createStackNavigator();

const Main = () => {

    const initialAuthState = {
        isLoading: true,
        userName: null,
        userFirstName: null,
        userLastName: null,
        userToken: null,
        updatedValue: false,
    };

    const loginReducerState = (prevState, actionState) => {
        switch( actionState.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    //... prevState,
                    userToken: actionState.user_token,
                    isLoading: false,
                }
            case 'LOGIN':
                return {
                    //... prevState,
                    userName: actionState.user_name,
                    userFirstName: actionState.first_name,
                    userLastName: actionState.last_name,
                    userToken: actionState.user_token,
                    isLoading: false,
                }
            case 'LOGOUT':
                return {
                    //... prevState,
                    userName: null,
                    userFirstName: null,
                    userLastName: null,
                    userToken: null,
                    isLoading: false,
                }
        }
    };

    const [loginState, dispatchState] = useReducer(loginReducerState, initialAuthState);

    let authContext = useMemo(() => {
        return {
            signIn: async(userName, userFirstName, userLastName, userToken) => {
                try {
                    await AsyncStorage.setItem('userToken', userToken);
                    await AsyncStorage.setItem('userFirstName', userFirstName);
                    await AsyncStorage.setItem('userLastName', userLastName);
                    await AsyncStorage.setItem('userName', userName);
                } catch(e) {
                    console.log(e)
                }
                dispatchState({type: 'LOGIN', user_name: userName, first_name: userFirstName, last_name: userLastName, user_token: userToken})
            },
            signOut: async() => {

                try {
                    await AsyncStorage.removeItem('userToken');
                    await AsyncStorage.removeItem('userFirstName');
                    await AsyncStorage.removeItem('userLastName');
                    await AsyncStorage.removeItem('userName');
                } catch(e) {
                    console.log(e)
                }

                dispatchState({type: 'LOGOUT'})
            },
        }
    }, [])
    

    useEffect(() => {
        setTimeout(async() => {
            let userToken;
            userToken = null;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch(e) {
                console.log(e)
            }

            dispatchState({type: 'RETRIEVE_TOKEN', user_token: userToken})
        }, 5000);

    }, []);

    if (loginState.isLoading){
        return <Splash />
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken ? (
                    <RootStack.Navigator headerMode="none">
                        <RootStack.Screen
                        name="HomeTabs"
                        component={HomeTabsScreen}
                        />
                    </RootStack.Navigator>
                ) : (
                    <RootStack.Navigator headerMode="none">
                        <RootStack.Screen
                        name="AuthStack"
                        component={AuthStackScreen}
                        />
                    </RootStack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    )

}

export default Main;