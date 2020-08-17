import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import Profile from '../pages/Profile';
import CreateAccount from '../pages/CreateAccount';
import SuccessPage from '../components/SuccessPage';

// Navegação em pilha

const { Navigator, Screen } = createStackNavigator()

function AppStack() {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="ForgetPassword" component={ForgetPassword} />
                <Screen name="CreateAccount" component={CreateAccount} />
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />

                <Screen name="Profile" component={Profile} />
                <Screen name="SuccessPage" component={SuccessPage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack