import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import SuccessPassword from '../pages/SuccessPassword';
import SuccessRegister from '../pages/SuccessRegister';
import SuccessProfile from '../pages/SuccessProfile';

// Navegação em pilha

const { Navigator, Screen } = createStackNavigator()

function AppStack() {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="ForgetPassword" component={ForgetPassword} />
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />

                <Screen name="SuccessPassword" component={SuccessPassword} />
                <Screen name="SuccessRegister" component={SuccessRegister} />
                <Screen name="SuccessProfile" component={SuccessProfile} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack